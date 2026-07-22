# ArgoCD Top 100 Interview Questions

# Enterprise DevOps Platform

---

# Purpose

This document contains the most frequently asked ArgoCD interview questions from real DevOps, Kubernetes, Platform Engineer and SRE interviews.

Experience Levels

- 2+ Years
- 3+ Years
- 5+ Years
- 8+ Years

---

# Basic Level

## Q1. What is ArgoCD?

ArgoCD is a GitOps Continuous Delivery tool for Kubernetes.

---

## Q2. What is GitOps?

GitOps is an operational model where Git is the single source of truth for infrastructure and application deployment.

---

## Q3. What problem does ArgoCD solve?

It automates Kubernetes deployments, continuously compares Git with the cluster, detects drift and synchronizes changes automatically.

---

## Q4. What is the desired state?

The desired state is the Kubernetes configuration stored in Git.

---

## Q5. What is the live state?

The live state is the actual configuration currently running in the Kubernetes cluster.

---

## Q6. What is Sync?

Applying Git changes to Kubernetes.

---

## Q7. What is OutOfSync?

Git and Kubernetes are different.

---

## Q8. What is Synced?

Git and Kubernetes match exactly.

---

## Q9. What is Health Status?

Health Status indicates whether the deployed application is functioning correctly.

---

## Q10. Difference between Sync and Health?

Sync checks configuration.

Health checks application runtime.

---

# Intermediate Level

## Q11. What is Auto Sync?

Automatically synchronizes changes from Git.

---

## Q12. What is Self Healing?

Automatically restores manual changes made inside Kubernetes.

---

## Q13. What is Drift?

Difference between Git and Cluster.

---

## Q14. Which component detects drift?

argocd-application-controller

---

## Q15. Which component clones Git?

argocd-repo-server

---

## Q16. Which component provides UI?

argocd-server

---

## Q17. Why does ArgoCD use Redis?

Caching and session management.

---

## Q18. What is Dex?

Authentication server for SSO.

---

## Q19. What is Application CR?

Custom Resource representing an ArgoCD deployment.

---

## Q20. What is ApplicationSet?

Automatically creates multiple ArgoCD Applications.

---

# Advanced Level

## Q21. Explain App of Apps.

Parent application manages multiple child applications.

---

## Q22. Explain Sync Waves.

Controls deployment order.

---

## Q23. Explain Hooks.

PreSync, Sync, PostSync and SyncFail Jobs executed during deployment.

---

## Q24. What is Prune?

Deletes resources removed from Git.

---

## Q25. What is Refresh?

Updates ArgoCD's view of the latest Git state.

---

## Q26. Difference between Refresh and Sync?

Refresh compares.

Sync applies.

---

## Q27. What is Progressive Sync?

Controlled rollout across multiple applications or environments.

---

## Q28. What is Sync Window?

Defines when deployments are allowed or denied.

---

## Q29. Can ArgoCD manage Helm?

Yes.

---

## Q30. Can ArgoCD manage Kustomize?

Yes.

---

## Production Questions

## Q31. Application is OutOfSync. What do you do?

Check

- app get
- app diff
- Git
- Kubernetes
- Sync

---

## Q32. Health is Degraded.

Check

- Pods
- Logs
- Events
- Dependencies

---

## Q33. CrashLoopBackOff.

Check

- Previous logs
- ConfigMap
- Secret
- Database

---

## Q34. ImagePullBackOff.

Verify

- Registry
- Image
- Tag
- ImagePullSecret

---

## Q35. Repository Failure.

Check

```bash
argocd repo list
```

---

## Q36. Sync Failed.

Review

- YAML
- Namespace
- CRD
- RBAC

---

## Q37. Auto Sync not working.

Verify

- Auto Sync
- Repo
- Controller
- Sync Window

---

## Q38. Self Healing not working.

Verify

```
selfHeal: true
```

---

## Q39. Rollback failed.

Check

- History
- Revision
- Cluster

---

## Q40. Webhook failed.

Verify

- URL
- Secret
- Ingress
- argocd-server

---

# Commands Asked in Interviews

## Q41.

List applications

```bash
argocd app list
```

---

## Q42.

Application details

```bash
argocd app get frontend
```

---

## Q43.

Synchronization

```bash
argocd app sync frontend
```

---

## Q44.

