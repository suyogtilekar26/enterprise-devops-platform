# Docker Compose Scaling

# 1. Purpose

Scaling is the process of running multiple instances (replicas) of an application to handle increased traffic, improve availability, and distribute workload.

Docker Compose provides basic horizontal scaling for stateless services.

Although Kubernetes is the preferred orchestration platform for production, understanding Compose scaling is important for learning distributed application architecture.

---

# 2. Introduction

Without Scaling

```
Users

↓

Single API Container

↓

High CPU

↓

Slow Response

↓

Application Failure
```

With Scaling

```
Users

↓

Load Balancer

↓

API-1

API-2

API-3

↓

Higher Capacity

↓

Better Availability
```

Instead of increasing server size (Vertical Scaling), we increase the number of application instances (Horizontal Scaling).

---

# 3. Enterprise Usage

Typical production architecture

```
Internet

↓

Load Balancer

↓

API Gateway

↓

Replica 1

Replica 2

Replica 3

↓

Database
```

Examples

- Web Servers
- API Services
- Authentication Services
- Background Workers

Stateful services like databases usually require different clustering strategies.

---

# 4. Usage in THIS Project

Future architecture

```
Frontend

↓

API Gateway (3 Replicas)

↓

Auth Service (2 Replicas)

↓

Dashboard Service (2 Replicas)

↓

PostgreSQL
```

Initially, development uses one replica.

Production will later use Kubernetes Deployments with multiple replicas.

---

# 5. Architecture

```
Users

        │

        ▼

Load Balancer

        │

 ┌──────┼──────┐

 ▼      ▼      ▼

API-1  API-2  API-3

        │

Authentication

Dashboard

Database
```

---

# 6. Internal Workflow

Traffic Increases

↓

Additional Replicas Started

↓

Requests Distributed

↓

CPU Usage Reduced

↓

Application Performance Improved

---

# 7. Scaling Containers

Scale API Gateway

```bash
docker compose up \
--scale api-gateway=3 \
-d
```

Scale Auth Service

```bash
docker compose up \
--scale auth-service=2 \
-d
```

View running containers

```bash
docker ps
```

Example Output

```
api-gateway-1

api-gateway-2

api-gateway-3
```

---

# 8. Scaling Considerations

Good Candidates

- REST APIs
- Frontend Servers
- Worker Processes
- Stateless Services

Poor Candidates

- Traditional Databases
- Local File Storage
- Stateful Applications

Scaling requires

- Shared Storage
- Shared Sessions
- External Databases
- Distributed Cache

---

# 9. Daily DevOps Activities

- Scale services during testing
- Monitor CPU utilization
- Monitor response time
- Review replica health
- Validate load balancing
- Investigate scaling failures
- Review capacity planning

---

# 10. Production Best Practices

- Scale only stateless services.
- Use external session storage.
- Monitor before scaling.
- Scale based on metrics.
- Keep replicas identical.
- Use immutable images.
- Automate scaling where possible.

---

# 11. Security

Scaling should not expose additional attack surfaces.

Ensure

- Consistent security configuration
- Same application version
- Same secrets
- Same environment variables
- Same network policies

---

# 12. Troubleshooting

Scale service

```bash
docker compose up \
--scale api-gateway=3 \
-d
```

View containers

```bash
docker ps
```

View logs

```bash
docker compose logs api-gateway
```

Monitor resources

```bash
docker stats
```

Inspect container

```bash
docker inspect api-gateway-1
```

---

# 13. Real Production Scenarios

## Scenario 1

Black Friday traffic causes API latency.

Investigation

```bash
docker stats

docker ps
```

Root Cause

Only one API instance was running.

Additional replicas reduced CPU utilization and improved response time.

---

## Scenario 2

Users randomly lose login sessions.

Investigation

```bash
docker compose logs api-gateway
```

Root Cause

Sessions were stored locally inside each container.

Scaling caused requests to reach different replicas.

Session storage was moved to Redis.

---

## Scenario 3

Only one replica receives traffic.

Investigation

```bash
docker ps

docker inspect
```

Root Cause

