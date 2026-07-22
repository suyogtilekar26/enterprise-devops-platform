# GitHub Organizations and Teams

# Purpose

Understand how GitHub Organizations and Teams are used to manage repositories, users, and permissions in an enterprise environment.

Organizations and Teams are frequently discussed in DevOps interviews because they simplify repository administration and access control.

---

# Introduction

A GitHub Organization is a centralized account used by a company to manage:

- Repositories
- Users
- Teams
- Permissions
- Billing
- Security
- GitHub Actions
- Audit Logs

Instead of each developer owning repositories, the organization owns them.

---

# Why Organizations are Used

Without Organizations

- Developers own repositories
- Difficult permission management
- No centralized administration
- Poor security
- Difficult auditing

Organizations solve these problems.

---

# What is a Team?

A Team is a group of users inside an Organization.

Permissions are assigned to Teams instead of individual users.

Example

```
Organization

Enterprise

│

├── DevOps Team

├── Backend Team

├── Frontend Team

├── QA Team

└── Security Team
```

---

# Enterprise Structure

```
GitHub Organization

│

├── Repositories

│

├── Teams

│

├── Members

│

├── GitHub Actions

│

├── Secrets

│

└── Audit Logs
```

---

# Organization in THIS Project

```
Organization

Enterprise

│

├── enterprise-devops-platform

│

├── frontend

├── api-gateway

├── auth-service

├── dashboard-service

│

├── DevOps Team

├── Developers

├── QA

└── Security
```

---

# Team Permissions

Typical permissions

| Permission | Description |
|------------|-------------|
| Read | Clone repository |
| Triage | Manage issues |
| Write | Push code |
| Maintain | Repository maintenance |
| Admin | Full control |

---

# Why Teams are Better than Individual Permissions

Instead of

```
Developer A

Developer B

Developer C
```

assigning permissions individually,

assign

```
Backend Team

↓

Write Access
```

Adding or removing members becomes much easier.

---

# Daily DevOps Activities

DevOps Engineers

- Create organizations
- Create teams
- Add repositories
- Add developers
- Remove inactive users
- Configure repository permissions
- Review organization security
- Audit member access

---

# Production Best Practices

Always

- Use Organizations
- Use Teams
- Assign permissions to Teams
- Follow least privilege
- Enable MFA
- Review access regularly
- Remove inactive members
- Enable audit logging

Never

- Give Admin access unnecessarily
- Manage hundreds of users individually
- Share GitHub accounts

---

# Security

Organizations provide

- Centralized user management
- Audit logs
- Team-based permissions
- Security policies
- MFA enforcement
- Repository ownership
- Secret management

---

# Common Problems

Problem

Developer cannot push.

Reason

Not part of the correct Team.

---

Problem

Repository inaccessible.

Reason

Incorrect Team permission.

---

Problem

Developer has too much access.

Reason

Incorrect role assignment.

---

# Troubleshooting

Verify

- Organization membership
- Team membership
- Repository permissions
- User role
- Branch protection
- MFA status

---

# Real Production Scenario

A new DevOps Engineer joins the company.

Instead of granting access to ten repositories individually, the administrator adds the engineer to the **DevOps Team**.

Immediately, the engineer receives the correct permissions for all DevOps repositories, GitHub Actions workflows, and deployment configurations.

This simplifies onboarding and reduces administrative effort.

---

# Interview Questions

### What is a GitHub Organization?

A GitHub Organization is a centralized account used to manage repositories, users, permissions, security, and collaboration for a company.

---

### Why use Organizations instead of personal repositories?

Organizations provide

- Centralized ownership
- Better security
- Easier collaboration
- Audit logs
- Team management

---

### What is a Team?

A Team is a group of users inside an Organization that shares repository permissions.

---

### Why assign permissions to Teams?

Because it simplifies access management and follows enterprise best practices.

---

### Who manages Organizations?

Typically

- DevOps Engineers
- Platform Engineers
- GitHub Administrators
- Engineering Managers

---

# Marathi Quick Revision

Organization म्हणजे कंपनीचे GitHub Account.

Team म्हणजे Users चा Group.

Permission Team ला दिली जाते.

Developer ला Team मध्ये Add केले की सर्व Repository Access मिळतो.

---

# Marathi Interview Memory Tips

Remember

```
Organization

↓

Teams

↓

Repositories

↓

Permissions

↓

Developers
```

Interview Formula

```
Organization

+

Teams

+

Repository Permissions

=

Enterprise GitHub Management
```

---

# Key Takeaways

- Organizations centrally manage enterprise GitHub resources.
- Teams simplify repository permission management.
- Repository access should be assigned through Teams instead of individual users.
- Organizations improve security, scalability, and administration.
- Organizations and Teams are standard practice in enterprise DevOps environments.

