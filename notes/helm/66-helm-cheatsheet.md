# Helm Notes 66 - Helm Cheat Sheet (Interview + Production)

# Enterprise DevOps Platform

---

# 1. Helm Workflow

```
Create Chart
      ↓
Edit values.yaml
      ↓
helm lint
      ↓
helm template
      ↓
helm install
      ↓
helm status
      ↓
helm upgrade
      ↓
helm history
      ↓
helm rollback
      ↓
helm uninstall
```

---

# 2. Chart Structure

```
my-chart/

├── Chart.yaml
├── values.yaml
├── Chart.lock
├── charts/
└── templates/
```

---

# 3. Important Files

| File | Purpose |
|------|---------|
| Chart.yaml | Chart Metadata |
| values.yaml | Configuration |
| templates/ | Kubernetes Templates |
| charts/ | Dependencies |
| Chart.lock | Locked Dependency Versions |

---

# 4. Most Used Commands

## Create Chart

```bash
helm create myapp
```

---

## Install

```bash
helm install frontend .
```

---

## Upgrade

```bash
helm upgrade frontend .
```

---

## Upgrade Using Values

```bash
helm upgrade frontend . \
-f values-prod.yaml
```

---

## Rollback

```bash
helm rollback frontend 3
```

---

## Uninstall

```bash
helm uninstall frontend
```

---

## List Releases

```bash
helm list
```

All Namespaces

```bash
helm list -A
```

---

## Status

```bash
helm status frontend
```

---

## History

```bash
helm history frontend
```

---

## Get Values

```bash
helm get values frontend
```

---

## Get Manifest

```bash
helm get manifest frontend
```

---

## Validate Chart

```bash
helm lint .
```

---

## Render YAML

```bash
helm template .
```

---

## Dry Run

```bash
helm install frontend . \
--dry-run \
--debug
```

---

# 5. Dependency Commands

```bash
helm dependency update

helm dependency build

helm dependency list
```

---

# 6. Repository Commands

```bash
helm repo add

helm repo list

helm repo update

helm search repo
```

---

# 7. Package Commands

```bash
helm package .

helm pull

helm show chart

helm show values
```

---

# 8. Production Upgrade

```bash
helm upgrade frontend . \
-f values-prod.yaml \
--atomic \
--wait
```

Recommended Production Command.

---

# 9. Debugging Commands

```bash
helm status

helm history

helm get values

helm get manifest

helm template

helm lint
```

Then

```bash
kubectl get pods

kubectl describe pod

kubectl logs

kubectl get events
```

---

# 10. Most Common Errors

| Error | Investigation |
|---------|---------------|
| YAML Error | helm lint |
| Template Error | helm template |
| ImagePullBackOff | kubectl describe |
| CrashLoopBackOff | kubectl logs |
| Pending Upgrade | helm history |
| Timeout | kubectl get pods |
| Secret Error | kubectl describe |
| Namespace Missing | kubectl get ns |

---

# 11. Golden Troubleshooting Flow

```
Pipeline Failed

↓

helm status

↓

helm history

↓

helm get values

↓

helm template

↓

helm lint

↓

kubectl describe

↓

kubectl logs

↓

Events

↓

Root Cause

↓

Fix

↓

Upgrade/Rollback
```

---

# 12. Top Interview Questions

✔ What is Helm?

✔ Why Helm?

✔ Chart Structure

✔ values.yaml

✔ Release

✔ Upgrade

✔ Rollback

✔ History

✔ Hooks

✔ OCI Registry

✔ Dependency

✔ helm lint

✔ helm template

✔ Debugging

✔ Troubleshooting

✔ Production Incidents

✔ Best Practices

---

# 13. Best Practices

✅ Use immutable image tags

✅ Use separate values files

✅ Validate using helm lint

✅ Run helm template before deployment

✅ Use --dry-run

✅ Use --atomic

✅ Use --wait

✅ Store charts in OCI Registry

✅ Keep release history

✅ Use GitOps

✅ Never edit Helm-managed resources manually

---

# 14. Commands Every DevOps Engineer Must Remember

```bash
helm create

helm install

helm upgrade

helm rollback

helm uninstall

helm list

helm status

helm history

helm get values

helm get manifest

helm lint

helm template

helm dependency update

helm package

helm repo add
```

---

# 15. Interview Formula (⭐⭐⭐⭐⭐)

Whenever the interviewer asks a production question, answer in this sequence:

```
Problem

↓

Investigation

↓

Root Cause

↓

Solution

↓

Prevention / RCA
```

This is the expected response structure for Senior DevOps Engineers.

---

# 16. Marathi Quick Revision

- Helm = Kubernetes Package Manager
- Chart = Application Package
- Release = Installed Chart
- values.yaml = Configuration
- helm lint = Validation
- helm template = Render YAML
- helm status = Release Status
- helm history = Revision History
- helm rollback = Recovery
- OCI = Enterprise Chart Registry
- --atomic = Auto Rollback
- --wait = Wait Until Ready

---

# 17. 5+ Years Final Revision

## 10 Commands to Remember

```bash
helm list -A
helm status
helm history
helm get values
helm get manifest
helm lint
helm template
helm install
helm upgrade
helm rollback
```

## 5 Interview Keywords

```
Chart

Release

Values

Rollback

OCI
```

## 5 Production Keywords

```
Validation

Troubleshooting

Rollback

GitOps

RCA
```

## Final Interview Statement

> "In production, I validate every Helm chart using `helm lint`, `helm template`, and `--dry-run` before deployment. I deploy using `helm upgrade --atomic --wait`, maintain versioned charts and immutable image tags, store charts in an OCI registry, manage secrets externally, and use `helm history` with `helm rollback` for fast recovery. During incidents, I follow a structured troubleshooting process using Helm status, Kubernetes logs, events, and Root Cause Analysis."

