# Docker Compose Resource Limits

# 1. Purpose

Resource Limits control how much CPU and memory a container can consume.

Without limits, one faulty container can consume excessive resources and impact other applications running on the same Docker host.

Resource management is one of the most important responsibilities of a DevOps engineer in production environments.

---

# 2. Introduction

Consider a server hosting multiple containers.

```
Docker Host

├── API Gateway
├── Auth Service
├── Dashboard Service
├── Prometheus
├── Grafana
└── Redis
```

If one container starts consuming all available memory or CPU,

```
↓

Host Resource Exhaustion

↓

Other Containers Slow Down

↓

OOM Killer Terminates Containers

↓

Production Outage
```

Resource limits prevent this situation.

---

# 3. Enterprise Usage

Every enterprise production deployment defines resource limits.

Typical examples

```
Frontend

CPU : 0.5 Core

Memory : 256 MB
```

```
API Gateway

CPU : 1 Core

Memory : 512 MB
```

```
Database

CPU : 2-8 Cores

Memory : 4-32 GB
```

Resource values are determined using production monitoring and performance testing.

---

# 4. Usage in THIS Project

Initial resource planning

```
Frontend

CPU : 0.5

Memory : 256 MB
```

```
API Gateway

CPU : 1

Memory : 512 MB
```

```
Auth Service

CPU : 0.5

Memory : 512 MB
```

```
Dashboard Service

CPU : 0.5

Memory : 512 MB
```

These values will be optimized after monitoring with Prometheus and Grafana.

---

# 5. Architecture

```
Application

        │

Docker Compose

        │

CPU Limit

Memory Limit

        │

Docker Engine

        │

Container

        │

Controlled Resource Usage
```

---

# 6. Internal Workflow

Container Starts

↓

Docker Reads Resource Limits

↓

CPU Allocated

↓

Memory Allocated

↓

Application Runs

↓

Docker Prevents Resource Abuse

---

# 7. Configuring Resource Limits

Example

```yaml
services:

  api-gateway:

    deploy:

      resources:

        limits:

          cpus: "1.0"

          memory: 512M
```

For local Docker Compose (non-Swarm), many teams instead use runtime options or migrate these limits to Kubernetes requests and limits during orchestration.

---

# 8. Why Resource Limits Matter

Without limits

```
Memory Leak

↓

100% Memory Usage

↓

Host OOM

↓

Multiple Containers Crash
```

With limits

```
Memory Leak

↓

Container Reaches Limit

↓

Only Affected Container Impacted

↓

Other Services Continue Running
```

---

# 9. Daily DevOps Activities

- Monitor CPU usage
- Monitor memory usage
- Review container resource consumption
- Tune limits
- Investigate OOM events
- Review performance metrics
- Optimize resource allocation

---

# 10. Production Best Practices

- Define limits for every production container.
- Monitor usage before increasing limits.
- Avoid unlimited containers.
- Right-size applications.
- Review limits after every major release.
- Use historical monitoring data.
- Document sizing decisions.

---

# 11. Security

Resource limits improve platform stability.

Benefits

- Prevent accidental resource exhaustion
- Reduce denial-of-service impact from faulty applications
- Improve multi-tenant isolation
- Protect shared infrastructure

---

# 12. Troubleshooting

View resource usage

```bash
docker stats
```

Inspect container

```bash
docker inspect api-gateway
```

View logs

```bash
docker compose logs api-gateway
```

View running containers

```bash
docker ps
```

Host memory

```bash
free -h
```

Host CPU

```bash
top
```

---

# 13. Real Production Scenarios

## Scenario 1

Production API suddenly becomes slow.

Investigation

```bash
docker stats

top
```

Root Cause

One analytics container consumed nearly all CPU resources.

No CPU limits had been configured.

---

## Scenario 2

Containers restart repeatedly.

Investigation

```bash
docker compose logs

docker stats

dmesg
```

Root Cause

Memory leak triggered the Linux OOM Killer.

---

## Scenario 3

Grafana dashboards become unresponsive.

Investigation

```bash
docker stats
```

Root Cause

Prometheus exceeded expected memory consumption due to high metric retention.

---

## Scenario 4

