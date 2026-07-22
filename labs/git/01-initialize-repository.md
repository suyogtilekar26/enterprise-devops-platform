# Lab 01 - Initialize Enterprise Git Repository

## Objective

In this lab, you will initialize the Git repository for the Enterprise DevOps Platform and perform the initial commit following enterprise best practices.

---

# Lab Scenario

You have received the application source code from the Development Team.

Your responsibility as a DevOps Engineer is to:

- Initialize Git
- Configure Git
- Create the first commit
- Verify repository status
- Prepare the repository for GitHub

---

# Prerequisites

- Git installed
- Project source code available

Example directory:

```text
enterprise-devops-platform/
├── frontend/
├── api-gateway/
├── auth-service/
├── dashboard-service/
├── notes/
├── docs/
├── docker/
├── kubernetes/
├── helm/
└── terraform/
```

---

# Step 1 - Navigate to Project

```bash
cd ~/devops-lab/enterprise-devops-platform
```

Verify location

```bash
pwd
```

---

# Step 2 - Initialize Git Repository

```bash
git init
```

Expected output

```text
Initialized empty Git repository
```

---

# Step 3 - Verify Repository

```bash
git status
```

Expected

```text
No commits yet
```

---

# Step 4 - Configure Git (If Not Already Configured)

Check configuration

```bash
git config --global user.name

git config --global user.email
```

Configure if required

```bash
git config --global user.name "Your Name"

git config --global user.email "your@email.com"
```

Verify

```bash
git config --list
```

---

# Step 5 - Create .gitignore

Create file

```bash
touch .gitignore
```

Example

```text
.env
*.log
node_modules/
__pycache__/
*.pyc
.vscode/
.idea/
coverage/
dist/
build/
```

---

# Step 6 - Check Repository Status

```bash
git status
```

Expected

```text
Untracked files:
```

---

# Step 7 - Stage Files

```bash
git add .
```

Verify

```bash
git status
```

Expected

```text
Changes to be committed
```

---

# Step 8 - Create Initial Commit

```bash
git commit -m "Initial project structure"
```

---

# Step 9 - Verify Commit

```bash
git log --oneline
```

Expected

```text
<commit-id> Initial project structure
```

---

# Step 10 - Verify Repository

```bash
git status
```

Expected

```text
nothing to commit, working tree clean
```

---

# Verification Checklist

- Repository initialized
- Git configured
- .gitignore created
- Files staged
- Initial commit completed
- Working tree clean

---

# Expected Repository State

```text
enterprise-devops-platform/
│
├── .git/
├── .gitignore
├── frontend/
├── api-gateway/
├── auth-service/
├── dashboard-service/
├── notes/
├── docker/
├── kubernetes/
├── helm/
└── terraform/
```

---

# Troubleshooting

## Git not found

```bash
git --version
```

Install Git.

---

## Commit failed

Verify

```bash
git config --list
```

Configure username and email.

---

## Nothing to commit

Verify staged files

```bash
git status
```

---

# Production Best Practices

- Always create a meaningful initial commit.
- Configure Git identity before committing.
- Create a proper .gitignore file.
- Verify repository status before every commit.
- Keep the working tree clean.

---

# Lab Completion Criteria

You have successfully completed this lab if:

- Git repository is initialized.
- Initial commit exists.
- Repository status is clean.
- .gitignore is configured.
- Repository is ready for GitHub integration.

