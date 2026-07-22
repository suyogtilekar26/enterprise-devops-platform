# Helm Lab 10 - Customize Service Template

# Enterprise DevOps Platform

---

# Lab Objective

In this lab, we will customize the Kubernetes Service template for our API Gateway Helm Chart.

The Service enables communication between Kubernetes Pods and other applications inside the cluster.

For our Enterprise DevOps Platform, the API Gateway Service will receive requests from the Frontend and forward them to the API Gateway Pods.

---

# Production Scenario

Company

ABC Bank

The Frontend application communicates with the API Gateway through a Kubernetes Service.

The Service provides:

- Stable DNS
- Load Balancing
- Service Discovery
- Internal Communication

Even if Pods are recreated, the Service endpoint remains unchanged.

This is why Services are critical in production Kubernetes environments.

---

# Enterprise Architecture

```
Frontend

        │

        ▼

API Gateway Service

        │

        ▼

API Gateway Pods

        │

        ▼

Container
```

---

# Current Project

```
Enterprise DevOps Platform

helm/

└── charts/

    └── api-gateway/

        ├── values.yaml

        └── templates/

            ├── deployment.yaml

            └── service.yaml
```

---

# Step 1

Open the Service template.

```bash
nano helm/charts/api-gateway/templates/service.yaml
```

---

# Step 2

Replace the generated template with the following.

```yaml
apiVersion: v1
kind: Service

metadata:
  name: {{ .Release.Name }}-api-gateway

spec:

  type: {{ .Values.service.type }}

  selector:
    app: api-gateway

  ports:

  - port: {{ .Values.service.port }}

    targetPort: {{ .Values.service.port }}

    protocol: TCP
```

---

# Understanding the Template

---

## Service Name

```yaml
{{ .Release.Name }}
```

Example

```
api-prod

↓

api-prod-api-gateway
```

Every Helm Release creates a uniquely named Service.

---

## Service Type

```yaml
{{ .Values.service.type }}
```

Current Value

```
ClusterIP
```

Other Options

```
NodePort

LoadBalancer

ExternalName
```

Production usually uses

```
ClusterIP

+

Ingress
```

---

## Selector

```yaml
selector:

  app: api-gateway
```

Matches

```
Deployment

↓

Pod Labels

↓

app=api-gateway
```

If labels do not match, traffic will never reach the Pods.

---

## Port

```yaml
port:
```

Port exposed by the Kubernetes Service.

Current Value

```
5000
```

---

## Target Port

```yaml
targetPort:
```

Container Port

Current Value

```
5000
```

Traffic Flow

```
Service

↓

5000

↓

Container

5000
```

---

# Step 3

Save the file.

---

# Step 4

Validate the chart.

```bash
helm lint helm/charts/api-gateway
```

Expected

```
1 chart(s) linted

0 chart(s) failed
```

---

# Step 5

Render the chart.

```bash
helm template api-gateway helm/charts/api-gateway
```

Locate

```
kind: Service
```

Verify

- Name
- Type
- Port
- Selector

---

# Step 6

Deploy the chart.

```bash
helm install api-gateway helm/charts/api-gateway
```

Expected

```
STATUS: deployed
```

---

# Step 7

Verify the Service.

```bash
kubectl get svc
```

Example

```
NAME

api-gateway-api-gateway

TYPE

ClusterIP

PORT

5000/TCP
```

---

# Step 8

Describe the Service.

```bash
kubectl describe svc api-gateway-api-gateway
```

Verify

- Selector
- Endpoints
- Port
- Events

---

# Step 9

Verify Endpoints.

```bash
kubectl get endpoints
```

Expected

```
api-gateway-api-gateway
```

If Pods are running correctly, endpoint IPs will be displayed.

---

# Step 10

Cleanup.

```bash
helm uninstall api-gateway
```

---

# Enterprise Project Mapping

```
Frontend

↓

API Gateway Service

↓

API Gateway Deployment

↓

Pods
```

Future

```
Frontend

↓

API Gateway

↓

Auth Service

↓

Dashboard Service
```

Every application will communicate through Kubernetes Services.

---

# Validation Checklist

Run

```bash
helm lint helm/charts/api-gateway
```

Run

```bash
helm template api-gateway helm/charts/api-gateway
```

Run

```bash
kubectl get svc
```

Run

```bash
kubectl describe svc api-gateway-api-gateway
```

Run

```bash
kubectl get endpoints
```

---

# Expected Result

The API Gateway Helm Chart now contains a production-ready Kubernetes Service template.

The Service is capable of routing traffic to API Gateway Pods.

---

# Production Best Practices

- Use ClusterIP for internal services.
- Expose applications externally through Ingress instead of NodePort whenever possible.
- Ensure Service selectors match Pod labels.
- Keep Service ports configurable using `values.yaml`.
- Validate rendered manifests before deployment.

---

# Common Mistakes

- Incorrect selector labels.
- Hardcoded ports.
- Using NodePort unnecessarily.
- Service and Deployment labels not matching.
- Ignoring missing endpoints after deployment.

---

# Interview Questions

## Q1. Why is a Kubernetes Service required?

### Answer

Pods are ephemeral and their IP addresses change. A Kubernetes Service provides a stable network endpoint and load balances traffic across healthy Pods.

---

## Q2. What happens if the Service selector does not match Pod labels?

### Answer

The Service will have no endpoints and traffic will not reach any Pods, even if the Pods are running successfully.

---

## Q3. Why is ClusterIP commonly used in microservice architectures?

### Answer

ClusterIP exposes services only within the Kubernetes cluster, allowing secure internal communication between microservices while external access is handled through an Ingress Controller.

---

# Marathi Quick Revision

- Service template customize केला.
- ClusterIP वापरला.
- Selector आणि Pod labels match झाले पाहिजेत.
- Service Pods कडे traffic पाठवते.
- `kubectl get endpoints` ने verify करा.
- `helm template` आणि `helm lint` वापरून validate करा.

---

# Marathi Summary (5+ Experience Revision)

या Lab मध्ये आपण API Gateway साठी production-ready Kubernetes Service template तयार केला. Service हा Frontend आणि API Gateway Pods यांच्यातील स्थिर communication layer आहे. Production मध्ये ClusterIP + Ingress ही सर्वाधिक वापरली जाणारी architecture आहे. Service selector आणि Pod labels जुळणे अत्यंत महत्त्वाचे आहे; अन्यथा Service ला endpoints मिळत नाहीत आणि application उपलब्ध राहत नाही.

