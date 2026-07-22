# Kubernetes Production Incident 14 - Kubernetes API Server Outage

# 1. Incident Overview

## Incident ID

INC-K8S-014

## Severity

SEV-0

## Environment

Production

## Reported By

Prometheus Alertmanager

## Incident Time

03:18 AM

## Resolved Time

04:11 AM

## Duration

53 Minutes

## Affected Component

Kubernetes API Server

## Impacted Services

Entire Kubernetes Control Plane

## Impacted Application

Enterprise DevOps Platform

```
Users

↓

Ingress

↓

Applications

↓

Worker Nodes

↓

API Server ❌

↓

etcd
```

---

# 2. Business Impact

Customer Impact

- New deployments failed
- Autoscaling stopped
- Rolling updates failed
- Operational visibility reduced

Business Impact

- Production releases blocked
- Incident response delayed
- Kubernetes management unavailable
- Risk of prolonged outage

Estimated Revenue Impact

Critical

---

# 3. Alert Received

Prometheus Alert

```
KubeAPIDown

Severity

Critical

Cluster

Production
```

Grafana Dashboard

```
API Availability

0%

API Latency

Timeout

Control Plane

Unavailable
```

kubectl Output

```
Unable to connect to the server:

dial tcp

connection refused
```

---

# 4. Production Architecture

```
GitHub Actions

↓

Argo CD

↓

API Server

↓

Scheduler

↓

Controller Manager

↓

Worker Nodes
```

---

# 5. Symptoms

Observed

- kubectl commands timing out
- Deployments failed
- HPA stopped working
- Nodes still serving existing workloads
- Monitoring partially degraded

Users observed

- Existing applications mostly working
- New deployments impossible
- Configuration updates unavailable

---

# 6. Initial Investigation

Objective

Determine whether issue is related to

- API Server
- etcd
- Network
- Certificates
- Resource exhaustion
- Control Plane node failure

Commands

```bash
kubectl get nodes

kubectl cluster-info

kubectl get pods -A
```

Observation

```
Unable to connect to server
```

---

# 7. Investigation Timeline

## 03:18

Critical alert received.

---

## 03:20

Engineering unable to execute any kubectl command.

```
connection refused
```

---

## 03:24

Connected directly to Control Plane node.

Verified API Server process.

```bash
sudo crictl ps

sudo systemctl status kubelet
```

---

## 03:29

Verified static Pods.

```bash
ls /etc/kubernetes/manifests
```

Observed

```
kube-apiserver.yaml present
```

---

## 03:33

Reviewed kubelet logs.

```bash
journalctl -u kubelet
```

Observed repeated API Server restart attempts.

---

## 03:37

Reviewed API Server logs.

```bash
crictl logs <api-server-container-id>
```

Observed

```
Unable to connect to etcd
```

---

## 03:42

Verified etcd health.

```bash
ETCDCTL_API=3 etcdctl endpoint health
```

Observed

```
Unhealthy
```

---

## 03:46

Restarted etcd after confirming storage health.

Verified successful recovery.

---

## 03:52

API Server automatically reconnected.

---

## 03:57

Validated kubectl connectivity.

```bash
kubectl get nodes
```

Successful.

---

## 04:05

Validated workloads.

---

## 04:11

Incident closed.

---

# 8. Commands Executed

Control Plane

```bash
kubectl cluster-info

kubectl get componentstatuses

kubectl get nodes
```

Kubelet

```bash
systemctl status kubelet

journalctl -u kubelet
```

Containers

```bash
crictl ps

crictl logs
```

etcd

```bash
ETCDCTL_API=3 etcdctl endpoint health

ETCDCTL_API=3 etcdctl endpoint status
```

System

```bash
df -h

free -m

top
```

---

# 9. Findings

Infrastructure

Healthy

Worker Nodes

Healthy

Applications

Running

API Server

Unavailable

Root Issue

API Server unable to communicate with etcd.

---

# 10. Root Cause

The API Server itself was healthy.

However, etcd became unavailable because of an internal storage issue.

Since Kubernetes stores all cluster state inside etcd, the API Server could not process requests.

Applications already running on worker nodes continued serving traffic, but all control plane operations stopped.

---

# 11. Resolution

Verified Control Plane.

Recovered etcd.

Validated API Server connectivity.

Verified cluster health.

Confirmed deployments and autoscaling resumed.

---

# 12. Validation

Cluster

```bash
kubectl get nodes

kubectl get pods -A
```

Business

- Applications available
- Deployments successful
- HPA functioning
- Monitoring restored

Monitoring

- API alerts cleared
- Control Plane healthy
- Cluster stable

---

# 13. Rollback

If recovery unsuccessful

- Restore etcd snapshot.
- Recover Control Plane.
- Rejoin API Server.
- Validate cluster state.
- Resume production traffic.

