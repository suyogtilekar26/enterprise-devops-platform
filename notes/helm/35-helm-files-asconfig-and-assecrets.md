# Helm Notes 35 - Helm .Files.AsConfig & .Files.AsSecrets

# Enterprise DevOps Platform

---

# 1. Purpose

The purpose of this document is to understand the **.Files.AsConfig** and **.Files.AsSecrets** functions in Helm and how they automatically generate Kubernetes ConfigMaps and Secrets from multiple files.

This is not a beginner tutorial.

This document explains why enterprise Helm Charts use these functions to simplify configuration management and secret handling.

---

# 2. Introduction

Previously we learned

```
.Files.Get

↓

Reads One File

.Files.Glob

↓

Reads Multiple Files
```

Suppose a chart contains

```
files/

    app.properties

    nginx.conf

    logging.xml

    startup.sh
```

Instead of manually writing

```
.Files.Get
```

for every file,

Helm provides

```
.Files.AsConfig
```

Likewise,

for Secret creation,

Helm provides

```
.Files.AsSecrets
```

---

# 3. Why AsConfig and AsSecrets Exist

Imagine a production application containing

```
120

configuration files
```

Writing

```yaml
app.properties:

{{ .Files.Get ... }}

nginx.conf:

{{ .Files.Get ... }}

logging.xml:

{{ .Files.Get ... }}
```

is repetitive.

Helm automatically converts all files into ConfigMap entries.

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

Monitoring
```

Each microservice requires

- Configuration Files
- Startup Scripts
- JSON Files
- Certificates
- Application Properties

Enterprise deployments need an automated solution.

---

# 5. What is .Files.AsConfig?

```
.Files.AsConfig
```

converts multiple files into

```
ConfigMap Data
```

Syntax

```yaml
{{ (.Files.Glob "files/*").AsConfig }}
```

Every matched file automatically becomes

```
Key

↓

Value
```

inside the ConfigMap.

---

# 6. Basic Example

Directory

```
files/

    app.properties

    nginx.conf
```

Template

```yaml
apiVersion: v1

kind: ConfigMap

data:

{{ (.Files.Glob "files/*").AsConfig | indent 2 }}
```

Rendered Output

```yaml
data:

  app.properties: |

    ...

  nginx.conf: |

    ...
```

No manual `.Files.Get` calls are required.

---

# 7. What is .Files.AsSecrets?

```
.Files.AsSecrets
```

converts multiple files into

```
Secret Data
```

Files are automatically Base64 encoded because Kubernetes Secrets require encoded values.

Syntax

```yaml
{{ (.Files.Glob "secrets/*").AsSecrets }}
```

---

# 8. Basic Secret Example

Directory

```
secrets/

    tls.crt

    tls.key
```

Template

```yaml
apiVersion: v1

kind: Secret

type: kubernetes.io/tls

data:

{{ (.Files.Glob "secrets/*").AsSecrets | indent 2 }}
```

Rendered Output

```yaml
data:

  tls.crt:

    LS0tLS1CRUdJTi...

  tls.key:

    LS0tLS1CRUdJTi...
```

Helm automatically Base64 encodes the files.

---

# 9. Enterprise Workflow

Developer

↓

Add Files

↓

.Files.Glob

↓

AsConfig / AsSecrets

↓

Generate ConfigMap / Secret

↓

Deploy

↓

Application Reads Configuration

---

# 10. Enterprise Use Cases

AsConfig

- Java Properties
- Nginx Configuration
- JSON Files
- YAML Files
- XML Files
- Startup Scripts

AsSecrets

- TLS Certificates
- Private Keys
- License Files
- Authentication Certificates
- PEM Files

---

# 11. Production Scenario

A banking platform maintained

```
85

configuration files

+

12

TLS certificates.
```

Initially,

every ConfigMap and Secret manually referenced files using

```
.Files.Get
```

The templates became extremely large.

The engineering team migrated to

```
.Files.AsConfig

