# Kubernetes Interview Master Handbook

# Chapter 13 - containerPort

---

# What is containerPort?

## English

containerPort specifies the port on which the application inside the container listens.

It is documentation for Kubernetes and helps other resources understand the application.

It DOES NOT expose the application outside the cluster.

---

## मराठी

containerPort म्हणजे Container मधील Application कोणत्या Port वर चालते हे सांगणे.

हे Browser साठी Port नाही.

हा फक्त Container चा Internal Port आहे.

---

# Syntax

containers:

- name: frontend

  image: nginx

  ports:

  - containerPort: 80

---

# Example

Nginx

↓

Runs on Port 80

containerPort: 80

---

Spring Boot

↓

Runs on Port 8080

containerPort: 8080

---

NodeJS

↓

Runs on Port 3000

containerPort: 3000

---

# Important Point

containerPort

≠

Browser Port

Browser cannot directly access

containerPort.

A Service is required.

---

# Networking Flow

Browser

↓

Service

↓

TargetPort

↓

ContainerPort

↓

Application

---

# Example

Container

containerPort: 80

↓

Service

port: 80

targetPort: 80

↓

Browser

http://SERVICE-IP

---

# containerPort vs Port

containerPort

Application Port

Inside Container

---

Service Port

Cluster Port

Used by Service

---

targetPort

Container Port

Where Service forwards traffic

---

nodePort

External Port

Used to access application from outside the cluster.

---

# Example

Container

containerPort: 8080

Service

port: 80

targetPort: 8080

Meaning

Browser

↓

80

↓

Service

↓

8080

↓

Application

---

# Real Production Example

Application

Spring Boot

Runs on

8080

Users

Access

443

Ingress

↓

Service

↓

8080

↓

Application

Users never know

8080 exists.

---

# Common Mistakes

Wrong containerPort

Wrong targetPort

Application listening on different port

Container starts successfully

Application still inaccessible

---

# Useful Commands

Describe Pod

kubectl describe pod POD_NAME

---

Check Container Port

kubectl get pod POD_NAME -o yaml

---

Check Service

kubectl describe service

---

Port Forward

kubectl port-forward pod/POD_NAME 8080:80

---

# Troubleshooting

Application not accessible

↓

Check Application Listening Port

↓

Check containerPort

↓

Check targetPort

↓

Check Service

↓

Check Endpoints

↓

Check Ingress

---

# Production Incident

Developer

Application listens

8080

Deployment

containerPort

80

Service

targetPort

80

Pods Running

Application Down

Reason

Wrong Port Mapping

Solution

Update containerPort

Update targetPort

Redeploy

---

# Best Practices

Always use the actual application port.

Keep Service targetPort equal to containerPort.

Document ports clearly.

Validate application startup logs.

---

# Interview Questions

Q1 What is containerPort?

Answer

containerPort specifies the port on which the application inside the container listens.

---

Q2 Does containerPort expose the application externally?

Answer

No.

It only documents the internal application port.

Service or Ingress is required for external access.

---

Q3 Difference between containerPort and targetPort?

Answer

containerPort is the application port inside the container.

targetPort is the port where the Service forwards traffic.

---

Q4 Difference between port and targetPort?

Answer

port is the Service port.

targetPort is the Container application port.

---

Q5 Is containerPort mandatory?

Answer

No.

The container can run without it.

However, defining it is considered a best practice because it improves documentation and integration.

---

# Scenario Based Interview

Question

Pods are Running.

Service exists.

Browser cannot access application.

What will you check?

Answer

1. Application listening port

2. containerPort

3. Service targetPort

4. Endpoints

5. Pod Logs

---

Question

Application listens on 3000.

Service targetPort is 80.

Will it work?

Answer

No.

The Service forwards traffic to port 80, but the application is listening on port 3000.

The targetPort must match the application's listening port.

---

# Senior Engineer Notes

containerPort does not publish an application.

Service is responsible for communication.

Ingress is responsible for external HTTP/HTTPS access.

Always verify the entire networking flow instead of checking only the Deployment.

---

# Cheat Sheet

✔ containerPort = Application Port

✔ Internal to the Container

✔ Browser cannot access it directly

✔ Service forwards traffic to targetPort

✔ targetPort should match containerPort

✔ Wrong port mapping = Application unavailable

✔ Check using

kubectl describe pod

kubectl describe service

kubectl get endpoints