Rollback

```bash
argocd app rollback frontend 3
```

---

## Q45.

History

```bash
argocd app history frontend
```

---

## Q46.

Diff

```bash
argocd app diff frontend
```

---

## Q47.

Repositories

```bash
argocd repo list
```

---

## Q48.

Cluster

```bash
kubectl cluster-info
```

---

## Q49.

Nodes

```bash
kubectl get nodes
```

---

## Q50.

Pods

```bash
kubectl get pods
```

---

# Architecture Questions

## Q51.

Explain ArgoCD Architecture.

Developer

↓

Git

↓

Repo Server

↓

Application Controller

↓

Kubernetes

↓

Application

---

## Q52.

Why is Git the Source of Truth?

Git provides version control, auditing, rollback and reproducibility.

---

## Q53.

How does reconciliation work?

Application Controller continuously compares Git with the cluster and synchronizes differences.

---

## Q54.

How does rollback work?

Uses deployment history to restore a previous successful revision.

---

## Q55.

Can ArgoCD deploy multiple clusters?

Yes.

---

# Security Questions

## Q56.

How is authentication handled?

Dex, OIDC, LDAP, OAuth or SSO.

---

## Q57.

How is authorization handled?

RBAC.

---

## Q58.

How are Secrets managed?

Kubernetes Secrets, Sealed Secrets, External Secrets or Vault.

---

## Q59.

Why shouldn't production be edited manually?

Manual changes create configuration drift.

---

## Q60.

How do you secure Git credentials?

SSH Keys or Personal Access Tokens stored as Kubernetes Secrets.

---

# Scenario Questions

## Q61.

Production deployment failed.

How do you troubleshoot?

Application

↓

Pods

↓

Logs

↓

Events

↓

Deployment

↓

Service

↓

Ingress

↓

Database

↓

Rollback

---

## Q62.

Node failure.

First command?

```bash
kubectl get nodes
```

---

## Q63.

Cluster unavailable.

First command?

```bash
kubectl cluster-info
```

---

## Q64.

Secret missing.

Result?

CrashLoopBackOff or CreateContainerConfigError.

---

## Q65.

ConfigMap updated manually.

Result?

OutOfSync.

---

# Expert Questions

## Q66.

Explain GitOps advantages.

- Audit
- Rollback
- Security
- Automation
- Reliability

---

## Q67.

Difference between Jenkins and ArgoCD?

Jenkins pushes.

ArgoCD pulls.

---

## Q68.

Can Jenkins and ArgoCD work together?

Yes.

Jenkins builds images.

ArgoCD deploys them.

---

## Q69.

What is High Availability ArgoCD?

Multiple replicas of ArgoCD components for fault tolerance.

---

## Q70.

How do you monitor ArgoCD?

Prometheus

Grafana

Alertmanager

Logs

Metrics

---

# Rapid Fire Questions

71. What is GitOps?

72. What is Drift?

73. What is Sync?

74. What is Self Healing?

75. What is Auto Sync?

76. What is Prune?

77. What is Refresh?

78. What is App of Apps?

79. What is ApplicationSet?

80. What is Sync Wave?

81. What is Hook?

82. What is Repo Server?

83. What is Application Controller?

84. What is Dex?

85. What is Redis?

86. What is Repository Credential?

87. What is RBAC?

88. What is Sync Window?

89. What is Rollback?

90. What is Health Check?

91. What is OutOfSync?

92. What is Degraded?

93. What is Progressive Delivery?

94. What is Blue-Green Deployment?

95. What is Canary Deployment?

96. What is Helm Integration?

97. What is Kustomize Integration?

98. What is Multi Cluster?

99. What is Disaster Recovery?

100. Explain complete ArgoCD architecture.

---

# Marathi Quick Revision

- Git = Source of Truth.
- Repo Server = Git Clone.
- Controller = Drift Detection.
- Server = UI/API.
- Auto Sync = Automatic Deploy.
- Self Healing = Auto Restore.
- Sync = Apply.
- OutOfSync = Git ≠ Cluster.
- Degraded = Runtime Issue.
- ApplicationSet = Multiple Apps.
- App of Apps = Parent Deployment.
- Hooks = Deployment Jobs.
- Sync Waves = Deployment Order.
- RBAC = Authorization.
- Rollback = Previous Revision Restore.

