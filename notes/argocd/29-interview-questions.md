# ArgoCD Interview Questions

# Enterprise DevOps Platform

---

# Purpose

This document contains the most frequently asked ArgoCD interview questions for DevOps Engineers, Kubernetes Engineers, SREs and Platform Engineers.

The questions range from beginner to senior level and cover concepts, production scenarios and troubleshooting.

---

# Beginner Level

## Q1. What is GitOps?

### Answer

GitOps is an operational model where Git is the Single Source of Truth. Infrastructure and application deployments are managed through Git repositories instead of manual changes.

---

## Q2. What is ArgoCD?

### Answer

ArgoCD is a GitOps Continuous Delivery tool for Kubernetes that continuously synchronizes Kubernetes clusters with the desired state stored in Git.

---

## Q3. Why is ArgoCD used?

### Answer

- Automated Deployments
- GitOps
- Drift Detection
- Rollback
- Self Healing
- Kubernetes Native
- Better Auditability

---

## Q4. Difference between CI and CD?

### Answer

CI

- Build
- Test
- Package

CD

- Deploy
- Monitor
- Rollback

---

## Q5. What is an ArgoCD Application?

### Answer

An Application is the main resource in ArgoCD that defines

- Source Repository
- Target Cluster
- Namespace
- Deployment Path

---

## Q6. What is Sync?

### Answer

Sync means applying the desired Git configuration to the Kubernetes cluster.

---

## Q7. Difference between Manual Sync and Automatic Sync?

### Answer

Manual Sync

Deployment starts manually.

Automatic Sync

Deployment starts automatically after Git changes.

---

## Q8. What is Self Healing?

### Answer

Self Healing automatically restores Kubernetes resources to match the desired state in Git whenever configuration drift occurs.

---

## Q9. What is Pruning?

### Answer

Pruning removes Kubernetes resources that no longer exist in Git.

---

## Q10. What is Configuration Drift?

### Answer

Configuration Drift occurs when the Kubernetes cluster differs from the desired configuration stored in Git.

---

# Intermediate Level

## Q11. Difference between Sync Status and Health Status?

### Answer

Sync Status

Git vs Cluster

Health Status

Application Runtime Status

---

## Q12. What does OutOfSync mean?

### Answer

Git and Kubernetes resources are different.

---

## Q13. What does Degraded mean?

### Answer

Application deployment completed but the application is unhealthy.

---

## Q14. What is an ArgoCD Project?

### Answer

Projects logically group applications and provide RBAC, repository and cluster restrictions.

---

## Q15. What is Resource Tracking?

### Answer

Resource Tracking allows ArgoCD to identify which Kubernetes resources belong to an application.

---

## Q16. What are Sync Windows?

### Answer

Sync Windows control when deployments are allowed or denied.

---

## Q17. What are Resource Hooks?

### Answer

Hooks execute Kubernetes Jobs before, during or after deployments.

Examples

- Database Migration
- Smoke Testing
- Notifications

---

## Q18. What are Sync Waves?

### Answer

Sync Waves define the deployment order of Kubernetes resources.

---

## Q19. What is ApplicationSet?

### Answer

ApplicationSet automatically generates multiple ArgoCD Applications using templates and generators.

---

## Q20. Difference between App of Apps and ApplicationSet?

### Answer

App of Apps

Manages Applications.

ApplicationSet

Creates Applications automatically.

---

# Senior Level

## Q21. How do you manage multiple Kubernetes clusters?

### Answer

Using Multi-Cluster Management together with ApplicationSet Cluster Generator.

---

## Q22. How do you secure ArgoCD?

### Answer

- RBAC
- SSO
- Branch Protection
- Projects
- Least Privilege
- Secrets Management

---

## Q23. Why should developers avoid kubectl apply in Production?

### Answer

Manual changes create configuration drift and bypass the GitOps workflow.

---

## Q24. How do you rollback a deployment?

### Answer

```bash
argocd app history <app-name>

argocd app rollback <app-name> <history-id>
```

---

## Q25. What is the biggest advantage of GitOps?

### Answer

Git becomes the single source of truth, providing auditability, automation, rollback capability and consistent deployments.

---

# Scenario Questions

## Q26.

Application is

```
OutOfSync
```

What will you do?

### Answer

- Check Git changes.
- Check manual kubectl changes.
- Compare desired and actual state.
- Synchronize the application.
- Investigate drift.

---

## Q27.

Application is

```
Synced

Degraded
```

What will you check?

### Answer

- Pods
- Events
- Logs
- Deployment
- Readiness Probe
- Liveness Probe
- Database Connectivity

---

## Q28.

Production deployment failed.

What will you do?

### Answer

- Stop deployment.
- Check application health.
- Review logs.
- Rollback if required.
- Notify stakeholders.
- Perform RCA.

---

## Q29.

Git repository authentication fails.

What will you verify?

### Answer

- SSH Key
- Personal Access Token
- Repository URL
- Network
- Repository Credentials

---

## Q30.

A developer manually changed Production using kubectl.

What happens?

### Answer

ArgoCD detects configuration drift.

If Self Healing is enabled,

ArgoCD restores the Git version automatically.

---

# Frequently Asked Commands

Application

```bash
argocd app get <app>
```

History

```bash
argocd app history <app>
```

Sync

```bash
argocd app sync <app>
```

Rollback

```bash
argocd app rollback <app> <id>
```

Repositories

```bash
argocd repo list
```

Clusters

```bash
argocd cluster list
```

Pods

```bash
kubectl get pods
```

Logs

```bash
kubectl logs <pod>
```

Events

```bash
kubectl get events
```

---

# Top 10 Interview Topics

1. GitOps
2. ArgoCD Architecture
3. Sync vs Health
4. Automatic Sync
5. Self Healing
6. Pruning
7. ApplicationSet
8. App of Apps
9. RBAC
10. Rollback & Troubleshooting

---

# Marathi Quick Revision

- GitOps म्हणजे Git Source of Truth.
- ArgoCD = Kubernetes GitOps CD Tool.
- OutOfSync = Drift.
- Degraded = Application Problem.
- Self Healing = Drift Fix.
- Pruning = Old Resources Delete.
- ApplicationSet आणि App of Apps Interview Favorite.

---

# Marathi Summary (5+ Experience Revision)

Interview मध्ये ArgoCD साठी सर्वाधिक विचारले जाणारे विषय म्हणजे GitOps, Architecture, Sync, Health, Self Healing, Pruning, ApplicationSet, App of Apps, RBAC, Rollback आणि Troubleshooting. Scenario-based प्रश्नांमध्ये Production deployment failure, OutOfSync, Degraded application, manual kubectl changes आणि rollback strategy यांवर भर असतो. या प्रश्नांची तयारी केल्यास ArgoCD interview चा मोठा भाग सहज हाताळता येतो.

