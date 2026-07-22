# Kubernetes Runbook 17 - Kubernetes API Server Unreachable

# 1. Purpose

This runbook explains how to investigate and recover situations where the Kubernetes API Server becomes unreachable.

The API Server is the control plane entry point for the entire Kubernetes cluster. If it becomes unavailable, cluster management operations stop, deployments cannot occur, controllers stop reconciling desired state, and production operations become severely impacted.

The objective is to restore control plane availability while minimizing business impact and documenting the Root Cause Analysis (RCA).

---

# 2. Scope

Applicable to

- Kubernetes API Server
- Control Plane
- Master Nodes
- HA Control Plane
- Single Control Plane Clusters
- Production Kubernetes Clusters

Supported Platforms

- Kind
- kubeadm
- EKS
- AKS
- GKE
- OpenShift
- On-Prem Kubernetes

---

# 3. Symptoms

Users may report

- Deployment failures
- Unable to scale applications
- Unable to access cluster
- CI/CD deployment failures

Administrators may observe

- kubectl timeout
- kubectl connection refused
- API unavailable
- Cluster management failure

Example

```
kubectl get pods

↓

Unable to connect

↓

API Server Down

↓

Control Plane Impact
```

---

# 4. Business Impact

Critical

- No deployments
- No scaling
- No scheduling
- Controllers stop reconciling
- Production operations blocked

Medium

- Monitoring degradation
- Delayed deployments

Low

- Non-production cluster unavailable

---

# 5. Possible Root Causes

- API Server process crashed
- Master node unavailable
- etcd unavailable
- Certificate expired
- Disk full
- CPU exhaustion
- Memory exhaustion
- Network failure
- Load Balancer issue (HA)
- Firewall issue
- DNS issue

---

# 6. Prerequisites

Required

- kubectl
- SSH access to control plane
- Cluster administrator privileges

Verify

```bash
kubectl cluster-info

kubectl version
```

---

# 7. Initial Investigation

## Step 1

Verify API Server

```bash
kubectl cluster-info
```

Possible output

```
Unable to connect to the server
```

---

## Step 2

Verify Nodes

```bash
kubectl get nodes
```

If API Server is unavailable, command fails.

---

## Step 3

Verify Control Plane

On control plane node

```bash
sudo crictl ps

# or

docker ps
```

Look for

```
kube-apiserver
```

---

## Step 4

Check API Server Status

```bash
sudo systemctl status kubelet
```

---

# 8. Detailed Investigation

## Step 1

Review API Server Logs

Container Runtime

```bash
sudo crictl logs <container-id>
```

or

```bash
docker logs <container-id>
```

Look for

- Authentication failures
- etcd timeout
- Certificate errors
- Disk errors

---

## Step 2

Verify Static Pod

```bash
ls /etc/kubernetes/manifests/
```

Expected

```
kube-apiserver.yaml
```

---

## Step 3

Verify etcd

```bash
sudo crictl ps | grep etcd
```

or

```bash
etcdctl endpoint health
```

---

## Step 4

Verify Disk Space

```bash
df -h
```

Disk full can prevent API Server startup.

---

## Step 5

Verify Certificates

```bash
sudo kubeadm certs check-expiration
```

Look for expired certificates.

---

## Step 6

Verify Node Resources

```bash
top

free -h
```

Check

- CPU
- Memory

---

## Step 7

Verify Network

From worker node

```bash
curl -k https://<api-server>:6443/healthz
```

Expected

```
ok
```

---

## Step 8

Verify Load Balancer (HA)

Check

- Backend targets
- Health checks
- Security groups
- Firewall rules

---

# 9. Resolution Steps

Depending on findings

API Server Crash

Restart kubelet

```bash
sudo systemctl restart kubelet
```

Certificate Expired

Renew certificates.

Disk Full

Free disk space.

etcd Failure

Recover etcd.

Control Plane Node Failure

Recover node or fail over.

Load Balancer Issue

Restore API Server routing.

---

# 10. Validation Steps

Verify

```bash
kubectl cluster-info

kubectl get nodes

kubectl get pods -A
```

Business Validation

- Deployments work
- Scaling works
- CI/CD succeeds
- Monitoring healthy

---

# 11. Rollback Procedure

If outage followed a control plane upgrade

Rollback the control plane using the approved cluster upgrade rollback procedure.

If configuration caused the issue

Restore previous control plane manifests.

Validate cluster health before resuming production deployments.

---

# 12. Escalation Matrix

L1

- Verify connectivity
- Collect logs

↓

L2

- Verify API Server
- Verify etcd

↓

Platform Team

- Control Plane

↓

Infrastructure Team

- Network
- Storage
- Load Balancer

---

# 13. Production Best Practices

- Use HA control planes.
- Monitor API Server latency.
- Monitor certificate expiration.
- Monitor etcd health.
- Backup etcd regularly.
- Monitor disk utilization.
- Never perform control plane maintenance without rollback planning.

