# Docker Installation

## Purpose

This document explains how to install Docker for enterprise development and DevOps environments.

Docker installation is the first practical step before building, testing, and deploying containerized applications.

For our Enterprise DevOps Platform, Docker will be installed on the development machine and later used to build images for

- React Frontend
- API Gateway
- Auth Service
- Dashboard Service

These images will later be deployed using Docker Compose, Kubernetes, Helm, Argo CD, and AWS.

---

# Introduction

Docker consists of multiple components working together.

Installing Docker provides

- Docker Engine
- Docker CLI
- Docker Build
- Docker Networking
- Docker Volume Management

On Linux, Docker runs as a background service called the Docker Daemon.

---

# Installation Architecture

```text
Developer

↓

Docker CLI

↓

Docker Daemon

↓

Container Runtime

↓

Linux Kernel
```

The CLI communicates with the Docker Daemon, which manages containers and images.

---

# Supported Operating Systems

Docker officially supports

- Ubuntu
- Debian
- Fedora
- CentOS Stream
- RHEL
- Amazon Linux
- Windows
- macOS

Enterprise Linux distributions are most commonly used for production servers.

---

# Verify Existing Installation

Before installing Docker, check whether it is already installed.

```bash
docker --version
```

If Docker is installed, output will look similar to

```text
Docker version 28.x.x
```

---

# Install Docker on Ubuntu

Update package index

```bash
sudo apt update
```

Install required packages

```bash
sudo apt install -y \
ca-certificates \
curl \
gnupg
```

Create Docker keyring directory

```bash
sudo install -m 0755 -d /etc/apt/keyrings
```

Download Docker GPG key

```bash
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | \
sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
```

Set permissions

```bash
sudo chmod a+r /etc/apt/keyrings/docker.gpg
```

Add Docker repository

```bash
echo \
"deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] \
https://download.docker.com/linux/ubuntu \
$(. /etc/os-release && echo "$VERSION_CODENAME") stable" | \
sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
```

Update package list

```bash
sudo apt update
```

Install Docker

```bash
sudo apt install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
```

---

# Start Docker

Start Docker service

```bash
sudo systemctl start docker
```

Enable Docker on boot

```bash
sudo systemctl enable docker
```

Verify service

```bash
sudo systemctl status docker
```

---

# Verify Docker Installation

Check version

```bash
docker --version
```

System information

```bash
docker info
```

Verify daemon

```bash
sudo systemctl status docker
```

---

# Test Docker

Run the official hello-world container

```bash
sudo docker run hello-world
```

Expected result

Docker downloads the image and prints a success message confirming that

- Docker Engine works
- Networking works
- Container execution works

---

# Run Docker Without sudo

By default,

Docker requires root privileges.

Add your user to the Docker group

```bash
sudo usermod -aG docker $USER
```

Apply new group membership

```bash
newgrp docker
```

Verify

```bash
docker run hello-world
```

No sudo should be required.

---

# Docker Service Management

Start Docker

```bash
sudo systemctl start docker
```

Stop Docker

```bash
sudo systemctl stop docker
```

Restart Docker

```bash
sudo systemctl restart docker
```

Check status

```bash
sudo systemctl status docker
```

Enable on boot

```bash
sudo systemctl enable docker
```

Disable on boot

```bash
sudo systemctl disable docker
```

---

# Docker Installation in Our Project

Development Machine

↓

Docker Installed

↓

Build Images

↓

Run Local Containers

↓

Docker Compose

↓

Kind Kubernetes

↓

Helm

↓

Argo CD

↓

Future AWS EKS

Docker installation is required before any containerization work begins.

---

# Daily DevOps Activities

DevOps Engineers regularly

- Verify Docker service
- Upgrade Docker versions
- Restart Docker daemon
- Monitor Docker health
- Validate Docker installation
- Troubleshoot daemon issues

---

# Production Best Practices

- Install Docker from official repositories.
- Keep Docker updated.
- Enable Docker service on boot.
- Avoid running containers as root.
- Regularly update Docker Engine.
- Remove unused packages.
- Monitor Docker daemon health.

