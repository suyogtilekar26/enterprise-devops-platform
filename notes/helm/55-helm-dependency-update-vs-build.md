# Helm Notes 55 - Helm Dependency Update vs Helm Dependency Build

# Enterprise DevOps Platform

---

# 1. Purpose

The purpose of this document is to understand the difference between **helm dependency update** and **helm dependency build**, how they work internally and when enterprise DevOps teams should use each command.

This is not a beginner tutorial.

This topic is frequently asked in Helm and Kubernetes interviews for experienced DevOps Engineers.

---

# 2. Introduction

Most engineers know

```bash
helm dependency update
```

Very few understand

```bash
helm dependency build
```

During interviews,

one common question is

```
What is the difference between

helm dependency update

and

helm dependency build?
```

This document explains the answer in detail.

---

# 3. Why Two Commands Exist

Imagine

```
Developer Laptop

↓

Internet Available

↓

Download Dependencies
```

Later

```
CI/CD Pipeline

↓

No Internet

↓

Already Have Chart.lock
```

Should Helm

```
Download Latest Versions?

OR

Use Existing Locked Versions?
```

Helm provides two different commands.

---

# 4. Enterprise Problem Statement

Our Enterprise DevOps Platform

```
Parent Chart

↓

Redis

↓

PostgreSQL

↓

RabbitMQ

↓

Prometheus

↓

Grafana
```

Developers

```
Need Latest Charts
```

CI/CD

```
Needs Reproducible Builds
```

Different environments require different commands.

---

# 5. helm dependency update

Command

```bash
helm dependency update
```

What it does

```
Read Chart.yaml

↓

Connect Repository

↓

Download Latest Matching Versions

↓

Update Chart.lock

↓

Store Charts

↓

charts/
```

If newer versions satisfy the version constraint,

Helm downloads them.

---

# 6. helm dependency build

Command

```bash
helm dependency build
```

What it does

```
Read Chart.lock

↓

Download Exact Locked Versions

↓

Create charts/

↓

Do NOT Modify Chart.lock
```

This guarantees reproducible deployments.

---

# 7. Internal Workflow

### Update

```
Chart.yaml

↓

Repository

↓

Resolve Versions

↓

Download

↓

Update Chart.lock
```

---

### Build

```
Chart.lock

↓

Download Exact Versions

↓

charts/

↓

No Version Resolution
```

---

# 8. Comparison

| Feature | update | build |
|----------|--------|-------|
| Reads Chart.yaml | ✅ | ❌ |
| Reads Chart.lock | ✅ | ✅ |
| Downloads latest matching version | ✅ | ❌ |
| Uses locked version | ❌ | ✅ |
| Updates Chart.lock | ✅ | ❌ |
| CI/CD Friendly | ⚠️ | ✅ |
| Developer Friendly | ✅ | ⚠️ |

---

# 9. Enterprise Workflow

### Developer Machine

```
Update Dependency

↓

helm dependency update

↓

Commit Chart.lock

↓

Git Push
```

---

### CI/CD

```
Checkout Repository

↓

Chart.lock Available

↓

helm dependency build

↓

Deploy
```

Every deployment uses identical dependency versions.

---

# 10. Enterprise Use Cases

Use **update**

- Development
- Adding New Dependencies
- Updating Versions
- Testing New Releases

Use **build**

- CI/CD
- Production
- Air-Gapped Clusters
- Release Pipelines
- Disaster Recovery

---

# 11. Production Scenario

A DevOps Engineer updated

```
Redis Version

↓

Chart.yaml
```

He executed

```bash
helm dependency update
```

A new

```
Chart.lock
```

was generated.

He committed both

```
Chart.yaml

Chart.lock
```

GitHub Actions later executed

```bash
helm dependency build
```

Production downloaded the exact tested Redis version.

No unexpected upgrades occurred.

---

# 12. Interview Questions

## Q1. What is the difference between update and build?

### Answer

`helm dependency update` resolves dependency versions using `Chart.yaml`, downloads them and updates `Chart.lock`.

