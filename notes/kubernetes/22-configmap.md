# Kubernetes ConfigMap

# 1. Purpose

The purpose of a ConfigMap is to store application configuration separately from the application container.

Instead of hardcoding configuration values inside the Docker image, Kubernetes stores them in a ConfigMap.

This allows configuration changes without rebuilding the application image.

---

# 2. Introduction

Imagine our Frontend application needs

- API URL
- Environment Name
- Log Level
- Feature Flags

Bad Practice

```
Docker Image

↓

API URL Hardcoded

↓

Need Image Rebuild
```

Good Practice

```
Docker Image

↓

ConfigMap

↓

Application Reads Configuration
```

---

# 3. Enterprise Usage

Almost every Production application uses ConfigMaps.

Examples

- API URL
- Database Host
- Log Level
- Application Mode
- Feature Flags
- Time Zone
- Cache Configuration

Never store passwords in ConfigMaps.

Passwords belong in Kubernetes Secrets.

---

# 4. Usage in THIS Project

```
Frontend Deployment

↓

ConfigMap

↓

API_GATEWAY_URL

↓

Frontend Pods

----------------------------

API Gateway

↓

ConfigMap

↓

AUTH_URL

↓

API Pods
```

Our Enterprise DevOps Platform will use ConfigMaps for all non-sensitive configuration.

---

# 5. Architecture

```
               ConfigMap

     API_URL

     LOG_LEVEL

     ENVIRONMENT

              │

              ▼

      Frontend Deployment

              │

              ▼

         Frontend Pods

              │

              ▼

     Reads Configuration
```

---

# 6. Internal Workflow

```
Developer

↓

Create ConfigMap

↓

Deployment References ConfigMap

↓

Pod Starts

↓

Environment Variables Loaded

↓

Application Uses Configuration
```

---

# 7. Why ConfigMap?

Without ConfigMap

```
Application

↓

Configuration Hardcoded

↓

Image Rebuild Required
```

With ConfigMap

```
Configuration Changed

↓

Update ConfigMap

↓

Restart Pods

↓

New Configuration Active
```

---

# 8. What Should Be Stored?

Good Examples

```
API_URL

LOG_LEVEL

ENVIRONMENT

APP_NAME

CACHE_SIZE

TIME_ZONE
```

Bad Examples

```
Database Password

JWT Secret

API Token

Private Key
```

Those belong in Kubernetes Secrets.

---

# 9. Daily DevOps Activities

- Create ConfigMaps
- Update Configurations
- Verify Environment Variables
- Restart Deployments
- Validate Application Behaviour

---

# 10. Production Best Practices

- Separate configuration from code.
- Use meaningful ConfigMap names.
- Version configuration changes.
- Never store secrets.
- Review configuration before deployment.

---

# 11. Security

- Store only non-sensitive values.
- Restrict edit permissions.
- Audit configuration changes.
- Keep Secrets separate.

---

# 12. Troubleshooting

List ConfigMaps

```bash
kubectl get configmaps
```

Describe ConfigMap

```bash
kubectl describe configmap frontend-config
```

View YAML

```bash
kubectl get configmap frontend-config -o yaml
```

Verify Pod Environment

```bash
kubectl exec -it <pod-name> -- env
```

---

# 13. Real Production Scenarios

## Scenario 1

### Wrong API URL

Frontend returned

```
502 Bad Gateway
```

Investigation

```bash
kubectl describe configmap frontend-config
```

Root Cause

API URL pointed to

```
api-v1
```

instead of

```
api-gateway
```

Resolution

Update ConfigMap.

Restart Deployment.

---

## Scenario 2

### Production Log Level

Application generated huge logs.

Reason

```
LOG_LEVEL=DEBUG
```

Resolution

Changed to

```
LOG_LEVEL=INFO
```

Application performance improved.

---

## Scenario 3

### Environment Change

Application moved from QA to Production.

Only ConfigMap values changed.

No Docker image rebuild was required.

---

# 14. Scenario Interview Questions

Q1. What is ConfigMap?

Answer

ConfigMap stores non-sensitive configuration separately from the application image.

---

Q2. Should passwords be stored in ConfigMap?

Answer

No.

Passwords must be stored in Kubernetes Secrets.

---

Q3. Why do we use ConfigMap?

Answer

To separate configuration from application code and Docker images.

---

Q4. Does changing a ConfigMap automatically update running Pods?

Answer

Not always.

Most applications require a Pod restart or rollout restart to use the updated values.

---

# 15. Architecture Interview Questions

Explain the configuration flow.

```
ConfigMap

↓

Deployment

↓

Pods

↓

Application
```

---

Q2.

Why is ConfigMap important in CI/CD?

Answer

The same Docker image can be deployed to Dev, QA and Production by changing only the ConfigMap.

---

# 16. Production Support Interview Questions

Production Investigation Flow

```
Application Error

↓

Check ConfigMap

↓

Verify Environment Variables

↓

Restart Deployment

↓

Validate Application

↓

Resolved
```

Manager Question

"Production API is unreachable after deployment."

Expected Answer

- Verify ConfigMap
- Verify Environment Variables
- Verify Service Name
- Restart Deployment
- Validate Logs
- Confirm Recovery

---

# 17. Related Runbooks

- wrong-configmap.md
- application-config-error.md
- env-variable-missing.md

---

# 18. Common Incidents

- Wrong API URL
- Missing Environment Variable
- Incorrect Log Level
- Typo in ConfigMap
- Pod Using Old Configuration

---

# 19. Commands

```bash
kubectl get configmaps

kubectl describe configmap frontend-config

kubectl get configmap frontend-config -o yaml

kubectl exec -it <pod-name> -- env

kubectl rollout restart deployment frontend
```

---

# 20. Marathi Quick Revision

- ConfigMap मध्ये Non-Secret Configuration ठेवतात.
- Password ConfigMap मध्ये ठेवत नाहीत.
- ConfigMap मुळे Docker Image पुन्हा Build करावी लागत नाही.
- Configuration बदलण्यासाठी ConfigMap Update करतात.

---

# 21. Marathi Summary (5+ Years Experience Revision)

## Interview Summary

ConfigMap हा Application Configuration वेगळा ठेवण्यासाठी वापरला जातो.

यामुळे एकाच Docker Image ला Dev, QA आणि Production मध्ये वेगवेगळ्या Configuration सह वापरता येते.

## Production Investigation Flow

```
Application Error

↓

ConfigMap

↓

Environment Variables

↓

Restart Deployment

↓

Verify Logs

↓

Resolved
```

## Production Story

Production मध्ये Frontend API ला Connect होत नव्हती.

Pods Healthy होते.

Service Healthy होता.

Investigation मध्ये ConfigMap मधील API URL चुकीचा होता.

ConfigMap Update करून Deployment Restart केल्यावर Application लगेच चालू झाली.

## Memory Trick

**ConfigMap = Configuration**

**Secrets = Sensitive Data**

Remember

**No Passwords in ConfigMap**

