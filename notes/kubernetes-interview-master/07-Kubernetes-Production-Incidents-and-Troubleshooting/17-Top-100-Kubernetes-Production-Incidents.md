# Kubernetes Interview Master Handbook

# Section 07 - Kubernetes Production Incidents & Troubleshooting

# Chapter 17 - Top 100 Kubernetes Production Incidents

---

# Objective

Master the 100 most common Kubernetes production incidents that DevOps, SRE and Platform Engineers encounter in real-world enterprise environments.

These incidents are frequently discussed in interviews and occur in production systems across cloud providers.

---

# Category 1 - Pod Incidents

01. CrashLoopBackOff

02. ImagePullBackOff

03. ErrImagePull

04. CreateContainerConfigError

05. CreateContainerError

06. Init Container Failure

07. Pod Pending

08. Pod Stuck Terminating

09. OOMKilled

10. Evicted Pod

---

# Category 2 - Node Incidents

11. Node NotReady

12. Node Memory Pressure

13. Node Disk Pressure

14. PID Pressure

15. Network Unavailable

16. Kubelet Failure

17. Container Runtime Failure

18. Node Reboot

19. Node Crash

20. Node Lost

---

# Category 3 - Deployment Incidents

21. Failed Rollout

22. ReplicaSet Failure

23. Rolling Update Failure

24. Deployment Timeout

25. Failed Rollback

26. Readiness Probe Failure

27. Liveness Probe Failure

28. Startup Probe Failure

29. Replica Mismatch

30. Deployment Drift

---

# Category 4 - Service Incidents

31. Service Unreachable

32. Empty Endpoints

33. Wrong Service Selector

34. ClusterIP Failure

35. NodePort Failure

36. ExternalTrafficPolicy Issue

37. Session Affinity Issue

38. Headless Service Issue

39. EndpointSlice Issue

40. Service Port Mismatch

---

# Category 5 - Ingress Incidents

41. HTTP 404

42. HTTP 502

43. HTTP 503

44. TLS Failure

45. Certificate Expired

46. Invalid Host Rule

47. Invalid Path Rule

48. Ingress Controller Crash

49. LoadBalancer Pending

50. DNS Not Resolving

---

# Category 6 - Networking Incidents

51. CNI Failure

52. Pod-to-Pod Communication Failure

53. Pod-to-Service Failure

54. Service-to-Service Failure

55. NetworkPolicy Blocking Traffic

56. Firewall Blocking Traffic

57. MTU Mismatch

58. IP Address Exhaustion

59. kube-proxy Failure

60. DNS Timeout

---

# Category 7 - Storage Incidents

61. PVC Pending

62. PV Not Bound

63. Volume Mount Failure

64. CSI Driver Failure

65. StorageClass Misconfiguration

66. Disk Full

67. ReadOnly FileSystem

68. Lost PersistentVolume

69. Volume Permission Issue

70. Snapshot Restore Failure

---

# Category 8 - Control Plane Incidents

71. API Server Down

72. Scheduler Failure

73. Controller Manager Failure

74. etcd Failure

75. Certificate Expired

76. Quorum Lost

77. Control Plane Upgrade Failure

78. Static Pod Failure

79. Admission Controller Failure

80. Authentication Failure

---

# Category 9 - Security Incidents

81. RBAC Denied

82. ServiceAccount Failure

83. Secret Missing

84. Secret Rotation Failure

85. Image Vulnerability

86. Privilege Escalation

87. Audit Log Failure

88. Certificate Rotation Failure

89. Unauthorized API Access

90. NetworkPolicy Bypass

---

# Category 10 - Monitoring Incidents

91. Prometheus Down

92. AlertManager Failure

93. Grafana Dashboard Failure

94. Missing Metrics

95. High Alert Volume

96. Log Collection Failure

97. Fluent Bit Failure

98. Loki Failure

99. Jaeger Failure

100. Blackbox Exporter Failure

---

# Enterprise Incident Prioritization

## SEV-1

- API Server Down
- etcd Failure
- Complete Cluster Outage
- Production Application Down
- DNS Failure
- Ingress Failure
- Payment Failure

---

## SEV-2

- Node Failure
- Storage Failure
- Partial Service Failure
- Worker Node Lost
- Monitoring Failure

---

## SEV-3

- Single Pod Failure
- Warning Alerts
- Deployment Delays
- Certificate Expiry Warning

---