---

# Security Considerations

- Use official Docker repositories.
- Restrict Docker group membership.
- Keep Docker updated.
- Enable firewall rules.
- Use least privilege.
- Regularly patch the operating system.

Docker installation is part of the production security baseline.

---

# Troubleshooting

Docker command not found

Verify installation

```bash
docker --version
```

Docker daemon not running

```bash
sudo systemctl status docker
```

Start daemon

```bash
sudo systemctl start docker
```

Permission denied

```bash
sudo usermod -aG docker $USER
```

Then log out and log back in, or run

```bash
newgrp docker
```

---

# Real Production Scenario

Scenario

A CI/CD pipeline suddenly fails while building Docker images.

Investigation shows

```text
Cannot connect to the Docker daemon
```

Root Cause

Docker service stopped after a system reboot.

Resolution

```bash
sudo systemctl start docker
sudo systemctl enable docker
```

Pipeline succeeds after Docker becomes available.

---

# Scenario-Based Interview Questions

## Question 1

How do you verify Docker installation?

Answer

Use

```bash
docker --version
```

and

```bash
docker info
```

---

## Question 2

Why does Docker sometimes require sudo?

Answer

Docker communicates with the Docker daemon through a privileged socket. Users must either use sudo or belong to the Docker group.

---

## Question 3

How do you allow a user to run Docker without sudo?

Answer

Add the user to the Docker group using

```bash
sudo usermod -aG docker $USER
```

---

# Architecture-Level Interview Questions

## Question

What is the Docker daemon?

Answer

The Docker daemon is the background service responsible for building images, managing containers, networks, volumes, and communicating with the Docker CLI.

---

## Question

Why should Docker be installed from the official repository?

Answer

Official repositories provide current, supported, and security-patched versions of Docker.

---

## Question

Why is Docker Engine required before Kubernetes?

Answer

Docker (or another container runtime) builds and runs containers. Kubernetes orchestrates those containers but does not create application images itself.

---

# Production Support Questions

Q.

Docker commands suddenly stop working.

What do you investigate first?

Answer

Verify

- Docker daemon status
- Docker installation
- User permissions
- System resources

---

Q.

A developer receives

```text
permission denied while trying to connect to the Docker daemon
```

What is the likely cause?

Answer

The user is not a member of the Docker group or the Docker daemon is not running.

---

# Related Runbooks

Future runbooks

- Install Docker
- Upgrade Docker Engine
- Restart Docker Service
- Troubleshoot Docker Daemon
- Verify Docker Installation

---

# Common Incidents

- Docker daemon stopped
- Docker command not found
- Permission denied
- Docker service disabled
- Failed installation
- Repository configuration issues
- Package dependency failures

---

# Commands

Check version

```bash
docker --version
```

System information

```bash
docker info
```

Run test container

```bash
docker run hello-world
```

Start service

```bash
sudo systemctl start docker
```

Enable service

```bash
sudo systemctl enable docker
```

Service status

```bash
sudo systemctl status docker
```

---

# Key Takeaways

Docker installation is the foundation for containerized application development.

A successful installation provides

- Docker Engine
- Docker CLI
- Container Runtime
- Image Build Capability
- Networking
- Volume Management

For our Enterprise DevOps Platform, Docker installation is the first implementation step before building application images and deploying them to Kubernetes.

---

# Marathi Quick Revision

Docker install केल्यानंतर verify करा

```bash
docker --version
docker info
docker run hello-world
```

Docker service

```bash
systemctl start docker
systemctl enable docker
```

Docker group मध्ये user add केल्यावर sudo शिवाय Docker वापरता येतो.

---

# Marathi Interview Memory Tip

Interview मध्ये जर विचारलं:

"Docker install झालंय की नाही कसं verify कराल?"

असं सांगा:

"`docker --version` आणि `docker info` वापरून installation verify करतो. त्यानंतर `docker run hello-world` चालवून Docker daemon, image download आणि container execution सर्व व्यवस्थित कार्यरत आहेत का ते तपासतो."

