# Kubernetes Interview Master Handbook

# Production Incident 13 - DNS & Service Discovery Issues

---

# Incident

Application Pods are Running.

Services are Healthy.

Frontend tries to call

http://backend-service

Connection fails.

Reason

DNS Resolution Failure.

---

# What is Service Discovery?

## English

Service Discovery allows applications to communicate using Service names instead of Pod IP addresses.

Because Pod IPs change frequently, applications should always communicate through Services.

---

## मराठी

Service Discovery मुळे Applications Pod IP वापरण्याऐवजी Service Name वापरतात.

Pod delete किंवा recreate झाला तरी Service Name बदलत नाही.

---

# Kubernetes DNS Flow

Frontend Pod

↓

CoreDNS

↓

Resolve

backend-service

↓

Cluster IP

↓

Backend Pod

↓

Application

---

# Default DNS Format

Service

↓

backend-service

---

Namespace

↓

production

---

FQDN

↓

backend-service.production.svc.cluster.local

---

# Short Name

Same Namespace

backend-service

---

Different Namespace

backend-service.production

OR

backend-service.production.svc.cluster.local

---

# CoreDNS

CoreDNS provides

DNS Resolution

Service Discovery

Cluster Name Resolution

Every Kubernetes cluster depends on CoreDNS.

---

# Step 1

Check Service

kubectl get svc

Verify

Service Exists

---

# Step 2

Check CoreDNS

kubectl get pods -n kube-system

Verify

coredns

STATUS

Running

---

# Step 3

Test DNS

kubectl exec -it frontend-pod -- nslookup backend-service

Healthy Output

Name

backend-service

Address

10.96.25.14

---

# Step 4

Test Full DNS

kubectl exec -it frontend-pod -- nslookup backend-service.production.svc.cluster.local

---

# Step 5

Test Connectivity

kubectl exec -it frontend-pod -- curl http://backend-service

---

# Step 6

Check Endpoints

kubectl get endpoints

Verify

Backend IPs exist.

---

# Step 7

Check DNS Configuration

kubectl exec -it frontend-pod -- cat /etc/resolv.conf

Verify

search domains

nameserver

---

# Headless Service

clusterIP: None

Purpose

Direct Pod Discovery

Used mainly by

StatefulSets

Databases

Kafka

ZooKeeper

---

# Common Reasons

CoreDNS Down

Wrong Service Name

Wrong Namespace

No Endpoints

NetworkPolicy Blocking DNS

DNS Cache Issue

Service Deleted

Wrong FQDN

---

# Troubleshooting Flow

Application Cannot Resolve Service

↓

Check Service

↓

Check CoreDNS

↓

nslookup

↓

Check Endpoints

↓

Check Namespace

↓

Check NetworkPolicy

↓

DNS Working

↓

Application Connected

---

# Production Incident

Developer changed Service name

backend-service

↓

backend-api

Application still used

backend-service

DNS lookup failed.

Resolution

Update application configuration.

---

# Another Incident

Security team blocked DNS traffic using NetworkPolicy.

CoreDNS became unreachable.

All internal Service communication failed.

Resolution

Allow DNS traffic to CoreDNS.

---

# Best Practices

Always use Service Names.

Avoid Pod IPs.

Monitor CoreDNS.

Use FQDN across namespaces.

Keep DNS policies documented.

---

# Useful Commands

kubectl get svc

---

kubectl get endpoints

---

kubectl get pods -n kube-system

---

kubectl exec -it POD_NAME -- nslookup SERVICE

---

kubectl exec -it POD_NAME -- dig SERVICE

---

kubectl exec -it POD_NAME -- cat /etc/resolv.conf

---

# Interview Questions

Q1

What is Service Discovery?

Answer

Service Discovery allows applications to communicate using stable Service names instead of changing Pod IP addresses.

---

Q2

Which component provides DNS in Kubernetes?

Answer

CoreDNS.

---

Q3

What is the default Kubernetes FQDN?

Answer

service.namespace.svc.cluster.local

---

Q4

How do you verify DNS?

Answer

kubectl exec -it POD_NAME -- nslookup SERVICE_NAME

OR

kubectl exec -it POD_NAME -- dig SERVICE_NAME

---

Q5

What is a Headless Service?

Answer

A Service with

clusterIP: None

It provides direct Pod DNS records and is commonly used with StatefulSets.

---

# Scenario Based Interview

Question

Application cannot resolve

backend-service.

How will you troubleshoot?

Answer

1. Verify Service exists.

2. Verify CoreDNS is Running.

3. Run nslookup.

4. Check Endpoints.

5. Verify Namespace.

6. Verify NetworkPolicy.

7. Check /etc/resolv.conf.

---

Question

Pods are Running.

DNS lookup fails for every Service.

What is the likely cause?

Answer

CoreDNS is down, DNS traffic is blocked, or DNS configuration is incorrect.

---

# Production Troubleshooting Checklist

✔ kubectl get svc

✔ kubectl get endpoints

✔ kubectl get pods -n kube-system

✔ kubectl exec -- nslookup

✔ kubectl exec -- dig

✔ cat /etc/resolv.conf

✔ Verify Namespace

✔ Verify CoreDNS

✔ Verify NetworkPolicy

✔ Verify Service Name

---

# Senior Engineer Notes

Always troubleshoot DNS in this order:

Application

↓

Service Name

↓

Namespace

↓

CoreDNS

↓

Endpoints

↓

NetworkPolicy

↓

Node Network

Never hardcode Pod IP addresses.

Always communicate using Kubernetes Services.

Headless Services should be used only when direct Pod discovery is required.

