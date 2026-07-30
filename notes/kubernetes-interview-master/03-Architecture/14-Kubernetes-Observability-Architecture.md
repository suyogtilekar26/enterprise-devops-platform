# Kubernetes Interview Master Handbook

# Architecture 14 - Kubernetes Observability Architecture

---

# What is Observability?

## English

Observability is the ability to understand the health, performance and behavior of applications and infrastructure using Metrics, Logs and Traces.

---

## मराठी

Observability म्हणजे Metrics, Logs आणि Traces वापरून Application आणि Infrastructure ची स्थिती समजून घेणे.

---

# Three Pillars of Observability

Metrics

↓

Logs

↓

Traces

↓

Complete Visibility

---

# Observability Architecture

Application

↓

Metrics

↓

Logs

↓

Traces

↓

Prometheus

↓

Alertmanager

↓

Grafana

↓

Engineers

---

# Metrics

Purpose

Numerical measurements collected over time.

Examples

CPU Usage

Memory Usage

Disk Usage

Network Traffic

Request Rate

Latency

Error Rate

---

# Metrics Server

Purpose

Provides CPU and Memory metrics.

Used by

kubectl top

HPA

---

# kube-state-metrics

Purpose

Exports Kubernetes object metrics.

Examples

Deployments

Pods

ReplicaSets

Nodes

DaemonSets

StatefulSets

Jobs

PVCs

---

# Prometheus

Purpose

Collects metrics by scraping targets.

Features

Time Series Database

PromQL

Alert Rules

Service Discovery

---

# Prometheus Flow

Application

↓

/metrics Endpoint

↓

Prometheus Scrape

↓

Time Series Database

↓

Queries

↓

Grafana

---

# Alertmanager

Purpose

Receives alerts from Prometheus.

Supports

Email

Slack

Microsoft Teams

PagerDuty

Webhook

---

# Alert Flow

Prometheus

↓

Alert Rule

↓

Alertmanager

↓

Notification

↓

Engineer

---

# Grafana

Purpose

Visualizes metrics.

Features

Dashboards

Alerts

Variables

Panels

Multiple Data Sources

---

# Logging

Purpose

Capture application and system events.

Types

Application Logs

Container Logs

Node Logs

Audit Logs

---

# Logging Pipeline

Application

↓

stdout / stderr

↓

Container Runtime

↓

Fluent Bit

↓

Loki / Elasticsearch

↓

Grafana / Kibana

---

# Fluent Bit

Purpose

Collect lightweight logs from Nodes.

Advantages

Low Memory

High Performance

Cloud Native

---

# Fluentd

Purpose

Advanced log processing.

Supports

Filtering

Transformation

Routing

---

# Loki

Purpose

Log aggregation system.

Optimized for Kubernetes.

Usually paired with Grafana.

---

# ELK Stack

Elasticsearch

↓

Log Storage

↓

Log Search

---

Logstash

↓

Log Processing

---

Kibana

↓

Visualization

---

# Tracing

Purpose

Track requests across multiple services.

Useful for

Microservices

Distributed Systems

Latency Analysis

---

# OpenTelemetry

Purpose

Standard framework for Metrics, Logs and Traces.

Supports multiple backends.

---

# Jaeger

Purpose

Distributed Tracing.

Helps identify slow services.

---

# Golden Signals

Latency

↓

Traffic

↓

Errors

↓

Saturation

Monitor these four signals for every production service.

---

# SLI

Service Level Indicator

Example

99.95% Request Success

---

# SLO

Service Level Objective

Example

99.9% Availability

---

# SLA

Service Level Agreement

Business commitment made to customers.

---

# Observability Workflow

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

Engineer

↓

Incident Response

---

# Common Monitoring Problems

Missing Metrics

High Cardinality

Alert Fatigue

Missing Logs

Dropped Logs

High Disk Usage

Slow Dashboards

False Alerts

---

# Troubleshooting Flow

Application Slow

↓

Metrics

↓

CPU

↓

Memory

↓

Network

↓

Logs

↓

Traces

↓

Root Cause

↓

Resolution

---

# Production Incident

CPU usage suddenly reached 100%.

Prometheus generated alert.

Grafana dashboard confirmed CPU spike.

Application logs showed infinite loop.

Resolution

Fix application bug.

Redeploy.

---

# Another Incident

Users reported slow API.

Metrics looked normal.

Jaeger tracing showed

Database query latency.

Resolution

Optimize SQL query.

---

# Best Practices

Monitor Golden Signals.

Use meaningful alerts.

Avoid alert storms.

Centralize logs.

Retain metrics appropriately.

Use tracing for microservices.

Test alert rules.

Review dashboards regularly.

---

# Useful Commands

kubectl top nodes

---

kubectl top pods

---

kubectl logs POD_NAME

---

kubectl logs -f POD_NAME

---

kubectl get events

---

kubectl describe pod POD_NAME

---

kubectl get pods -n monitoring

---

# Interview Questions

Q1

Difference between Metrics and Logs?

Answer

Metrics are numerical values measured over time.

Logs are detailed event records.

---

Q2

Why use Prometheus?

Answer

Prometheus collects, stores and queries time-series metrics and supports alerting.

---

Q3

What is kube-state-metrics?

Answer

It exports Kubernetes object state metrics such as Deployments, Pods and Nodes.

---

Q4

Difference between Fluent Bit and Fluentd?

Answer

Fluent Bit is lightweight and optimized for log collection.

Fluentd provides advanced log processing and routing.

---

Q5

What are the Golden Signals?

Answer

Latency

Traffic

Errors

Saturation

---

# Scenario Based Interview

Question

CPU usage is low but users report slow responses.

How will you troubleshoot?

Answer

1. Check application logs.

2. Review latency metrics.

3. Analyze distributed traces.

4. Check database performance.

5. Verify network latency.

---

Question

Prometheus alert fired.

Pods appear healthy.

What will you check?

Answer

1. Alert rule.

2. Grafana dashboards.

3. Application logs.

4. kube-state-metrics.

5. Recent deployments.

---

# Production Troubleshooting Checklist

✔ Metrics

✔ Logs

✔ Traces

✔ Prometheus

✔ Alertmanager

✔ Grafana

✔ kube-state-metrics

✔ Metrics Server

✔ Fluent Bit

✔ Loki / ELK

---

# Senior Engineer Notes

Always think about observability in this order:

Application

↓

Metrics

↓

Logs

↓

Traces

↓

Prometheus

↓

Alertmanager

↓

Grafana

↓

Engineer

↓

Root Cause

↓

Resolution

Never troubleshoot production issues using only one signal. Combine metrics, logs and traces to identify the root cause quickly.

