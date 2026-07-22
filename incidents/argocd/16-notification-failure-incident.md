# Incident 16 - Notification Failure

# Enterprise DevOps Platform

---

# Incident Summary

ArgoCD successfully synchronized the application, but deployment notifications were not delivered to the configured notification channels.

The deployment itself succeeded, but engineers were unaware of the deployment status because Slack, Microsoft Teams, Email, or Webhook notifications failed.

---

# Severity

```
SEV-2
```

Operational visibility incident.

---

# Business Impact

- Deployment notifications missing
- Delayed incident response
- Reduced operational visibility
- SLA reporting affected
- Manual monitoring required
- Increased operational effort

---

# Environment

- ArgoCD
- ArgoCD Notifications
- Kubernetes
- Slack / Microsoft Teams / Email / Webhook
- Production Cluster

---

# Symptoms

Application

```bash
argocd app get guestbook
```

Output

```
Healthy

Synced
```

Expected notification

```
Deployment Successful
```

was never received.

---

# Common Causes

- Notification Controller Down
- Invalid Slack Webhook
- Expired API Token
- Missing Secret
- Notification Trigger Misconfigured
- Template Error
- Network Connectivity Failure
- DNS Failure
- SMTP Failure
- Incorrect Subscription

---

# Detection

Verify Notification Controller

```bash
kubectl get pods \
-n argocd
```

Expected

```
argocd-notifications-controller

Running
```

---

Check Notification Logs

```bash
kubectl logs deployment/argocd-notifications-controller \
-n argocd
```

---

# Investigation

## Step 1

Verify Notification Controller

```bash
kubectl get deployment \
-n argocd
```

---

## Step 2

Review Controller Logs

```bash
kubectl logs deployment/argocd-notifications-controller \
-n argocd
```

Look for

```
notification failed

webhook failed

authentication failed

timeout
```

---

## Step 3

Verify Secret

```bash
kubectl get secret \
argocd-notifications-secret \
-n argocd
```

---

## Step 4

Verify ConfigMap

```bash
kubectl get configmap \
argocd-notifications-cm \
-n argocd
```

---

## Step 5

Verify Application Annotations

Example

```yaml
metadata:
  annotations:
    notifications.argoproj.io/subscribe.on-sync-succeeded.slack: devops
```

---

## Step 6

Verify External Connectivity

Example

```bash
curl -I https://hooks.slack.com
```

---

## Step 7

Verify Notification Templates

Inspect

```
argocd-notifications-cm
```

Ensure templates and triggers are valid.

---

# Root Cause Analysis

Example

The Slack Incoming Webhook URL was rotated.

The old webhook remained in

```
argocd-notifications-secret
```

Every notification failed with

```
HTTP 404

Webhook Not Found
```

Application deployments completed successfully, but no notifications were delivered.

---

# Resolution

Update Notification Secret.

Example

```bash
kubectl edit secret \
argocd-notifications-secret \
-n argocd
```

Restart Notifications Controller

```bash
kubectl rollout restart deployment \
argocd-notifications-controller \
-n argocd
```

Trigger a test synchronization

```bash
argocd app sync guestbook
```

---

# Validation

Verify Controller

```bash
kubectl get pods \
-n argocd
```

Expected

```
Running
```

---

Verify Logs

```bash
kubectl logs deployment/argocd-notifications-controller \
-n argocd
```

Expected

```
Notification Sent
```

---

Verify Notification

Confirm message is received in

- Slack
- Microsoft Teams
- Email
- Webhook Receiver

---

# Commands Used

Application

```bash
argocd app get guestbook
```

Sync

```bash
argocd app sync guestbook
```

Logs

```bash
kubectl logs deployment/argocd-notifications-controller \
-n argocd
```

Secrets

```bash
kubectl get secrets \
-n argocd
```

ConfigMaps

```bash
kubectl get configmaps \
-n argocd
```

Restart

```bash
kubectl rollout restart deployment \
argocd-notifications-controller \
-n argocd
```

---

# Timeline Example

```
17:00

Deployment Started

↓

17:02

Application Synced

↓

17:03

Notification Attempted

↓

17:03

Slack Webhook Failed

↓

17:06

Engineer Notices Missing Notification

↓

17:10

Controller Logs Reviewed

↓

17:15

Webhook Updated

↓

17:17

Controller Restarted

↓

17:20

Test Notification Delivered
```

---

# Prevention

- Rotate notification credentials safely.
- Monitor notification delivery.
- Test notification channels regularly.
- Validate templates before production.
- Monitor controller health.
- Protect notification Secrets.

---

# Best Practices

- Configure multiple notification channels.
- Store credentials in Kubernetes Secrets.
- Test notifications after upgrades.
- Monitor failed notification events.
- Use version-controlled notification templates.
- Regularly validate webhook endpoints.

---

# Interview Questions

## 1. Does Notification Failure affect application deployment?

No.

The deployment can succeed even if notifications fail.

---

## 2. Which component sends notifications?

```
argocd-notifications-controller
```

---

## 3. Where are notification credentials stored?

```
argocd-notifications-secret
```

---

## 4. Which Kubernetes object stores notification templates?

```
argocd-notifications-cm
```

---

## 5. How can notification failures be prevented?

- Monitor delivery
- Rotate credentials properly
- Validate webhooks
- Test templates
- Monitor notification controller

---

# Incident Success Criteria

The incident is resolved when:

- Notification controller is healthy.
- Notifications are delivered successfully.
- Secrets are valid.
- Templates are working.
- Deployment notifications reach all intended recipients.
- Root cause is documented.

---

# Marathi Quick Revision

- Notification Failure म्हणजे Deployment यशस्वी झाला तरी Slack, Teams किंवा Email Notification जात नाही.
- `argocd-notifications-controller` Notifications पाठवतो.
- `argocd-notifications-secret` मध्ये Webhook किंवा API Credentials साठवलेले असतात.
- Controller Logs तपासून Root Cause शोधणे सर्वात महत्त्वाचे आहे.
- Production मध्ये Notification Channels नियमित Test आणि Monitor करणे आवश्यक आहे.

