# Kubernetes Interview Master Handbook

# Production Incident 03 - ImagePullBackOff

---

# Incident

Deployment created successfully.

Pod created successfully.

Scheduler assigned a Node.

Container never starts.

Status

ImagePullBackOff

Application is unavailable.

---

# What is ImagePullBackOff?

## English

ImagePullBackOff means Kubernetes cannot download the container image.

Kubelet keeps retrying with increasing delay.

---

## मराठी

ImagePullBackOff म्हणजे Kubernetes ला Container Image Registry मधून डाउनलोड करता येत नाही.

Kubelet वारंवार प्रयत्न करतो पण Image मिळत नाही.

---

# Image Pull Flow

Deployment

↓

Scheduler

↓

Kubelet

↓

Contact Registry

↓

Download Image

↓

Container Starts

If download fails

↓

Retry

↓

Back-off

↓

ImagePullBackOff

---

# Difference

ErrImagePull

↓

First image pull attempt failed.

---

ImagePullBackOff

↓

Kubernetes keeps retrying after the failure.

---

# Common Reasons

Wrong Image Name

Wrong Image Tag

Private Registry Authentication Failure

Image Deleted

Registry Down

Network Issue

Docker Hub Rate Limit

Invalid imagePullSecrets

Typing Mistake

---

# Step 1

Check Pod

kubectl get pods

Example

frontend

0/1

ImagePullBackOff

---

# Step 2

Describe Pod

kubectl describe pod POD_NAME

Always read Events.

---

# Example Event

Failed to pull image

"frontend:v2"

Image not found

Meaning

Wrong Image Tag.

---

Another Example

Unauthorized

authentication required

Meaning

Private Registry credentials are incorrect.

---

Another Example

Manifest unknown

Meaning

Requested tag does not exist.

---

# Step 3

Verify Image

kubectl get deployment frontend -o yaml

Check

image:

Repository

Tag

Spelling

---

# Step 4

Verify Registry

Docker Hub

Amazon ECR

Azure ACR

Google Artifact Registry

JFrog Artifactory

Harbor

---

# Step 5

Check imagePullSecrets

kubectl get secrets

kubectl describe secret SECRET_NAME

Verify

Username

Password

Registry Server

---

# Step 6

Verify Node Network

Can Worker Node reach Registry?

Check

DNS

Internet

Firewall

Proxy

---

# Docker Hub Rate Limit

Anonymous pulls are limited.

Large clusters may hit pull limits.

Solution

Authenticate

OR

Use Private Registry.

---

# Production Incident

Developer

Image

frontend:v2

Actual Image

frontend:v1

Deployment successful.

Pod

ImagePullBackOff

Reason

Wrong Tag.

---

# Another Incident

Private Registry password expired.

Every Deployment failed.

Reason

Authentication failure.

Resolution

Update imagePullSecrets.

Redeploy Pods.

---

# Troubleshooting Flow

ImagePullBackOff

↓

Describe Pod

↓

Events

↓

Wrong Image?

↓

Wrong Tag?

↓

Registry Reachable?

↓

Authentication?

↓

Image Exists?

↓

Redeploy

---

# Useful Commands

kubectl get pods

---

kubectl describe pod POD_NAME

---

kubectl get deployment -o yaml

---

kubectl get secret

---

kubectl describe secret SECRET_NAME

---

# Best Practices

Never use latest tag.

Use immutable image versions.

Validate image before deployment.

Store images in private registry.

Rotate registry credentials.

Monitor image pull failures.

---

# Interview Questions

Q1

Difference between ErrImagePull and ImagePullBackOff?

Answer

ErrImagePull is the first image pull failure.

ImagePullBackOff is the retry state after repeated failures.

---

Q2

Which command do you use first?

Answer

kubectl describe pod POD_NAME

Read the Events section.

---

Q3

Most common reason?

Answer

Wrong image name or wrong image tag.

---

Q4

How do you troubleshoot?

Answer

1. Describe Pod

2. Check Events

3. Verify Image

4. Verify Registry

5. Verify imagePullSecrets

6. Verify Network

7. Verify Image Tag

---

Q5

How do private registries work?

Answer

Kubernetes uses imagePullSecrets to authenticate before downloading images.

---

# Production Troubleshooting Checklist

✔ kubectl get pods

✔ kubectl describe pod

✔ Verify Image Name

✔ Verify Image Tag

✔ Verify Registry

✔ Verify imagePullSecrets

✔ Verify Network Connectivity

✔ Verify Registry Credentials

✔ Verify Image Exists

---

# Senior Engineer Notes

Always read the Events section before making changes.

Most ImagePullBackOff issues are configuration problems, not Kubernetes problems.

Never assume the image exists—verify it.

Treat container images as immutable artifacts and use versioned tags.

