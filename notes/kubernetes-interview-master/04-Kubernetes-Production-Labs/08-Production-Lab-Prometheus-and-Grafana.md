# Kubernetes Interview Master Handbook

# Production Lab 08 - Prometheus and Grafana

---

# Objective

Deploy a production monitoring stack for Kubernetes.

Topics

Prometheus

Grafana

Alertmanager

kube-state-metrics

Node Exporter

ServiceMonitor

Alert Rules

Dashboards

---

# Production Scenario

A company runs hundreds of Kubernetes workloads.

Requirements

Collect metrics

Visualize dashboards

Receive alerts

Detect failures before customers report them.

---

# Architecture

Applications

↓

Exporters

↓

Prometheus

↓

Alertmanager

↓

Email / Slack / PagerDuty

↓

Grafana

↓

Dashboards

---

# Monitoring Flow

Application

↓

Metrics Endpoint

↓

Prometheus Scrapes Metrics

↓

Stores Time Series Data

↓

Grafana Queries Metrics

↓

Dashboard Displayed

---

# Alert Flow

Prometheus

↓

Alert Rule Triggered

↓

Alertmanager

↓

Notification

↓

Engineer

↓

Incident Response

---

# Components

Prometheus

Collects metrics.

---

Grafana

Visualizes metrics.

---

Alertmanager

Handles alert routing and notifications.

---

Node Exporter

Collects node-level metrics.

---

kube-state-metrics

Exposes Kubernetes object metrics.

---

# Step 1

Create Namespace

kubectl create namespace monitoring

---

Verify

kubectl get ns

---

# Step 2

Install Prometheus Stack

helm install monitoring \
kube-prometheus-stack \
-n monitoring

---

Verify

kubectl get pods -n monitoring

---

# Step 3

Verify Prometheus

kubectl get svc -n monitoring

---

Open UI

Prometheus

---

Verify Targets

Status

↓

Targets

All targets should be UP.

---

# Step 4

Verify Grafana

Get Service

kubectl get svc -n monitoring

---

Login

admin

↓

Dashboard

---

# Step 5

Verify Metrics

Node CPU

Memory

Pods

Deployments

Namespaces

Nodes

---

# Step 6

Create ServiceMonitor

kubectl apply -f servicemonitor.yaml

---

Verify

Prometheus discovers the application automatically.

---

# Step 7

Create Alert Rule

Example

Pod Restart Count

CPU > 90%

Memory > 90%

Disk > 80%

Node Not Ready

---

Apply

kubectl apply -f alert-rule.yaml

---

Verify

Alert appears in Prometheus.

---

# Step 8

Alertmanager

Configure

Email

Slack

PagerDuty

Microsoft Teams

---

Verify

Test notification.

---

# Common Dashboards

Cluster Overview

---

Node Metrics

---

Pod Metrics

---

Deployment Metrics

---

Namespace Usage

---

Resource Requests

---

Resource Limits

---

API Server Metrics

---

# Common Problems

Prometheus Target Down

Grafana Dashboard Empty

Exporter Not Running

ServiceMonitor Missing

Alert Not Triggering

High Cardinality

Disk Full

---

# Troubleshooting Flow

Missing Metrics

↓

Exporter

↓

ServiceMonitor

↓

Prometheus Targets

↓

Prometheus Logs

↓

Grafana Query

↓

Dashboard

---

# Production Incident

Node CPU reached

98%

Alert triggered.

Engineer investigated.

A runaway process was consuming CPU.

Pod restarted.

Incident resolved before customer impact.

---

# Another Incident

Application dashboard showed

No Data.

Reason

ServiceMonitor label mismatch.

Resolution

Correct selector labels.

Prometheus resumed scraping.

---

# Best Practices

Monitor everything important.

Create meaningful alerts.

Avoid alert fatigue.

Use recording rules.

Retain metrics appropriately.

Back up Grafana dashboards.

Monitor Prometheus itself.

---

# Useful Commands

kubectl get pods -n monitoring

---

kubectl get svc -n monitoring

---

kubectl logs deployment/prometheus \
-n monitoring

---

kubectl logs deployment/grafana \
-n monitoring

---

kubectl get servicemonitors -A

---

kubectl get prometheusrules -A

---

kubectl top pods

---

kubectl top nodes

---

# Interview Questions

Q1

What is Prometheus?

Answer

Prometheus is a time-series monitoring system that scrapes metrics from applications and infrastructure.

---

Q2

What is Grafana?

Answer

Grafana is a visualization platform that creates dashboards using metrics collected by Prometheus.

---

Q3

What is ServiceMonitor?

Answer

A ServiceMonitor tells Prometheus Operator which Kubernetes Services should be scraped for metrics.

---

Q4

What is Alertmanager?

Answer

Alertmanager receives alerts from Prometheus, groups them, suppresses duplicates and sends notifications.

---

Q5

Difference between kube-state-metrics and Node Exporter?

Answer

Node Exporter exposes operating system and hardware metrics.

kube-state-metrics exposes Kubernetes object state such as Pods, Deployments and Nodes.

---

# Scenario Based Interview

Question

Grafana shows

No Data.

How will you troubleshoot?

Answer

1. Verify Prometheus Targets.

2. Check ServiceMonitor.

3. Verify exporter.

4. Review Prometheus logs.

5. Test PromQL query.

---

Question

Alerts are not reaching Slack.

Answer

1. Verify Alertmanager configuration.

2. Check notification receiver.

3. Verify routing rules.

4. Test webhook.

5. Review Alertmanager logs.

---

# Production Checklist

✔ Prometheus

✔ Grafana

✔ Alertmanager

✔ Node Exporter

✔ kube-state-metrics

✔ ServiceMonitor

✔ Alert Rules

✔ Dashboards

✔ Notifications

✔ Incident Response

---

# Assignment

Deploy

Prometheus

Grafana

Alertmanager

Create

1 Dashboard

Create

3 Alert Rules

Verify

Metrics collection

Dashboard visualization

Alert notification

Document the monitoring architecture and alert flow.

