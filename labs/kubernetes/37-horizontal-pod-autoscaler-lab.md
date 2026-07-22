# Lab 37 - Horizontal Pod Autoscaler (HPA)

# 1. Objective

The objective of this lab is to understand how Kubernetes Horizontal Pod Autoscaler (HPA) automatically scales application Pods based on resource utilization.

By the end of this lab you will be able to

- Configure Horizontal Pod Autoscaler
- Scale applications automatically
- Generate application load
- Monitor scaling events
- Troubleshoot HPA
- Understand enterprise autoscaling
- Explain HPA architecture

HPA is one of the most commonly used autoscaling mechanisms in enterprise Kubernetes environments.

---

# 2. Prerequisites

Complete

- Lab 01 - Lab 36

Verify

```bash
kubectl get nodes

kubectl get deployment

kubectl top nodes

kubectl top pods
```

Verify Metrics Server

```bash
kubectl get apiservices | grep metrics
```

Expected

```
metrics.k8s.io
```

If metrics-server is unavailable, HPA will not work.

---

# 3. Enterprise Usage

Typical production scaling

```
Users Increase

↓

CPU Usage

↓

Metrics Server

↓

Horizontal Pod Autoscaler

↓

Deployment

↓

More Pods
```

Examples

```
Frontend

2 Pods

↓

10 Pods
```

```
API Gateway

3 Pods

↓

20 Pods
```

```
Authentication Service

2 Pods

↓

15 Pods
```

Autoscaling helps applications handle traffic spikes automatically.

---

# 4. Usage in THIS Project

Future architecture

```
React Frontend

↓

HPA

↓

2–10 Pods
```

```
API Gateway

↓

HPA

↓

2–20 Pods
```

```
Auth Service

↓

HPA

↓

2–15 Pods
```

```
Dashboard Service

↓

HPA

↓

2–10 Pods
```

---

# 5. Architecture

```
Users

↓

Application

↓

CPU Usage

↓

Metrics Server

↓

HPA Controller

↓

Deployment

↓

ReplicaSet

↓

Pods
```

---

# 6. Step-by-Step Implementation

## Step 1

Create Deployment

```bash
kubectl create deployment nginx-hpa \
--image=nginx:stable
```

Scale

```bash
kubectl scale deployment nginx-hpa \
--replicas=2
```

Verify

```bash
kubectl get deployment
```

---

## Step 2

Expose Deployment

```bash
kubectl expose deployment nginx-hpa \
--port=80 \
--target-port=80 \
--type=ClusterIP
```

---

## Step 3

Configure Resource Requests

Edit Deployment

```bash
kubectl edit deployment nginx-hpa
```

Add

```yaml
resources:
  requests:
    cpu: 100m
    memory: 128Mi

  limits:
    cpu: 500m
    memory: 256Mi
```

Save and exit.

---

## Step 4

Create HPA

```bash
kubectl autoscale deployment nginx-hpa \
--cpu-percent=50 \
--min=2 \
--max=10
```

---

## Step 5

Verify HPA

```bash
kubectl get hpa
```

Expected

```
TARGETS

MINPODS

MAXPODS

REPLICAS
```

---

## Step 6

Generate Load

Run

```bash
kubectl run load-generator \
--rm -it \
--image=busybox \
--restart=Never \
-- sh
```

Inside container

```bash
while true
do
wget -q -O- http://nginx-hpa
done
```

---

## Step 7

Monitor Autoscaling

Open another terminal

```bash
kubectl get hpa -w
```

Observe

CPU utilization increases.

Replica count increases automatically.

---

## Step 8

Verify Deployment

```bash
kubectl get deployment

kubectl get pods
```

Expected

Replica count increases.

---

## Step 9

Stop Load

Exit BusyBox

```bash
exit
```

Observe

```bash
kubectl get hpa -w
```

Pods scale down automatically after stabilization.

---

## Step 10

Review Resources

```bash
kubectl get hpa

kubectl describe hpa nginx-hpa

kubectl top pods
```

---

# 7. Verification

```bash
kubectl get hpa

kubectl describe hpa nginx-hpa

kubectl get deployment

kubectl top pods
```

Expected

- HPA created
- CPU metrics available
- Replica count changes
- Scaling events visible

---

# 8. Failure Simulation

## Scenario 1