Deployment succeeds.

Application immediately exits.

Investigation

```bash
docker inspect

docker compose logs
```

Root Cause

Configured memory limit was too low for application startup.

---

# 14. Scenario Interview Q&A

**Q1. Why configure resource limits?**

A:

To prevent one container from consuming excessive CPU or memory and affecting other workloads.

---

**Q2. What happens when memory exceeds the configured limit?**

The container may be terminated by the kernel or Docker depending on the situation, often resulting in an Out Of Memory (OOM) event.

---

**Q3. Should every container have limits?**

Yes.

Production containers should always have appropriate CPU and memory limits based on observed workload.

---

# 15. Architecture Interview Q&A

**Q1. How do you decide resource limits?**

Using

- Performance testing
- Load testing
- Historical monitoring
- Production metrics
- Capacity planning

---

**Q2. How does Kubernetes handle this?**

Using

- Requests
- Limits

These concepts provide scheduling guarantees and maximum resource consumption.

---

# 16. Production Support Interview Q&A

**Q1. Users report slow application performance. Investigation order?**

1.

```bash
docker stats
```

2.

```bash
top
```

3.

```bash
free -h
```

4.

```bash
docker compose logs
```

5.

Review monitoring dashboards

6.

Review recent deployment

7.

Perform RCA

---

**Q2. Container restarted because of OOM. What will you check?**

- Memory usage trend
- Memory leak
- Resource limits
- Recent code changes
- Traffic increase
- Host memory availability

---

# 17. Related Runbooks

- docker-container-oom.md
- docker-resource-exhaustion.md
- docker-compose-service-failure.md

---

# 18. Common Incidents

- Out Of Memory (OOM)
- High CPU Usage
- Memory Leak
- Resource Starvation
- Host Resource Exhaustion

---

# 19. Commands

View resource usage

```bash
docker stats
```

View containers

```bash
docker ps
```

Inspect container

```bash
docker inspect api-gateway
```

Host memory

```bash
free -h
```

Host CPU

```bash
top
```

View logs

```bash
docker compose logs
```

---

# 20. Marathi Quick Revision

- Resource Limits म्हणजे CPU आणि Memory वर नियंत्रण.
- Unlimited containers production मध्ये ठेवू नयेत.
- `docker stats` हा resource monitoring साठी सर्वात महत्त्वाचा command आहे.
- OOM म्हणजे memory संपल्यामुळे container terminate होणे.
- Monitoring data वापरून limits ठरवाव्यात.

---

# 21. Marathi Summary (5+ Experience Revision)

## Interview Summary

Resource Limits मुळे एका container मुळे संपूर्ण server वर परिणाम होत नाही.

Production मध्ये प्रत्येक service साठी CPU आणि Memory limits निश्चित केले जातात आणि ते monitoring metrics वर आधारित वेळोवेळी बदलले जातात.

### Production Investigation Flow

```
Performance Issue

↓

docker stats

↓

top

↓

free -h

↓

docker compose logs

↓

Review Monitoring

↓

Check OOM Events

↓

Root Cause Analysis

↓

Capacity Planning

↓

Permanent Fix
```

### Production Story

एका production server वर नवीन reporting service deploy केल्यानंतर API latency अचानक वाढली.

`docker stats` मध्ये reporting container जवळपास पूर्ण CPU वापरत असल्याचे दिसले.

त्या service साठी CPU limits configure केले नव्हते.

CPU limits लागू करण्यात आले, workload optimize करण्यात आला आणि Prometheus alerts जोडण्यात आले. त्यानंतर इतर services स्थिरपणे चालू राहिल्या.

### 5+ Years Memory Trick

जर interviewer विचारेल,

**"Production server वर एका container मुळे बाकी services slow झाल्या. Investigation कशी कराल?"**

उत्तर:

"मी प्रथम `docker stats`, `top` आणि `free -h` वापरून resource utilization तपासेन. त्यानंतर OOM events, container logs, recent deployments आणि monitoring dashboards verify करेन. जर एखादा container excessive CPU किंवा memory वापरत असेल तर resource limits, application optimization आणि capacity planning यांच्या आधारे permanent fix implement करेन."

