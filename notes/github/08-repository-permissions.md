# GitHub Repository Permissions

# Purpose

Understand how GitHub Repository Permissions control access to repositories and how enterprises implement secure access management.

Repository Permissions are a common DevOps interview topic because they directly impact security and collaboration.

---

# Introduction

Repository Permissions determine what actions a user or team can perform on a GitHub repository.

Permissions control whether users can

- View repositories
- Clone code
- Create branches
- Push commits
- Create Pull Requests
- Manage settings
- Delete repositories

In enterprise environments, permissions are managed carefully to prevent unauthorized access.

---

# Permission Levels

GitHub provides the following repository permission levels.

| Permission | Capabilities |
|------------|--------------|
| Read | View and clone repository |
| Triage | Manage issues and Pull Requests without writing code |
| Write | Push code, create branches, merge Pull Requests |
| Maintain | Manage repository settings without full admin rights |
| Admin | Full control over the repository |

---

# Enterprise Permission Model

```
Organization

↓

Teams

↓

Repository Permissions

↓

Developers
```

Permissions are typically assigned to Teams instead of individual users.

---

# Example Team Access

| Team | Permission |
|------|------------|
| DevOps | Admin |
| Backend | Write |
| Frontend | Write |
| QA | Read |
| Security | Maintain |

---

# Repository Permissions in THIS Project

Repository

```
enterprise-devops-platform
```

Example

```
DevOps Team

↓

Admin

----------------

Backend Team

↓

Write

----------------

Frontend Team

↓

Write

----------------

QA Team

↓

Read

----------------

Security Team

↓

Maintain
```

---

# Why Least Privilege Matters

Every user should receive only the permissions necessary to perform their job.

Example

QA Engineer

Needs

- Read

Does NOT need

- Admin

---

Developer

Needs

- Write

Does NOT need

- Delete Repository

---

DevOps Engineer

Needs

- Admin

Because they manage

- Branch Protection
- Secrets
- GitHub Actions
- Repository Settings

---

# Daily DevOps Activities

DevOps Engineers

- Add new users
- Remove inactive users
- Create teams
- Assign permissions
- Review repository access
- Audit administrator accounts
- Investigate permission issues

---

# Common Permission Problems

Problem

Developer cannot push.

Reason

Read permission only.

---

Problem

Cannot merge Pull Request.

Reason

Write permission missing.

---

Problem

Cannot change repository settings.

Reason

Not an Admin.

---

Problem

GitHub Actions cannot deploy.

Reason

Repository Secret or Token permission missing.

---

# Troubleshooting

Verify

- Organization membership
- Team membership
- Repository permission level
- Branch protection rules
- Authentication
- GitHub audit logs

---

# Production Best Practices

Always

- Use Teams instead of individual permissions
- Follow least privilege
- Limit Admin users
- Review permissions regularly
- Remove inactive accounts
- Enable MFA
- Audit access changes

Never

- Give everyone Admin access
- Share GitHub accounts
- Ignore permission reviews
- Leave former employees with repository access

---

# Security

Repository Permissions help

- Prevent unauthorized changes
- Protect production branches
- Control repository administration
- Reduce insider threats
- Meet compliance requirements

---

# Real Production Scenario

A developer reported that they could clone the repository but could not push changes.

Investigation showed the developer belonged to the **QA Team**, which only had **Read** access.

The DevOps Engineer moved the developer to the **Backend Team**, which had **Write** permission.

The developer successfully pushed changes and resumed development.

---

# Interview Questions

### What are GitHub Repository Permissions?

Repository Permissions define what actions a user or team can perform on a GitHub repository.

---

### What are the available permission levels?

- Read
- Triage
- Write
- Maintain
- Admin

---

### Why assign permissions to Teams instead of users?

Because Teams simplify administration and make access management more scalable.

---

### What is the principle of least privilege?

Users should receive only the minimum permissions required to perform their work.

---

### Who typically receives Admin permission?

Usually

- DevOps Engineers
- Platform Engineers
- GitHub Administrators

---

# Marathi Quick Revision

Repository Permission म्हणजे User काय करू शकतो हे ठरवते.

Permission Types

- Read
- Triage
- Write
- Maintain
- Admin

Enterprise मध्ये Permission Team ला दिली जाते.

---

# Marathi Interview Memory Tips

Remember

```
Organization

↓

Teams

↓

Permissions

↓

Repository
```

Interview Formula

```
Least Privilege

+

Teams

+

Repository Permissions

=

Secure Enterprise GitHub
```

---

# Key Takeaways

- Repository Permissions control access to GitHub repositories.
- Enterprises assign permissions through Teams.
- Follow the principle of least privilege.
- Limit Admin access to trusted administrators.
- Regular permission audits improve security and compliance.