Metrics Server Missing

```bash
kubectl get hpa
```

Expected

```
Unknown
```

Reason

Metrics unavailable.

---

## Scenario 2

No Resource Requests

Remove CPU requests.

Expected

```
FailedGetResourceMetric
```

---

## Scenario 3

Very High Target

```bash
--cpu-percent=95
```

Expected

Scaling rarely occurs.

---

## Scenario 4

Maximum Pods Reached

Generate heavy traffic.

Expected

Scaling stops at

```
maxReplicas
```

---

# 9. Troubleshooting

HPA

```bash
kubectl get hpa

kubectl describe hpa nginx-hpa
```

Deployment

```bash
kubectl get deployment

kubectl describe deployment nginx-hpa
```

Metrics

```bash
kubectl top pods

kubectl top nodes
```

Events

```bash
kubectl get events
```

---

# 10. Production Discussion

Enterprise Autoscaling

```
Traffic Spike

↓

CPU Usage

↓

Metrics Server

↓

HPA

↓

More Pods

↓

Load Balanced

↓

Stable Response Time
```

HPA is commonly combined with

- Cluster Autoscaler
- Load Balancer
- Prometheus
- KEDA
- VPA

---

# 11. Production Best Practices

- Configure Requests before HPA.
- Monitor scaling events.
- Choose realistic CPU thresholds.
- Avoid excessive scaling.
- Configure minimum replicas for HA.
- Configure maximum replicas to control cost.
- Monitor application latency alongside CPU.

---

# 12. Real Production Scenario

An e-commerce platform experienced a sudden surge in traffic during a flash sale.

CPU utilization increased from 20% to over 80%.

The HPA automatically increased the API Deployment from 4 Pods to 18 Pods within a few minutes.

Customer requests continued to be served without downtime.

After the sale ended, HPA gradually reduced the Deployment back to 4 Pods, minimizing infrastructure costs.

---

# 13. Scenario Interview Questions

## Q1. What is Horizontal Pod Autoscaler?

### Answer

Horizontal Pod Autoscaler (HPA) automatically increases or decreases the number of Pod replicas based on metrics such as CPU utilization, Memory utilization or custom metrics.

---

## Q2. What metrics does HPA use?

### Answer

Common metrics

- CPU Utilization
- Memory Utilization
- Custom Metrics
- External Metrics

Most production clusters initially scale based on CPU utilization.

---

## Q3. Why are Resource Requests mandatory for HPA?

### Answer

HPA calculates utilization as a percentage of the configured CPU Request.

Without CPU Requests, Kubernetes cannot calculate utilization and HPA cannot make scaling decisions.

---

## Q4. Difference between HPA and Cluster Autoscaler?

### Answer

| HPA | Cluster Autoscaler |
|------|--------------------|
| Adds Pods | Adds Nodes |
| Works on Deployments | Works on Worker Nodes |
| Uses Metrics | Uses Scheduling Failures |
| Application Scaling | Infrastructure Scaling |

---

## Q5. Can HPA scale Pods to zero?

### Answer

Normally, no.

HPA maintains at least the configured `minReplicas`.

Scaling to zero generally requires technologies like KEDA.

---

# 14. Architecture Interview Questions

## Q1. Explain HPA Architecture.

### Answer

```
Application

↓

CPU Usage

↓

Metrics Server

↓

HPA Controller

↓

Deployment

↓

ReplicaSet

↓

Pods
```

The HPA Controller periodically retrieves metrics from Metrics Server and adjusts Deployment replicas.

---

## Q2. How often does HPA evaluate metrics?

### Answer

By default, the HPA controller checks metrics approximately every 15 seconds (depending on controller-manager configuration).

---

## Q3. Why doesn't HPA immediately scale down?

### Answer

Kubernetes uses a stabilization window to avoid rapid scaling up and down (flapping), ensuring application stability.

---

## Q4. What are common enterprise HPA metrics?

### Answer

- CPU utilization
- Memory utilization
- HTTP requests/sec
- Queue length
- Kafka lag
- RabbitMQ queue depth
- Prometheus custom metrics

---

# 15. Production Support Interview Questions

## Q1. HPA is showing UNKNOWN. How will you investigate?

### Answer

Commands

```bash
kubectl get hpa

kubectl describe hpa

kubectl top pods

kubectl get apiservices | grep metrics

kubectl get pods -n kube-system
```

