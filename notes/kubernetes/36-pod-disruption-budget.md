# Kubernetes Pod Disruption Budget (PDB)

# 1. Purpose

The purpose of Pod Disruption Budget (PDB) is to ensure that a minimum number of application Pods remain available during voluntary disruptions.

PDB protects application availability during

- Node Maintenance
- Cluster Upgrade
- Node Drain
- Rolling Updates
- Infrastructure Maintenance

Without PDB, all Pods of an application could be terminated simultaneously, causing downtime.

---

# 2. Introduction

Imagine our API Gateway Deployment has

```
5 Pods
```

The Infrastructure Team starts Kubernetes Node Maintenance.

Without PDB

```
Node Drain

↓

All 5 Pods Evicted

↓

Application Down
```

With PDB

```
Node Drain

↓

Only 1 Pod Evicted

↓

4 Pods Continue Serving Traffic

↓

Zero Downtime
```

---

# 3. Enterprise Usage

Pod Disruption Budget is widely used for

- Banking Applications
- Payment Gateways
- Healthcare Systems
- E-Commerce Platforms
- Government Applications
- Enterprise APIs

Every Production Deployment with High Availability should have a PDB.

---

# 4. Usage in THIS Project

```
Frontend

↓

API Gateway (5 Pods)

↓

PDB

↓

Minimum Available

4 Pods
```

Similarly

```
Auth Service

↓

PDB

↓

Minimum Available

2 Pods
```

This ensures service availability during maintenance activities.

---

# 5. Architecture

```
               Deployment

                    │

                    ▼

               5 Running Pods

                    │

                    ▼

         Pod Disruption Budget

                    │

          minAvailable = 4

                    │

          Node Maintenance

                    │

                    ▼

          Only 1 Pod Evicted

                    │

                    ▼

        Application Continues Running
```

---

# 6. Internal Workflow

```
Node Drain

↓

Kubernetes Checks PDB

↓

Enough Pods Available?

↓

YES

↓

Evict Pod

-------------------------

NO

↓

Block Eviction
```

---

# 7. Why Pod Disruption Budget?

Without PDB

```
Rolling Update

↓

All Pods Removed

↓

Downtime
```

With PDB

```
Rolling Update

↓

One Pod Updated

↓

Remaining Pods Running

↓

No Downtime
```

---

# 8. PDB Parameters

## minAvailable

Example

```
Replicas

5

minAvailable

4
```

At least

```
4 Pods
```

must always remain available.

---

## maxUnavailable

Example

```
Replicas

10

maxUnavailable

2
```

Maximum

```
2 Pods
```

can be unavailable simultaneously.

---

Only one of the above is normally configured.

---

# 9. Daily DevOps Activities

- Verify PDB Configuration
- Review Node Maintenance
- Validate Rolling Updates
- Monitor Application Availability
- Check Eviction Events
- Review Replica Count

---

# 10. Production Best Practices

- Configure PDB for all critical applications.
- Ensure sufficient replica count.
- Use RollingUpdate strategy.
- Test Node Drain in non-production.
- Review PDB after scaling changes.
- Monitor disruptions during upgrades.

---

# 11. Security

- Restrict Node Drain permissions.
- Audit maintenance activities.
- Monitor unexpected Pod evictions.
- Apply RBAC.
- Review cluster upgrade plans.

---

# 12. Troubleshooting

List PDB

```bash
kubectl get pdb
```

Describe PDB

```bash
kubectl describe pdb
```

Drain Node

```bash
kubectl drain <node-name>
```

Check Pods

```bash
kubectl get pods
```

View Events

```bash
kubectl get events
```

---

# 13. Real Production Scenarios

## Scenario 1

### Kubernetes Upgrade

Cluster upgrade started.

Without PDB,

multiple API Pods were terminated simultaneously.

Users experienced downtime.

After implementing PDB,

Pods were upgraded gradually without service interruption.

---

## Scenario 2

### Node Maintenance

Infrastructure Team drained a Worker Node.

PDB allowed only one Pod eviction.

Remaining Pods continued serving requests.

No customer impact.

---

## Scenario 3

### Incorrect PDB Configuration

Deployment

```
Replicas

2
```

