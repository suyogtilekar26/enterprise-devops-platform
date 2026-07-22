# Lab 05 - Git Tags and Releases

## Objective

In this lab, you will learn how to create, manage, and verify Git tags that represent production releases.

Enterprise teams use tags to mark stable versions of an application that can be deployed, rolled back, or audited.

---

# Lab Scenario

The development team has completed Version 1.0 of the Enterprise DevOps Platform.

As the DevOps Engineer, your responsibility is to:

- Verify repository status
- Create a release tag
- Verify the tag
- View tag details
- Simulate a new release
- Compare releases

---

# Prerequisites

- Labs 01-04 completed
- Repository is clean

Verify

```bash
git status
```

Expected

```text
nothing to commit, working tree clean
```

---

# Enterprise Release Workflow

```text
Developer

↓

Feature Complete

↓

Testing

↓

Merge to Main

↓

Create Release Tag

↓

GitHub Release

↓

CI/CD Deployment

↓

Production
```

---

# Step 1 - View Commit History

```bash
git log --oneline
```

Example

```text
c3ab782 Remove tracked .env
92ac122 Add enterprise .gitignore
ab45e19 Initial project structure
```

---

# Step 2 - Create Annotated Tag

```bash
git tag -a v1.0.0 -m "Enterprise DevOps Platform Version 1.0.0"
```

---

# Step 3 - Verify Tags

```bash
git tag
```

Expected

```text
v1.0.0
```

---

# Step 4 - View Tag Information

```bash
git show v1.0.0
```

Expected output includes

- Tag Name
- Tag Message
- Commit ID
- Commit Details

---

# Step 5 - Create a New Commit

```bash
echo "Release Notes" >> README.md
```

Stage

```bash
git add README.md
```

Commit

```bash
git commit -m "Add release notes"
```

---

# Step 6 - Create Version 1.1

```bash
git tag -a v1.1.0 -m "Enterprise DevOps Platform Version 1.1.0"
```

---

# Step 7 - List Tags

```bash
git tag
```

Expected

```text
v1.0.0
v1.1.0
```

---

# Step 8 - Compare Releases

```bash
git diff v1.0.0 v1.1.0
```

Review the changes introduced after Version 1.0.

---

# Step 9 - View Tag History

```bash
git log --decorate --oneline
```

Expected

```text
HEAD -> main, tag: v1.1.0
...
tag: v1.0.0
```

---

# Step 10 - Delete Local Tag (Practice)

```bash
git tag -d v1.1.0
```

Verify

```bash
git tag
```

Expected

```text
v1.0.0
```

---

# Step 11 - Recreate Tag

```bash
git tag -a v1.1.0 -m "Enterprise DevOps Platform Version 1.1.0"
```

---

# Enterprise Versioning

Example

```text
v1.0.0

↓

v1.1.0

↓

v1.2.0

↓

v2.0.0
```

Major Version

Breaking changes

Minor Version

New features

Patch Version

Bug fixes

---

# Verification Checklist

- Repository clean
- Version 1.0 tag created
- Version 1.1 tag created
- Tags verified
- Release comparison completed

---

# Troubleshooting

## Tag already exists

List tags

```bash
git tag
```

Delete

```bash
git tag -d v1.1.0
```

Create again.

---

## View tag details

```bash
git show v1.0.0
```

---

## Compare versions

```bash
git diff v1.0.0 v1.1.0
```

---

# Production Best Practices

- Always use annotated tags.
- Follow Semantic Versioning.
- Tag only tested releases.
- Never reuse production tags.
- Maintain release notes.
- Protect release branches.

---

# Real Production Scenario

The Operations team discovers an issue in Version 1.1.

Instead of searching through commits, the DevOps Engineer identifies the previous stable release using:

```bash
git tag
```

The deployment pipeline is instructed to deploy Version 1.0 using the stable release tag while developers investigate the issue.

---

# Lab Completion Criteria

You have successfully completed this lab if:

- Annotated tags were created.
- Multiple releases exist.
- Tag information was verified.
- Release differences were compared.
- You understand how Git tags support enterprise release management.

