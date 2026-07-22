# Incident ID

INC-001

# Incident Title

GitHub Actions Workflow Not Triggered After Code Push

---

# Severity

SEV-3

---

# Status

Resolved

---

# Date

2026-01-15

---

# Reported By

Developer

---

# Environment

Development

---

# Services Impacted

- GitHub Actions
- CI Pipeline

---

# Business Impact

Developers were unable to validate code changes because the CI pipeline did not start automatically after commits were pushed to the repository.

No production systems were impacted.

---

# Detection

The developer observed that no workflow appeared under the **Actions** tab after pushing code to the `main` branch.

---

# Timeline

## 09:10

Developer pushed code to GitHub.

---

## 09:12

No workflow execution observed.

---

## 09:15

DevOps engineer began investigation.

---

## 09:20

Workflow YAML reviewed.

---

## 09:28

Incorrect trigger branch identified.

---

## 09:35

Workflow updated.

---

## 09:38

New commit pushed.

---

## 09:40

Workflow triggered successfully.

---

# Symptoms

- No workflow execution
- No CI validation
- Actions page empty
- No build logs generated

---

# Investigation

Verified workflow file.

```bash
ls .github/workflows
```

Reviewed workflow trigger.

```yaml
on:
  push:
    branches:
      - master
```

Repository default branch was

```
main
```

---

# Root Cause

Workflow was configured to trigger on the `master` branch while development had migrated to the `main` branch.

GitHub correctly ignored the workflow because the configured trigger did not match the push event.

---

# Resolution

Updated workflow trigger.

```yaml
on:
  push:
    branches:
      - main
```

Committed the change.

```bash
git add .

git commit -m "Fix workflow trigger"

git push origin main
```

---

# Verification

Confirmed

- Workflow started automatically
- Build job executed
- Tests completed
- Pipeline finished successfully

---

# Recovery Time

30 Minutes

---

# Preventive Actions

- Standardize repository default branch names
- Review workflow triggers during code reviews
- Validate workflows after branch migrations
- Include trigger verification in CI checklist

---

# Lessons Learned

- Workflow triggers must match repository branch strategy.
- Small YAML configuration errors can completely prevent CI execution.
- Branch naming consistency reduces operational issues.

---

# Related Runbooks

- workflow-failure.md
- deployment-failure.md

