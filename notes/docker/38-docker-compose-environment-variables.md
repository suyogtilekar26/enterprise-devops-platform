# Docker Compose Environment Variables

## Purpose

This document explains Environment Variables in Docker Compose from an Enterprise DevOps perspective.

Environment variables allow applications to receive configuration at runtime without modifying the application code. They help separate configuration from the application itself.

For our Enterprise DevOps Platform, all service configuration such as application environment, API URLs, ports, database connections, secrets, and feature flags will be supplied using environment variables.

---

# Introduction

Applications require configuration.

Examples

- Application mode
- Database host
- Database port
- API URL
- JWT Secret
- Logging level
- Feature flags

Instead of hardcoding these values, Docker Compose injects them as environment variables.

---

# High-Level Architecture

```text
docker-compose.yml

↓

Environment Variables

↓

Docker Engine

↓

Container

↓

Application
```

---

# Why Environment Variables Matter

Benefits

- Configuration without rebuilding images
- Environment-specific settings
- Easier deployments
- Better security
- Portable applications
- CI/CD friendly

---

# Environment Variable Workflow

```text
Compose File

↓

Environment Variables

↓

Container

↓

Application Reads Variables

↓

Application Starts
```

---

# Basic Syntax

Example

```yaml
services:
  frontend:
    environment:
      APP_ENV: development
```

The container receives

```text
APP_ENV=development
```

---

# Multiple Environment Variables

Example

```yaml
environment:
  APP_ENV: development
  LOG_LEVEL: INFO
  API_PORT: 8080
```

---

# List Format

Compose also supports

```yaml
environment:
  - APP_ENV=development
  - LOG_LEVEL=INFO
```

Both formats are valid.

---

# Using Variables from Host

Example

```yaml
environment:
  APP_ENV: ${APP_ENV}
```

Docker Compose reads the value from the host environment.

---

# Using a .env File

Example

```text
.env
```

Contents

```text
APP_ENV=development
LOG_LEVEL=INFO
API_PORT=8080
```

Compose automatically loads the `.env` file from the current directory.

---

# Compose with .env

Compose file

```yaml
environment:
  APP_ENV: ${APP_ENV}
  LOG_LEVEL: ${LOG_LEVEL}
```

Runtime

```text
.env

↓

Compose

↓

Container
```

---

# Environment Variables in Our Project

Frontend

```text
VITE_API_URL
```

API Gateway

```text
APP_ENV
PORT
AUTH_SERVICE_URL
DASHBOARD_SERVICE_URL
```

Auth Service

```text
JWT_SECRET
PORT
```

Dashboard Service

```text
PORT
```

---

# Example Architecture

```text
.env

↓

docker-compose.yml

↓

Frontend

↓

API Gateway

↓

Auth Service

↓

Dashboard Service
```

---

# Environment Variable Priority

Typical order

```text
Compose File

↓

Host Environment

↓

.env File

↓

Application Default
```

Always understand which value takes precedence.

---

# Enterprise Workflow

Developer

↓

Update .env

↓

docker compose up

↓

Compose Reads Variables

↓

Containers Start

↓

Application Uses Configuration

---

# Internal Workflow

Compose

↓

Load .env

↓

Substitute Variables

↓

Container Environment

↓

Application Startup

---

# Daily DevOps Activities

DevOps Engineers

- Maintain environment files
- Update runtime configuration
- Verify application settings
- Support multiple environments
- Review configuration changes

---

# Development vs Production

Development

```text
APP_ENV=development
LOG_LEVEL=DEBUG
```

Production

```text
APP_ENV=production
LOG_LEVEL=ERROR
```

Different environments require different configuration.

---

# Secrets vs Environment Variables

Environment variables are suitable for

- Ports
- URLs
- Feature flags
- Logging levels

Sensitive values such as

- Passwords
- API Keys
- Database credentials
- Certificates

should be managed using dedicated secret management solutions in production.

---

# Production Best Practices

- Keep configuration outside images.
- Use `.env` files for local development.
- Never hardcode credentials.
- Separate development and production configuration.
- Document required variables.
- Validate required variables during startup.

---

# Security Considerations

- Never commit `.env` files containing secrets.
- Add `.env` to `.gitignore` when appropriate.
- Use secret managers in production.
- Rotate credentials regularly.
- Restrict access to configuration files.

---

# Troubleshooting

View Compose configuration

```bash
docker compose config
```

Start application

```bash
docker compose up
```

Inspect container

```bash
docker inspect <container>
```

View container environment

```bash
docker exec <container> env
```

---

# Real Production Scenario

Scenario

The API Gateway fails immediately after deployment.

Investigation

Container logs report

```text
JWT_SECRET not defined
```

Compose configuration references

```yaml
JWT_SECRET: ${JWT_SECRET}
```

The production environment variable is missing.

Resolution

- Add the required environment variable.
- Restart the service.
- Verify application startup.

Result

Application starts successfully.

---

# Scenario-Based Interview Questions

## Question 1

Why use environment variables?

Answer

They separate configuration from application code, making deployments portable and configurable across environments.

---

## Question 2

Why use a `.env` file?

Answer

It centralizes configuration for local development and reduces duplication inside Compose files.

---

## Question 3

Should secrets be stored in environment variables?

Answer

For local development they often are, but enterprise production environments should use dedicated secret management solutions whenever possible.

---

# Architecture Interview Questions

## Question

Why should application configuration be externalized?

Answer

Externalized configuration allows the same container image to run in development, testing, staging, and production without rebuilding the image.

---

# Production Support Interview Questions

## Question

A service starts locally but fails in production because configuration is missing.

What should you investigate?

Answer

Review

- Environment variables
- `.env` configuration
- Compose file
- Secret management
- Deployment configuration
- Container logs

---

# Related Runbooks

Future runbooks

- Configure Environment Variables
- Manage Application Configuration
- Troubleshoot Missing Environment Variables

---

# Common Incidents

- Missing environment variable
- Incorrect variable name
- Invalid configuration
- Secret accidentally committed
- Wrong application environment
- Startup failure due to missing configuration

---

# Commands

Start services

```bash
docker compose up
```

Validate configuration

```bash
docker compose config
```

Inspect container

```bash
docker inspect <container>
```

View environment

```bash
docker exec <container> env
```

---

# Marathi Quick Revision

Environment Variables

- Runtime configuration
- .env file
- Compose inject करते
- Code बदलण्याची गरज नाही
- Development आणि Production वेगळी configuration

---

# Marathi Interview Memory Tip

Interview मध्ये जर विचारलं:

"Docker Compose मध्ये Environment Variables का वापरतात?"

असं सांगा:

"Environment Variables वापरून application configuration code पासून वेगळी ठेवता येते. त्यामुळे एकाच Docker image ला development, testing आणि production मध्ये वेगवेगळ्या configuration सह वापरता येते. Local development साठी `.env` file वापरली जाते, तर production मध्ये secrets secret management solutions मधून दिले जातात."

---

# Key Takeaways

Environment variables provide runtime configuration without modifying application code or rebuilding images. Docker Compose makes configuration management simple by supporting inline variables, host variables, and `.env` files. For our Enterprise DevOps Platform, environment variables will provide flexible, environment-specific configuration while keeping application images immutable and reusable.

