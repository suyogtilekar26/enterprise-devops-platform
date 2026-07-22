# Lab 08 - Building a React Application Docker Image

# Objective

Learn how to containerize a React application using a multi-stage Docker build.

This lab prepares us for containerizing the Frontend service of the Enterprise DevOps Platform.

By the end of this lab you will be able to

- Build a React application
- Use multi-stage Docker builds
- Serve static files using Nginx
- Build optimized production images
- Verify the running frontend container

---

# Enterprise Scenario

The Enterprise DevOps Platform contains a React + Vite frontend.

Instead of running the development server in production, DevOps packages the application into an optimized Docker image served by Nginx.

Application

```
Frontend

↓

React + Vite

↓

Docker Image

↓

Nginx

↓

Kubernetes
```

---

# Architecture

```
React Source

      │

npm install

      │

npm run build

      │

dist/

      │

Docker Multi-stage Build

      │

Nginx Image

      │

Docker Container
```

---

# Prerequisites

- Docker Installed
- Node.js Installed

Verify

```bash
docker version

node --version

npm --version
```

---

# Step 1

Create project.

```bash
npm create vite@latest react-docker-demo -- --template react
```

---

# Step 2

Move into project.

```bash
cd react-docker-demo
```

---

# Step 3

Install dependencies.

```bash
npm install
```

---

# Step 4

Verify application.

```bash
npm run dev
```

Stop the application.

```
Ctrl + C
```

---

# Step 5

Create Dockerfile.

```bash
nano Dockerfile
```

---

# Step 6

Add the following Dockerfile.

```dockerfile
FROM node:22-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM nginx:alpine

COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx","-g","daemon off;"]
```

Save the file.

---

# Step 7

Build image.

```bash
docker build -t react-demo:v1 .
```

---

# Step 8

Verify image.

```bash
docker images
```

---

# Step 9

Run container.

```bash
docker run -d \
--name react-demo \
-p 8080:80 \
react-demo:v1
```

---

# Step 10

Verify container.

```bash
docker ps
```

---

# Step 11

Open application.

```
http://localhost:8080
```

The default Vite React application should load.

---

# Step 12

Inspect container.

```bash
docker inspect react-demo
```

---

# Step 13

View logs.

```bash
docker logs react-demo
```

---

# Step 14

Stop container.

```bash
docker stop react-demo
```

---

# Step 15

Remove container.

```bash
docker rm react-demo
```

---

# Multi-stage Build

Stage 1

```
Node.js

↓

Install Dependencies

↓

Build React

↓

dist/
```

Stage 2

```
Nginx

↓

Copy dist/

↓

Serve Static Files
```

---

# Enterprise Usage

Later in this project

```
Frontend Source

↓

npm install

↓

npm run build

↓

Docker Multi-stage Build

↓

GitHub Container Registry

↓

Kind Kubernetes

↓

Frontend Pod
```

---

# Validation Checklist

Verify

- React application created
- Dependencies installed
- Docker image built
- Multi-stage build successful
- Container running
- Frontend accessible
- Logs available

---

# Common Errors

## npm Install Failed

Verify

```bash
package.json
```

exists.

---

## Build Failed

Run locally.

```bash
npm run build
```

---

## Port Already In Use

Use another port.

```bash
-p 8081:80
```

---

## Container Exited

Inspect logs.

```bash
docker logs react-demo
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
docker logs react-demo
```

Inspect

```bash
docker inspect react-demo
```

Shell

```bash
docker exec -it react-demo sh
```

---

# Best Practices

- Use multi-stage builds
- Use lightweight runtime images
- Build production assets before packaging
- Keep runtime images minimal
- Serve static files using Nginx
- Remove unnecessary build dependencies

---

# Expected Result

You should successfully

- Containerize a React application
- Build a multi-stage Docker image
- Serve the application with Nginx
- Verify the frontend container
- Prepare for containerizing the Enterprise DevOps Platform frontend

