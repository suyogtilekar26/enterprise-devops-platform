# Kubernetes Observability

# 1. Purpose

The purpose of this document is to understand how to observe, monitor, troubleshoot, and analyze applications and infrastructure running inside a Kubernetes cluster.

Observability helps DevOps teams answer questions like

- Is the application healthy?
- Is the cluster healthy?
- Why is the application slow?
- Why did a Pod restart?
- Which node is overloaded?
- Where is the bottleneck?
- What happened before the incident?

Without observability, Kubernetes becomes a black box.

---

# 2. Introduction

Monitoring tells us **something is wrong.**

Observability tells us **why it is wrong.**

Modern Kubernetes observability consists of

- Metrics
- Logs
- Traces
- Events
- Alerts

These together provide complete visibility into production workloads.

---

# 3. Enterprise Usage

Every enterprise Kubernetes cluster implements an observability platform.

Common Stack

```
Application

↓

Metrics

↓

Prometheus

↓

Alertmanager

↓

Grafana

↓

DevOps Team
```

Logging

```
Application

↓

Fluent Bit

↓

Loki / Elasticsearch

↓

Grafana / Kibana
```

Tracing

```
Application

↓

OpenTelemetry

↓

Jaeger

↓

Grafana
```

---

# 4. Usage in THIS Project

Our Enterprise DevOps Platform

```
Frontend

↓

API Gateway

↓

Auth Service

↓

Dashboard Service

↓

Prometheus

↓

Grafana

↓

Loki

↓

Alertmanager

↓

DevOps Team
```

Later we will deploy

- kube-state-metrics
- node-exporter
- Prometheus
- Grafana
- Loki
- Alertmanager
- OpenTelemetry

---

# 5. Observability Architecture

```
Users

↓

Application

↓

Pods

↓

Node

↓

Metrics

↓

Logs

↓

Events

↓

Traces

↓

Prometheus

↓

Grafana

↓

Alerts

↓

DevOps Engineer
```

---

# 6. Internal Workflow

Application Running

↓

Metrics Generated

↓

Logs Generated

↓

Events Generated

↓

Prometheus Scrapes Metrics

↓

Loki Collects Logs

↓

Grafana Visualizes

↓

Alertmanager Sends Alerts

↓

Engineer Investigates

↓

Root Cause Analysis

---

# 7. Daily DevOps Activities

Daily monitoring

```bash
kubectl top nodes

kubectl top pods

kubectl get events -A

kubectl logs
```

Review

- CPU
- Memory
- Disk
- Network
- Pod Restarts
- Failed Deployments
- Alerts
- Node Health

---

# 8. Production Best Practices

- Monitor everything.
- Alert only on actionable events.
- Avoid alert fatigue.
- Collect metrics and logs centrally.
- Keep dashboards simple.
- Retain logs based on compliance.
- Monitor infrastructure and applications together.
- Review alerts regularly.

---

# 9. Security

Observability systems may collect

- Secrets in logs
- User information
- API requests
- Internal IPs

Best Practices

- Mask sensitive data
- Encrypt log transport
- Apply RBAC
- Secure Grafana
- Limit dashboard access

---

# 10. Components

## Prometheus

Collects metrics.

Examples

- CPU
- Memory
- Requests
- Latency

---

## Grafana

Visualizes dashboards.

Examples

- Cluster Dashboard
- Node Dashboard
- Pod Dashboard
- API Dashboard

---

## Alertmanager

Sends alerts through

- Email
- Slack
- Microsoft Teams
- PagerDuty

---

## Loki

Stores application logs.

---

## Fluent Bit

Collects logs from Pods.

---

## OpenTelemetry

Collects telemetry data.

---

## Jaeger

Visualizes distributed tracing.

---

# 11. Real Production Scenarios

## Scenario 1

Users report slow application.

Investigation

Grafana

↓

CPU Usage

↓

Memory Usage

↓

Latency

Root Cause

High CPU on one node.

---

## Scenario 2

Application restarted.

Investigation

Prometheus

↓

Pod Restarts

↓

Logs

Root Cause

OOMKilled.

---

## Scenario 3

