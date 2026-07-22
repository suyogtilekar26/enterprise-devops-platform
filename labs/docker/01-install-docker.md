# Lab 01 - Install Docker for Enterprise DevOps Platform

# Objective

Install Docker Engine and verify that it is working correctly.

This lab prepares the workstation that will later build, package, and run all services of the Enterprise DevOps Platform.

---

# Enterprise Scenario

The DevOps team has received the application from the development team.

Before containerizing the application, Docker must be installed on every build server, CI runner, and DevOps workstation.

The Docker environment will later be used for

- Frontend
- API Gateway
- Auth Service
- Dashboard Service

---

# Lab Architecture

```
Developer Machine

        │

Install Docker

        │

Docker Engine

        │

Verify Installation

        │

Ready for Containerization
```

---

# Prerequisites

- Ubuntu 22.04
- Internet Connection
- Sudo Access

---

# Step 1

Update packages.

```bash
sudo apt update
```

---

# Step 2

Install prerequisite packages.

```bash
sudo apt install \
ca-certificates \
curl \
gnupg \
lsb-release -y
```

---

# Step 3

Create Docker keyring directory.

```bash
sudo install -m 0755 -d /etc/apt/keyrings
```

---

# Step 4

Download Docker GPG key.

```bash
curl -fsSL https://download.docker.com/linux/ubuntu/gpg \
| sudo gpg --dearmor \
-o /etc/apt/keyrings/docker.gpg
```

---

# Step 5

Set permissions.

```bash
sudo chmod a+r /etc/apt/keyrings/docker.gpg
```

---

# Step 6

Add Docker repository.

```bash
echo \
"deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
$(. /etc/os-release && echo "$VERSION_CODENAME") stable" \
| sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
```

---

# Step 7

Update repositories.

```bash
sudo apt update
```

---

# Step 8

Install Docker.

```bash
sudo apt install docker-ce \
docker-ce-cli \
containerd.io \
docker-buildx-plugin \
docker-compose-plugin -y
```

---

# Step 9

Verify Docker service.

```bash
sudo systemctl status docker
```

Expected

```
active (running)
```

---

# Step 10

Enable Docker.

```bash
sudo systemctl enable docker
```

---

# Step 11

Verify Docker version.

```bash
docker --version
```

---

# Step 12

Verify Docker Engine.

```bash
docker version
```

---

# Step 13

Run test container.

```bash
sudo docker run hello-world
```

Expected

```
Hello from Docker!
```

---

# Step 14

Add current user to Docker group.

```bash
sudo usermod -aG docker $USER
```

Log out and log back in.

---

# Step 15

Verify non-root Docker access.

```bash
docker run hello-world
```

---

# Validation Checklist

Verify

- Docker installed
- Docker service running
- Docker enabled
- Docker version displayed
- Hello World container executed
- Docker usable without sudo

---

# Common Errors

## Permission Denied

```
permission denied while trying to connect
```

Solution

```bash
sudo usermod -aG docker $USER
```

---

## Docker Service Not Running

```bash
sudo systemctl start docker
```

---

## Repository Error

```bash
sudo apt update
```

Verify Docker repository configuration.

---

# Troubleshooting Commands

Docker Version

```bash
docker version
```

Docker Info

```bash
docker info
```

Docker Service

```bash
systemctl status docker
```

Docker Processes

```bash
ps -ef | grep docker
```

---

# Enterprise Usage

In this project Docker will later be used to

- Build Frontend image
- Build API Gateway image
- Build Auth Service image
- Build Dashboard Service image
- Push images to GitHub Container Registry
- Deploy containers into Kubernetes

---

# Best Practices

- Install Docker from the official repository
- Enable Docker service
- Avoid running containers as root where possible
- Keep Docker updated
- Verify installation after upgrades

---

# Expected Result

You should successfully

- Install Docker Engine
- Configure Docker service
- Verify Docker installation
- Run your first Docker container
- Prepare the system for future containerization labs

