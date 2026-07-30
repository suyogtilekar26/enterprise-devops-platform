# Kubernetes Interview Master Handbook

# Production Incident 09 - ConfigMap & Secret Issues

---

# Incident

Deployment completed successfully.

Pods started.

Application immediately failed.

Status

CrashLoopBackOff

Reason

Missing ConfigMap

OR

Wrong Secret

---

# What is ConfigMap?

## English

ConfigMap stores non-sensitive configuration.

Examples

Application URL

Environment Name

Log Level

Feature Flags

---

## मराठी

ConfigMap मध्ये Sensitive नसलेली Configuration ठेवली जाते.

उदा.

API URL

Environment

Log Level

Feature Flags

---

# What is Secret?

## English

Secret stores sensitive information.

Examples

Database Password

API Key

OAuth Token

TLS Certificate

SSH Key

---

## मराठी

Secret मध्ये Sensitive माहिती ठेवली जाते.

उदा.

Database Password

JWT Secret

API Keys

Certificates

---

# Configuration Flow

Deployment

↓

ConfigMap

↓

Secret

↓

Environment Variables

↓

Application Starts

If Config Missing

↓

Application Crash

---

# Common Problems

ConfigMap Not Found

Secret Not Found

Wrong Key Name

Wrong Value

Secret Not Mounted

ConfigMap Not Mounted

Base64 Encoding Error

Application Reading Wrong Variable

---

# Step 1

Check Pod

kubectl get pods

---

# Step 2

Describe Pod

kubectl describe pod POD_NAME

Look for

ConfigMap not found

Secret not found

Mount failed

---

# Step 3

Check ConfigMaps

kubectl get configmap

kubectl describe configmap APP_CONFIG

---

# Step 4

Check Secrets

kubectl get secret

kubectl describe secret DB_SECRET

---

# Step 5

Verify Environment Variables

kubectl exec -it POD_NAME -- env

Confirm

DATABASE_HOST

DATABASE_USER

DATABASE_PASSWORD

API_URL

---

# Step 6

Verify Mounted Files

kubectl exec -it POD_NAME -- ls /config

kubectl exec -it POD_NAME -- cat /config/application.yaml

---

# Base64

Secrets store values in Base64 format.

Encode

echo -n "mypassword" | base64

Decode

echo "bXlwYXNzd29yZA==" | base64 -d

Remember

Base64 is encoding.

It is NOT encryption.

---

# Troubleshooting Flow

Application Crash

↓

Describe Pod

↓

Check Events

↓

Verify ConfigMap

↓

Verify Secret

↓

Verify Environment Variables

↓

Verify Mounted Files

↓

Application Starts

---

# Production Incident

Developer renamed

DATABASE_URL

to

DB_URL

Application expected

DATABASE_URL

Startup failed.

CrashLoopBackOff.

Resolution

Restore the correct environment variable.

---

# Another Incident

Database password rotated.

Secret was updated.

Pods were not restarted.

Application continued using the old password.

Database authentication failed.

Resolution

Restart Deployment after Secret update.

---

# Best Practices

Keep Secrets separate from ConfigMaps.

Use meaningful key names.

Rotate Secrets regularly.

Never store passwords in ConfigMaps.

Use external Secret managers for production.

Document all required environment variables.

---

# Useful Commands

kubectl get configmap

---

kubectl describe configmap

---

kubectl get secret

---

kubectl describe secret

---

kubectl exec -it POD_NAME -- env

---

kubectl exec -it POD_NAME -- ls /config

---

kubectl logs POD_NAME

---

# Interview Questions

Q1

Difference between ConfigMap and Secret?

Answer

ConfigMap stores non-sensitive configuration.

Secret stores sensitive data such as passwords and API keys.

---

Q2

Are Kubernetes Secrets encrypted?

Answer

By default they are Base64 encoded.

Encryption at rest must be enabled separately.

---

Q3

How do you troubleshoot ConfigMap issues?

Answer

1. Describe Pod

2. Check Events

3. Verify ConfigMap exists

4. Verify Keys

5. Verify Environment Variables

6. Verify Mounted Files

---

Q4

Why did the application fail after Secret rotation?

Answer

The Secret was updated, but the application or Pods continued using the old value until they were restarted or reloaded.

---

Q5

How do you verify environment variables inside a Pod?

Answer

kubectl exec -it POD_NAME -- env

---

# Scenario Based Interview

Question

Application is in CrashLoopBackOff.

Logs show

DATABASE_PASSWORD not found.

What will you do?

Answer

1. Check Secret exists.

2. Verify Secret key.

3. Verify Deployment references the correct Secret.

4. Verify environment variable mapping.

5. Restart Deployment after fixing the Secret.

---

Question

Application cannot read configuration file.

What will you check?

Answer

1. ConfigMap exists.

2. Volume mount path.

3. File permissions.

4. Mount configuration.

5. Application configuration path.

---

# Production Troubleshooting Checklist

✔ kubectl describe pod

✔ kubectl get configmap

✔ kubectl describe configmap

✔ kubectl get secret

✔ kubectl describe secret

✔ kubectl exec -- env

✔ kubectl exec -- ls

✔ kubectl logs

✔ Verify Base64 values

✔ Verify Mount Paths

---

# Senior Engineer Notes

Never hardcode credentials inside container images.

Separate application configuration from application code.

Treat Secrets as sensitive assets.

Rotate credentials regularly.

Use External Secrets, HashiCorp Vault, AWS Secrets Manager or Azure Key Vault in production environments whenever possible.