API latency increased.

Investigation

Tracing

↓

Jaeger

Root Cause

Database query taking 8 seconds.

---

## Scenario 4

Users cannot login.

Investigation

Grafana

↓

Loki

↓

Application Logs

↓

Ingress Metrics

Root Cause

Authentication service timeout.

---

# 12. Scenario Interview Q&A

### Q1. Difference between Monitoring and Observability?

Monitoring tells what failed.

Observability explains why it failed.

---

### Q2. Which tool stores metrics?

Prometheus.

---

### Q3. Which tool stores logs?

Loki.

---

### Q4. Which tool visualizes dashboards?

Grafana.

---

# 13. Architecture Interview Q&A

### Q1. Why collect metrics and logs separately?

Metrics identify abnormal behavior.

Logs explain the reason.

---

### Q2. Why is tracing important?

It identifies delays across microservices.

---

# 14. Production Support Interview Q&A

### Q1. Production application is slow.

Investigation

Metrics

↓

Logs

↓

Tracing

↓

Database

↓

RCA

---

### Q2. CPU suddenly reaches 95%.

Investigation

- Node Metrics
- Pod Metrics
- Recent Deployments
- Logs

---

# 15. Related Runbooks

- High CPU
- High Memory
- Alert Investigation
- Grafana Down
- Prometheus Down
- Loki Down
- Node Monitoring Failure

---

# 16. Common Incidents

- Alert Storm
- Prometheus Down
- Grafana Dashboard Failure
- Missing Metrics
- Missing Logs
- Disk Full
- Log Collection Failure
- High Latency

---

# 17. Commands

```bash
kubectl top nodes

kubectl top pods

kubectl logs

kubectl get events -A

kubectl describe pod
```

---

# 18. Marathi Quick Revision

- Metrics म्हणजे numbers.
- Logs म्हणजे घटनांची माहिती.
- Traces म्हणजे request चा पूर्ण प्रवास.
- Grafana dashboards दाखवतो.
- Prometheus metrics गोळा करतो.
- Loki logs store करतो.

---

# 19. Enterprise Observability Flow

```
Application

↓

Metrics

↓

Logs

↓

Events

↓

Traces

↓

Prometheus

↓

Loki

↓

Grafana

↓

Alertmanager

↓

Engineer

↓

RCA
```

---

# 20. Observability Checklist

- Cluster Metrics Available
- Node Metrics Available
- Pod Metrics Available
- Dashboards Healthy
- Alerts Working
- Logs Available
- Traces Available
- Alert Rules Reviewed
- Monitoring Tested

---

# 21. Marathi Summary (5+ Experience Revision)

## Interview Summary

Production Observability म्हणजे application आणि infrastructure ची संपूर्ण visibility. Senior DevOps Engineer फक्त metrics पाहत नाही; तो metrics, logs, events आणि traces यांचा एकत्रित वापर करून Root Cause शोधतो.

### Production Investigation Flow

```
Alert

↓

Grafana Dashboard

↓

Prometheus Metrics

↓

Loki Logs

↓

Kubernetes Events

↓

Application Logs

↓

Tracing

↓

Root Cause Analysis
```

### Production Story

एका production release नंतर users नी application slow असल्याची तक्रार केली. Grafana मध्ये CPU सामान्य होता, पण Prometheus metrics मध्ये API latency वाढलेली दिसली. Loki logs मध्ये database timeout errors होते. Jaeger trace पाहिल्यावर Auth Service कडून Database query 7–8 सेकंद घेत असल्याचे दिसले. Database index optimize केल्यानंतर latency पुन्हा सामान्य झाली.

### 5+ Years Memory Trick

जर interviewer विचारेल,

**"Production issue investigate करताना Observability कशी वापरता?"**

उत्तर:

"मी प्रथम Grafana dashboard वरून metrics पाहतो, नंतर Prometheus मधील resource trends तपासतो, Loki मधील logs verify करतो, Kubernetes events पाहतो आणि आवश्यक असल्यास tracing वापरून request flow analyze करतो. Metrics समस्या दाखवतात, logs कारण सांगतात आणि traces bottleneck शोधतात."

