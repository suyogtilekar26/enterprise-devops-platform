# Lab 04 - Git Ignore and Clean Repository History

## Objective

In this lab, you will learn how to use `.gitignore` effectively, prevent unnecessary files from entering Git, remove accidentally tracked files, and maintain a clean repository history.

---

# Lab Scenario

A developer accidentally commits unnecessary files such as:

- `.env`
- `node_modules`
- Log files
- Build artifacts

As the DevOps Engineer, you must clean the repository and ensure these files are ignored in future commits.

---

# Prerequisites

- Lab 03 completed
- Working Git repository

Verify

```bash
git status
```

Expected

```text
nothing to commit, working tree clean
```

---

# Step 1 - Create Sample Files

```bash
mkdir logs
```

```bash
mkdir build
```

```bash
touch logs/application.log
```

```bash
touch .env
```

```bash
touch build/app.jar
```

```bash
mkdir node_modules
```

```bash
touch node_modules/test.js
```

---

# Step 2 - Check Repository Status

```bash
git status
```

Expected

```text
Untracked files
```

---

# Step 3 - Create .gitignore

```bash
cat > .gitignore <<EOF
.env
node_modules/
logs/
build/
*.log
*.jar
__pycache__/
*.pyc
coverage/
dist/
.vscode/
.idea/
