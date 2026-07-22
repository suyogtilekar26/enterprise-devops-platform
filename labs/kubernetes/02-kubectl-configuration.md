# Lab 02 - kubectl Configuration

# 1. Objective

The objective of this lab is to understand how `kubectl` communicates with Kubernetes clusters using the kubeconfig file.

By the end of this lab you will be able to

- Understand kubeconfig
- Manage contexts
- Switch clusters
- Verify namespaces
- View cluster information
- Troubleshoot kubectl connectivity

This is one of the most important daily skills for a DevOps Engineer.

---

# 2. Prerequisites

Complete

- Lab 01 - Kind Cluster Installation

Verify

```bash
kind get clusters

kubectl version --client

kubectl cluster-info
```

Ensure the Kind cluster is running.

---

# 3. Enterprise Usage

In enterprise environments engineers often manage multiple Kubernetes clusters.

Example

```
Development

↓

QA

↓

UAT

↓

Production

↓

Disaster Recovery
```

Using the wrong cluster can accidentally impact production.

Understanding kubectl configuration is therefore critical.

---

# 4. Usage in THIS Project

Throughout this repository we will use kubectl to interact with

```
Kind Cluster

↓

Namespaces

↓

Deployments

↓

Pods

↓

Services

↓

Ingress

↓

Helm

↓

Argo CD
```

Every Kubernetes operation will use kubectl.

---

# 5. Architecture

```
kubectl

↓

kubeconfig

↓

Current Context

↓

API Server

↓

Kubernetes Cluster
```

kubeconfig tells kubectl

- Which cluster
- Which user
- Which namespace
- Which authentication method

to use.

---

# 6. Step-by-Step Implementation

## Step 1

Display kubectl version

```bash
kubectl version --client
```

---

## Step 2

Locate kubeconfig

```bash
echo $HOME/.kube/config
```

Verify

```bash
ls -l ~/.kube/config
```

---

## Step 3

Display current context

```bash
kubectl config current-context
```

Expected

```
kind-enterprise-devops
```

---

## Step 4

View all contexts

```bash
kubectl config get-contexts
```

Expected

```
CURRENT

NAME

CLUSTER

AUTHINFO
```

---

## Step 5

View complete configuration

```bash
kubectl config view
```

Observe

- clusters
- contexts
- users

---

## Step 6

Display cluster information

```bash
kubectl cluster-info
```

---

## Step 7

Display namespaces

```bash
kubectl get namespaces
```

Expected

```
default

kube-system

kube-public

kube-node-lease
```

---

## Step 8

Display current namespace

```bash
kubectl config view --minify | grep namespace
```

If no namespace is configured, kubectl uses

```
default
```

---

## Step 9

Create a new namespace

```bash
kubectl create namespace enterprise
```

Verify

```bash
kubectl get namespaces
```

---

## Step 10

Set default namespace

```bash
kubectl config set-context --current --namespace=enterprise
```

Verify

```bash
kubectl config view --minify | grep namespace
```

---

## Step 11

Return to default namespace

```bash
kubectl config set-context --current --namespace=default
```

---

# 7. Verification

Verify context

```bash
kubectl config current-context
```

Verify namespace

```bash
kubectl config view --minify
```

Verify cluster

```bash
kubectl cluster-info
```

Verify nodes

```bash
kubectl get nodes
```

---

# 8. Failure Simulation

## Scenario 1

Wrong context selected.

Check

```bash
kubectl config current-context
```

Switch

```bash
kubectl config use-context kind-enterprise-devops
```

---

## Scenario 2

Connection refused

```bash
kubectl get nodes
```

Possible causes

- Cluster deleted
- Docker stopped
- Wrong kubeconfig

Investigation

```bash
kind get clusters

docker ps

kubectl config view
```

---

## Scenario 3

Wrong namespace

Pods appear missing.

Verify

```bash
kubectl get pods

kubectl get pods -A
```

Root Cause

kubectl is pointing to a different namespace.

---

# 9. Troubleshooting

Current context

```bash
kubectl config current-context
```

All contexts

```bash
kubectl config get-contexts
```

Switch context

```bash
kubectl config use-context <context-name>
```

View configuration