`helm dependency build` uses the existing `Chart.lock` to download the exact dependency versions without modifying it.

---

## Q2. Which command should be used in CI/CD?

### Answer

```bash
helm dependency build
```

because it guarantees reproducible deployments.

---

## Q3. Which command updates Chart.lock?

### Answer

```bash
helm dependency update
```

---

## Q4. Which command is safer for production?

### Answer

`helm dependency build`

because it installs only the tested dependency versions recorded in `Chart.lock`.

---

## Q5. Why should Chart.lock be committed to Git?

### Answer

To ensure every developer and every pipeline deploys identical dependency versions.

---

# 13. Commands

Update Dependencies

```bash
helm dependency update
```

Build Dependencies

```bash
helm dependency build
```

Verify Charts

```bash
ls charts/
```

View Lock File

```bash
cat Chart.lock
```

Install

```bash
helm install platform .
```

Upgrade

```bash
helm upgrade platform .
```

---

# 14. Best Practices

- Use `helm dependency update` during development.
- Commit `Chart.lock` after updates.
- Use `helm dependency build` in CI/CD.
- Never ignore changes in `Chart.lock`.
- Test dependency upgrades before production.
- Pin dependency versions.
- Use trusted chart repositories.

---

# 15. Common Mistakes

- Running `helm dependency update` in production pipelines.
- Not committing `Chart.lock`.
- Assuming update and build are identical.
- Using floating dependency versions.
- Deleting the `charts/` directory without rebuilding.
- Ignoring dependency version drift.

---

# 16. Marathi Quick Revision

- `helm dependency update` नवीन matching dependency download करतो.
- `helm dependency build` `Chart.lock` मधील exact version वापरतो.
- Update `Chart.lock` बदलतो.
- Build `Chart.lock` बदलत नाही.
- Development मध्ये update.
- CI/CD मध्ये build.

---

# 17. Marathi Summary (5+ Experience Revision)

## Simple Explanation

`helm dependency update` हा development साठी वापरला जातो. तो `Chart.yaml` वाचून नवीन matching dependency versions डाउनलोड करतो आणि `Chart.lock` update करतो.

`helm dependency build` हा production आणि CI/CD साठी वापरला जातो. तो `Chart.lock` मधील exact dependency versions डाउनलोड करतो आणि version बदलत नाही.

### Project Usage

आपल्या Enterprise DevOps Platform मध्ये developers नवीन dependency किंवा version बदलल्यावर `helm dependency update` चालवतील आणि `Chart.lock` Git मध्ये commit करतील. GitHub Actions pipeline मात्र नेहमी `helm dependency build` वापरेल जेणेकरून Dev, QA आणि Production मध्ये एकाच dependency versions deploy होतील.

### Production Best Practice

Development मध्ये `update`, Production मध्ये `build` हा golden rule आहे. `Chart.lock` source control मध्ये ठेवावा आणि प्रत्येक release साठी version consistency maintain करावी.

### Production Story

एका enterprise मध्ये CI/CD pipeline `helm dependency update` वापरत होती. एका chart repository मध्ये नवीन Redis version release झाल्यावर production मध्ये अनपेक्षित upgrade झाले आणि application fail झाली. त्यानंतर pipeline `helm dependency build` वर migrate करण्यात आली. त्यानंतर प्रत्येक deployment deterministic आणि repeatable झाला.

### Investigation Flow

```
Deployment Failed

↓

Check Chart.lock

↓

Compare Chart.yaml

↓

helm dependency build

↓

Verify charts/

↓

Deploy

↓

Validate Application

↓

Close Change
```

### 5+ Years Memory Trick

**Interview Question:**

When would you use `helm dependency update` and when would you use `helm dependency build`?

**Answer:**

"I use `helm dependency update` during development to resolve dependency versions and regenerate `Chart.lock`. After testing, I commit the updated `Chart.lock` to Git. In CI/CD and production, I always use `helm dependency build` because it installs the exact locked dependency versions, ensuring deterministic and reproducible deployments across all environments."

