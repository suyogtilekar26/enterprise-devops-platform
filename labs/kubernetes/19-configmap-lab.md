# Lab 19 - ConfigMap

# 1. Objective

The objective of this lab is to understand how Kubernetes ConfigMaps separate application configuration from container images.

By the end of this lab you will be able to

- Create ConfigMaps
- Use ConfigMaps as Environment Variables
- Mount ConfigMaps as Volumes
- Verify configuration updates
- Troubleshoot ConfigMap issues
- Understand enterprise configuration management
- Apply ConfigMaps in production applications

ConfigMaps allow applications to consume configuration without rebuilding container images.

---

# 2. Prerequisites

Complete

- Lab 01 - Lab 18

Verify

```bash
kubectl get nodes

kubectl get pods

kubectl get configmap
```

---

# 3. Enterprise Usage

Instead of storing configuration inside Docker images

```
Application

↓

ConfigMap

↓

Runtime Configuration
```

Typical configurations

- API URLs
- Log Levels
- Feature Flags
- Time Zones
- Environment Names
- Application Settings

Benefits

- No Image Rebuild
- Centralized Configuration
- Environment Specific Configuration
- Easy Updates

---

# 4. Usage in THIS Project

Future project configuration

```
Frontend

↓

API_URL

↓

ConfigMap
```

```
API Gateway

↓

AUTH_SERVICE_URL

↓

ConfigMap
```

```
Dashboard

↓

LOG_LEVEL

↓

ConfigMap
```

Secrets such as passwords and JWT keys will **not** be stored in ConfigMaps.

---

# 5. Architecture

```
ConfigMap

↓

Pod

↓

Environment Variables

or

Mounted Files

↓

Application
```

---

# 6. Step-by-Step Implementation

## Step 1

Create ConfigMap

```bash
cat > configmap.yaml <<EOF
apiVersion: v1
kind: ConfigMap
metadata:
  name: app-config
data:
  APP_NAME: Enterprise DevOps Platform
  ENVIRONMENT: development
  LOG_LEVEL: INFO
