# .dockerignore

## Purpose

This document explains the `.dockerignore` file from an Enterprise DevOps perspective.

A properly configured `.dockerignore` file reduces Docker build time, decreases image size, improves CI/CD performance, and prevents sensitive or unnecessary files from entering the Docker Build Context.

For our Enterprise DevOps Platform, every microservice will include its own `.dockerignore` file.

---

# Introduction

`.dockerignore` works similarly to `.gitignore`.

It tells Docker which files and directories should **not** be included in the Build Context.

Example

```text
Project

↓

.dockerignore

↓

Exclude Unwanted Files

↓

Docker Build Context

↓

Docker Image
```

Without `.dockerignore`, Docker sends every file in the build context to the Docker Daemon.

---

# Why .dockerignore is Important

Benefits

- Faster Docker builds
- Smaller Build Context
- Smaller Docker Images
- Better CI/CD performance
- Improved security
- Reduced network transfer
- Cleaner images

Enterprise projects always maintain a `.dockerignore`.

---

# How .dockerignore Works

Example

```bash
docker build .
```

Docker performs

```text
Read .dockerignore

↓

Ignore Matching Files

↓

Prepare Build Context

↓

Send Context

↓

Build Image
```

Only files not excluded are sent.

---

# Example Project

```text
project/

├── Dockerfile
├── .dockerignore
├── app.py
├── requirements.txt
├── node_modules/
├── .git/
├── logs/
├── build/
├── dist/
└── tests/
```

Without `.dockerignore`

Everything is included.

With `.dockerignore`

Only required files remain.

---

# Basic .dockerignore Example

```text
node_modules
.git
*.log
.env
coverage
build
dist
```

These files are excluded from the Build Context.

---

# Common Patterns

Ignore directory

```text
node_modules
```

Ignore file

```text
.env
```

Ignore all log files

```text
*.log
```

Ignore Python cache

```text
__pycache__
```

Ignore compiled Python files

```text
*.pyc
```

Ignore Git metadata

```text
.git
```

---

# Typical Files to Ignore

Development

```text
.git
.gitignore
.vscode
.idea
```

Logs

```text
*.log
logs
```

Python

```text
__pycache__
*.pyc
venv
.env
```

Node.js

```text
node_modules
npm-debug.log
dist
```

Operating System

```text
.DS_Store
Thumbs.db
```

Testing

```text
coverage
reports
```

---

# Example for Python Projects

```text
__pycache__
*.pyc
venv
.env
.pytest_cache
coverage
.git
.vscode
```

Suitable for

- Auth Service
- API Gateway
- Dashboard Service

---

# Example for React Projects

```text
node_modules
dist
coverage
.git
.vscode
.env
npm-debug.log
```

Suitable for

Frontend Service

---

# Build Context Comparison

Without `.dockerignore`

```text
Project Size

↓

1.8 GB

↓

Slow Build
```

With `.dockerignore`

```text
Project Size

↓

90 MB

↓

Fast Build
```

The application code remains the same.

Only unnecessary files are removed.

---

# .dockerignore in Our Project

Frontend

```text
node_modules
dist
.git
coverage
.env
```

Backend

```text
venv
__pycache__
*.pyc
.git
coverage
.env
```

Each service maintains its own `.dockerignore`.

---

# Enterprise Workflow

Developer

↓

Modify Source Code

↓

.dockerignore Filters Files

↓

Docker Build Context

↓

Image Build

↓

Registry

↓

Deployment

A clean Build Context improves every downstream process.

---

# Internal Workflow

Developer executes

```bash
docker build .
```

Docker

↓

Reads `.dockerignore`

↓

Filters Files

↓

Creates Build Context

↓

Transfers Context

↓

Builds Image

---

# .dockerignore vs .gitignore

| .dockerignore | .gitignore |
|---------------|------------|
| Used by Docker | Used by Git |
| Controls Build Context | Controls Git tracking |
| Improves Docker builds | Improves repository cleanliness |
| Reduces image size | Prevents unwanted commits |

Although similar, they serve different purposes.

---

# Daily DevOps Activities

DevOps Engineers

- Update `.dockerignore`
- Remove unnecessary files
- Reduce Build Context
- Improve CI/CD performance
- Review image contents
- Prevent secret exposure

---

# Production Best Practices

