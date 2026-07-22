# Lab 14 - ArgoCD Notifications

# Enterprise DevOps Platform

---

# Lab Objective

In this lab you will learn how to:

- Understand ArgoCD Notifications
- Configure Notification Controller
- Send Slack Notifications
- Configure Email Notifications
- Configure Microsoft Teams Notifications
- Create Custom Triggers
- Verify Notification Delivery

---

# Prerequisites

- Labs 01 to 13 Completed
- ArgoCD Installed
- Notification Controller Installed
- Slack Workspace (Optional)
- SMTP Server (Optional)
- Microsoft Teams Webhook (Optional)

---

# What are ArgoCD Notifications?

ArgoCD Notifications send alerts whenever important events occur.

Examples

- Deployment Success
- Deployment Failure
- Sync Started
- Sync Completed
- Health Degraded
- Rollback
- Application Deleted

---

# Why Notifications?

Without Notifications

```
Deployment Failed

↓

Nobody Knows

↓

Production Outage
```

With Notifications

```
Deployment Failed

↓

Slack

↓

Email

↓

Teams

↓

Engineers Respond
```

---

# Architecture

```
Git Repository

↓

ArgoCD

↓

Notification Controller

↓

Slack

↓

Email

↓

Microsoft Teams
```

---

# Notification Controller

Verify

```bash
kubectl get pods -n argocd
```

Expected

```
argocd-notifications-controller
```

Running

---

# Step 1 - Verify ConfigMap

```bash
kubectl get configmap argocd-notifications-cm \
-n argocd
```

---

# Step 2 - Configure Slack

Example

```yaml
service.slack: |
  token: $slack-token
```

---

# Step 3 - Store Slack Token

```bash
kubectl create secret generic argocd-notifications-secret \
-n argocd \
--from-literal=slack-token=xoxb-xxxxxxxx
```

---

# Step 4 - Configure Email

Example

```yaml
service.email: |

  host: smtp.company.com

  port: 587

  username: devops@company.com

  password: $email-password

  from: devops@company.com
```

---

# Step 5 - Configure Microsoft Teams

```yaml
service.teams: |

  recipientUrls:

    operations: https://outlook.office.com/webhook/xxxxxxxx
```

---

# Step 6 - Configure Trigger

Example

```yaml
trigger.on-sync-succeeded: |

- send:

  - app-sync-succeeded
```

---

# Step 7 - Configure Template

Example

```yaml
template.app-sync-succeeded: |

  message: |

    Application {{.app.metadata.name}}

    Sync Successful
```

---

# Step 8 - Subscribe Application

Application Annotation

```yaml
metadata:

  annotations:

    notifications.argoproj.io/subscribe.on-sync-succeeded.slack: operations
```

---

# Step 9 - Commit Changes

```bash
git add .
```

```bash
git commit -m "Configured Notifications"
```

```bash
git push origin main
```

---

# Step 10 - Trigger Deployment

```bash
argocd app sync guestbook
```

---

# Step 11 - Verify Notification

Expected Slack Message

```
Application

guestbook

Sync Successful

Healthy
```

---

# Step 12 - Verify Logs

```bash
kubectl logs deployment/argocd-notifications-controller \
-n argocd
```

---

# Commands Used

Applications

```bash
argocd app list
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

ConfigMap

```bash
kubectl get configmap argocd-notifications-cm \
-n argocd
```

---

# Common Triggers

- on-created
- on-deleted
- on-sync-running
- on-sync-succeeded
- on-sync-failed
- on-health-degraded
- on-deployed

---

# Expected Output

```
Git Push

↓

ArgoCD Sync

↓

Notification Controller

↓

Slack

↓

Email

↓

Teams
```

---

# Troubleshooting

## Notification Not Sent

Check

```bash
kubectl logs deployment/argocd-notifications-controller \
-n argocd
```

---

## Slack Authentication Failed

Verify

- Slack Token
- Secret
- Channel Name

---

## Email Failed

Verify

- SMTP Host
- Username
- Password
- Firewall

---

## Teams Notification Failed

Verify

- Webhook URL
- Internet Access

---

# Best Practices

- Store Tokens as Kubernetes Secrets.
- Never hardcode credentials.
- Notify only important events.
- Separate Dev and Production channels.
- Monitor Notification Controller.
- Test notifications after configuration changes.

---

# Real Production Example

```
Developer

↓

Git Push

↓

ArgoCD

↓

Deployment

↓

Notification Controller

↓

Slack

↓

DevOps Team

↓

Incident Response
```

---

# Interview Questions

## 1. What are ArgoCD Notifications?

They notify users about deployment events and application health changes.

---

## 2. Which component sends notifications?

argocd-notifications-controller

---

## 3. Which notification channels are supported?

- Slack
- Email
- Microsoft Teams
- Webhooks

---

## 4. Where are notification templates stored?

```
argocd-notifications-cm
```

---

## 5. Why are notifications important?

They provide immediate visibility into deployment success, failures and production incidents.

---

# Lab Success Criteria

You have successfully completed this lab if:

- Notification Controller is running.
- Slack or Email is configured.
- Notifications are delivered successfully.
- Custom trigger works.
- Deployment events generate alerts.

---

# Marathi Quick Revision

- Notifications म्हणजे Deployment Alerts.
- Slack, Email आणि Teams ला Alerts पाठवता येतात.
- Notification Controller Alerts Handle करतो.
- Tokens Secrets मध्ये Store करा.
- Production मध्ये Deployment Failure Alerts खूप महत्त्वाचे असतात.