PDB

```
minAvailable

2
```

Result

Node Drain failed because Kubernetes could not evict any Pod.

Resolution

Reduce minAvailable or increase replica count.

---

# 14. Scenario Interview Questions

Q1. What is Pod Disruption Budget?

Answer

PDB defines how many Pods must remain available during voluntary disruptions.

---

Q2. What is a voluntary disruption?

Answer

Maintenance activities initiated by administrators, such as node drain or cluster upgrades.

---

Q3. Does PDB protect against Node Failure?

Answer

No.

PDB only controls voluntary disruptions.

Unexpected node crashes are not prevented by PDB.

---

Q4. What is the difference between minAvailable and maxUnavailable?

Answer

minAvailable specifies how many Pods must stay available.

maxUnavailable specifies how many Pods may become unavailable.

---

# 15. Architecture Interview Questions

Explain the maintenance flow.

```
Node Drain

↓

PDB Validation

↓

Evict Allowed?

↓

Yes

↓

One Pod Removed

↓

Application Available
```

---

Q2.

Why is PDB important for Production?

Answer

It prevents maintenance activities from causing unnecessary downtime.

---

# 16. Production Support Interview Questions

Production Investigation Flow

```
Maintenance Started

↓

PDB

↓

Deployment

↓

Replica Count

↓

Events

↓

Node Drain

↓

Resolved
```

Manager Question

"We cannot drain a Kubernetes node during today's maintenance."

Expected Answer

- Check Pod Disruption Budget
- Verify Replica Count
- Describe PDB
- Review Events
- Scale Deployment if required
- Retry Node Drain

---

# 17. Related Runbooks

- node-drain-failed.md
- cluster-upgrade.md
- rolling-update.md

---

# 18. Common Incidents

- Node Drain Blocked
- Incorrect minAvailable
- Insufficient Replicas
- Maintenance Delay
- Rolling Update Failure

---

# 19. Commands

```bash
kubectl get pdb

kubectl describe pdb

kubectl drain <node-name>

kubectl get pods

kubectl get events
```

---

# 20. YAML Deep Dive

Example

```yaml
apiVersion: policy/v1
kind: PodDisruptionBudget
metadata:
  name: api-gateway-pdb

spec:
  minAvailable: 4

  selector:
    matchLabels:
      app: api-gateway
```

Explanation

```
minAvailable
```

Minimum number of Pods that must remain available.

```
selector
```

Selects the Pods protected by this PDB.

```
matchLabels
```

Matches the labels of the Deployment Pods.

---

# 21. Marathi Quick Revision

- PDB म्हणजे Pod Disruption Budget.
- Node Maintenance दरम्यान किती Pods चालू राहिले पाहिजेत ते ठरवतो.
- Zero Downtime साठी Production मध्ये वापरतात.
- minAvailable आणि maxUnavailable हे मुख्य Parameters आहेत.
- Node Crash साठी नाही, फक्त Voluntary Disruptions साठी आहे.

---

# 22. Marathi Summary (5+ Years Experience Revision)

## Interview Summary

Pod Disruption Budget Production Availability राखण्यासाठी वापरला जातो.

तो Kubernetes ला Maintenance दरम्यान किती Pods बंद करता येतील हे सांगतो.

Cluster Upgrade, Node Drain आणि Rolling Update मध्ये PDB अत्यंत महत्त्वाचा असतो.

## Production Investigation Flow

```
Node Drain

↓

PDB

↓

Replica Count

↓

Events

↓

Drain

↓

Resolved
```

## Production Story

Production EKS Cluster Upgrade दरम्यान Infrastructure Team ने Worker Nodes Drain करण्यास सुरुवात केली.

API Gateway ला 6 Replicas आणि PDB मध्ये `minAvailable: 5` कॉन्फिगर केले होते.

Kubernetes ने एका वेळी फक्त 1 Pod Evict केला.

Users ना Downtime जाणवला नाही आणि Upgrade यशस्वीपणे पूर्ण झाला.

## Memory Trick

**PDB = Protect During Maintenance**

Remember

**HPA → Scales Pods**

**Cluster Autoscaler → Scales Nodes**

**PDB → Protects Availability**

