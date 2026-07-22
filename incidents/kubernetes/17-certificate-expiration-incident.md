# Kubernetes Production Incident 17 - Certificate Expiration Incident

# 1. Incident Overview

## Incident ID

INC-K8S-017

## Severity

SEV-1

## Environment

Production

## Reported By

Prometheus Alertmanager

## Incident Time

05:42 AM

## Resolved Time

06:31 AM

## Duration

49 Minutes

## Affected Component

TLS Certificate

## Impacted Services

Ingress Controller

API Gateway

## Impacted Application

Enterprise DevOps Platform

```
Users

↓

HTTPS

↓

Ingress ❌

↓

API Gateway

↓

Backend Services
```

---

# 2. Business Impact

Customer Impact

- HTTPS unavailable
- Browser security warnings
- Login failures
- API requests rejected

Business Impact

- Customer access interrupted
- Secure transactions unavailable
- SLA breach
- Increase in support tickets

Estimated Revenue Impact

Critical

---

# 3. Alert Received

Prometheus Alert

```
CertificateExpiration

Severity

Critical

Namespace

ingress-nginx

Certificate

enterprise-tls

Days Remaining

0
```

Grafana Dashboard

```
HTTPS Errors ↑

TLS Handshake Failures ↑

Availability ↓
```

Browser Error

```
NET::ERR_CERT_DATE_INVALID
```

Ingress Logs

```
TLS handshake error

certificate has expired
```

---

# 4. Production Architecture

```
Users

↓

HTTPS

↓

Load Balancer

↓

Ingress Controller

↓

TLS Secret

↓

API Gateway
```

---

# 5. Symptoms

Observed

- HTTPS requests failing
- TLS handshake failures
- Browser certificate warning
- APIs inaccessible over HTTPS

Users observed

- Login page unavailable
- SSL warning
- Mobile application unable to connect
- HTTP 502 / SSL errors

---

# 6. Initial Investigation

Objective

Determine whether issue is related to

- Certificate
- Secret
- Ingress
- Load Balancer
- DNS
- Recent deployment

Commands

```bash
kubectl get ingress

kubectl get secret

kubectl describe ingress
```

Observation

```
TLS Certificate Expired
```

---

# 7. Investigation Timeline

## 05:42

Critical alert received.

---

## 05:45

Verified HTTPS failure.

```bash
curl -Iv https://api.company.com
```

Observed

```
SSL certificate problem

certificate has expired
```

---

## 05:49

Verified Ingress.

```bash
kubectl describe ingress enterprise-ingress
```

Ingress healthy.

---

## 05:53

Verified TLS Secret.

```bash
kubectl get secret enterprise-tls
```

Secret present.

---

## 05:57

Checked certificate expiration.

```bash
kubectl get secret enterprise-tls \
-o jsonpath='{.data.tls\.crt}' \
| base64 -d \
| openssl x509 -noout -dates
```

Observed

```
Not After

Today's Date
```

Certificate expired.

---

## 06:03

Verified cert-manager.

```bash
kubectl get pods -n cert-manager
```

Observed

Renewal job failed overnight.

---

## 06:08

Reviewed cert-manager logs.

```bash
kubectl logs deployment/cert-manager \
-n cert-manager
```

Observed

```
DNS-01 challenge failed
```

---

## 06:14

Renewed certificate manually.

Applied updated TLS Secret.

---

## 06:22

Ingress reloaded.

HTTPS restored.

---

## 06:27

Validated browser access.

---

## 06:31

Business validation completed.

Incident closed.

---

# 8. Commands Executed

Ingress

```bash
kubectl get ingress

kubectl describe ingress
```

Secrets

```bash
kubectl get secret

kubectl describe secret
```

Certificate

```bash
openssl x509 -noout -dates

openssl s_client \
-connect api.company.com:443
```

cert-manager

```bash
kubectl get pods -n cert-manager

kubectl logs deployment/cert-manager \
-n cert-manager
```

Events

```bash
kubectl get events \
--sort-by=.metadata.creationTimestamp
```

---

# 9. Findings

Infrastructure

Healthy

Ingress

Healthy

Application

Healthy

TLS

Expired

Root Issue

Automatic certificate renewal failed.

---

# 10. Root Cause

The production TLS certificate expired because the automated cert-manager renewal process failed.

The DNS validation challenge was unsuccessful, preventing renewal.

Ingress continued serving the expired certificate.

---

# 11. Resolution

Generated new certificate.

Updated Kubernetes TLS Secret.

Validated Ingress reload.

Confirmed HTTPS connectivity.

Verified application functionality.

---

# 12. Validation

Certificate

```bash
openssl x509 -noout -dates
```

Business

- Login successful
- HTTPS operational
- APIs healthy
- Dashboard accessible

Monitoring

- TLS alerts cleared
- HTTPS availability restored
- No browser certificate warnings

