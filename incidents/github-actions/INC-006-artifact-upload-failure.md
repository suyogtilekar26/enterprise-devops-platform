# Incident ID

INC-006

# Incident Title

GitHub Actions Artifact Upload Failed During CI Pipeline

---

# Severity

SEV-3

---

# Status

Resolved

---

# Date

2026-03-18

---

# Reported By

GitHub Actions

---

# Environment

Development

---

# Services Impacted

- GitHub Actions
- Build Pipeline
- Artifact Storage

---

# Business Impact

The application build completed successfully, but the generated build artifact was not uploaded.

Subsequent workflow stages requiring the artifact could not execute, delaying deployment.

No production systems were affected.

---

# Detection

The workflow failed during the artifact upload stage.

Workflow logs reported

```
No files were found with the provided path.
```

---

# Timeline

## 16:00

Developer pushed code to the main branch.

---

## 16:02

Build completed successfully.

---

## 16:04

Artifact upload started.

---

## 16:05

Artifact upload failed.

---

## 16:10

DevOps engineer reviewed workflow logs.

---

## 16:16

Incorrect artifact path identified.

---

## 16:22

Workflow updated.

---

## 16:25

Workflow re-run.

---

## 16:29

Artifact uploaded successfully.

---

# Symptoms

- Artifact upload failed
- Deployment job skipped
- Build output unavailable
- Workflow terminated after build

---

# Investigation

Reviewed workflow logs.

Verified upload step.

```yaml
- uses: actions/upload-artifact@v4
```

Reviewed artifact configuration.

```yaml
with:
  name: build-output
  path: dist/
```

Verified generated files.

```bash
ls -la

find . -type d -name dist

find . -type d -name build
```

Compared the build output directory with the upload path.

---

# Root Cause

The workflow attempted to upload files from the `dist/` directory.

The application build generated output in the `build/` directory.

Because the configured upload path did not exist, GitHub Actions could not upload the artifact.

---

# Resolution

Updated the workflow to reference the correct build output directory.

Example

```yaml
with:
  name: build-output
  path: build/
```

Committed the workflow change.

Re-ran the pipeline.

Artifact upload completed successfully.

---

# Verification

Confirmed

- Build successful
- Artifact uploaded
- Artifact visible in Workflow Summary
- Download successful
- Deployment resumed

Verified artifact availability from the completed workflow.

---

# Recovery Time

29 Minutes

---

# Preventive Actions

- Standardize build output directories
- Validate artifact paths before upload
- Include artifact verification in CI
- Review workflow changes during code reviews
- Test pipelines after build configuration changes

---

# Lessons Learned

- Artifact paths must match the actual build output.
- Successful builds do not guarantee successful artifact uploads.
- CI validation should include artifact generation and upload.
- Consistent directory structures simplify pipeline maintenance.

---

# Related Runbooks

- artifact-recovery.md
- workflow-failure.md
- failed-docker-build.md

