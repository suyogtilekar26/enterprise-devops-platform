# Helm Notes 64 - Helm Best Practices (Enterprise & Interview)

# Enterprise DevOps Platform

---

# 1. Purpose

The purpose of this document is to understand Helm Best Practices followed by enterprise organizations.

These practices are commonly asked in Senior DevOps interviews because they demonstrate production experience rather than command knowledge.

---

# 2. Production Story

Imagine two companies.

Company A

```
Everyone edits values.yaml

↓

Uses latest image

↓

Manual kubectl apply

↓

No rollback

↓

Production failures
```

Company B

```
GitOps

↓

Versioned Charts

↓

OCI Registry

↓

Rollback Ready

↓

Automated CI/CD

↓

Stable Production
```

Interviewers always expect answers based on Company B.

---

# 3. Enterprise Helm Standards

A production Helm deployment should always have

```
Git

↓

Pull Request

↓

Code Review

↓

helm lint

↓

helm template

↓

Dry Run

↓

Build

↓

Deploy

↓

Monitor

↓

Rollback Ready
```

---

# 4. Best Practice #1 - Never Use latest Image ⭐⭐⭐⭐⭐

❌ Wrong

```yaml
image:

  tag: latest
```

✅ Correct

```yaml
image:

  tag: v2.4.3
```

Reason

```
Repeatable Deployments

↓

Easy Rollback

↓

Version Tracking
```

---

# 5. Best Practice #2 - Separate Values Files ⭐⭐⭐⭐⭐

Example

```
values.yaml

values-dev.yaml

values-qa.yaml

values-prod.yaml
```

Never use

```
One values.yaml

For Every Environment
```

---

# 6. Best Practice #3 - Validate Before Deploy

Always run

```bash
helm lint .
```

Then

```bash
helm template .
```

Then

```bash
helm install \
--dry-run \
--debug
```

Production engineers NEVER deploy directly.

---

# 7. Best Practice #4 - Use Helm Upgrade

Never uninstall and install.

Use

```bash
helm upgrade
```

Reason

```
No Downtime

↓

Revision History

↓

Rollback Available
```

---

# 8. Best Practice #5 - Keep Revision History

Never disable history.

Useful for

- Rollback
- RCA
- Audit
- Incident Recovery

Command

```bash
helm history
```

---

# 9. Best Practice #6 - Use OCI Registry

Instead of

```
Random Chart Folder
```

Store charts inside

```
OCI Registry

or

Private Repository
```

---

# 10. Best Practice #7 - Secrets

Never store

```
Passwords

Tokens

Keys
```

inside Git.

Use

- External Secret
- Vault
- Azure Key Vault
- AWS Secrets Manager

Helm should only reference them.

---

# 11. Best Practice #8 - Atomic Upgrade ⭐⭐⭐⭐⭐

Use

```bash
helm upgrade frontend . \
--atomic
```

If deployment fails

↓

Automatic Rollback

Excellent interview point.

---

# 12. Best Practice #9 - Wait Option

Use

```bash
helm upgrade \
--wait
```

Deployment finishes only after Pods become Ready.

---

# 13. Best Practice #10 - Version Everything

Version

```
Chart

↓

Application

↓

Docker Image

↓

Git Tag
```

Everything should match.

---

# 14. Enterprise CI/CD Workflow

```
Developer

↓

Git Push

↓

Pull Request

↓

Review

↓

helm lint

↓

helm template

↓

Unit Testing

↓

Docker Build

↓

Image Push

↓

Helm Package

↓

OCI Registry

↓

helm upgrade --atomic

↓

Production

↓

Monitoring
```

---

# 15. Real Production Example

Developer directly edited

```
Deployment
```

using

```bash
kubectl edit
```

Everything worked.

Next deployment

↓

Helm overwrote manual changes.

Production issue returned.

Lesson

```
Never modify Helm-managed resources manually.
```

---

# 16. Interview Questions

## Q1

What are the top Helm best practices?

Answer

- Version charts
- Never use latest image
- Separate values files
- Validate using lint
- Use dry-run
- Use upgrade
- Use rollback
- Store charts in OCI
- Use GitOps
- Never edit resources manually

---

## Q2

Why avoid latest image tag?

Answer

Because deployments become non-repeatable and rollback becomes unreliable.

---

## Q3

Why use --atomic?

Answer

Automatic rollback if deployment fails.

---

## Q4

Why separate values files?

Answer

Different environments require different configuration.

---

## Q5

Should developers edit Kubernetes resources manually?

Answer

No.

Helm should remain the single source of truth.

---

# 17. Top 10 Interview Tips

✅ Always use Helm through CI/CD.

✅ Use immutable image tags.

✅ Keep release history.

✅ Validate before deployment.

✅ Use GitOps.

✅ Store charts in OCI Registry.

✅ Secrets should never be in Git.

✅ Use rollback for recovery.

✅ Never edit live resources.

✅ Always perform RCA after incidents.

---

# 18. Common Mistakes

❌ latest image

❌ Manual kubectl edit

❌ No rollback strategy

❌ One values.yaml

❌ No lint

❌ No dry-run

❌ Secrets in Git

❌ No monitoring

---

# 19. Marathi Quick Revision

- latest image वापरू नका.
- प्रत्येक environment साठी वेगळी values file.
- Deploy आधी helm lint.
- helm template तपासा.
- --atomic वापरा.
- OCI Registry वापरा.
- Secrets Git मध्ये ठेवू नका.
- Manual kubectl edit करू नका.

---

# 20. Marathi Summary (5+ Years)

## Simple Explanation

Enterprise मध्ये Helm वापरण्याचे काही standards असतात. हे standards follow केल्यामुळे deployments repeatable, secure आणि rollback-ready राहतात.

### Project Usage

आपल्या Enterprise DevOps Platform मध्ये GitHub Actions प्रत्येक deployment आधी `helm lint`, `helm template` आणि `--dry-run` चालवेल. OCI Registry मधील versioned chart वापरून `helm upgrade --atomic --wait` केले जाईल. Secrets Vault मधून येतील.

### Production Best Practice

Helm हा Kubernetes resources साठी single source of truth असावा. Manual changes करू नयेत. Immutable image tags, GitOps, OCI Registry आणि automated rollback वापरावे.

### Production Story

एका production outage मध्ये engineer ने emergency म्हणून `kubectl edit deployment` वापरले. Service restore झाली, पण पुढच्या Helm deployment मध्ये ते manual changes overwrite झाले आणि पुन्हा outage आला. त्यानंतर company ने policy केली की सर्व production changes Helm/GitOps मधूनच होतील.

### Investigation Flow

```
Deployment Failed

↓

CI Logs

↓

helm lint

↓

helm template

↓

helm status

↓

kubectl logs

↓

Fix

↓

helm upgrade --atomic

↓

Monitor
```

### 5+ Years Memory Trick

**Interview Question**

What Helm best practices do you follow in production?

**Answer**

"In production, I always use versioned charts and immutable image tags. I validate every chart using `helm lint`, `helm template` and `--dry-run` before deployment. Charts are stored in an OCI registry and deployed through CI/CD using `helm upgrade --atomic --wait`. Secrets are managed externally, Helm-managed resources are never edited manually, and every deployment remains rollback-ready."