Investigate

- Metrics Server
- APIService status
- Resource Requests
- Metrics availability

---

## Q2. HPA is not scaling even though CPU usage is high. What will you check?

### Answer

Verify

- CPU Requests configured
- Metrics Server running
- Target utilization
- Deployment status
- HPA events

Commands

```bash
kubectl describe hpa

kubectl describe deployment nginx-hpa

kubectl top pods
```

---

## Q3. HPA scaled Pods but application is still slow. Why?

### Answer

Possible reasons

- Database bottleneck
- External API latency
- CPU is not the bottleneck
- Node resource exhaustion
- Load Balancer issues
- Application locks

Autoscaling Pods alone cannot solve every performance problem.

---

## Q4. How do enterprises implement autoscaling?

### Answer

Typical production architecture

```
Users

↓

Load Balancer

↓

Ingress

↓

HPA

↓

Deployment

↓

Pods

↓

Cluster Autoscaler

↓

Worker Nodes
```

Large enterprises often combine HPA, Cluster Autoscaler and Prometheus/KEDA for complete application and infrastructure autoscaling.

---

# 16. Cleanup

```bash
kubectl delete hpa nginx-hpa

kubectl delete deployment nginx-hpa

kubectl delete service nginx-hpa
```

---

# 17. Important Commands

```bash
kubectl autoscale deployment nginx-hpa \
--cpu-percent=50 \
--min=2 \
--max=10

kubectl get hpa

kubectl describe hpa nginx-hpa

kubectl top pods

kubectl top nodes

kubectl get events

kubectl delete hpa nginx-hpa
```

---

# 18. Marathi Quick Revision

- HPA Pods ची संख्या आपोआप वाढवतो किंवा कमी करतो.
- CPU Requests आवश्यक आहेत.
- Metrics Server शिवाय HPA काम करत नाही.
- HPA Pods scale करतो, Nodes नाही.
- Enterprise मध्ये HPA + Cluster Autoscaler एकत्र वापरतात.

---

# 19. Enterprise Learning Outcome

After completing this lab you should be able to

- Configure HPA
- Generate application load
- Monitor autoscaling
- Troubleshoot HPA issues
- Explain enterprise autoscaling
- Design scalable Kubernetes applications

---

# 20. Next Lab

```
38-node-maintenance.md
```

In the next lab we will perform Kubernetes node maintenance using cordon, drain and uncordon, safely evacuate workloads and understand enterprise maintenance procedures.

---

# 21. Marathi Summary (5+ Experience Revision)

## Interview Summary

Horizontal Pod Autoscaler (HPA) हा Kubernetes controller आहे जो CPU, Memory किंवा custom metrics च्या आधारावर Deployment मधील Pods ची संख्या आपोआप वाढवतो किंवा कमी करतो. Enterprise production मध्ये traffic spikes हाताळण्यासाठी HPA हा अत्यंत महत्त्वाचा घटक आहे आणि तो Metrics Server, Resource Requests आणि Deployment सोबत काम करतो.

### Production Investigation Flow

```
Application

↓

CPU Usage

↓

Metrics Server

↓

HPA

↓

Deployment

↓

ReplicaSet

↓

Pods
```

### Production Story

एका production retail application मध्ये Black Friday sale दरम्यान API वर अचानक 8 पट traffic वाढला. HPA ने CPU utilization 75% पेक्षा जास्त झाल्याचे ओळखले आणि Deployment 6 Pods वरून 28 Pods पर्यंत scale केला. मात्र response time अजूनही जास्त होता. Investigation मध्ये PostgreSQL database हा bottleneck असल्याचे आढळले. Application Pods योग्यरित्या scale झाले होते, पण backend database vertically scale करावा लागला. या incident मधून टीमने शिकले की HPA application tier scale करतो; संपूर्ण system architecture विचारात घेणे आवश्यक असते.

### 5+ Years Memory Trick

Interview मध्ये जर विचारले,

**"Why didn't HPA solve the performance issue?"**

उत्तर:

"HPA only scales application Pods based on configured metrics. If the bottleneck is the database, external API, storage, network or another downstream dependency, adding more Pods alone will not improve performance. Enterprise troubleshooting requires identifying the actual bottleneck before assuming autoscaling is the solution."

