# Kubernetes DaemonSet

# 1. Purpose

The purpose of a DaemonSet is to ensure that exactly one Pod runs on every Kubernetes Node.

Whenever a new Worker Node joins the cluster, Kubernetes automatically schedules a DaemonSet Pod on that Node.

Whenever a Worker Node is removed, the corresponding DaemonSet Pod is also removed.

DaemonSets are mainly used for node-level services.

---

# 2. Introduction

Unlike Deployments or StatefulSets, a DaemonSet is Node-centric instead of Application-centric.

Deployment

```
3 Pods

↓

Any Available Nodes
```

DaemonSet

```
Every Worker Node

↓

One Pod
```

This guarantees that every Node runs the required system service.

---

# 3. Enterprise Usage

DaemonSets are widely used for

- Fluent Bit
- Fluentd
- Filebeat
- Prometheus Node Exporter
- Datadog Agent
- New Relic Agent
- Falco
- CNI Plugins
- CSI Plugins
- Security Monitoring Agents

Almost every Production Kubernetes Cluster has multiple DaemonSets.

---

# 4. Usage in THIS Project

Our Enterprise DevOps Platform will use DaemonSets for

```
Worker Node-1

↓

Node Exporter

↓

Fluent Bit

----------------------------

Worker Node-2

↓

Node Exporter

↓

Fluent Bit

----------------------------

Worker Node-3

↓

Node Exporter

↓

Fluent Bit
```

Every node collects logs and metrics independently.

---

# 5. Architecture

```
             Kubernetes Cluster

      ┌────────────┬────────────┬────────────┐

      ▼            ▼            ▼

 Worker-1      Worker-2      Worker-3

      │            │            │

      ▼            ▼            ▼

 NodeExporter  NodeExporter  NodeExporter

      │            │            │

      ▼            ▼            ▼

  Fluent Bit   Fluent Bit   Fluent Bit
```

Every Worker Node gets exactly one Pod.

---

# 6. Internal Workflow

```
Create DaemonSet

↓

Kubernetes Checks Nodes

↓

Creates One Pod

↓

On Every Node

↓

New Node Added

↓

Automatically Create New Pod

↓

Node Removed

↓

Pod Deleted
```

---

# 7. Why DaemonSet?

Without DaemonSet

```
Worker-1

↓

Monitoring Agent

------------------

Worker-2

↓

No Monitoring

------------------

Worker-3

↓

No Monitoring
```

Cluster visibility becomes incomplete.

With DaemonSet

```
Every Node

↓

Monitoring Agent

↓

Logs

↓

Metrics
```

---

# 8. DaemonSet Characteristics

- One Pod Per Node
- Automatic Scheduling
- Automatic Removal
- Node-Level Services
- Works Across Entire Cluster
- Supports Taints and Tolerations

---

# 9. Daily DevOps Activities

- Verify DaemonSet Health
- Monitor Node Agents
- Check Logs
- Verify Metrics Collection
- Upgrade Monitoring Agents
- Investigate Missing Pods

---

# 10. Production Best Practices

- Run Monitoring Agents using DaemonSets.
- Deploy Log Collectors as DaemonSets.
- Monitor Resource Usage.
- Use Rolling Updates.
- Restrict Privileged Access.
- Monitor DaemonSet Availability.

---

# 11. Security

- Use Least Privilege.
- Limit Host Access.
- Monitor Agent Activity.
- Restrict RBAC Permissions.
- Regularly Update Agent Images.

---

# 12. Troubleshooting

List DaemonSets

```bash
kubectl get daemonsets
```

Describe DaemonSet

```bash
kubectl describe daemonset node-exporter
```

Check Pods

```bash
kubectl get pods -o wide
```

Check Node Status

```bash
kubectl get nodes
```

---

# 13. Real Production Scenarios

## Scenario 1

### New Worker Node Added

A new Worker Node joined the cluster.

Immediately

```
Node Exporter

Fluent Bit
```

Pods were automatically deployed.

No manual action required.

---