# Universal Investigation Workflow

Alert

↓

Business Impact

↓

Monitoring

↓

Cluster

↓

Nodes

↓

Pods

↓

Networking

↓

Storage

↓

Control Plane

↓

Application

↓

Recovery

↓

Validation

↓

RCA

---

# Universal Kubernetes Investigation Commands

## Cluster

```bash
kubectl cluster-info
```

---

## Nodes

```bash
kubectl get nodes
```

---

## Pods

```bash
kubectl get pods -A
```

---

## Events

```bash
kubectl get events -A --sort-by=.metadata.creationTimestamp
```

---

## Services

```bash
kubectl get svc -A
```

---

## Ingress

```bash
kubectl get ingress -A
```

---

## Endpoints

```bash
kubectl get endpoints -A
```

---

## PVC

```bash
kubectl get pvc -A
```

---

## PV

```bash
kubectl get pv
```

---

## Logs

```bash
kubectl logs <pod-name>
```

---

## Describe Pod

```bash
kubectl describe pod <pod-name>
```

---

## Node Utilization

```bash
kubectl top nodes
```

---

## Pod Utilization

```bash
kubectl top pods -A
```

---

# Universal Recovery Workflow

Identify Incident

↓

Confirm Business Impact

↓

Collect Evidence

↓

Review Logs

↓

Confirm Root Cause

↓

Perform Controlled Recovery

↓

Validate Cluster

↓

Validate Applications

↓

Validate Customer Transactions

↓

Close Incident

↓

Complete RCA

---

# Universal Validation Checklist

□ API Server Healthy

□ Nodes Ready

□ Pods Running

□ Services Healthy

□ Endpoints Healthy

□ Ingress Healthy

□ DNS Healthy

□ Storage Healthy

□ Monitoring Healthy

□ Business Transactions Successful

---

# Universal RCA Template

Incident

Severity

Timeline

Root Cause

Contributing Factors

Business Impact

Detection Method

Recovery Actions

Validation

Lessons Learned

Preventive Actions

Owner

Target Date

---

# Interview Questions

## Q1. Which Kubernetes incidents are considered SEV-1?

Answer

Control Plane failures, API Server outages, etcd failures, complete application outages, DNS failures and major Ingress failures affecting customers.

---

## Q2. Which Kubernetes command do you execute first during most incidents?

Answer

```bash
kubectl get pods -A
```

followed by cluster health verification using nodes, events and logs.

---

## Q3. What is the biggest mistake during production incidents?

Answer

Making multiple infrastructure changes before confirming the root cause.

---

## Q4. Why is evidence collection important?

Answer

It enables accurate root cause analysis, supports recovery decisions and improves the quality of the post-incident review.

---

## Q5. What is the final step after every production incident?

Answer

Validate complete service recovery, communicate resolution, perform a blameless RCA and implement preventive actions.

---

# Assignment

Build a production incident matrix covering all 100 incidents.

For each incident include

- Severity
- Symptoms
- Investigation Commands
- Root Cause
- Recovery
- Validation
- Preventive Actions

---

# Assignment Solution

## Step 1

Categorize incidents by infrastructure layer.

---

## Step 2

Define investigation workflow.

---

## Step 3

Map recovery procedures.

---

## Step 4

Define validation criteria.

---

## Step 5

Document RCA template.

---

## Step 6

Create operational runbooks.

---

# Production Best Practices

✔ Maintain Incident Runbooks

✔ Practice Game Days

✔ Monitor MTTR

✔ Track Incident Trends

✔ Automate Alert Correlation

✔ Maintain Accurate Dashboards

✔ Test Disaster Recovery

✔ Conduct Blameless RCAs

✔ Continuously Improve Playbooks

✔ Review Top Incidents Quarterly

---

# Runbook Checklist

□ Incident Categorized

□ Severity Assigned

□ Business Impact Confirmed

□ Evidence Collected

□ Root Cause Confirmed

□ Recovery Executed

□ Validation Completed

□ Customers Verified

□ RCA Completed

□ Preventive Actions Assigned

---

# Common Mistakes

❌ Treating Every Incident as SEV-1

❌ Skipping Business Impact Assessment

❌ Restarting Components Without Investigation

❌ Ignoring Monitoring Data

❌ Applying Multiple Changes Simultaneously

❌ Closing Incidents Without Validation

❌ Missing RCA Documentation

❌ Failing to Update Runbooks