- Create a `.dockerignore` for every Docker project.
- Ignore dependency directories.
- Ignore logs.
- Ignore IDE files.
- Ignore temporary files.
- Ignore source control metadata.
- Ignore test artifacts.
- Keep Build Context minimal.

---

# Security Considerations

Never include

- Private keys
- API keys
- Password files
- Certificates
- Secrets
- Local databases
- SSH keys
- Environment files containing credentials

Even if not copied into the image, sensitive files should not be transferred unnecessarily during the build.

---

# Troubleshooting

Check Build Context

```bash
docker build .
```

Look for

```text
Sending build context to Docker daemon
```

Review ignored files

```bash
cat .dockerignore
```

Build without cache

```bash
docker build --no-cache .
```

Inspect image

```bash
docker image inspect app:v1
```

---

# Real Production Scenario

Scenario

A security scan discovers AWS credentials inside a Docker image.

Investigation reveals

The project contained

```text
.env
```

The `.dockerignore` file was missing.

During the build

↓

The `.env` file became part of the Build Context.

↓

It was copied into the image.

Resolution

- Create `.dockerignore`
- Exclude `.env`
- Rotate compromised credentials
- Rebuild the image
- Redeploy

---

# Scenario-Based Interview Questions

## Question 1

What is `.dockerignore`?

Answer

It is a file that tells Docker which files and directories should be excluded from the Build Context.

---

## Question 2

Why is `.dockerignore` important?

Answer

It reduces build time, decreases image size, improves CI/CD performance, and prevents unnecessary or sensitive files from entering the build process.

---

## Question 3

Does `.dockerignore` reduce Docker Image size?

Answer

Indirectly, yes.

Files excluded from the Build Context cannot be copied into the image, resulting in smaller images.

---

# Architecture-Level Interview Questions

## Question

Why is `.dockerignore` processed before Dockerfile instructions?

Answer

Docker must first determine which files belong to the Build Context before executing Dockerfile instructions such as `COPY` and `ADD`.

---

## Question

Why should `.git` be ignored?

Answer

Git metadata is unnecessary inside container images and increases Build Context size.

---

## Question

Should `node_modules` be included?

Answer

No.

Dependencies should normally be installed during the image build using package managers, not copied from the developer's machine.

---

# Production Support Questions

Q.

Docker builds suddenly become slow after a developer commits several files.

What do you investigate?

Answer

Review

- `.dockerignore`
- Build Context size
- Large directories
- Build artifacts
- Dependency folders

---

Q.

Sensitive files appeared inside a production image.

Possible cause?

Answer

The files were not excluded by `.dockerignore` and were copied during the Docker build.

---

# Related Runbooks

Future runbooks

- Create .dockerignore
- Reduce Docker Build Context
- Secure Docker Images
- Remove Secrets from Images
- Troubleshoot Slow Docker Builds

---

# Common Incidents

- Large Build Context
- Slow CI/CD pipeline
- Secrets copied into image
- node_modules included
- .git included
- Log files included
- Large temporary files

---

# Commands

Build image

```bash
docker build .
```

View `.dockerignore`

```bash
cat .dockerignore
```

Inspect image

```bash
docker image inspect app:v1
```

Build without cache

```bash
docker build --no-cache .
```

---

# Key Takeaways

`.dockerignore` is a critical file that controls the Docker Build Context.

A well-maintained `.dockerignore` improves build performance, strengthens security, reduces image size, and accelerates enterprise CI/CD pipelines.

For our Enterprise DevOps Platform, every microservice repository will include a dedicated `.dockerignore` to ensure fast, secure, and efficient image builds.

---

# Marathi Quick Revision

`.dockerignore`

काम

- Build Context कमी करणे
- Build जलद करणे
- Secrets exclude करणे
- Image size कमी करणे

साधारण ignore करायचे

- node_modules
- .git
- .env
- logs
- __pycache__
- venv
- coverage
- dist

---

# Marathi Interview Memory Tip

Interview मध्ये जर विचारलं:

"`.dockerignore` म्हणजे काय?"

असं सांगा:

"`.dockerignore` ही Docker ची ignore file आहे. `docker build` चालवताना कोणते files आणि directories Build Context मध्ये पाठवायचे नाहीत हे ती ठरवते. त्यामुळे build जलद होतो, image लहान राहते, CI/CD pipeline सुधारते आणि secrets किंवा अनावश्यक files image मध्ये जाण्यापासून रोखले जातात."

