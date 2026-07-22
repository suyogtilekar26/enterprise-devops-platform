# Git Learning Roadmap

## Purpose

This roadmap defines how Git will be learned and implemented in the Enterprise DevOps Platform project.

This is not a generic Git tutorial. Every topic is connected to the actual project and will later be implemented.

Project:

enterprise-devops-platform

Application Stack

- React Frontend
- API Gateway (Flask)
- Auth Service (Flask)
- Dashboard Service (Flask)

The Git workflow documented here will later be used while implementing Docker, Kubernetes, GitHub Actions, Helm, Argo CD, Terraform, AWS, Monitoring and Production deployments.

---

# Learning Goals

By the end of this section you should be able to:

- Design Git workflows for enterprise teams.
- Work with feature, release and hotfix branches.
- Recover deleted commits.
- Resolve merge conflicts.
- Protect production branches.
- Support CI/CD pipelines using Git.
- Handle Git-related production incidents.
- Explain Git architecture during interviews.
- Troubleshoot real-world Git issues.

---

# Learning Order

01. Introduction

02. Installation

03. Git Architecture

04. Repository Structure

05. Branching Strategy

06. Daily DevOps Workflow

07. Release Management

08. Merge Strategies

09. Tags and Versioning

10. Conflict Resolution

11. Enterprise Best Practices

12. Security

13. Troubleshooting

14. Scenario-Based Interview Questions

15. Architecture-Level Interview Questions

16. Production Notes

17. Cheatsheet

---

# Practical Implementation

Every document will later be implemented in this repository.

Examples:

- Create feature branches
- Protect main branch
- Create release branches
- Create hotfix branches
- Resolve merge conflicts
- Tag production releases
- Perform rollbacks

Nothing in these notes will remain theoretical.

---

# Runbooks That Will Be Created

- Recover Deleted Branch
- Recover Lost Commit
- Rollback Production Release
- Resolve Merge Conflict
- Recover After Force Push

---

# Incident Documents That Will Be Created

INC-001 Force Push to Main

INC-002 Deleted Release Branch

INC-003 Wrong Production Tag

INC-004 Merge Conflict During Release

INC-005 Lost Commit Recovery

---

# How This Connects to Our Project

Developer
        │
        ▼
Feature Branch
        │
        ▼
Pull Request
        │
        ▼
Code Review
        │
        ▼
Develop Branch
        │
        ▼
GitHub Actions
        │
        ▼
Docker Image
        │
        ▼
Kind Kubernetes Cluster
        │
        ▼
Helm
        │
        ▼
Argo CD
        │
        ▼
AWS EKS (Future)

Every stage in this workflow will be implemented later in this repository.

---

# Marathi Quick Revision

Git म्हणजे project चा history manager.

आपल्या project मध्ये Git फक्त code save करण्यासाठी वापरणार नाही.

याच Git वरून पुढे:

- GitHub
- GitHub Actions
- Docker
- Kind Kubernetes
- Helm
- Argo CD
- Terraform
- AWS

संपूर्ण DevOps pipeline तयार होणार आहे.

म्हणून Git हा आपल्या project चा पाया (Foundation) आहे.

---

# Marathi Interview Memory Tip

Interview मध्ये Git बद्दल बोलताना फक्त commands सांगू नयेत.

सांगायचं की:

"आमच्या Enterprise DevOps Platform मध्ये Git हा CI/CD pipeline चा starting point आहे. Developer code push करतो, GitHub Actions build करते, Docker image तयार होते, Kind cluster मध्ये deployment होते आणि पुढे AWS EKS वर production deployment होते."

हा flow लक्षात ठेवला तर Git पासून AWS पर्यंतचा संपूर्ण pipeline सहज explain करता येतो.