```bash
kubectl config view
```

Check namespace

```bash
kubectl config view --minify
```

---

# 10. Production Discussion

Production engineers frequently manage multiple clusters.

Example

```
company-dev

company-qa

company-stage

company-prod

company-dr
```

A common production mistake is deploying to the wrong cluster.

Always verify the current context before executing commands.

---

# 11. Production Best Practices

- Always verify current context.
- Never assume the active cluster.
- Use meaningful context names.
- Restrict production access.
- Keep kubeconfig secure.
- Back up kubeconfig.
- Review current namespace before applying manifests.

---

# 12. Real Production Scenario

A deployment intended for the development cluster was accidentally applied to production because the engineer forgot to switch contexts.

Although the deployment succeeded technically, production users experienced unexpected behavior during business hours.

After RCA, the organization introduced mandatory context verification before every deployment and added context validation to deployment scripts.

---

# 13. Scenario Interview Questions

Q1. What is kubeconfig?

Q2. How does kubectl know which cluster to connect to?

Q3. How do you switch between multiple Kubernetes clusters?

Q4. What happens if the wrong context is selected?

---

# 14. Architecture Interview Questions

Q1. Explain the relationship between kubectl, kubeconfig and the API Server.

Q2. What information is stored inside kubeconfig?

Q3. Can multiple clusters exist in one kubeconfig file?

---

# 15. Production Support Interview Questions

Q1. kubectl is connecting to the wrong cluster. How will you investigate?

Q2. Why should engineers always verify the current context?

Q3. How do you determine whether namespace selection is causing missing resources?

---

# 16. Cleanup

Delete the lab namespace

```bash
kubectl delete namespace enterprise
```

Reset namespace

```bash
kubectl config set-context --current --namespace=default
```

Verify

```bash
kubectl get namespaces
```

---

# 17. Important Commands

```bash
kubectl config current-context

kubectl config get-contexts

kubectl config use-context

kubectl config view

kubectl cluster-info

kubectl get namespaces

kubectl create namespace enterprise

kubectl config set-context --current --namespace=enterprise
```

---

# 18. Marathi Quick Revision

- kubeconfig मध्ये cluster configuration असते.
- Context म्हणजे cluster + user + namespace.
- kubectl API Server शी kubeconfig वापरून connect होतो.
- Production मध्ये command चालवण्यापूर्वी context verify करणे आवश्यक आहे.
- Namespace चुकीचा असल्यास resources दिसणार नाहीत.

---

# 19. Enterprise Learning Outcome

After this lab you should be able to

- Read kubeconfig
- Manage contexts
- Switch clusters safely
- Configure namespaces
- Troubleshoot kubectl connectivity
- Avoid common production mistakes

---

# 20. Next Lab

```
03-cluster-verification.md
```

In the next lab we will learn how to perform a complete Kubernetes cluster health verification similar to the daily checks performed by production DevOps teams.

---

# 21. Marathi Summary (5+ Experience Revision)

## Interview Summary

`kubectl` हे Kubernetes चे command-line interface आहे आणि ते `kubeconfig` वापरून योग्य cluster शी जोडले जाते. Senior DevOps Engineer ने कोणतीही deployment किंवा troubleshooting सुरू करण्यापूर्वी current context आणि namespace verify करणे ही production discipline असते.

### Production Investigation Flow

```
kubectl Command

↓

Current Context

↓

Namespace

↓

Cluster Reachable?

↓

API Server

↓

Nodes

↓

Resources

↓

Proceed
```

### Production Story

एका production deployment दरम्यान engineer ने `kubectl apply` चालवले, पण नंतर लक्षात आले की current context production cluster होता. Deployment त्वरित rollback करावा लागला. त्या घटनेनंतर प्रत्येक deployment script मध्ये context validation आणि confirmation step जोडण्यात आली, ज्यामुळे अशा चुका पुन्हा झाल्या नाहीत.

### 5+ Years Memory Trick

Interview मध्ये जर विचारले,

**"What is the first thing you check before running kubectl commands?"**

उत्तर:

"I always verify the current context, namespace and target cluster using `kubectl config current-context` and `kubectl config get-contexts` before executing any change, especially in production."

