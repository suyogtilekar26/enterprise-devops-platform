# Runbook - GitHub Actions Secret Rotation

## Purpose

This runbook describes the standard procedure for rotating GitHub Actions secrets used by the Enterprise DevOps Platform.

Secret rotation reduces the risk of credential compromise and ensures compliance with enterprise security policies.

This applies to secrets such as

- Personal Access Tokens (PAT)
- Container Registry Credentials
- Cloud Credentials
- Kubernetes Credentials
- API Keys
- SSH Private Keys
- Application Secrets

---

# Severity

Applicable to

- Planned Maintenance
- SEV-2
- SEV-3

Immediately rotate secrets if compromise is suspected.

---

# Prerequisites

Ensure access to

- GitHub Repository
- Repository Settings
- Organization Settings (if applicable)
- Credential Provider
- Cloud Platform
- Kubernetes Cluster
- GitHub Actions

---

# Investigation

## Step 1

Identify the secret requiring rotation.

Examples

```
GHCR_TOKEN

AWS_ACCESS_KEY_ID

AWS_SECRET_ACCESS_KEY

KUBECONFIG

DOCKER_USERNAME

DOCKER_PASSWORD

SSH_PRIVATE_KEY
```

Document

- Secret Name
- Purpose
- Applications Using It
- Workflows Using It

---

## Step 2

Locate workflows using the secret.

Example

```yaml
${{ secrets.GITHUB_TOKEN }}

${{ secrets.GHCR_TOKEN }}

${{ secrets.AWS_SECRET_ACCESS_KEY }}
```

Verify all affected workflows.

---

## Step 3

Verify current workflow status.

Navigate

```
Repository

↓

Actions
```

Ensure there are no active production deployments before rotation.

---

## Step 4

Generate new credentials.

Examples

- New API Key
- New PAT
- New Cloud Credentials
- New SSH Key Pair

Follow organizational security standards.

---

# Resolution

## Step 1

Open

```
Repository

↓

Settings

↓

Secrets and variables

↓

Actions
```

---

## Step 2

Update the existing secret.

Replace the old value with the newly generated credential.

Do not rename the secret unless workflow files are also updated.

---

## Step 3

If the credential exists outside GitHub

Update

- Cloud Platform
- Kubernetes
- Registry
- External Services

Ensure both systems reference the new credential.

---

## Step 4

Disable or revoke the old credential.

Examples

- Delete old PAT
- Revoke API Key
- Disable old SSH Key
- Remove expired cloud credentials

Never leave both credentials active longer than necessary.

---

## Step 5

Trigger the workflow.

Navigate

```
Repository

↓

Actions

↓

Run Workflow
```

or push a test commit.

---

# Verification

Confirm

- Workflow starts successfully
- Authentication succeeds
- Docker login succeeds
- Registry access works
- Deployment succeeds
- No authentication errors appear

Review workflow logs for

```
Authentication successful
```

or equivalent success messages.

---

# Rollback

If the new credential fails

- Restore the previous working credential (if still valid)
- Re-run the workflow
- Investigate the replacement credential
- Generate a new credential if required

If the previous credential has already been revoked, generate a fresh credential immediately.

---

# Escalation

Escalate when

- Secret compromise is confirmed
- Multiple workflows fail
- Registry authentication fails
- Cloud authentication fails
- Production deployment is blocked

Notify

- Security Team
- DevOps Lead
- Platform Team
- Application Owner

---

# Post-Incident Tasks

- Verify all workflows
- Confirm old credential is revoked
- Update credential inventory
- Record rotation date
- Review access permissions
- Update security documentation if required

---

# Recovery Checklist

- New credential generated
- Secret updated in GitHub
- External systems updated
- Old credential revoked
- Workflows successful
- Deployments successful
- Incident closed

