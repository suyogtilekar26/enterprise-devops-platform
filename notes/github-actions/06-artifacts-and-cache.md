# GitHub Actions Artifacts and Cache

# Purpose

Understand how GitHub Actions Artifacts and Cache work, when to use each, and how enterprise DevOps teams optimize CI/CD pipelines using them.

Although both store data between workflow steps, they serve completely different purposes.

Understanding this difference is a common DevOps interview topic.

---

# Introduction

During workflow execution, files are generated such as

- Build outputs
- Test reports
- Coverage reports
- Docker logs
- Deployment logs

Sometimes these files need to be downloaded later.

Sometimes dependencies should be reused to reduce build time.

GitHub provides two mechanisms

- Artifacts
- Cache

---

# Enterprise Usage

Organizations use Artifacts for

- Build outputs
- Test reports
- Security scan reports
- Deployment logs
- Release packages

Organizations use Cache for

- npm packages
- pip packages
- Maven dependencies
- Gradle dependencies
- Docker build cache

---

# GitHub Actions in THIS Project

```
Developer Push

↓

Workflow Starts

↓

Install Dependencies

↓

Cache Dependencies

↓

Build Application

↓

Generate Reports

↓

Upload Artifacts

↓

Deployment
```

---

# Architecture

```
Workflow

↓

Runner

↓

Build

↓

Artifacts

↓

Download Later
```

```
Workflow

↓

Runner

↓

Install Dependencies

↓

Cache

↓

Reuse Next Execution
```

---

# What are Artifacts?

Artifacts are files produced during a workflow that are stored after execution.

Examples

- Build binaries
- ZIP packages
- HTML reports
- JUnit reports
- Coverage reports
- Log files

Artifacts help engineers review workflow results.

---

# Artifact Lifecycle

```
Workflow Starts

↓

Application Builds

↓

Artifact Generated

↓

Artifact Uploaded

↓

Workflow Completes

↓

Download Artifact
```

---

# Common Artifact Examples

- application.zip
- build.tar.gz
- junit-report.xml
- coverage.html
- deployment.log

---

# Upload Artifact Example

```yaml
- uses: actions/upload-artifact@v4

  with:
    name: build-output

    path: dist/
```

---

# Download Artifact Example

```yaml
- uses: actions/download-artifact@v4

  with:
    name: build-output
```

---

# What is Cache?

Cache stores reusable dependencies between workflow executions.

Instead of downloading dependencies every time, GitHub restores them from cache.

This significantly reduces build time.

---

# Cache Lifecycle

```
Workflow

↓

Install Dependencies

↓

Save Cache

↓

Workflow Ends

↓

Next Workflow

↓

Restore Cache

↓

Faster Build
```

---

# Common Cache Examples

- npm packages
- pip packages
- Maven repository
- Gradle cache
- Composer packages

---

# Cache Example

```yaml
- uses: actions/cache@v4

  with:
    path: ~/.npm

    key: npm-cache
```

---

# Artifact vs Cache

| Artifact | Cache |
|-----------|-------|
| Stores build output | Stores dependencies |
| Downloaded manually | Restored automatically |
| Used for reports | Used for faster builds |
| Long-term workflow output | Temporary dependency storage |
| Shared after workflow | Shared before workflow |

---

# Enterprise Workflow

```
Workflow

↓

Restore Cache

↓

Install Dependencies

↓

Build

↓

Run Tests

↓

Generate Reports

↓

Upload Artifacts

↓

Complete
```

---

# Daily DevOps Activities

DevOps Engineers

- Configure dependency cache
- Upload test reports
- Archive build outputs
- Review artifacts
- Optimize cache performance
- Remove obsolete artifacts

---

# Production Best Practices

- Cache only dependencies
- Upload important reports as artifacts
- Use meaningful artifact names
- Keep artifacts organized
- Avoid caching temporary files
- Periodically review storage usage

---

# Security

Always

- Review artifact contents
- Avoid storing secrets
- Encrypt sensitive reports externally
- Restrict artifact access

Never

- Upload credentials
- Upload API keys
- Store private certificates
- Cache sensitive data

---

# Common Problems

Problem

Cache not restored.

Cause

Cache key changed.

---

Problem

Artifacts missing.

Cause

Upload step failed.

---

Problem

Large storage usage.

Cause

Too many artifacts retained.

---

Problem

Slow builds.

Cause

Cache not configured.

---

# Troubleshooting

Verify

- Cache key
- Cache path
- Artifact upload step
- Artifact name
- Workflow logs
- Storage limits

---

# Real Production Scenario

A React application installs over 2,000 npm packages.

Without cache, every workflow downloads all dependencies.

Build time

12 minutes.

After enabling npm cache

Build time

4 minutes.

Build reports and coverage reports are uploaded as artifacts for QA engineers.

---

# Scenario Interview Q&A

### Scenario

Your workflow suddenly became much slower.

How would you investigate?

Answer

- Verify cache restoration
- Check cache key changes
- Review dependency installation logs
- Confirm cache path
- Review workflow history

---

# Architecture Interview Q&A

### Why are Artifacts and Cache different?

Artifacts preserve workflow outputs for later download.

Cache preserves dependencies to speed up future workflow executions.

They solve different problems.

---

# Production Support Interview Q&A

### What should be stored as an Artifact?

- Test reports
- Build packages
- Coverage reports
- Deployment logs
- Release files

### What should be stored in Cache?

- npm modules
- pip packages
- Maven dependencies
- Gradle dependencies

---

# Related Runbooks

- Artifact Recovery
- Cache Cleanup
- Workflow Failure Recovery

---

# Common Incidents

- Artifact Upload Failure
- Cache Miss
- Storage Limit Reached
- Corrupted Cache

---

# Commands

List workflow files

```bash
ls .github/workflows
```

Commit changes

```bash
git add .

git commit -m "Configure artifacts and cache"
```

Push workflow

```bash
git push origin main
```

---

# Marathi Quick Revision

Artifacts म्हणजे Build नंतर तयार झालेले Output Files.

Cache म्हणजे Dependencies पुन्हा डाउनलोड न करता वापरण्याची सुविधा.

Artifacts → Reports

Cache → Faster Builds

---

# Marathi Interview Memory Tips

Remember

```
Artifacts

=

Output

Cache

=

Speed
```

Interview Formula

```
Cache

+

Artifacts

=

Fast CI/CD
```

---

# Key Takeaways

- Artifacts store workflow outputs.
- Cache stores reusable dependencies.
- Artifacts help with reporting and debugging.
- Cache improves workflow performance.
- Both are essential for enterprise CI/CD pipelines.

