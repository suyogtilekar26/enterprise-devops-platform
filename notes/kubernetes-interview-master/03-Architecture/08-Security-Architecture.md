# Kubernetes Interview Master Handbook

# Architecture 08 - Security Architecture

---

# What is Kubernetes Security?

## English

Kubernetes Security protects the cluster, workloads and data from unauthorized access.

Security must be applied at every layer of the cluster.

---

## मराठी

Kubernetes Security म्हणजे Cluster, Applications आणि Data यांचे संरक्षण.

Security प्रत्येक Layer वर लागू केली जाते.

---

# Security Layers

User

↓

Authentication

↓

Authorization

↓

Admission Controllers

↓

API Server

↓

RBAC

↓

Service Accounts

↓

Secrets

↓

Pods

↓

Network Policies

↓

Worker Nodes

---

# Authentication

Purpose

Verify Identity.

Question

Who are you?

Methods

Client Certificates

Bearer Token

OIDC

ServiceAccount Token

Webhook Authentication

---

# Authorization

Purpose

Verify Permissions.

Question

What are you allowed to do?

Authorization Modes

RBAC

ABAC

Node Authorization

Webhook

---

# RBAC

Role Based Access Control

Resources

Role

ClusterRole

RoleBinding

ClusterRoleBinding

---

# RBAC Flow

User

↓

Authentication

↓

RBAC

↓

Permission Check

↓

API Server

↓

Access Granted

OR

Access Denied

---

# Role

Namespace Scoped.

Example

Read Pods only.

---

# ClusterRole

Cluster Wide.

Examples

Nodes

PersistentVolumes

Namespaces

Custom Resources

---

# RoleBinding

Connects

User

↓

Role

Within a Namespace.

---

# ClusterRoleBinding

Connects

User

↓

ClusterRole

Across the Cluster.

---

# Service Account

Purpose

Identity for Pods.

Applications inside Pods use Service Accounts to access Kubernetes APIs.

Default ServiceAccount exists in every Namespace.

---

# Secrets

Purpose

Store Sensitive Data.

Examples

Passwords

API Keys

Certificates

Tokens

SSH Keys

---

# ConfigMap vs Secret

ConfigMap

Non-sensitive configuration.

---

Secret

Sensitive information.

Stored as Kubernetes Secret objects.

---

# Admission Controllers

Purpose

Validate or modify requests before storing them.

Examples

LimitRanger

ResourceQuota

PodSecurity

NamespaceLifecycle

DefaultStorageClass

MutatingAdmissionWebhook

ValidatingAdmissionWebhook

---

# Pod Security Standards

Privileged

Maximum permissions.

---

Baseline

Reasonable default security.

---

Restricted

Most secure.

Recommended for production.

---

# Network Security

Use NetworkPolicies.

Allow only required communication.

Deny everything else by default.

---

# Image Security

Use trusted registries.

Scan images before deployment.

Avoid latest tag.

Sign container images.

---

# Runtime Security

Run as non-root.

Read-only root filesystem.

Drop unnecessary Linux capabilities.

Enable seccomp profiles.

Use AppArmor or SELinux where supported.

---

# Security Workflow

User

↓

Authentication

↓

Authorization

↓

Admission Controllers

↓

RBAC

↓

API Server

↓

Workload Created

↓

Runtime Security

↓

NetworkPolicy

↓

Application Running

---

# Common Security Problems

Overly permissive RBAC

Default ServiceAccount misuse

Secrets exposed

Containers running as root

Untrusted Images

Missing NetworkPolicies

Privilege Escalation

Expired Certificates

---

# Production Incident

Developer received

Forbidden

Error while creating Pods.

Reason

Missing RoleBinding.

Resolution

Create RoleBinding with required permissions.

---

# Another Incident

Application could not access Kubernetes API.

Reason

Incorrect ServiceAccount.

Resolution

Assign correct ServiceAccount to the Pod.

---

# Best Practices

Follow Least Privilege.

Use RBAC.

Never store passwords in ConfigMaps.

Rotate Secrets regularly.

Use Pod Security Standards.

Scan container images.

Enable audit logging.

Restrict privileged containers.

---

# Useful Commands

kubectl auth can-i get pods

---

kubectl get roles

---

kubectl get rolebindings

---

kubectl get clusterroles

---

kubectl get clusterrolebindings

---

kubectl get serviceaccounts

---

kubectl get secrets

---

kubectl describe role ROLE_NAME

---

kubectl describe clusterrole CLUSTERROLE_NAME

---

# Interview Questions

Q1

Difference between Authentication and Authorization?

Answer

Authentication verifies identity.

Authorization verifies permissions.

---

Q2

Difference between Role and ClusterRole?

Answer

Role works within a Namespace.

ClusterRole works across the entire Cluster.

---

Q3

What is RBAC?

Answer

Role-Based Access Control controls access to Kubernetes resources based on assigned roles.

---

Q4

Why are Service Accounts required?

Answer

They provide an identity for Pods to securely communicate with the Kubernetes API.

---

Q5

Why should Secrets be used instead of ConfigMaps?

Answer

Secrets are intended for sensitive data such as passwords, API keys and certificates.

---

# Scenario Based Interview

Question

Developer receives

Error from server (Forbidden)

How will you troubleshoot?

Answer

1. Verify Authentication.

2. Check RBAC.

3. Check RoleBinding.

4. Check ClusterRoleBinding.

5. Verify Namespace.

---

Question

Application cannot access Kubernetes API.

What will you check?

Answer

1. ServiceAccount.

2. RBAC Permissions.

3. Token Availability.

4. RoleBinding.

5. API Server Logs.

---

# Production Troubleshooting Checklist

✔ Authentication

✔ Authorization

✔ RBAC

✔ ServiceAccount

✔ Secrets

✔ Admission Controllers

✔ Pod Security

✔ NetworkPolicy

✔ Image Security

✔ Audit Logs

---

# Senior Engineer Notes

Think about Kubernetes Security in this order:

User

↓

Authentication

↓

Authorization

↓

RBAC

↓

Admission Controllers

↓

API Server

↓

ServiceAccount

↓

Pod Security

↓

NetworkPolicy

↓

Running Workload

Production security is based on the principle of least privilege.

Grant only the permissions that are required and review them regularly.

