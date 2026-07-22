# Helm Notes 36 - Helm ConfigMap Patterns

# Enterprise DevOps Platform

---

# 1. Purpose

The purpose of this document is to understand the different ConfigMap patterns used in enterprise Helm Charts.

This is not a beginner tutorial.

This document explains how production teams manage application configuration using ConfigMaps in scalable Kubernetes environments.

---

# 2. Introduction

Almost every Kubernetes application requires configuration.

Examples

- Database URL
- API Endpoint
- Feature Flags
- Logging Configuration
- Application Properties
- Environment Variables

Instead of hardcoding these values inside container images,

Helm creates Kubernetes ConfigMaps.

---

# 3. Why ConfigMap Patterns Exist

Consider an enterprise application deployed in

```
Development

↓

QA

↓

UAT

↓

Production
```

Each environment has different

- Database URL
- API Endpoint
- Logging Level
- Cache Configuration

The application image remains the same.

Only the ConfigMap changes.

---

# 4. Enterprise Problem Statement

Our Enterprise DevOps Platform contains

```
Frontend

↓

Backend

↓

Redis

↓

RabbitMQ

↓

PostgreSQL
```

Every service requires

- Environment Variables
- Configuration Files
- Feature Flags
- URLs
- Logging Configuration

These configurations should be managed independently from the application image.

---

# 5. ConfigMap Pattern 1 - Key-Value Configuration

values.yaml

```yaml
config:

  LOG_LEVEL: INFO

  APP_MODE: production

  API_TIMEOUT: "30"
```

Template

```yaml
apiVersion: v1

kind: ConfigMap

metadata:

  name: frontend-config

data:

{{- range $key, $value := .Values.config }}

  {{ $key }}: "{{ $value }}"

{{- end }}
```

This is the simplest and most common pattern.

---

# 6. ConfigMap Pattern 2 - Complete Configuration File

Directory

```
files/

    application.properties
```

Template

```yaml
data:

  application.properties: |

{{ .Files.Get "files/application.properties" | indent 4 }}
```

Used for Java, Spring Boot and many enterprise applications.

---

# 7. ConfigMap Pattern 3 - Multiple Configuration Files

Directory

```
files/

    app.properties

    nginx.conf

    logging.xml
```

Template

```yaml
data:

{{ (.Files.Glob "files/*").AsConfig | indent 2 }}
```

Every file becomes a ConfigMap entry automatically.

---

# 8. ConfigMap Pattern 4 - Dynamic Values

Template

```yaml
data:

  APP_NAME: "{{ .Release.Name }}"

  NAMESPACE: "{{ .Release.Namespace }}"

  VERSION: "{{ .Chart.Version }}"
```

Configuration changes automatically for every release.

---

# 9. Enterprise Workflow

Developer

↓

Update values.yaml

↓

Helm Template

↓

Generate ConfigMap

↓

Deploy

↓

Pod Starts

↓

Application Reads Configuration

---

# 10. Enterprise Use Cases

ConfigMaps commonly store

- Java Properties
- Nginx Configuration
- Application YAML
- Feature Flags
- API URLs
- Logging Configuration
- Environment Variables
- JSON Configuration

Every enterprise Kubernetes platform uses ConfigMaps.

---

# 11. Production Scenario

A retail company managed

```
80

microservices.
```

Initially,

configuration values were hardcoded inside Docker images.

Every configuration change required

- Image Build
- Docker Push
- Helm Upgrade

The platform team migrated all runtime configuration into ConfigMaps.

Now,

only ConfigMaps change.

Application images remain unchanged.

Deployment time reduced significantly.

---

# 12. Interview Questions

## Q1. Why should application configuration be stored in ConfigMaps instead of Docker images?

### Answer

Configuration changes frequently, whereas Docker images should remain immutable. ConfigMaps separate configuration from application code, enabling environment-specific deployments without rebuilding images.

---

## Q2. Which ConfigMap pattern is most common?

### Answer

Key-value configuration using values.yaml is the most common pattern. Large applications also use external configuration files loaded through `.Files.Get` or `.Files.AsConfig`.

---

## Q3. Can ConfigMaps store sensitive data?

### Answer

No.

Sensitive data such as passwords, API keys and certificates should be stored in Kubernetes Secrets or an external Secret Manager.

---

## Q4. How are ConfigMaps commonly mounted?

### Answer

As environment variables or mounted files inside Pods.

---

# 13. Commands

Render Templates

```bash
helm template frontend ./frontend-chart
```

Install Chart

```bash
helm install frontend ./frontend-chart
```

Upgrade Chart

```bash
helm upgrade frontend ./frontend-chart
```

Validate Chart

```bash
helm lint frontend-chart
```

---

# 14. Best Practices

- Keep configuration outside Docker images.
- Store only non-sensitive data in ConfigMaps.
- Version configuration using Git.
- Keep ConfigMaps environment-specific.
- Use `.Files.AsConfig` for multiple files.
- Use values.yaml for simple configuration.
- Validate rendered ConfigMaps.

---

# 15. Common Mistakes

- Storing passwords inside ConfigMaps.
- Hardcoding configuration inside Docker images.
- Mixing Secrets and ConfigMaps.
- Duplicating configuration across environments.
- Creating very large ConfigMaps unnecessarily.
- Not version-controlling configuration.

---

# 16. Marathi Quick Revision

- ConfigMap मध्ये application configuration ठेवतात.
- Password ConfigMap मध्ये ठेवू नये.
- Environment-specific configuration ConfigMap मध्ये ठेवतात.
- Docker image immutable ठेवतात.
- `.Files.AsConfig` multiple files साठी वापरतात.
- Enterprise मध्ये प्रत्येक application ConfigMap वापरतो.

---

# 17. Marathi Summary (5+ Experience Revision)

## Simple Explanation

ConfigMap हा Kubernetes resource आहे जो application configuration code पासून वेगळा ठेवतो. त्यामुळे image rebuild न करता configuration बदलता येते.

### Project Usage

आपल्या Enterprise DevOps Platform मध्ये Frontend, Backend, Redis आणि Monitoring applications साठी ConfigMaps वापरले जातील. API URLs, logging level, feature flags, Java properties आणि Nginx configuration ConfigMaps मधून उपलब्ध होतील.

### Production Best Practice

Configuration आणि application image वेगळे ठेवावेत. ConfigMap मध्ये फक्त non-sensitive data ठेवावा. Secrets नेहमी Kubernetes Secret किंवा External Secret Manager मध्ये ठेवावेत.

### Production Story

एका retail enterprise मध्ये प्रत्येक configuration बदलासाठी Docker image rebuild करावा लागत होता. Platform team ने सर्व runtime configuration ConfigMaps मध्ये migrate केली. आता configuration बदलण्यासाठी image rebuild लागत नाही, फक्त Helm upgrade पुरेसा असतो.

### Investigation Flow

```
Configuration Change

↓

Update values.yaml

↓

Generate ConfigMap

↓

Helm Upgrade

↓

Pod Restart

↓

Application Reads New Configuration

↓

Validate
```

### 5+ Years Memory Trick

**Interview Question:**

Why do enterprise Kubernetes platforms store configuration in ConfigMaps instead of Docker images?

**Answer:**

"Enterprise platforms follow the immutable infrastructure principle. Docker images remain unchanged across environments, while ConfigMaps provide environment-specific runtime configuration. This reduces image rebuilds, improves deployment speed and simplifies configuration management."

