# Docker Compose env_file

## Purpose

This document explains the `env_file` directive in Docker Compose from an Enterprise DevOps perspective.

The `env_file` directive allows Docker Compose to load environment variables from one or more external files instead of defining them directly inside the Compose file. This keeps configuration organized, reusable, and easier to manage across different environments.

For our Enterprise DevOps Platform, `env_file` will be used to separate environment-specific configuration from the Docker Compose definition, making deployments cleaner and easier to maintain.

---

# Introduction

As applications grow, the number of environment variables also grows.

Instead of writing

```yaml
environment:
  APP_ENV: development
  PORT: 8080
  LOG_LEVEL: INFO
  DATABASE_HOST: postgres
  DATABASE_PORT: 5432
  DATABASE_NAME: enterprise
  DATABASE_USER: admin
```

Docker Compose allows us to place these values into a separate file.

---

# High-Level Architecture

```text
env_file

↓

Docker Compose

↓

Environment Variables

↓

Container

↓

Application
```

---

# Why env_file Matters

Benefits

- Cleaner Compose files
- Easier configuration management
- Reusable configuration
- Environment separation
- Better readability
- Simpler maintenance

---

# Basic Syntax

Example

```yaml
services:
  api:
    env_file:
      - .env
```

Docker Compose loads all variables from the file.

---

# Example env File

```text
APP_ENV=development
PORT=8080
LOG_LEVEL=INFO
```

These variables become available inside the container.

---

# Workflow

```text
docker compose up

↓

Read env_file

↓

Load Variables

↓

Start Container

↓

Application Reads Variables
```

---

# Multiple Environment Files

Example

```yaml
env_file:
  - common.env
  - development.env
```

Compose loads the files in order.

Later files can override earlier values.

---

# Example

common.env

```text
LOG_LEVEL=INFO
PORT=8080
```

development.env

```text
LOG_LEVEL=DEBUG
```

Final value

```text
LOG_LEVEL=DEBUG
```

---

# env_file vs environment

Using env_file

```yaml
env_file:
  - .env
```

Using environment

```yaml
environment:
  APP_ENV: development
```

The `environment` section is written directly inside the Compose file.

The `env_file` section reads variables from an external file.

---

# Combining env_file and environment

Example

```yaml
env_file:
  - .env

environment:
  LOG_LEVEL: DEBUG
```

If the same variable exists in both places,

```text
environment
```

takes precedence.

---

# Variable Loading Order

Typical order

```text
environment

↓

env_file

↓

Docker Image Defaults
```

Always verify which value overrides another.

---

# env_file in Our Project

Development

```text
.env.development
```

Testing

```text
.env.testing
```

Production

```text
.env.production
```

Each environment provides different configuration while using the same Docker image.

---

# Enterprise Workflow

Developer

↓

Select Environment File

↓

docker compose up

↓

Variables Loaded

↓

Containers Started

↓

Application Configured

---

# Internal Workflow

Compose

↓

Read env_file

↓

Parse Variables

↓

Inject Into Container

↓

Application Startup

---

# Daily DevOps Activities

DevOps Engineers

- Maintain environment files
- Separate environments
- Review configuration
- Validate required variables
- Remove obsolete entries
- Document configuration changes

---

# Production Best Practices

- Keep Compose files generic.
- Store configuration in environment files.
- Use separate files for each environment.
- Keep sensitive values out of source control.
- Validate required variables during deployment.
- Maintain documentation for every variable.

---

# Security Considerations

- Never commit production secrets.
- Protect environment files.
- Limit file permissions.
- Use secret management solutions in production.
- Rotate credentials regularly.

---

# Troubleshooting

Validate configuration

```bash
docker compose config
```

Start services

```bash
docker compose up
```

Inspect environment

```bash
docker exec <container> env
```

Inspect container

```bash
docker inspect <container>
```

---

# Common Issues

## File Not Found

Cause

Incorrect path in

```yaml
env_file
```

Resolution

Verify the file location.

---

## Variable Missing

Cause

Variable not defined inside the environment file.

Resolution

Add the required variable.

---

## Wrong Configuration

Cause

Multiple files override values unexpectedly.

Resolution

Review variable precedence.

---

# Real Production Scenario

Scenario

A deployment succeeds but the application connects to the development database.

Investigation

The Compose file references

```text
.env.development
```

instead of

```text
.env.production
```

Resolution

Update the deployment configuration to use the correct environment file.

Result

Application connects to the production database.

---

# Scenario-Based Interview Questions

## Question 1

What is the purpose of `env_file`?

Answer

It loads environment variables from external files into Docker containers.

---

## Question 2

Why use `env_file` instead of placing everything under `environment`?

Answer

It keeps Compose files clean, supports reusable configuration, and simplifies managing different environments.

---

## Question 3

Which has higher priority: `environment` or `env_file`?

Answer

The `environment` section overrides values loaded from `env_file`.

---

# Architecture Interview Questions

## Question

Why should configuration files be separated from infrastructure definitions?

Answer

Separating configuration improves maintainability, allows environment-specific customization, and keeps infrastructure definitions reusable.

---

# Production Support Interview Questions

## Question

An application starts with incorrect configuration.

What should you investigate?

Answer

Review

- env_file path
- Environment variables
- Variable precedence
- Deployment configuration
- Container environment
- Application logs

---

# Related Runbooks

Future runbooks

- Configure Environment Files
- Troubleshoot Missing Variables
- Validate Runtime Configuration
- Manage Environment Configuration

---

# Common Incidents

- Missing env file
- Incorrect variable values
- Wrong environment selected
- File permission issue
- Variable override conflict
- Startup failure

---

# Commands

Validate Compose

```bash
docker compose config
```

Start services

```bash
docker compose up
```

Inspect environment

```bash
docker exec <container> env
```

Inspect container

```bash
docker inspect <container>
```

---

# Marathi Quick Revision

env_file

- External configuration file
- Compose variables load करते
- Multiple environment support
- Cleaner Compose files
- Production मध्ये secrets वेगळे ठेवणे योग्य

---

# Marathi Interview Memory Tip

Interview मध्ये जर विचारलं:

"`env_file` आणि `environment` मध्ये काय फरक आहे?"

असं सांगा:

"`environment` मध्ये variables Compose file मध्येच लिहिले जातात, तर `env_file` बाहेरील configuration file मधून variables load करते. Enterprise projects मध्ये configuration maintain करण्यासाठी `env_file` जास्त वापरले जाते, कारण development, testing आणि production साठी वेगवेगळ्या configuration files ठेवता येतात."

---

# Key Takeaways

The `env_file` directive enables Docker Compose to load environment variables from external files, keeping Compose definitions clean and reusable. It supports multiple environments, improves maintainability, and separates configuration from infrastructure. In our Enterprise DevOps Platform, different environment files will be used for development, testing, and production while deploying the same application images.

