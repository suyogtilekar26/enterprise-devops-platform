# Lab 07 - Building a Python Application Docker Image

# Objective

Learn how to containerize a Python Flask application using Docker.

This lab prepares us for containerizing the API Gateway, Auth Service, and Dashboard Service in the Enterprise DevOps Platform.

By the end of this lab you will be able to

- Build a Python Docker image
- Install dependencies
- Copy application source
- Run a Flask application
- Verify the running container

---

# Enterprise Scenario

Our Enterprise DevOps Platform contains three backend services.

- API Gateway
- Auth Service
- Dashboard Service

All three services are Python Flask applications running behind Gunicorn.

Before containerizing the actual services, we will build a simple Flask application.

---

# Architecture

```
Python Source

      │

requirements.txt

      │

Dockerfile

      │

docker build

      │

Docker Image

      │

docker run

      │

Flask Application
```

---

# Prerequisites

- Docker Installed
- Docker Running

Verify

```bash
docker version
```

---

# Step 1

Create project directory.

```bash
mkdir flask-docker-demo

cd flask-docker-demo
```

---

# Step 2

Create application.

```bash
nano app.py
```

Add

```python
from flask import Flask

app = Flask(__name__)

@app.route("/")
def home():
    return "Enterprise DevOps Platform"

@app.route("/health")
def health():
    return "Healthy", 200

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
```

Save the file.

---

# Step 3

Create requirements file.

```bash
nano requirements.txt
```

Add

```
Flask==3.0.3
gunicorn==22.0.0
```

Save the file.

---

# Step 4

Create Dockerfile.

```bash
nano Dockerfile
```

---

# Step 5

Add Dockerfile.

```dockerfile
FROM python:3.12-slim

WORKDIR /app

COPY requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt

COPY . .

EXPOSE 5000

CMD ["python","app.py"]
```

---

# Step 6

Build image.

```bash
docker build -t flask-demo:v1 .
```

---

# Step 7

Verify image.

```bash
docker images
```

---

# Step 8

Run container.

```bash
docker run -d \
--name flask-demo \
-p 5000:5000 \
flask-demo:v1
```

---

# Step 9

Verify container.

```bash
docker ps
```

---

# Step 10

Test application.

```bash
curl http://localhost:5000
```

Expected

```
Enterprise DevOps Platform
```

---

# Step 11

Test health endpoint.

```bash
curl http://localhost:5000/health
```

Expected

```
Healthy
```

---

# Step 12

View logs.

```bash
docker logs flask-demo
```

---

# Step 13

Inspect container.

```bash
docker inspect flask-demo
```

---

# Step 14

Stop container.

```bash
docker stop flask-demo
```

---

# Step 15

Remove container.

```bash
docker rm flask-demo
```

---

# Enterprise Usage

Later this same process will be used for

```
API Gateway

↓

Docker Build

↓

GHCR

↓

Kind Kubernetes
```

```
Auth Service

↓

Docker Build

↓

GHCR

↓

Kind Kubernetes
```

```
Dashboard Service

↓

Docker Build

↓

GHCR

↓

Kind Kubernetes
```

The only difference will be

- Application source
- Dependencies
- Startup command

---

# Validation Checklist

Verify

- Flask application created
- Dockerfile created
- Image built
- Container running
- Root endpoint accessible
- Health endpoint accessible
- Logs available

---

# Common Errors

## Module Not Found

Verify

```bash
cat requirements.txt
```

---

## Build Failed

Verify Dockerfile.

```bash
cat Dockerfile
```

---

## Port Already In Use

Use another port.

```bash
-p 5001:5000
```

---

## Container Exited

Review logs.

```bash
docker logs flask-demo
```

---

# Troubleshooting Commands

Images

```bash
docker images
```

Containers

```bash
docker ps -a
```

Logs

```bash
docker logs flask-demo
```

Inspect

```bash
docker inspect flask-demo
```

Shell

```bash
docker exec -it flask-demo bash
```

---

# Best Practices

- Use lightweight Python images
- Pin dependency versions
- Expose only required ports
- Keep images small
- Test health endpoints
- Verify containers before deployment

---

# Expected Result

You should successfully

- Containerize a Flask application
- Build a Python Docker image
- Run the application inside a container
- Verify application health
- Prepare for containerizing the Enterprise DevOps Platform backend services

