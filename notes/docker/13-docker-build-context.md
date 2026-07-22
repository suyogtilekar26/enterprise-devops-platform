# Docker Build Context

## Purpose

This document explains Docker Build Context from an Enterprise DevOps perspective.

The Build Context is one of the most overlooked Docker concepts, yet it directly affects build speed, image size, security, and CI/CD performance.

For our Enterprise DevOps Platform, optimizing the build context will significantly reduce image build time for all microservices.

---

# Introduction

Whenever a Docker build is executed, Docker first collects all required files from the specified directory.

This collection of files is called the **Build Context**.

Example

```bash
docker build .
```

The dot (`.`) represents the current directory.

Everything inside that directory (except files ignored by `.dockerignore`) becomes part of the build context.

---

# What is Build Context?

Build Context is

- Files
- Directories
- Dockerfile
- Source code
- Configuration files
- Static assets

sent from the Docker CLI to the Docker Daemon during image creation.

Docker cannot access files outside the build context unless explicitly provided.

---

# Build Context Architecture

```text
Current Directory

↓

Build Context

↓

Docker CLI

↓

Docker Daemon

↓

Docker Build

↓

Docker Image
```

---

# Build Context Flow

```text
Application Source

↓

docker build .

↓

Collect Files

↓

Send Context

↓

Read Dockerfile

↓

Execute Instructions

↓

Build Image
```

The build context is transferred before Docker starts processing the Dockerfile.

---

# Example Project

```text
project/

├── Dockerfile
├── app.py
├── requirements.txt
├── templates/
├── static/
├── tests/
├── node_modules/
└── .dockerignore
```

Without `.dockerignore`

Everything above is sent.

With `.dockerignore`

Only required files are sent.

---

# View Build Context

Example

```bash
docker build .
```

Output

```text
Sending build context to Docker daemon
25.3MB
```

This shows the size of the build context.

Large values usually indicate unnecessary files.

---

# Why Build Context Matters

A large build context causes

- Slower builds
- Longer CI/CD pipelines
- Increased network usage
- Higher storage consumption
- Slower remote builds

Reducing build context improves performance immediately.

---

# Common Unnecessary Files

Typical files that should not be included

- node_modules
- .git
- logs
- cache files
- temporary files
- IDE settings
- test reports
- local databases
- build artifacts

These files increase build time without improving the final image.

---

# .dockerignore

Docker uses

```text
.dockerignore
```

to exclude files from the build context.

Example

```text
node_modules
.git
.env
*.log
__pycache__
coverage
dist
build
```

Only required files are sent to Docker.

---

# Build Context Example

Without `.dockerignore`

```text
Project

↓

1.5 GB Context

↓

Slow Build
```

With `.dockerignore`

```text
Project

↓

80 MB Context

↓

Fast Build
```

---

# Build Context in Our Project

Frontend

```text
frontend/

↓

Dockerfile

↓

Source Code

↓

package.json

↓

vite.config.js
```

Ignored

```text
node_modules

dist

.git

logs
```

Backend

```text
auth-service/

↓

Dockerfile

↓

Python Files

↓

requirements.txt
```

Ignored

```text
__pycache__

venv

.git

logs
```

Each service should maintain its own `.dockerignore`.

---

# Enterprise Workflow

Developer

↓

Git Push

↓

GitHub Actions

↓

Build Context

↓

Docker Build

↓

Image

↓

Registry

↓

Deployment

A smaller build context produces faster CI/CD pipelines.

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

Collects required files

↓

Creates Build Context

↓

Transfers Context

↓

Reads Dockerfile

↓

Builds Image

---

# Build Context vs Dockerfile

Build Context

Responsible for

- Which files Docker can access

Dockerfile

Responsible for

- How Docker builds the image

Both work together during image creation.

---

# Best Practices for Build Context

- Keep the context as small as possible.
- Use `.dockerignore`.
- Exclude source control metadata.
- Exclude dependency directories.
- Exclude logs.
- Exclude temporary files.
- Exclude local development environments.
- Include only required application files.

---

# Daily DevOps Activities

DevOps Engineers regularly

- Review build context size
- Update `.dockerignore`
- Optimize CI/CD build speed
- Remove unnecessary files
- Troubleshoot slow builds
- Reduce image creation time

