# Incident ID

INC-002

# Incident Title

Self-hosted GitHub Actions Runner Went Offline During Deployment

---

# Severity

SEV-2

---

# Status

Resolved

---

# Date

2026-01-21

---

# Reported By

GitHub Actions Monitoring

---

# Environment

Development Kubernetes Cluster (Kind)

---

# Services Impacted

- GitHub Actions
- Self-hosted Runner
- Kubernetes Deployment Pipeline

---

# Business Impact

CI workflows running on GitHub-hosted runners completed successfully, but deployment jobs assigned to the Self-hosted Runner remained queued.

Application updates could not be deployed to the Kubernetes cluster.

---

# Detection

GitHub Actions displayed

```
Waiting for a runner to pick up this job...
```

Repository Settings also showed the Self-hosted Runner status as

```
Offline
```

---

# Timeline

## 14:05

Developer merged changes into the main branch.

---

## 14:06

Build and Docker jobs completed successfully.

---

## 14:08

Deployment job entered queued state.

---

## 14:10

DevOps engineer began investigation.

---

## 14:15

Runner status confirmed Offline.

---

## 14:20

Connected to Runner host.

---

## 14:24

Runner process found stopped.

---

## 14:27

Runner restarted.

---

## 14:30

Runner reported Online.

---

## 14:32

Queued deployment resumed automatically.

---

## 14:36

Deployment completed successfully.

---

# Symptoms

- Deployment job queued indefinitely
- No deployment started
- Runner Offline
- Kubernetes cluster unchanged
- Build pipeline partially completed

---

# Investigation

Verified Runner status in GitHub.

Repository

```
Settings

↓

Actions

↓

Runners
```

Status

```
Offline
```

Logged into Runner host.

Verified Runner process.

```bash
ps -ef | grep run.sh
```

No active Runner process was found.

Verified network connectivity.

```bash
ping github.com
```

Successful.

Verified available disk space.

```bash
df -h
```

Normal.

---

# Root Cause

The Self-hosted Runner process had terminated unexpectedly after a server reboot.

The Runner service had not been configured to automatically restart after boot.

---

# Resolution

Started the Runner manually.

```bash
cd ~/actions-runner

./run.sh
```

Confirmed GitHub displayed

```
Online
```

Deployment job automatically resumed.

---

# Verification

Confirmed

- Runner Online
- Deployment job started
- Kubernetes deployment completed
- Pods running
- Health verification successful

Verified cluster.

```bash
kubectl get pods

kubectl get deployments

kubectl get svc
```

---

# Recovery Time

31 Minutes

---

# Preventive Actions

- Configure Runner as a system service
- Enable automatic restart after reboot
- Monitor Runner availability
- Create alert for Offline status
- Test Runner availability after maintenance

---

# Lessons Learned

- Deployment pipelines depend on Runner availability.
- Manual Runner processes are unsuitable for long-term production use.
- Automated monitoring reduces deployment delays.
- Runner health should be part of daily operational checks.

---

# Related Runbooks

- runner-offline.md
- deployment-failure.md
- workflow-failure.md

