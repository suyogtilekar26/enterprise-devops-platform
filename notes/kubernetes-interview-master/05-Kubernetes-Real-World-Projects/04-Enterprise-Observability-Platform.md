# Kubernetes Interview Master Handbook

# Real World Project 04 - Enterprise Observability Platform

---

# Objective

Build a complete enterprise observability platform for Kubernetes workloads.

---

# Production Scenario

A company operates hundreds of microservices across multiple Kubernetes clusters.

Requirements

Centralized Monitoring

Centralized Logging

Distributed Tracing

Real-time Alerting

Business Dashboards

SLO Monitoring

Incident Correlation

---

# Technology Stack

Prometheus

Grafana

Alertmanager

Loki

Promtail

Tempo

OpenTelemetry

Node Exporter

kube-state-metrics

Blackbox Exporter

NGINX Ingress

Helm

Argo CD

---

# Enterprise Architecture

Applications

↓

OpenTelemetry SDK

↓

Prometheus Metrics

↓

Loki Logs

↓

Tempo Traces

↓

Grafana

↓

Engineers

---

# Complete Observability Flow

Application

↓

Metrics

↓

Prometheus

↓

Grafana Dashboard

---

Application

↓

Logs

↓

Promtail

↓

Loki

↓

Grafana Explore

---

Application

↓

Distributed Trace

↓

OpenTelemetry

↓

Tempo

↓

Grafana Trace View

---

# Monitoring Components

Prometheus

Collects metrics.

---

Node Exporter

Node CPU

Memory

Disk

Filesystem

Network

---

kube-state-metrics

Pods

Deployments

ReplicaSets

Nodes

Namespaces

PVC

Jobs

CronJobs

---

Blackbox Exporter

HTTP

HTTPS

DNS

TCP

ICMP

Synthetic Monitoring

---

# Logging Stack

Application Logs

↓

Promtail

↓

Loki

↓

Grafana

---

# Distributed Tracing

Application

↓

OpenTelemetry SDK

↓

Tempo

↓

Grafana

↓

Trace Analysis

---

# Golden Signals

Latency

Request duration

---

Traffic

Requests per second

---

Errors

HTTP 4xx

HTTP 5xx

Application Errors

---

Saturation

CPU

Memory

Disk

Connections

---

# SLI

Service Level Indicator

Example

99.95%

Successful Requests

---

# SLO

Service Level Objective

Example

99.9%

Availability

---

# SLA

Service Level Agreement

Business commitment made to customers.

---

# Alert Flow

Prometheus

↓

Alert Rule

↓

Alertmanager

↓

Slack

↓

PagerDuty

↓

Email

↓

Engineer

---

# Dashboards

Cluster Overview

---

Node Dashboard

---

Namespace Dashboard

---

Application Dashboard

---

API Dashboard

---

Database Dashboard

---

Kafka Dashboard

---

Business Dashboard

---

# Incident Correlation

Metric Spike

↓

Related Logs

↓

Related Trace

↓

Root Cause

↓

Fix

---

# Step 1

Install

kube-prometheus-stack

---

# Step 2

Install Loki

---

# Step 3

Install Promtail

---

# Step 4

Install Tempo

---

# Step 5

Install OpenTelemetry Collector

---

# Step 6

Create ServiceMonitor

---

# Step 7

Create PrometheusRule

---

# Step 8

Configure Grafana Dashboards

---

# Common Problems

Missing Metrics

Missing Logs

Missing Traces

Dashboard Empty

High Cardinality

Alert Storm

Exporter Down

Incorrect Labels

---

# Troubleshooting Flow

No Dashboard Data

↓

Prometheus Targets

↓

Exporter

↓

ServiceMonitor

↓

PromQL

↓

Grafana

---

Logs Missing

↓

Promtail

↓

Loki

↓

Labels

↓

Grafana

---

Trace Missing

↓

Application SDK

↓

Collector

↓

Tempo

↓

Grafana

---

# Production Incident

Application latency increased.

Grafana showed

95th percentile latency spike.

Logs indicated database timeout.

Tempo trace confirmed slow SQL query.

Database index optimized.

Latency returned to normal.

---

# Another Incident

CPU usage normal.

HTTP 500 errors increased.

Metrics identified affected service.

Logs showed NullPointerException.

Trace revealed downstream API failure.

Rollback completed.

---

# Best Practices

Instrument every application.

Monitor Golden Signals.

Create actionable alerts.

Avoid alert fatigue.

Use consistent labels.

Correlate metrics, logs and traces.

Review SLO compliance.

Regularly tune dashboards.

---

# Useful Commands

kubectl get servicemonitors

---

kubectl get prometheusrules

---

kubectl get pods -n monitoring

---

kubectl logs deployment/prometheus \
-n monitoring

---

kubectl logs deployment/loki \
-n monitoring

---

kubectl logs deployment/tempo \
-n monitoring

---

kubectl top pods

---

kubectl top nodes

---

# Interview Questions

Q1

What are the Four Golden Signals?

Answer

Latency, Traffic, Errors and Saturation.

---

Q2

Difference between Metrics, Logs and Traces?

Answer

Metrics show numerical trends.

Logs provide detailed event records.

Traces follow a request across multiple services.

---

Q3

What is OpenTelemetry?

Answer

An open standard used to collect metrics, logs and distributed traces from applications.

---

Q4

Why use Blackbox Exporter?

Answer

To perform external availability checks such as HTTP, HTTPS, DNS, TCP and ICMP.

---

Q5

What is the difference between SLI, SLO and SLA?

Answer

SLI measures service performance.

SLO defines internal reliability targets.

SLA is the customer-facing contractual commitment.

---

# Scenario Based Interview

Question

Users report slow checkout.

CPU and Memory look normal.

How will you investigate?

Answer

1. Check latency dashboard.

2. Review traces in Tempo.

3. Inspect application logs.

4. Verify database queries.

5. Check downstream services.

6. Validate network latency.

---

Question

Alerts are firing continuously for CPU usage.

How will you reduce alert fatigue?

Answer

1. Review thresholds.

2. Add alert grouping.

3. Tune evaluation intervals.

4. Remove duplicate alerts.

5. Create severity levels.

---

# Production Checklist

✔ Prometheus

✔ Grafana

✔ Alertmanager

✔ Loki

✔ Promtail

✔ Tempo

✔ OpenTelemetry

✔ Node Exporter

✔ kube-state-metrics

✔ Blackbox Exporter

✔ SLI/SLO Dashboards

✔ Golden Signals

✔ Incident Correlation

---

# Assignment

Build an enterprise observability platform with

Prometheus

Grafana

Loki

Tempo

OpenTelemetry

Alertmanager

Node Exporter

kube-state-metrics

Blackbox Exporter

Create

5 Dashboards

10 Alert Rules

Golden Signal Dashboard

SLO Dashboard

Document

Monitoring Flow

Logging Flow

Tracing Flow

Alert Flow

Incident Investigation Process

