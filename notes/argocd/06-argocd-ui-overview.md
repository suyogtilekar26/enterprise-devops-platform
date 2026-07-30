# ArgoCD UI Overview

# Enterprise DevOps Platform
---

# Purpose

This document explains the ArgoCD Web UI from beginner to enterprise level.

The ArgoCD UI is the primary interface used by DevOps Engineers, SREs, Platform Engineers, and Production Support teams to monitor, deploy, troubleshoot, and manage Kubernetes applications.

---

# Introduction

ArgoCD provides a web-based dashboard for managing GitOps deployments.

Instead of running CLI commands, engineers can

- View applications
- Monitor health
- Trigger synchronization
- Perform rollbacks
- Compare Git and Cluster state
- View deployment history
- Manage repositories
- Configure projects

The UI gives a real-time view of the Kubernetes deployment status.

---

# Accessing the UI

Example

```
https://argocd.company.com
```

or locally

```
https://localhost:8080
```

Login using

```
Username

admin

Password

********
```

or through Enterprise SSO.

---

# Dashboard Overview

After login, the dashboard displays

```
Applications

Repositories

Projects

Clusters

Settings

User Information
```

---

# Dashboard Layout

```
+------------------------------------------------+

        ArgoCD Dashboard

+------------------------------------------------+

Applications

Projects

Repositories

Settings

Help

User

+------------------------------------------------+

Application Cards

Frontend

Gateway

Auth

Dashboard

+------------------------------------------------+
```

---

# Applications Page

The Applications page displays every deployed application.

Example

```
Frontend

Healthy

Synced

-------------------

API Gateway

Healthy

Synced

-------------------

Auth Service

Healthy

OutOfSync

-------------------

Dashboard

Progressing

Synced
```

Each application displays

- Name
- Health Status
- Sync Status
- Repository
- Target Revision
- Namespace

---

# Application Details

Clicking an application opens

```
Overview

Resources

Events

History

Manifest

Parameters

Logs
```

This page is used during troubleshooting.

---

# Resource Tree

The UI displays the Kubernetes resource hierarchy.

Example

```
Application

│

├── Deployment

│

├── ReplicaSet

│

├── Pods

│

├── Service

│

├── ConfigMap

│

└── Secret
```

This visualization helps identify unhealthy resources quickly.

---

# Sync Status

Possible synchronization states

```
Synced

OutOfSync

Unknown
```

Meaning

Synced

```
Cluster matches Git.
```

OutOfSync

```
Cluster differs from Git.
```

Unknown

```
ArgoCD cannot determine the state.
```

---

# Health Status

Possible health states

```
Healthy

Progressing

Degraded

Missing

Suspended

Unknown
```

Example

Healthy

```
Deployment successful.
```

Progressing

```
Resources still deploying.
```

Degraded

```
Application has problems.
```

---

# Synchronization Button

The UI provides a

```
SYNC
```

button.

Clicking Sync

```
Git

↓

Manifest Generated

↓

Cluster Updated
```

If Auto Sync is disabled, manual synchronization is performed using this button.

---

# Refresh Button

Refresh forces ArgoCD to

- Re-read Git
- Refresh cluster state
- Compare resources again

Useful after external updates.

---

# History Tab

Displays deployment history.

Example

```
Revision 15

Successful

----------------

Revision 14

Rollback

----------------

Revision 13

Successful
```

This helps identify deployment timelines.

---

# Manifest Tab

Shows the generated Kubernetes manifests that ArgoCD applies.

Useful for

- Helm debugging
- Kustomize debugging
- Resource verification

---

# Diff View

One of the most useful UI features.

Shows

```
Git

↓

Current Cluster

↓

Difference
```

Engineers can quickly identify configuration drift.

---

# Repository Page

Displays configured Git repositories.

Example

```
GitHub

Connected

-------------------

GitLab

Connected

-------------------

Bitbucket

Connected
```

---

# Projects Page

Projects organize applications.

Example

```
Development

Staging

Production
```

Projects provide

- RBAC
- Repository restrictions
- Cluster restrictions

---

# Cluster Page

Displays registered Kubernetes clusters.

Example

```
Production

Healthy

------------------

Staging

Healthy

------------------

Development

Healthy
```

---

# Settings

Settings allow administrators to configure

- Accounts
- RBAC
- Repositories
- Clusters
- Authentication
- Certificates

---

# Enterprise Example

Our Enterprise DevOps Platform

```
Frontend

Healthy

Synced

--------------------

API Gateway

Healthy

Synced

--------------------

Auth Service

Healthy

Synced

--------------------

Dashboard

Healthy

Synced
```

Production engineers continuously monitor this dashboard.

---

# Common UI Indicators

Green

```
Healthy
```

Yellow

```
Progressing
```

Red

```
Degraded
```

Blue

```
Synced
```

Orange

```
OutOfSync
```

---

# Best Practices

- Monitor dashboard regularly.
- Investigate Degraded applications immediately.
- Review deployment history before rollback.
- Use Diff View before Sync.
- Protect Production projects with RBAC.
- Use SSO instead of local accounts.
- Regularly verify repository connectivity.

---

# Interview Questions

## Q1. What information is available on the ArgoCD dashboard?

### Answer

The dashboard displays applications, synchronization status, health status, repositories, projects, clusters, deployment history, and resource relationships.

---

## Q2. What does the Diff View show?

### Answer

The Diff View compares the desired state stored in Git with the actual state running in the Kubernetes cluster and highlights differences.

---

## Q3. What is the purpose of the History tab?

### Answer

The History tab shows previous deployments, revisions, rollbacks, and deployment outcomes, helping engineers troubleshoot and audit application changes.

---

# Marathi Quick Revision

- Dashboard वर Applications दिसतात.
- Health आणि Sync Status तपासा.
- Diff View Drift दाखवते.
- History मध्ये Deployments दिसतात.
- Manifest Tab Generated YAML दाखवतो.
- Projects आणि Repositories Manage करा.
- Production Dashboard सतत Monitor करा.

---

# Marathi Summary (5+ Experience Revision)

ArgoCD Web UI हे GitOps deployments चे मुख्य monitoring आणि management interface आहे. यात Applications, Health Status, Sync Status, Resource Tree, Deployment History, Manifest View, Diff View, Projects, Repositories आणि Clusters यांची माहिती मिळते. Production Support Engineers UI चा वापर करून OutOfSync applications, degraded resources, deployment failures आणि configuration drift पटकन ओळखू शकतात. Enterprise environments मध्ये RBAC, SSO आणि नियमित dashboard monitoring या सर्वोत्तम पद्धती मानल्या जातात.