---

# 14. Real Production Scenario

A production EKS cluster suddenly stopped accepting deployments.

Investigation

```bash
kubectl cluster-info
```

returned

```
Unable to connect to the server
```

The control plane load balancer health check was incorrectly modified during a firewall change.

After restoring firewall rules, the API Server became reachable again.

Root Cause

Network firewall blocked API Server traffic.

---

# 15. Scenario Interview Questions

## Q1. kubectl commands suddenly fail. What is your first step?

### Answer

Verify

```bash
kubectl cluster-info

kubectl version
```

Determine whether the issue is client connectivity or API Server availability.

---

## Q2. What production components should be investigated first?

### Answer

- API Server
- etcd
- kubelet
- Certificates
- Disk
- Network
- Load Balancer

---

## Q3. Can workloads continue running if the API Server is unavailable?

### Answer

Yes.

Existing Pods generally continue running.

However

- Deployments
- Scaling
- Scheduling
- Configuration changes

cannot be performed until the API Server is restored.

---

# 16. Architecture Interview Questions

## Q1. Explain API Server architecture.

### Answer

```
kubectl

↓

API Server

↓

Authentication

↓

Authorization

↓

Admission Controller

↓

etcd

↓

Controllers

↓

Scheduler

↓

Worker Nodes
```

---

## Q2. Which Kubernetes components depend on the API Server?

### Answer

- Scheduler
- Controller Manager
- kubelet
- kubectl
- Operators
- Argo CD
- Helm
- CI/CD Systems

---

# 17. Production Support Interview Questions

## Q1. Production deployments suddenly stop working. Walk through your investigation.

### Answer

Commands

```bash
kubectl cluster-info

kubectl version

kubectl get nodes

sudo crictl ps

sudo crictl logs <api-server-container>

etcdctl endpoint health

df -h
```

Verify

- API Server
- etcd
- Certificates
- Disk
- Network
- Load Balancer

---

## Q2. What production mistakes commonly cause API Server outages?

### Answer

- Expired certificates
- Disk full
- Firewall changes
- etcd failure
- Control plane upgrade failure
- Load Balancer misconfiguration
- Manual manifest edits

---

# 18. Commands Reference

```bash
kubectl cluster-info

kubectl version

kubectl get nodes

kubectl get pods -A

sudo crictl ps

sudo crictl logs <container-id>

etcdctl endpoint health

df -h

free -h

top

sudo kubeadm certs check-expiration

curl -k https://<api-server>:6443/healthz
```

---

# 19. Marathi Quick Revision

- kubectl cluster-info तपासा.
- API Server चालू आहे का तपासा.
- etcd verify करा.
- Certificates तपासा.
- Disk Space तपासा.
- Network verify करा.
- Load Balancer तपासा.
- Business validation करा.

---

# 20. Related Runbooks

- 04-node-notready.md
- 09-coredns-failure.md
- 14-resource-exhaustion.md
- 18-etcd-backup-and-restore.md
- 19-cluster-disaster-recovery.md

---

# 21. Marathi Summary (5+ Experience Revision)

## Interview Summary

Production मध्ये API Server unavailable झाल्यास प्रथम `kubectl cluster-info` वापरून connectivity verify करावी. त्यानंतर control plane वर API Server process, etcd, certificates, disk space, CPU, memory आणि network connectivity तपासावी. Existing Pods चालू राहू शकतात, पण नवीन deployments, scaling आणि cluster management पूर्णपणे थांबते. Root Cause निश्चित करून API Server restore केल्यानंतर cluster आणि business validation करावी.

### Production Investigation Flow

```
Alert

↓

kubectl cluster-info

↓

API Server

↓

etcd

↓

Certificates

↓

Disk

↓

Resources

↓

Network

↓

Load Balancer

↓

Root Cause

↓

Recovery

↓

Validation

↓

RCA
```

### Production Story

एका production Kubernetes cluster मध्ये release window दरम्यान CI/CD pipelines सतत fail होत होत्या. Existing applications व्यवस्थित चालू होत्या, पण कोणतेही नवीन deployment होत नव्हते. Investigation मध्ये `kubectl cluster-info` fail झाले. Control plane Load Balancer वर चुकीच्या firewall rule मुळे TCP 6443 block झाला होता. Rule restore केल्यानंतर API Server लगेच reachable झाला आणि deployments पुन्हा सुरू झाले. Incident review नंतर firewall changes साठी mandatory health-check validation लागू करण्यात आली.

### 5+ Years Memory Trick

Interview मध्ये जर विचारले,

**"How do you troubleshoot a Kubernetes API Server outage in production?"**

उत्तर:

"I first verify API Server connectivity using `kubectl cluster-info`, then investigate the control plane by checking the API Server process, etcd health, certificates, disk utilization, system resources, network connectivity and load balancer health. After restoring the control plane, I validate cluster operations, business functionality and complete the RCA."

