# Incident 14 - RBAC Permission Denied

# Enterprise DevOps Platform

---

# Incident Summary

ArgoCD failed to synchronize an application because it did not have sufficient Kubernetes RBAC permissions to create, update, or delete resources.

Although the manifests in Git were correct, Kubernetes rejected the operations with **Forbidden** errors.

---

# Severity

```
SEV-1
```

Critical production deployment failure caused by insufficient permissions.

---

# Business Impact

- Production deployment blocked
- Auto Sync failed
- Configuration drift increased
- Release delayed
- Manual intervention required
- SLA risk

---

# Environment

- ArgoCD
- Kubernetes
- RBAC
- Production Cluster
- Git Repository

---

# Symptoms

Application

```bash
argocd app get guestbook
```

Output

```
Sync Failed
```

Controller Logs

```
Forbidden

permission denied
```

Kubernetes Events

```
User cannot create deployment
```

---

# Common Causes

- Missing ClusterRole
- Missing Role
- Missing ClusterRoleBinding
- Missing RoleBinding
- Incorrect ServiceAccount
- Namespace Permission Missing
- New Resource Type Added
- RBAC Policy Removed
- Least Privilege Too Restrictive
- Manual RBAC Changes

---

# Detection

Check Application

```bash
argocd app get guestbook
```

---

Review Controller Logs

```bash
kubectl logs deployment/argocd-application-controller \
-n argocd
```

Look for

```
Forbidden

cannot create

cannot update

permission denied
```

---

# Investigation

## Step 1

Verify Controller Pod

```bash
kubectl get pods \
-n argocd
```

---

## Step 2

Identify ServiceAccount

```bash
kubectl get deployment argocd-application-controller \
-n argocd \
-o yaml
```

Look for

```
serviceAccountName
```

---

## Step 3

Check Permissions

Example

```bash
kubectl auth can-i create deployment \
--as system:serviceaccount:argocd:argocd-application-controller \
-n guestbook
```

Expected

```
yes
```

---

## Step 4

Review ClusterRoleBindings

```bash
kubectl get clusterrolebinding
```

---

## Step 5

Describe ClusterRoleBinding

```bash
kubectl describe clusterrolebinding argocd-application-controller
```

---

## Step 6

Review Controller Logs

```bash
kubectl logs deployment/argocd-application-controller \
-n argocd
```

---

## Step 7

Verify Resource Type

Determine whether a new Kubernetes resource requires additional RBAC permissions.

Example

```
Ingress

CronJob

StatefulSet

Custom Resource
```

---

# Root Cause Analysis

Example

A security team updated Kubernetes RBAC.

The ClusterRole previously granted

```
update

patch

delete
```

permissions.

The updated policy accidentally removed

```
update
```

permission for Deployments.

ArgoCD synchronization failed with

```
Forbidden
```

errors.

---

# Resolution

Update the ClusterRole.

Example

```yaml
rules:
- apiGroups:
  - apps
  resources:
  - deployments
  verbs:
  - get
  - list
  - watch
  - create
  - update
  - patch
  - delete
```

Apply

```bash
kubectl apply \
-f argocd-clusterrole.yaml
```

Restart Controller (if required)

```bash
kubectl rollout restart deployment argocd-application-controller \
-n argocd
```

Synchronize

```bash
argocd app sync guestbook
```

---

# Validation

Verify Permissions

```bash
kubectl auth can-i update deployment \
--as system:serviceaccount:argocd:argocd-application-controller \
-n guestbook
```

Expected

```
yes
```

---

Verify Application

```bash
argocd app get guestbook
```

Expected

```
Healthy

Synced
```

---

Verify Resources

```bash
kubectl get deployment \
-n guestbook
```

Expected

```
Available
```

---

# Commands Used

Application

```bash
argocd app get guestbook
```

Controller Logs

```bash
kubectl logs deployment/argocd-application-controller \
-n argocd
```

Permissions

```bash
kubectl auth can-i create deployment
```

ClusterRole

```bash
kubectl get clusterrole
```

ClusterRoleBinding

```bash
kubectl get clusterrolebinding
```

Describe

```bash
kubectl describe clusterrolebinding argocd-application-controller
```

---

# Timeline Example

```
11:00

RBAC Policy Updated

↓

11:02

ArgoCD Starts Sync

↓

11:03

Kubernetes Returns Forbidden

↓

11:05

Application Sync Failed

↓

11:08

Engineer Reviews Logs

↓

11:12

ClusterRole Updated

↓

11:14

Controller Verified

↓

11:15

Application Sync

↓

11:17

Application Healthy
```

---

# Prevention

- Follow least privilege carefully.
- Test RBAC changes in staging.
- Review ClusterRole updates.
- Monitor permission-denied events.
- Use Infrastructure as Code for RBAC.
- Enable Kubernetes audit logging.

---

# Best Practices

- Version-control all RBAC manifests.
- Avoid manual RBAC modifications.
- Validate permissions after Kubernetes upgrades.
- Test new resource types before production.
- Monitor ArgoCD controller logs continuously.
- Review RBAC regularly with security teams.

---

# Interview Questions

## 1. Why does ArgoCD require Kubernetes RBAC?

To create, update, patch, delete and monitor Kubernetes resources.

---

## 2. Which command verifies Kubernetes permissions?

```bash
kubectl auth can-i
```

---

## 3. Which ServiceAccount typically performs synchronization?

```
argocd-application-controller
```

---

## 4. What does a Forbidden error indicate?

The authenticated identity does not have sufficient Kubernetes RBAC permissions.

---

## 5. How can RBAC Permission Denied incidents be prevented?

- Proper ClusterRoles
- RoleBindings
- Permission validation
- Staging testing
- Infrastructure as Code

---

# Incident Success Criteria

The incident is resolved when:

- Required RBAC permissions are restored.
- Kubernetes accepts synchronization requests.
- Application becomes Healthy.
- Application becomes Synced.
- Controller logs contain no permission errors.
- Root cause is documented.

---

# Marathi Quick Revision

- RBAC Permission Denied म्हणजे ArgoCD कडे Kubernetes Resources बदलण्यासाठी आवश्यक Permission नसते.
- `kubectl auth can-i` हा Permission तपासण्यासाठी सर्वात महत्त्वाचा Command आहे.
- ClusterRole किंवा ClusterRoleBinding चुकीचे असल्यास Sync Fail होतो.
- Production मध्ये RBAC बदल Staging मध्ये Test करूनच लागू करावेत.
- सर्व RBAC Policies Git मध्ये Version Control करून ठेवाव्यात.

