# Helm Notes 32 - Helm Files Object (.Files)

# Enterprise DevOps Platform

---

# 1. Purpose

The purpose of this document is to understand the **.Files** object in Helm and how it is used to access files packaged inside a Helm Chart.

This is not a beginner tutorial.

This document explains how enterprise Helm Charts use the **.Files** object to manage configuration files, scripts and certificates without hardcoding them into templates.

---

# 2. Introduction

Until now, we have learned that Helm templates mainly use

```
values.yaml
```

for configuration.

However,

sometimes applications require additional files such as

- application.properties
- nginx.conf
- config.json
- shell scripts
- SQL scripts
- TLS certificates

Instead of writing these files inside templates,

Helm allows them to be packaged inside the chart and accessed using

```
.Files
```

---

# 3. Why .Files Exists

Suppose an application requires

```
application.properties
```

with

```
200

configuration entries.
```

Writing all these entries manually inside

```
ConfigMap.yaml
```

is difficult.

Instead,

developers simply keep the file inside the chart.

Helm reads it using

```
.Files
```

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

Applications require

- Nginx Configuration
- Java Properties
- Python Configuration
- SQL Scripts
- Startup Scripts

These files must be packaged with the chart and deployed automatically.

---

# 5. What is .Files?

```
.Files
```

is a built-in Helm object.

It provides access to files stored inside the Helm Chart.

Example chart

```
frontend-chart/

templates/

values.yaml

files/

    application.properties

    nginx.conf

    startup.sh
```

Templates can read these files during rendering.

---

# 6. Basic Example

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

Helm reads the file and inserts its contents into the ConfigMap.

---

# 7. Reading Multiple Files

Example

```yaml
{{ range $path, $_ := .Files.Glob "files/*" }}

{{ $path }}

{{ end }}
```

Output

```
files/application.properties

files/nginx.conf

files/startup.sh
```

This is useful for packaging multiple configuration files.

---

# 8. Common .Files Functions

Frequently used functions

```
.Files.Get

.Files.Glob

.Files.AsConfig

.Files.AsSecrets
```

These simplify ConfigMap and Secret generation.

---

# 9. Enterprise Workflow

Developer

↓

Add File

↓

files/

↓

.Files.Get

↓

Template Rendering

↓

ConfigMap / Secret

↓

Deploy

↓

Application Reads File

---

# 10. Enterprise Use Cases

.Files is commonly used for

- application.properties
- nginx.conf
- Apache Configuration
- SQL Scripts
- Startup Scripts
- JSON Configuration
- YAML Configuration
- Certificates

Almost every enterprise Helm Chart uses .Files.

---

# 11. Production Scenario

A banking application required

```
application.properties
```

containing more than

```
300
```

configuration entries.

Initially,

the entire configuration was written manually inside ConfigMap.yaml.

Maintenance became extremely difficult.

The engineering team moved the file into

```
files/
```

and loaded it using

```yaml
.Files.Get
```

The ConfigMap became much smaller and easier to maintain.

---

# 12. Interview Questions

## Q1. What is the .Files object in Helm?

### Answer

`.Files` is a built-in Helm object used to access files packaged inside a Helm Chart during template rendering.

---

## Q2. Why do enterprises use .Files?

### Answer

To package configuration files, scripts and certificates with the Helm Chart instead of embedding them directly into templates.

---

## Q3. Can .Files access files outside the Helm Chart?

### Answer

No.

It can only access files that are packaged within the Helm Chart.

---

## Q4. Which functions are commonly used with .Files?

### Answer

`.Files.Get`, `.Files.Glob`, `.Files.AsConfig` and `.Files.AsSecrets`.

---

# 13. Commands

Package Chart

```bash
helm package frontend-chart
```

Render Templates

```bash
helm template frontend ./frontend-chart
```

Validate Chart

```bash
helm lint frontend-chart
```

Install Chart

```bash
helm install frontend ./frontend-chart
```

---

# 14. Best Practices

- Store configuration files inside the `files/` directory.
- Use `.Files.Get` for large configuration files.
- Keep templates clean and reusable.
- Package only required files.
- Validate rendered ConfigMaps.
- Separate configuration from templates.
- Version configuration files with the chart.

---

# 15. Common Mistakes

- Trying to read files outside the chart.
- Hardcoding large configuration into templates.
- Forgetting to package required files.
- Storing secrets in plain text.
- Incorrect file paths.
- Ignoring rendered output.

---

# 16. Marathi Quick Revision

- `.Files` chart मधील files access करतो.
- `files/` folder मधील files वाचतो.
- ConfigMap तयार करण्यासाठी खूप वापरतात.
- Scripts आणि configuration store करू शकतो.
- Chart बाहेरील files access करता येत नाहीत.
- Enterprise मध्ये common feature आहे.

---

# 17. Marathi Summary (5+ Experience Revision)

## Simple Explanation

`.Files` हा Helm चा built-in object आहे जो Helm Chart मधील files वाचण्यासाठी वापरला जातो. मोठे configuration files, scripts आणि certificates templates मध्ये manually लिहिण्याऐवजी `files/` folder मध्ये ठेवून `.Files.Get` ने वापरले जातात.

### Project Usage

आपल्या Enterprise DevOps Platform मध्ये `application.properties`, `nginx.conf`, `startup.sh`, `config.json` आणि monitoring configuration हे सर्व `files/` directory मध्ये ठेवले जातील. Deployment दरम्यान ConfigMap किंवा Secret मध्ये `.Files.Get` वापरून ते inject केले जातील.

### Production Best Practice

मोठे configuration templates मध्ये लिहू नयेत. `files/` directory वापरून configuration वेगळे ठेवावे. Sensitive data साठी Secrets वापरावेत आणि plain text credentials chart मध्ये ठेवू नयेत.

### Production Story

एका enterprise मध्ये Java application चे `application.properties` ConfigMap template मध्ये manually maintain केले जात होते. File मध्ये 300+ properties होत्या. Engineering team ने तो file `files/` folder मध्ये हलवला आणि `.Files.Get` वापरून ConfigMap generate केला. Templates खूप छोटे झाले आणि configuration management सोपे झाले.

### Investigation Flow

```
Need Configuration File

↓

Store in files/

↓

Use .Files.Get

↓

Render Template

↓

Generate ConfigMap

↓

Deploy

↓

Application Reads Configuration
```

### 5+ Years Memory Trick

**Interview Question:**

Why is the `.Files` object important in enterprise Helm Charts?

**Answer:**

"The `.Files` object allows Helm Charts to package and access configuration files, scripts and certificates during template rendering. It keeps templates clean, separates configuration from logic and simplifies management of large configuration files in enterprise Kubernetes deployments."

