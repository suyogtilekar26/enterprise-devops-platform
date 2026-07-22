# Helm Notes 34 - Helm .Files.Glob Function

# Enterprise DevOps Platform

---

# 1. Purpose

The purpose of this document is to understand the **.Files.Glob** function in Helm and how it retrieves multiple files from a Helm Chart using wildcard patterns.

This is not a beginner tutorial.

This document explains why enterprise Helm Charts use **.Files.Glob** to package and deploy multiple configuration files efficiently.

---

# 2. Introduction

In the previous topic, we learned

```
.Files.Get
```

which reads

```
One File
```

But what if a chart contains

```
50 Configuration Files?

100 SQL Scripts?

20 Shell Scripts?
```

Reading each file individually becomes difficult.

Helm solves this using

```
.Files.Glob
```

---

# 3. Why .Files.Glob Exists

Suppose a Java application requires

```
application.properties

logback.xml

cache.properties

security.properties

database.properties
```

Instead of reading each file separately,

Helm can retrieve all matching files using a wildcard.

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

Applications require multiple files

```
files/

    nginx.conf

    app.properties

    startup.sh

    config.json

    logging.xml
```

Enterprise teams need an automated way to process all files.

---

# 5. What is .Files.Glob?

```
.Files.Glob
```

returns all files matching a pattern.

Syntax

```yaml
{{ .Files.Glob "files/*" }}
```

Wildcard Examples

```
*

*.conf

*.properties

*.json

scripts/*
```

---

# 6. Basic Example

Chart Structure

```
files/

    app.properties

    nginx.conf

    startup.sh
```

Template

```yaml
{{ range $path, $_ := .Files.Glob "files/*" }}

{{ $path }}

{{ end }}
```

Output

```
files/app.properties

files/nginx.conf

files/startup.sh
```

---

# 7. Example - Load Multiple Config Files

```yaml
{{- range $path, $file := .Files.Glob "files/*.properties" }}

{{ $path }}

{{ end }}
```

Output

```
files/app.properties

files/database.properties

files/security.properties
```

Only

```
.properties
```

files are selected.

---

# 8. Example - ConfigMap Generation

```yaml
{{- range $path, $_ := .Files.Glob "files/*" }}

{{ base $path }}: |

{{ $.Files.Get $path | indent 4 }}

{{- end }}
```

Helm creates entries for every file automatically.

---

# 9. Enterprise Workflow

Developer

↓

Add Files

↓

files/

↓

.Files.Glob

↓

Loop

↓

Read Files

↓

Generate ConfigMap

↓

Deploy

---

# 10. Enterprise Use Cases

.Files.Glob is commonly used for

- Java Properties
- SQL Scripts
- JSON Files
- YAML Files
- XML Configuration
- Startup Scripts
- Nginx Configuration
- Multiple ConfigMaps

Enterprise charts commonly process dozens of files automatically.

---

# 11. Production Scenario

A banking application contained

```
65

configuration files.
```

Initially,

developers manually referenced each file using

```
.Files.Get
```

The ConfigMap template became very large.

After migrating to

```
.Files.Glob
```

the chart automatically loaded every configuration file.

Adding a new configuration file required

only placing it inside

```
files/
```

No template changes were required.

---

# 12. Interview Questions

## Q1. What is .Files.Glob?

### Answer

`.Files.Glob` retrieves all files matching a specified wildcard pattern from the Helm Chart.

---

## Q2. Why do enterprises use .Files.Glob?

### Answer

To process multiple configuration files automatically instead of referencing each file individually.

---

## Q3. Can .Files.Glob retrieve files outside the chart?

### Answer

No.

It can only access files packaged inside the Helm Chart.

---

## Q4. What wildcard patterns are commonly used?

### Answer

Examples include:

- `files/*`
- `files/*.properties`
- `files/*.json`
- `scripts/*`

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

- Organize files by directory.
- Use wildcard patterns carefully.
- Keep configuration files version-controlled.
- Use `.Files.Glob` for bulk processing.
- Validate rendered ConfigMaps.
- Store secrets separately.
- Keep templates generic.

---

# 15. Common Mistakes

- Using incorrect wildcard patterns.
- Expecting files outside the chart.
- Hardcoding every file manually.
- Mixing configuration and secrets.
- Ignoring file naming conventions.
- Forgetting to validate rendered manifests.

---

# 16. Marathi Quick Revision

- `.Files.Glob` अनेक files एकाच वेळी शोधतो.
- Wildcard pattern वापरतो.
- `files/*` सर्व files देतो.
- `files/*.properties` फक्त properties files देतो.
- Enterprise मध्ये bulk configuration साठी वापरतात.
- ConfigMap automation साठी खूप उपयोगी आहे.

---

# 17. Marathi Summary (5+ Experience Revision)

## Simple Explanation

`.Files.Glob` हा Helm function wildcard वापरून chart मधील अनेक files एकाच वेळी शोधतो. त्यामुळे प्रत्येक file manually reference करण्याची गरज राहत नाही.

### Project Usage

आपल्या Enterprise DevOps Platform मध्ये `application.properties`, `nginx.conf`, `startup.sh`, `config.json`, `logging.xml` यांसारखे अनेक configuration files `files/` directory मध्ये ठेवले जातील. `.Files.Glob` वापरून हे सर्व files loop मध्ये process करून ConfigMap तयार केला जाईल.

### Production Best Practice

Configuration files योग्य directories मध्ये organize करावेत. Wildcard patterns (`*.properties`, `*.json`) वापरून automation करावी. Sensitive files Secrets मध्ये ठेवाव्यात.

### Production Story

एका enterprise मध्ये 65 configuration files ConfigMap मध्ये manually add केले जात होते. प्रत्येक नवीन file साठी template बदलावा लागत होता. Engineering team ने `.Files.Glob` वापरला. आता नवीन file फक्त `files/` directory मध्ये ठेवला की Helm deployment दरम्यान तो आपोआप ConfigMap मध्ये समाविष्ट होतो.

### Investigation Flow

```
Need Multiple Files

↓

Store in files/

↓

Apply .Files.Glob

↓

Match Wildcard

↓

Loop Through Files

↓

Generate ConfigMap

↓

Deploy

↓

Validate
```

### 5+ Years Memory Trick

**Interview Question:**

Why is `.Files.Glob` important in enterprise Helm Charts?

**Answer:**

"`.Files.Glob` allows Helm Charts to retrieve multiple files using wildcard patterns. It simplifies bulk configuration management, reduces template duplication and enables scalable automation for enterprise Kubernetes deployments."

