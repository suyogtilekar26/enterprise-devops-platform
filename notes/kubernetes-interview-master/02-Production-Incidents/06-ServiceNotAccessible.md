# Kubernetes Interview Master Handbook

# Production Incident 06 - Service Not Accessible

---

# Incident

Deployment is successful.

Pods are Running.

Service exists.

But users cannot access the application.

Browser shows

Connection Refused

OR

Timeout

---

# What does Service Not Accessible mean?

## English

The application is running, but network traffic is not reaching the container.

The issue may be with the Service, Endpoints, Labels, Ports, DNS or NetworkPolicy.

---

## मराठी

Application चालू आहे.

Pods Running आहेत.

पण Traffic Container पर्यंत पोहोचत नाही.

Problem Service, Selector, TargetPort, DNS किंवा NetworkPolicy मध्ये असू शकतो.

---

# Request Flow

Browser

↓

Ingress / LoadBalancer

↓

Service

↓

Endpoints

↓

Pod

↓

Container

↓

Application

Problem anywhere

↓

Application Unreachable

---

# Common Reasons

Wrong Selector

Wrong Labels

Wrong targetPort

Application listening on different Port

No Endpoints

DNS Failure

NetworkPolicy Blocking

Ingress Misconfiguration

Firewall Issue

---

# Step 1

Check Pods

kubectl get pods

Verify

STATUS

READY

---

# Step 2

Check Service

kubectl get svc

Example

NAME

frontend

TYPE

ClusterIP

PORT

80

---

# Step 3

Describe Service

kubectl describe svc frontend

Verify

Selector

Port

TargetPort

Endpoints

---

# Step 4

Check Endpoints

kubectl get endpoints

Example

frontend

10.244.1.5:80

Healthy

If

<none>

Problem

Service cannot find Pods.

---

# Step 5

Check Labels

kubectl get pods --show-labels

Example

app=frontend

---

# Step 6

Check Selector

kubectl get svc frontend -o yaml

Example

selector:

  app: frontend

Labels and Selector must match exactly.

---

# Step 7

Check Application Port

kubectl describe pod POD_NAME

Verify

containerPort

Application Listening Port

---

# Step 8

Port Forward Test

kubectl port-forward pod/POD_NAME 8080:80

If port-forward works

Application is healthy.

Problem exists in Service or Networking.

---

# Step 9

DNS Test

kubectl exec -it POD_NAME -- nslookup frontend

Verify

DNS Resolution.

---

# Step 10

NetworkPolicy

kubectl get networkpolicy

Verify

Traffic is not blocked.

---

# Troubleshooting Flow

Application Unreachable

↓

Pods Running?

↓

Service Exists?

↓

Endpoints Available?

↓

Labels Match?

↓

Selector Correct?

↓

TargetPort Correct?

↓

DNS Working?

↓

NetworkPolicy?

↓

Application Accessible

---

# Production Incident

Developer changed

Pod Label

Old

app=frontend

New

app=frontend-v2

Service Selector

app=frontend

Result

Endpoints

<none>

Application Down

Resolution

Restore matching labels.

---

# Another Incident

Application

Listening

8080

Service

targetPort

80

Pods Running

Users Failed

Resolution

Update targetPort to

8080

---

# Best Practices

Use meaningful labels.

Keep selectors simple.

Verify Endpoints after deployment.

Use readiness probes.

Monitor Service health.

Document application ports.

---

# Useful Commands

kubectl get svc

---

kubectl describe svc SERVICE_NAME

---

kubectl get endpoints

---

kubectl get pods --show-labels

---

kubectl describe pod POD_NAME

---

kubectl port-forward pod/POD_NAME 8080:80

---

kubectl exec -it POD_NAME -- nslookup SERVICE_NAME

---

kubectl get networkpolicy

---

# Interview Questions

Q1

Pods are Running.

Application is not accessible.

What will you check first?

Answer

Service

Endpoints

Selector

TargetPort

Application Port

---

Q2

What does

Endpoints <none>

mean?

Answer

The Service cannot find matching Pods.

Usually caused by incorrect labels or selectors.

---

Q3

How do you verify Service connectivity?

Answer

Use

kubectl describe svc

kubectl get endpoints

kubectl port-forward

---

Q4

Difference between

port

and

targetPort?

Answer

port is the Service port.

targetPort is the port on the container where traffic is forwarded.

---

Q5

Why are Endpoints important?

Answer

Endpoints contain the IP addresses of Pods behind the Service.

Without Endpoints, traffic cannot reach the application.

---

# Production Troubleshooting Checklist

✔ kubectl get pods

✔ kubectl get svc

✔ kubectl describe svc

✔ kubectl get endpoints

✔ kubectl get pods --show-labels

✔ kubectl describe pod

✔ kubectl port-forward

✔ nslookup

✔ Check NetworkPolicy

✔ Verify targetPort

---

# Senior Engineer Notes

Always verify Endpoints before debugging the application.

If Endpoints are empty, the problem is almost always with Labels or Selectors.

Follow the traffic path step by step.

Browser

↓

Ingress

↓

Service

↓

Endpoints

↓

Pod

↓

Container

↓

Application

Never skip a layer while troubleshooting.

