# Lab 24 - StorageClass

# 1. Objective

The objective of this lab is to understand how Kubernetes StorageClasses dynamically provision Persistent Volumes.

By the end of this lab you will be able to

- Understand StorageClasses
- View existing StorageClasses
- Create a StorageClass
- Understand dynamic provisioning
- Understand reclaim policies
- Troubleshoot StorageClass issues
- Explain enterprise storage automation

StorageClasses eliminate the need for administrators to manually create Persistent Volumes for every application.

---

# 2. Prerequisites

Complete

- Lab 01 - Lab 23

Verify

```bash
kubectl get nodes

kubectl get storageclass

kubectl get pv

kubectl get pvc
```

---

# 3. Enterprise Usage

Traditional Storage

```
Administrator

↓

Create PV

↓

Application

↓

PVC

↓

PV
```

Dynamic Provisioning

```
Application

↓

PVC

↓

StorageClass

↓

Cloud Storage

↓

PV Created Automatically
```

Benefits

- Automation
- Self-Service Storage
- Standardization
- Cloud Integration
- Faster Deployments

---

# 4. Usage in THIS Project

Future enterprise architecture

```
Grafana

↓

PVC

↓

StorageClass

↓

AWS EBS

↓

Persistent Volume
```

```
Prometheus

↓

PVC

↓

StorageClass

↓

AWS EBS
```

```
Jenkins

↓

PVC

↓

StorageClass

↓

AWS EBS
```

No manual PV creation is required.

---

# 5. Architecture

```
Application

↓

Persistent Volume Claim

↓

StorageClass

↓

Provisioner

↓

Persistent Volume

↓

Storage Backend
```

---

# 6. Step-by-Step Implementation

## Step 1

View Existing StorageClasses

```bash
kubectl get storageclass
```

Expected

```
NAME

standard
```

Depending on your Kind installation, there may not be a default StorageClass.

---

## Step 2

Describe StorageClass

```bash
kubectl describe storageclass
```

Observe

- Provisioner
- Reclaim Policy
- Volume Binding Mode

---

## Step 3

Understand Dynamic Provisioning

In managed Kubernetes services

```
PVC Created

↓

StorageClass Selected

↓

Provisioner Called

↓

Disk Created

↓

PV Created

↓

PVC Bound
```

No manual PV creation is necessary.

---

## Step 4

Kind Cluster Note

A default Kind cluster does **not** include a dynamic storage provisioner.

Therefore

```bash
kubectl get storageclass
```

may show

```
No resources found
```

or a StorageClass that cannot dynamically provision volumes.

This is expected.

---

## Step 5

Inspect Existing PVC

```bash
kubectl get pvc
```

Observe

```
STATUS

Bound
```

if previous lab resources still exist.

---

## Step 6

Inspect Existing PV

```bash
kubectl get pv
```

Observe

Binding relationship.

---

## Step 7

View StorageClass YAML

If a StorageClass exists

```bash
kubectl get storageclass <storageclass-name> -o yaml
```

Observe

- provisioner
- reclaimPolicy
- volumeBindingMode

---

## Step 8

Understand Cloud Provisioners

AWS

```
ebs.csi.aws.com
```

Azure

```
disk.csi.azure.com
```

Google Cloud

```
pd.csi.storage.gke.io
```

NFS

```
nfs.csi.k8s.io
```

Each StorageClass uses a CSI driver.

---

## Step 9

Observe Storage Flow

```
Application

↓

PVC

↓

StorageClass

↓

CSI Driver

↓

Cloud Disk

↓

Persistent Volume

↓

Pod
```

---

## Step 10

Review Storage Resources

```bash
kubectl get storageclass

kubectl get pv

kubectl get pvc
```

Understand how all components work together.

---

# 7. Verification

```bash
kubectl get storageclass

kubectl describe storageclass

kubectl get pv

kubectl get pvc
```

Expected

- StorageClass information available
- PV/PVC relationship understood
- Provisioner identified

---

# 8. Failure Simulation

## Scenario 1

Wrong StorageClass Name

Create a PVC referencing

```
storageClassName: unknown-storage
```

Expected

```
Pending
```

Investigate

```bash
kubectl describe pvc
```

---

## Scenario 2

Provisioner Not Installed

PVC

```
Pending
```

Reason

No CSI driver available.

---

## Scenario 3

Cloud Storage Permission Issue

Expected

PVC remains Pending.

Investigate

```bash
kubectl describe pvc

kubectl get events
```

---

## Scenario 4

Provisioner Failure

Symptoms

- PVC Pending
- No PV Created

Investigate

CSI Driver logs

Storage Controller logs

Cloud Provider logs

