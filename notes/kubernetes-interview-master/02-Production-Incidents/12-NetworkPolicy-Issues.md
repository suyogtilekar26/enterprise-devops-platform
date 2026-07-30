# Kubernetes Interview Master Handbook

# Production Incident 12 - NetworkPolicy Issues

---

# Incident

All Pods are Running.

Services are Healthy.

Applications cannot communicate.

Frontend

↓

Backend

Connection Timeout

Reason

NetworkPolicy

---

# What is NetworkPolicy?

## English

A NetworkPolicy controls how Pods communicate with each other and with external networks.

It works like a Firewall for Kubernetes Pods.

---

## मराठी

NetworkPolicy म्हणजे Kubernetes मधील Pod Firewall.

कोणत्या Pod ला कोणाशी Communication करायची परवानगी आहे हे NetworkPolicy ठरवते.

---

# Communication Flow

Frontend Pod

↓

NetworkPolicy

↓

Backend Pod

↓

Database Pod

---

# Types of Rules

Ingress

Incoming Traffic

---

Egress

Outgoing Traffic

---

Both

Bidirectional Control

---

# Default Behaviour

No NetworkPolicy

↓

All Traffic Allowed

---

Default Deny Policy

↓

All Traffic Blocked

Until Explicitly Allowed

---

# Common Reasons

Default Deny Policy

Wrong Pod Labels

Wrong Namespace Selector

Missing Egress Rule

Missing Ingress Rule

DNS Blocked

CNI Plugin Issue

Wrong IP Block

---

# Step 1

Check Network Policies

kubectl get networkpolicy

---

# Step 2

Describe Policy

kubectl describe networkpolicy

Verify

Pod Selector

Ingress Rules

Egress Rules

Namespaces

Ports

---

# Step 3

Verify Labels

kubectl get pods --show-labels

Ensure labels match the policy.

---

# Step 4

Verify Namespace

kubectl get namespaces

Check

namespaceSelector

---

# Step 5

Test Connectivity

kubectl exec -it frontend-pod -- curl http://backend-service

If timeout occurs

NetworkPolicy may be blocking traffic.

---

# Step 6

Test DNS

kubectl exec -it frontend-pod -- nslookup backend-service

If DNS fails

Check Egress Rules.

---

# Step 7

Verify CNI Plugin

kubectl get pods -n kube-system

Examples

Calico

Cilium

Weave

Flannel

---

# Troubleshooting Flow

Connection Failed

↓

Pods Running?

↓

Services Healthy?

↓

NetworkPolicy Exists?

↓

Ingress Rule?

↓

Egress Rule?

↓

Labels Match?

↓

Namespace Match?

↓

DNS Working?

↓

Application Connected

---

# Production Incident

Security Team applied

Default Deny Policy

No Allow Rule added.

Frontend

↓

Backend

Blocked

Production outage.

Resolution

Create Allow Policy.

Traffic restored.

---

# Another Incident

Backend Pod label

app=backend-v2

Policy expected

app=backend

Traffic blocked.

Resolution

Correct labels.

---

# Best Practices

Start with Default Deny.

Allow only required traffic.

Use Labels carefully.

Document policies.

Test after every deployment.

Monitor NetworkPolicy changes.

---

# Useful Commands

kubectl get networkpolicy

---

kubectl describe networkpolicy

---

kubectl get pods --show-labels

---

kubectl exec -it POD_NAME -- curl SERVICE

---

kubectl exec -it POD_NAME -- nslookup SERVICE

---

kubectl get pods -n kube-system

---

# Interview Questions

Q1

What is NetworkPolicy?

Answer

NetworkPolicy controls Pod-to-Pod and Pod-to-external network communication.

---

Q2

Difference between Ingress and Egress?

Answer

Ingress controls incoming traffic.

Egress controls outgoing traffic.

---

Q3

What happens after applying a Default Deny policy?

Answer

All traffic is blocked until explicitly allowed.

---

Q4

Why are Pods Running but communication fails?

Answer

NetworkPolicy may be blocking traffic.

---

Q5

Which CNI plugins support NetworkPolicy?

Answer

Calico

Cilium

Antrea

(Some CNIs such as basic Flannel do not enforce NetworkPolicy by themselves.)

---

# Scenario Based Interview

Question

Frontend cannot access Backend.

Both Pods are Running.

How will you troubleshoot?

Answer

1. Verify Service.

2. Test Connectivity.

3. Check NetworkPolicy.

4. Verify Labels.

5. Verify Namespace.

6. Verify Egress Rules.

7. Verify Ingress Rules.

8. Verify DNS.

---

Question

DNS lookup fails after applying NetworkPolicy.

Why?

Answer

The Egress policy may be blocking traffic to CoreDNS.

Allow DNS traffic to restore name resolution.

---

# Production Troubleshooting Checklist

✔ kubectl get networkpolicy

✔ kubectl describe networkpolicy

✔ kubectl get pods --show-labels

✔ kubectl exec -- curl

✔ kubectl exec -- nslookup

✔ Verify Labels

✔ Verify Namespace

✔ Verify Ingress Rules

✔ Verify Egress Rules

✔ Verify CNI Plugin

---

# Senior Engineer Notes

NetworkPolicy troubleshooting should follow this order:

Application

↓

Service

↓

DNS

↓

NetworkPolicy

↓

CNI Plugin

↓

Node Network

Never assume the application is at fault until network isolation has been verified.

Apply the principle of least privilege:

Allow only the traffic that is required.