Load balancer configuration was incorrect.

---

## Scenario 4

Scaling succeeded but performance did not improve.

Investigation

```bash
docker stats

docker compose logs
```

Root Cause

Database became the performance bottleneck.

Adding API replicas could not solve database contention.

---

# 14. Scenario Interview Q&A

**Q1. What is horizontal scaling?**

A:

Running multiple instances of the same application to distribute workload.

---

**Q2. Which services are easiest to scale?**

Stateless services such as REST APIs and web servers.

---

**Q3. Why is scaling databases more difficult?**

Because databases maintain persistent state, consistency, and replication requirements.

---

# 15. Architecture Interview Q&A

**Q1. Why doesn't adding replicas always improve performance?**

Because another component, such as the database, cache, or network, may become the bottleneck.

---

**Q2. What is required before scaling authentication services?**

Shared session storage or stateless authentication (JWT).

---

# 16. Production Support Interview Q&A

**Q1. Users report slow response during peak traffic. Investigation order?**

1.

```bash
docker stats
```

2.

```bash
docker ps
```

3.

Review monitoring dashboards

4.

Check replica count

5.

Review load balancer

6.

Identify bottleneck

7.

Perform RCA

---

**Q2. Scaling increased containers but users still experience slowness. Why?**

Possible causes

- Database bottleneck
- Network latency
- Slow external API
- Storage bottleneck
- Load balancer issue
- Resource exhaustion

---

# 17. Related Runbooks

- docker-resource-exhaustion.md
- docker-compose-service-failure.md
- docker-container-high-cpu.md

---

# 18. Common Incidents

- High CPU Usage
- Uneven Load Distribution
- Session Loss
- Replica Startup Failure
- Database Bottleneck

---

# 19. Commands

Scale API

```bash
docker compose up \
--scale api-gateway=3 \
-d
```

View containers

```bash
docker ps
```

Monitor resources

```bash
docker stats
```

View logs

```bash
docker compose logs
```

Inspect container

```bash
docker inspect api-gateway-1
```

---

# 20. Marathi Quick Revision

- Scaling म्हणजे replicas वाढवणे.
- Stateless services scale करणे सोपे असते.
- Database scale करणे कठीण असते.
- Load Balancer आवश्यक असतो.
- Scaling करण्यापूर्वी bottleneck शोधणे आवश्यक आहे.

---

# 21. Marathi Summary (5+ Experience Revision)

## Interview Summary

Scaling म्हणजे application च्या अनेक replicas चालवून workload distribute करणे.

Production मध्ये Web Servers आणि APIs सहज scale होतात, पण Databases आणि Stateful applications साठी वेगळ्या architecture ची गरज असते.

Replica वाढवणे म्हणजे performance नेहमीच वाढेल असे नाही; bottleneck कुठे आहे हे शोधणे महत्त्वाचे आहे.

### Production Investigation Flow

```
High Traffic

↓

docker stats

↓

docker ps

↓

Check Replica Count

↓

Review Load Balancer

↓

Check Database

↓

Identify Bottleneck

↓

Root Cause Analysis

↓

Capacity Planning
```

### Production Story

एका production sale event दरम्यान API Gateway चे CPU 95% पेक्षा जास्त झाले.

DevOps टीमने replicas 1 वरून 4 केले, पण response time मध्ये फारसा फरक पडला नाही.

Prometheus metrics तपासल्यावर PostgreSQL CPU 100% असल्याचे दिसले.

खरा bottleneck database होता, API नव्हे.

यानंतर database query optimization, indexing आणि read replica strategy लागू करण्यात आली.

### 5+ Years Memory Trick

जर interviewer विचारेल,

**"Scaling केल्यानंतरही application slow आहे. Investigation कशी कराल?"**

उत्तर:

"मी प्रथम replicas, CPU आणि memory usage तपासेन. त्यानंतर load balancer distribution, database performance, external dependencies आणि monitoring dashboards review करेन. Scaling ineffective असल्यास bottleneck infrastructure किंवा database layer मध्ये आहे का हे identify करून RCA आणि capacity planning करेन."

