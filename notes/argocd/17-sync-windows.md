# Sync Windows

# Enterprise DevOps Platform

---

# Purpose

This document explains Sync Windows in ArgoCD from beginner to enterprise level.

Sync Windows allow organizations to control **when applications can or cannot be synchronized**. This feature is widely used in enterprise production environments to prevent deployments during business hours, critical events, or maintenance freezes.

---

# Introduction

In Development, deployments can happen anytime.

In Production, deployments are usually controlled.

Example:

```
Development

Deploy Anytime

------------------------

Production

Deploy Only

10:00 PM - 02:00 AM
```

Sync Windows enforce these deployment rules automatically.

---

# Simple Definition

Sync Windows are time-based rules that control when ArgoCD applications are allowed or denied synchronization.

---

# Why Sync Windows?

Without Sync Windows

```
Developer

↓

Merge PR

↓

Automatic Sync

↓

Production Deployment

↓

11:00 AM

↓

Business Impact
```

With Sync Windows

```
Developer

↓

Merge PR

↓

ArgoCD

↓

Deployment Blocked

↓

Wait Until

10:00 PM

↓

Deployment Allowed
```

---

# Types of Sync Windows

## Allow Window

Deployment is allowed only during specified time.

Example

```
10 PM

↓

2 AM

Allowed
```

Outside this window

```
Blocked
```

---

## Deny Window

Deployment is blocked during specified time.

Example

```
9 AM

↓

6 PM

Deployment Denied
```

Outside business hours

```
Deployment Allowed
```

---

# Enterprise Example

Company Policy

```
Production

↓

No Deployments

Monday-Friday

9 AM - 6 PM
```

Reason

- High customer traffic
- Business users online
- Reduced deployment risk

ArgoCD automatically blocks deployments during this period.

---

# Sync Window Workflow

```
Git Commit

↓

Application OutOfSync

↓

Sync Request

↓

Check Sync Window

↓

Allowed?

↓

Yes

↓

Deploy

-----------------

No

↓

Sync Denied
```

---

# Example Configuration

```yaml
spec:
  syncWindows:
    - kind: allow
      schedule: "0 22 * * *"
      duration: 4h
      applications:
        - frontend
```

Meaning

```
Allow deployment

10 PM

↓

2 AM
```

---

# Deny Window Example

```yaml
spec:
  syncWindows:
    - kind: deny
      schedule: "0 9 * * 1-5"
      duration: 9h
```

Meaning

```
Monday-Friday

9 AM

↓

6 PM

Deployment Blocked
```

---

# Multiple Windows

Example

```
Allow

10 PM - 2 AM

-------------------

Deny

9 AM - 6 PM

-------------------

Weekend

Always Allowed
```

---

# Enterprise Use Cases

## Production Freeze

During festivals

```
Diwali

↓

Deployment Freeze
```

---

## Financial Systems

```
Month End

↓

No Deployment
```

---

## Banking

```
Business Hours

↓

No Production Deployment
```

---

## E-commerce

```
Black Friday

↓

Deployment Freeze
```

---

# Benefits

- Controlled deployments
- Reduced production risk
- Better change management
- Improved compliance
- Supports CAB approval process
- Prevents accidental production deployments

---

# Common Problems

Deployment blocked unexpectedly.

Possible reasons

- Current time falls inside a Deny Window.
- Wrong timezone.
- Incorrect cron schedule.
- Wrong application match.

---

# Best Practices

- Use Sync Windows only for Production.
- Allow automatic deployments in Development.
- Define maintenance windows clearly.
- Document deployment schedules.
- Inform teams about deployment freeze periods.
- Test Sync Windows before Production rollout.

---

# Interview Questions

## Q1. What are Sync Windows in ArgoCD?

### Answer

Sync Windows are time-based rules that allow or deny application synchronization during specific periods.

---

## Q2. Why are Sync Windows used?

### Answer

They prevent deployments during business hours, maintenance freezes, high-traffic periods and other critical production windows.

---

## Q3. What is the difference between Allow and Deny Sync Windows?

### Answer

Allow Windows permit deployments only during defined periods, whereas Deny Windows block deployments during defined periods.

---

# Marathi Quick Revision

- Sync Window म्हणजे Deployment Timing Control.
- Allow Window → Deploy Allowed.
- Deny Window → Deploy Block.
- Production मध्ये जास्त वापरतात.
- Business Hours मध्ये Deploy Block करू शकतो.
- Change Freeze साठी उपयुक्त.
- Enterprise Governance साठी महत्त्वाचे.

---

# Marathi Summary (5+ Experience Revision)

Sync Windows हे ArgoCD मधील Production governance feature आहे. याच्या मदतीने deployments विशिष्ट वेळेत allow किंवा deny करता येतात. Banking, Finance, Healthcare आणि E-commerce सारख्या enterprise environments मध्ये business hours, maintenance windows, release freeze आणि CAB approval प्रक्रियेसाठी Sync Windows मोठ्या प्रमाणात वापरले जातात. Interview मध्ये Production deployment control साठी हा topic अत्यंत महत्त्वाचा आहे.