---

# 14. Customer Communication

Initial Update

> We are investigating an issue affecting Kubernetes management operations. Existing customer traffic is largely unaffected.

Progress Update

> The issue has been isolated to the Kubernetes Control Plane. Recovery activities are underway.

Resolution

> Kubernetes management services have been fully restored. Cluster stability has been confirmed.

---

# 15. Incident Timeline

```
03:18

Alert

↓

03:24

Control Plane Investigation

↓

03:33

Kubelet Logs

↓

03:37

API Server Logs

↓

03:42

etcd Investigation

↓

03:46

Recovery

↓

03:57

API Restored

↓

04:11

Incident Closed
```

---

# 16. Root Cause Analysis (RCA)

## What Happened?

Kubernetes API Server became unavailable.

## Why?

The API Server lost communication with etcd.

## Why wasn't it detected earlier?

Early warning alerts for etcd latency were not configured.

## Customer Impact

Cluster management unavailable while existing workloads largely continued running.

## Preventive Action

Implement etcd health monitoring, storage monitoring and automated Control Plane validation.

---

# 17. Preventive Actions

- Monitor etcd latency.
- Monitor API Server latency.
- Enable Control Plane dashboards.
- Test etcd backup restoration regularly.
- Configure storage alerts.
- Perform Control Plane health checks every few minutes.
- Practice disaster recovery exercises.

---

# 18. Production Best Practices

- Never restart API Server before identifying the root cause.
- Verify etcd health first.
- Keep recent etcd snapshots.
- Separate Control Plane and Worker monitoring.
- Test Control Plane recovery quarterly.
- Maintain documented recovery procedures.

---

# 19. Production Support Interview Questions

## Q1. How do you investigate an API Server outage?

### Answer

1. Verify business impact.
2. Confirm kubectl connectivity.
3. Check kubelet status.
4. Review API Server logs.
5. Verify static Pods.
6. Check etcd health.
7. Validate infrastructure resources.
8. Recover the underlying dependency.
9. Validate cluster functionality.
10. Complete RCA.

---

## Q2. Will running Pods immediately stop if the API Server is down?

### Answer

No.

Existing Pods usually continue running because kubelets manage already scheduled workloads locally.

However, deployments, scaling, scheduling, configuration updates and most Kubernetes management operations stop until the API Server is restored.

---

## Q3. Why is etcd critical for the API Server?

### Answer

etcd is Kubernetes' source of truth. The API Server reads and writes all cluster state to etcd. If etcd becomes unavailable, the API Server cannot process cluster operations.

---

# 20. Marathi Quick Revision

- kubectl verify करा.
- Control Plane तपासा.
- kubelet logs तपासा.
- API Server logs तपासा.
- etcd health verify करा.
- Root Cause शोधा.
- Recovery करा.
- Business validation करा.
- RCA तयार करा.

---

# 21. Marathi Summary (5+ Experience Revision)

## Interview Summary

Production मध्ये API Server outage आल्यास प्रथम business impact समजून घ्यावा. त्यानंतर kubectl connectivity, kubelet status, API Server logs आणि static Pods तपासावेत. त्यानंतर etcd health verify करून Root Cause निश्चित करावा. Recovery झाल्यानंतर cluster health, workloads, deployments आणि monitoring validate करून RCA पूर्ण करावी.

### Production Investigation Flow

```
Alert

↓

kubectl Failure

↓

Control Plane

↓

API Server Logs

↓

kubelet

↓

etcd Health

↓

Root Cause

↓

Recovery

↓

Business Validation

↓

RCA
```

### Production Story

एका production fintech Kubernetes cluster मध्ये पहाटे अचानक सर्व `kubectl` commands timeout होऊ लागले. सुरुवातीला API Server crash झाला असे वाटले, पण investigation मध्ये API Server सतत etcd शी connect होण्याचा प्रयत्न करत असल्याचे दिसले. Storage latency मुळे etcd unhealthy झाले होते. etcd recovery आणि health validation नंतर API Server आपोआप recover झाला. Worker nodes वरील applications संपूर्ण incident दरम्यान चालूच होत्या, परंतु deployments, scaling आणि configuration changes पूर्णपणे थांबले होते. Incident नंतर etcd latency alerts आणि quarterly Control Plane DR drills अनिवार्य करण्यात आल्या.

### 5+ Years Memory Trick

Interview मध्ये जर विचारले,

**"How do you troubleshoot a Kubernetes API Server outage in production?"**

उत्तर:

"I first assess the business impact, verify API connectivity using kubectl, inspect the Control Plane components, review kubelet and API Server logs, validate etcd health, identify the underlying dependency failure, recover the Control Plane safely, confirm cluster functionality, monitor stability, and complete the RCA."