## Scenario 2

### Missing Monitoring Agent

Monitoring Dashboard showed one Worker Node without metrics.

Investigation

```bash
kubectl get daemonsets

kubectl get pods -o wide
```

Root Cause

DaemonSet Pod failed to schedule because of Node taints.

Resolution

Configure Tolerations.

---

## Scenario 3

### Fluent Bit Crash

Logs from one Worker Node stopped appearing.

Investigation

```bash
kubectl logs <pod-name>
```

Root Cause

Fluent Bit configuration error.

Resolution

Correct configuration and rollout update.

---

# 14. Scenario Interview Questions

Q1. What is a DaemonSet?

Answer

A DaemonSet ensures that one Pod runs on every Kubernetes Node.

---

Q2. When should DaemonSets be used?

Answer

For node-level services such as monitoring, logging, networking and security agents.

---

Q3. Does a DaemonSet create multiple Pods on one Node?

Answer

Normally, only one Pod per eligible Node.

---

Q4. What happens when a new Node joins the cluster?

Answer

Kubernetes automatically schedules the DaemonSet Pod on the new Node.

---

# 15. Architecture Interview Questions

Explain the architecture.

```
DaemonSet

↓

Every Worker Node

↓

One Pod

↓

Monitoring / Logging
```

---

Q2.

Why is Node Exporter deployed as a DaemonSet?

Answer

Because every Worker Node must expose its own CPU, Memory, Disk and Network metrics.

---

# 16. Production Support Interview Questions

Production Investigation Flow

```
Node Missing Metrics

↓

Check DaemonSet

↓

Check Pod

↓

Check Node

↓

Check Taints

↓

Logs

↓

Resolved
```

Manager Question

"Our monitoring dashboard shows metrics from only two out of three Worker Nodes."

Expected Answer

- Verify DaemonSet
- Verify Pod Scheduling
- Check Node Status
- Check Taints and Tolerations
- Review Agent Logs
- Confirm Metrics Collection

---

# 17. Related Runbooks

- daemonset-pod-not-running.md
- node-exporter-down.md
- fluentbit-log-missing.md

---

# 18. Common Incidents

- DaemonSet Pod Pending
- Agent CrashLoopBackOff
- Missing Node Metrics
- Missing Logs
- Node Taint Scheduling Failure

---

# 19. Commands

```bash
kubectl get daemonsets

kubectl describe daemonset node-exporter

kubectl get pods -o wide

kubectl get nodes

kubectl logs <pod-name>
```

---

# 20. Marathi Quick Revision

- DaemonSet प्रत्येक Worker Node वर एक Pod चालवतो.
- Monitoring Agents DaemonSet मध्ये चालतात.
- Logging Agents DaemonSet मध्ये चालतात.
- नवीन Node आला की Pod आपोआप Deploy होतो.
- Node Delete झाला की Pod देखील Delete होतो.

---

# 21. Marathi Summary (5+ Years Experience Revision)

## Interview Summary

DaemonSet हा Kubernetes Resource आहे जो प्रत्येक Worker Node वर एक Pod चालवतो.

Production मध्ये Node Exporter, Fluent Bit, Filebeat, Datadog Agent, Falco यांसारखे Node-level Components DaemonSet म्हणून Deploy केले जातात.

## Production Investigation Flow

```
Missing Metrics

↓

DaemonSet

↓

Node

↓

Pod

↓

Logs

↓

Resolved
```

## Production Story

Production Monitoring Dashboard मध्ये एका Worker Node चे Metrics दिसत नव्हते.

Investigation मध्ये त्या Node वर Node Exporter DaemonSet Pod Schedule झाला नव्हता.

Node वर चुकीचा Taint असल्यामुळे Scheduling Fail होत होते.

Toleration Update केल्यानंतर DaemonSet Pod Deploy झाला आणि Monitoring पुन्हा Normal झाले.

## Memory Trick

**Deployment = Number of Replicas**

**DaemonSet = Number of Nodes**

Remember

**One Node = One Pod**