---

# 13. Rollback

If renewal fails

- Restore previous valid certificate (if still valid).
- Restore backup TLS Secret.
- Reconfigure cert-manager.
- Retry certificate issuance.

---

# 14. Customer Communication

Initial Update

> We are investigating an issue affecting secure HTTPS connectivity.

Progress Update

> The issue has been isolated to TLS certificate renewal. Recovery is underway.

Resolution

> Secure HTTPS connectivity has been restored successfully. Additional monitoring has been enabled.

---

# 15. Incident Timeline

```
05:42

Alert

↓

05:49

Ingress Verified

↓

05:57

Certificate Expired

↓

06:03

cert-manager Investigation

↓

06:08

DNS Challenge Failure

↓

06:14

Certificate Renewed

↓

06:22

Ingress Reloaded

↓

06:31

Incident Closed
```

---

# 16. Root Cause Analysis (RCA)

## What Happened?

Production TLS certificate expired.

## Why?

Automatic renewal failed.

## Why wasn't it prevented?

Renewal failure alerts were not configured.

## Customer Impact

HTTPS unavailable.

## Preventive Action

Implement certificate expiration monitoring, renewal validation and cert-manager health alerts.

---

# 17. Preventive Actions

- Alert at 30, 15, 7 and 3 days before expiration.
- Monitor cert-manager health.
- Validate renewal after every scheduled run.
- Monitor ACME challenge failures.
- Maintain backup certificates.
- Test certificate renewal quarterly.

---

# 18. Production Best Practices

- Never depend solely on certificate expiration alerts.
- Monitor renewal success.
- Use highly available cert-manager deployments.
- Audit certificate inventory regularly.
- Document emergency certificate replacement procedures.
- Validate TLS after every renewal.

---

# 19. Production Support Interview Questions

## Q1. How do you investigate a Kubernetes certificate expiration incident?

### Answer

1. Assess business impact.
2. Verify HTTPS failures.
3. Inspect Ingress configuration.
4. Validate TLS Secret.
5. Check certificate validity.
6. Review cert-manager logs.
7. Renew the certificate.
8. Validate HTTPS.
9. Complete RCA.

---

## Q2. How do you check a Kubernetes TLS certificate expiration?

### Answer

Decode the TLS Secret and inspect it using OpenSSL.

Example:

```bash
kubectl get secret enterprise-tls \
-o jsonpath='{.data.tls\.crt}' \
| base64 -d \
| openssl x509 -noout -dates
```

---

## Q3. Why can cert-manager fail to renew certificates?

### Answer

Common causes include DNS validation failures, ACME server issues, incorrect issuer configuration, expired credentials or network connectivity problems.

---

# 20. Marathi Quick Revision

- HTTPS verify करा.
- Ingress तपासा.
- TLS Secret तपासा.
- Certificate expiry verify करा.
- cert-manager logs तपासा.
- Root Cause शोधा.
- Certificate renew करा.
- Business validation करा.
- RCA तयार करा.

---

# 21. Marathi Summary (5+ Experience Revision)

## Interview Summary

Production मध्ये Certificate Expiration incident आल्यास प्रथम HTTPS connectivity verify करावी. त्यानंतर Ingress, TLS Secret आणि certificate validity तपासावी. cert-manager logs आणि renewal process verify करून Root Cause निश्चित करावा. Certificate renew करून HTTPS validate करावी. शेवटी business validation, monitoring validation आणि RCA पूर्ण करावी.

### Production Investigation Flow

```
Alert

↓

HTTPS Failure

↓

Ingress

↓

TLS Secret

↓

Certificate Expiry

↓

cert-manager

↓

Root Cause

↓

Certificate Renewal

↓

Business Validation

↓

RCA
```

### Production Story

एका production banking platform वर सकाळी अचानक सर्व ग्राहकांना browser मध्ये **"Your connection is not private"** असा संदेश दिसू लागला. Investigation मध्ये Ingress पूर्णपणे healthy होता, पण TLS certificate रात्री expire झाला होता. cert-manager DNS challenge अपयशी ठरल्यामुळे renewal झाले नव्हते. नवीन certificate issue करून TLS Secret update करण्यात आला आणि काही मिनिटांत HTTPS पुन्हा restore झाले. Incident नंतर 30, 15, 7 आणि 3 दिवस आधी certificate expiry alerts तसेच cert-manager renewal success monitoring लागू करण्यात आले.

### 5+ Years Memory Trick

Interview मध्ये जर विचारले,

**"How do you troubleshoot a Kubernetes TLS certificate expiration incident in production?"**

उत्तर:

"I first assess the business impact, verify HTTPS failures, inspect the Ingress and TLS Secret, validate the certificate expiry, review cert-manager logs, identify why automatic renewal failed, renew the certificate safely, validate HTTPS functionality, monitor platform stability, and complete the RCA."