.Files.AsSecrets
```

The templates reduced from hundreds of lines to just a few lines.

Configuration management became standardized across all environments.

---

# 12. Interview Questions

## Q1. What is .Files.AsConfig?

### Answer

`.Files.AsConfig` converts multiple files into ConfigMap data automatically without requiring individual `.Files.Get` calls.

---

## Q2. What is .Files.AsSecrets?

### Answer

`.Files.AsSecrets` converts multiple files into Kubernetes Secret data and automatically Base64 encodes the file contents.

---

## Q3. Why do enterprises use these functions?

### Answer

To simplify ConfigMap and Secret generation, reduce template duplication and automate configuration management.

---

## Q4. What is the difference between AsConfig and AsSecrets?

### Answer

`AsConfig` generates ConfigMap entries using plain text, while `AsSecrets` generates Secret entries using Base64 encoded data.

---

# 13. Commands

Render Templates

```bash
helm template frontend ./frontend-chart
```

Validate Chart

```bash
helm lint frontend-chart
```

Package Chart

```bash
helm package frontend-chart
```

Install Chart

```bash
helm install frontend ./frontend-chart
```

---

# 14. Best Practices

- Store configuration and secrets separately.
- Use `AsConfig` for non-sensitive files.
- Use `AsSecrets` for sensitive files.
- Validate rendered ConfigMaps.
- Do not store production passwords in Git.
- Keep directories organized.
- Test rendered manifests before deployment.

---

# 15. Common Mistakes

- Using ConfigMap for secrets.
- Storing private keys in `files/`.
- Forgetting Kubernetes Secrets require Base64 encoding.
- Mixing configuration and certificates.
- Incorrect wildcard paths.
- Ignoring rendered output.

---

# 16. Marathi Quick Revision

- `.Files.AsConfig` अनेक files ConfigMap मध्ये convert करतो.
- `.Files.AsSecrets` अनेक files Secret मध्ये convert करतो.
- Secrets साठी Base64 encoding आपोआप होते.
- `.Files.Get` पेक्षा automation जास्त आहे.
- Enterprise मध्ये bulk configuration साठी common आहे.
- Config आणि Secret वेगळे ठेवणे Best Practice आहे.

---

# 17. Marathi Summary (5+ Experience Revision)

## Simple Explanation

`.Files.AsConfig` अनेक configuration files आपोआप ConfigMap मध्ये convert करतो. `.Files.AsSecrets` अनेक secret files Kubernetes Secret मध्ये Base64 encoding करून convert करतो. त्यामुळे प्रत्येक file manually add करावा लागत नाही.

### Project Usage

आपल्या Enterprise DevOps Platform मध्ये `application.properties`, `nginx.conf`, `config.json`, `startup.sh` यांसारखे files `AsConfig` वापरून ConfigMap मध्ये तयार केले जातील. `tls.crt`, `tls.key`, `license.pem` यांसारखे sensitive files `AsSecrets` वापरून Secret मध्ये तयार केले जातील.

### Production Best Practice

Configuration आणि Secrets वेगळ्या directories मध्ये ठेवावेत. `AsConfig` फक्त non-sensitive files साठी वापरावा. Sensitive files साठी `AsSecrets` किंवा External Secret Manager वापरणे अधिक सुरक्षित आहे.

### Production Story

एका enterprise मध्ये प्रत्येक ConfigMap आणि Secret manually maintain केला जात होता. 100+ configuration files आणि certificates असल्यामुळे templates खूप मोठे झाले होते. Engineering team ने `.Files.AsConfig` आणि `.Files.AsSecrets` वापरले. Templates खूप छोटे झाले, automation वाढले आणि configuration management standardized झाले.

### Investigation Flow

```
Need Multiple Files

↓

Store Files

↓

.Files.Glob

↓

AsConfig / AsSecrets

↓

Generate ConfigMap / Secret

↓

Deploy

↓

Validate
```

### 5+ Years Memory Trick

**Interview Question:**

Why are `.Files.AsConfig` and `.Files.AsSecrets` important in enterprise Helm Charts?

**Answer:**

"`.Files.AsConfig` and `.Files.AsSecrets` automate the creation of ConfigMaps and Secrets from multiple files. They reduce template duplication, simplify configuration management and provide a scalable approach for handling application configuration and sensitive data in enterprise Kubernetes deployments."