---

# 9. Troubleshooting

StorageClasses

```bash
kubectl get storageclass

kubectl describe storageclass
```

PVC

```bash
kubectl get pvc

kubectl describe pvc
```

PV

```bash
kubectl get pv

kubectl describe pv
```

Events

```bash
kubectl get events
```

CSI Components

```bash
kubectl get pods -A | grep csi
```

---

# 10. Production Discussion

Enterprise storage architecture

```
Application

↓

Deployment

↓

PVC

↓

StorageClass

↓

CSI Driver

↓

Cloud Storage API

↓

Persistent Volume

↓

Application
```

StorageClasses are the standard method for dynamic storage provisioning in enterprise Kubernetes environments.

---

# 11. Production Best Practices

- Use CSI drivers only.
- Avoid in-tree storage plugins.
- Use cloud-managed storage.
- Monitor storage provisioning.
- Separate StorageClasses for different workloads.
- Define reclaim policies carefully.
- Use encrypted storage.
- Monitor storage latency and capacity.

---

# 12. Real Production Scenario

An enterprise deployed hundreds of Jenkins agents daily.

Each agent automatically requested a Persistent Volume Claim.

The StorageClass dynamically provisioned AWS EBS volumes within seconds, allowing CI jobs to start without any manual storage administration.

---

# 13. Scenario Interview Questions

Q1. What is a StorageClass?

Q2. Why is StorageClass required?

Q3. What is dynamic provisioning?

Q4. What is a CSI driver?

Q5. Why is StorageClass preferred over manually created PVs?

---

# 14. Architecture Interview Questions

Q1. Explain StorageClass architecture.

Q2. Explain CSI architecture.

Q3. Explain dynamic provisioning workflow.

Q4. Explain reclaim policies.

---

# 15. Production Support Interview Questions

Q1. PVC remains Pending. What do you investigate?

Q2. StorageClass exists but no PV is created. Why?

Q3. How do you troubleshoot CSI driver issues?

Q4. How do you monitor storage provisioning failures?

---

# 16. Cleanup

No cleanup required.

If previous lab resources exist

```bash
kubectl delete pvc demo-pvc

kubectl delete pv demo-pv
```

---

# 17. Important Commands

```bash
kubectl get storageclass

kubectl describe storageclass

kubectl get pvc

kubectl describe pvc

kubectl get pv

kubectl describe pv

kubectl get events

kubectl get pods -A | grep csi
```

---

# 18. Marathi Quick Revision

- StorageClass dynamic storage provisioning साठी वापरतात.
- Application फक्त PVC तयार करते.
- CSI Driver storage तयार करतो.
- Production मध्ये StorageClass वापरणे ही standard पद्धत आहे.
- Manual PV creation टाळली जाते.

---

# 19. Enterprise Learning Outcome

After completing this lab you should be able to

- Explain StorageClasses
- Understand dynamic provisioning
- Explain CSI drivers
- Troubleshoot StorageClass issues
- Understand enterprise storage automation
- Prepare for StatefulSet deployments

---

# 20. Next Lab

```
25-statefulset-lab.md
```

In the next lab we will deploy StatefulSets, understand stable identities and persistent storage for stateful workloads, and implement enterprise database deployment patterns.

---

# 21. Marathi Summary (5+ Experience Revision)

## Interview Summary

StorageClass हा Kubernetes मधील storage provisioning template आहे. Application PVC तयार करते आणि StorageClass संबंधित CSI driver वापरून cloud किंवा enterprise storage वर नवीन Persistent Volume आपोआप तयार करतो. त्यामुळे administrators ना प्रत्येक application साठी manually PV तयार करण्याची गरज राहत नाही.

### Production Investigation Flow

```
Application

↓

PVC

↓

StorageClass

↓

CSI Driver

↓

Cloud Storage API

↓

Persistent Volume

↓

Pod
```

### Production Story

एका production EKS cluster मध्ये दररोज शेकडो CI workloads सुरू होत होते. प्रत्येक workload स्वतःचा PVC तयार करत होता. AWS EBS CSI StorageClass काही सेकंदांत नवीन disk तयार करून PV provision करत होता. Manual intervention शिवाय storage provisioning पूर्ण होत असल्यामुळे deployment pipeline अत्यंत वेगवान आणि scalable झाली.

### 5+ Years Memory Trick

Interview मध्ये जर विचारले,

**"Why do enterprises use StorageClasses?"**

उत्तर:

"StorageClasses enable dynamic storage provisioning. Instead of manually creating Persistent Volumes, applications request storage through PVCs and Kubernetes automatically provisions the required storage using CSI drivers, making deployments faster, scalable and cloud independent."