---

# Production Best Practices

- Maintain `.dockerignore` in every project.
- Keep build contexts below practical limits.
- Exclude secrets.
- Exclude development artifacts.
- Separate build and runtime dependencies.
- Review context size during code reviews.

---

# Security Considerations

Never include

- Private keys
- Password files
- API tokens
- Certificates
- Secrets
- SSH keys
- Local databases

Sensitive files accidentally included in the build context may become part of image layers.

---

# Troubleshooting

Check build output

```bash
docker build .
```

Look for

```text
Sending build context to Docker daemon
```

Verify ignored files

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

A CI/CD pipeline takes 30 minutes to build a simple application.

Investigation reveals

- Entire Git repository included
- node_modules included
- Large log files included
- Test reports included

Build Context

```text
3.8 GB
```

After creating a proper `.dockerignore`

Build Context

```text
95 MB
```

Pipeline time reduced from

30 minutes

↓

6 minutes

---

# Scenario-Based Interview Questions

## Question 1

What is Docker Build Context?

Answer

Build Context is the collection of files and directories sent from the Docker CLI to the Docker Daemon before image creation begins.

---

## Question 2

How can Build Context size be reduced?

Answer

By creating a `.dockerignore` file that excludes unnecessary files and directories.

---

## Question 3

Does Docker automatically ignore `.git`?

Answer

No.

It must be explicitly added to `.dockerignore`.

---

# Architecture-Level Interview Questions

## Question

Why is Build Context transferred before Docker builds the image?

Answer

The Docker Daemon requires access to all files referenced by the Dockerfile before executing build instructions.

---

## Question

Why should Build Context remain small?

Answer

Smaller contexts improve build speed, reduce network transfer, lower storage requirements, and accelerate CI/CD pipelines.

---

## Question

Why are secrets dangerous inside Build Context?

Answer

Secrets may accidentally become part of image layers or build history, creating security risks.

---

# Production Support Questions

Q.

A Docker build is unexpectedly slow.

What should you investigate first?

Answer

Review

- Build Context size
- `.dockerignore`
- Large directories
- Build artifacts
- Dependency folders

---

Q.

Sensitive credentials appeared inside a Docker image.

Possible cause?

Answer

The credentials were included in the Build Context and copied into the image during the build.

---

# Related Runbooks

Future runbooks

- Optimize Docker Build Context
- Configure .dockerignore
- Troubleshoot Slow Docker Builds
- Remove Sensitive Files from Images
- Reduce CI/CD Build Time

---

# Common Incidents

- Large Build Context
- Slow CI/CD builds
- Secrets copied into image
- node_modules included
- .git included
- Temporary files included
- Large build artifacts

---

# Commands

Build image

```bash
docker build .
```

Specify Dockerfile

```bash
docker build -f Dockerfile.prod .
```

Build without cache

```bash
docker build --no-cache .
```

View `.dockerignore`

```bash
cat .dockerignore
```

Inspect image

```bash
docker image inspect app:v1
```

---

# Key Takeaways

Docker Build Context is the set of files transferred to Docker before image creation.

Optimizing the build context with a properly configured `.dockerignore` file improves build performance, reduces image size, strengthens security, and speeds up enterprise CI/CD pipelines.

For our Enterprise DevOps Platform, every microservice will maintain its own optimized Build Context to ensure fast and efficient container image creation.

---

# Marathi Quick Revision

Build Context म्हणजे

- Docker ला पाठवलेले files
- Source code
- Dockerfile
- Configuration
- Assets

`.dockerignore` वापरून

- node_modules
- .git
- logs
- cache
- temp files

exclude करावेत.

---

# Marathi Interview Memory Tip

Interview मध्ये जर विचारलं:

"Build Context म्हणजे काय?"

असं सांगा:

"`docker build` चालवल्यावर Docker सर्व आवश्यक files Docker Daemon कडे पाठवतो. या files च्या collection ला Build Context म्हणतात. `.dockerignore` वापरून अनावश्यक files exclude केल्यास build जलद होते, image सुरक्षित राहते आणि CI/CD pipeline अधिक कार्यक्षम बनते."

