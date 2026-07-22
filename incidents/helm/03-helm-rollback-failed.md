# Helm Incident 03 - Helm Rollback Failed

# Enterprise DevOps Platform

---

# Purpose

This incident simulates a real-world enterprise production scenario where a Helm Rollback fails during an emergency recovery.

The objective is to investigate why the rollback failed, restore the production application and implement preventive actions to avoid similar failures in future deployments.

---

# Incident Summary

| Field | Value |
|-------|-------|
| Incident ID | INC-HLM-003 |
| Severity | SEV-1 |
| Environment | Production |
| Application | API Gateway |
| Cluster | production-cluster |
| Namespace | api-prod |
| Reported By | SRE Team |
| Status | Resolved |

---

# Business Impact

A production deployment introduced critical application failures.

The Platform Engineering team initiated a Helm rollback.

The rollback also failed.

Business impact included

- Public APIs unavailable
- Customer login failures
- Dashboard unavailable
- Extended production outage
- Emergency recovery initiated

---

# Enterprise Architecture

```
React Frontend

        │

        ▼

API Gateway

        │

 ┌───────────────┐
 ▼               ▼

Auth Service   Dashboard Service

        │

        ▼

PostgreSQL

        │

        ▼

Redis
```

Deployment Flow

```
Revision 5

        │

        ▼

Upgrade

        │

        ▼

Revision 6

FAILED

        │

        ▼

Rollback

        │

        ▼

FAILED

        │

        ▼

Platform Engineering

        │

        ▼

Manual Recovery
```

---

# Symptoms

Engineers executed

```bash
helm rollback api-gateway 5 \
-n api-prod
```

Rollback failed.

Output

```
ROLLBACK FAILED
```

Observed

- Pods remained unhealthy
- Rollout incomplete
- Application unavailable
- Release status inconsistent

---

# Initial Investigation

Verify cluster.

```bash
kubectl config current-context
```

---

Verify release.

```bash
helm list \
-n api-prod
```

---

Review release status.

```bash
helm status api-gateway \
-n api-prod
```

Output

```
STATUS

failed
```

---

Review release history.

```bash
helm history api-gateway \
-n api-prod
```

Observed

```
Revision 5

deployed

Revision 6

failed

Revision 7

failed
```

---

Review rollout.

```bash
kubectl rollout status deployment/api-gateway-api-gateway \
-n api-prod
```

Timed out.

---

Review deployment.

```bash
kubectl describe deployment api-gateway-api-gateway \
-n api-prod
```

---

Review Pods.

```bash
kubectl get pods \
-n api-prod
```

Observed

```
Pending
```

---

Describe Pod.

```bash
kubectl describe pod <POD_NAME> \
-n api-prod
```

Events showed

```
FailedScheduling
```

---

Review cluster capacity.

```bash
kubectl get nodes
```

---

Review resource usage.

```bash
kubectl top nodes
```

Worker nodes had exhausted CPU resources.

---

# Root Cause

The rollback itself was valid.

However,

the Kubernetes cluster did not have enough CPU resources to schedule the restored Pods.

Helm marked the rollback as failed because Kubernetes could not complete the rollout.

---

# Resolution

Provision additional worker capacity.

Verify nodes.

```bash
kubectl get nodes
```

Confirm

```
Ready
```

Re-execute rollback.

```bash
helm rollback api-gateway 5 \
-n api-prod
```

---

# Validation

Verify release.

```bash
helm status api-gateway \
-n api-prod
```

Expected

```
STATUS

deployed
```

---

Verify rollout.

```bash
kubectl rollout status deployment/api-gateway-api-gateway \
-n api-prod
```

---

Verify Pods.

```bash
kubectl get pods \
-n api-prod
```

Expected

```
Running
```

---

Verify Service.

```bash
kubectl get svc \
-n api-prod
```

---

Verify Endpoints.

```bash
kubectl get endpoints \
-n api-prod
```

---

Business Validation

- Customer login successful
- APIs operational
- Dashboard available
- Health endpoint returning HTTP 200

---

# Incident Timeline

| Time | Activity |
|------|----------|
| 15:00 | Upgrade failed |
| 15:05 | Rollback initiated |
| 15:07 | Rollback failed |
| 15:12 | Incident escalated |
| 15:20 | Cluster capacity investigation |
| 15:30 | CPU exhaustion identified |
| 15:42 | Additional capacity added |
| 15:48 | Rollback executed successfully |
| 15:55 | Production validated |
| 16:00 | Incident closed |

---

# Root Cause Analysis (5 Whys)

### Why did rollback fail?

Pods were not scheduled.

---

### Why?

Worker nodes had insufficient CPU.

---

### Why?

Cluster capacity planning was inadequate.

---

### Why?

Resource utilization alerts were ignored.

---

### Why?

Capacity monitoring thresholds were not reviewed before deployment.

---

# Corrective Actions

- Add worker node capacity.
- Review deployment resource requests.
- Improve capacity planning.
- Monitor cluster utilization continuously.
- Update rollback checklist.

---

# Preventive Actions

- Validate cluster capacity before upgrades.
- Configure proactive CPU alerts.
- Perform rollout simulation in staging.
- Review resource requests during code reviews.
- Include capacity verification in release approvals.

---

# Lessons Learned

- Helm rollback depends on Kubernetes health.
- Infrastructure issues can prevent successful recovery.
- Rollback procedures require cluster readiness.
- Capacity planning is part of deployment planning.
- Monitoring should trigger before resources are exhausted.

---

# Production Best Practices

- Check cluster capacity before upgrades.
- Monitor node utilization continuously.
- Maintain spare production capacity.
- Test rollback procedures regularly.
- Validate rollback completion.
- Keep release history intact.
- Automate infrastructure health checks.

---

# Interview Questions

## Q1. Can a Helm rollback fail even when the rollback command is correct?

### Answer

Yes.

If Kubernetes cannot schedule or start the restored resources due to infrastructure issues, Helm rollback can fail.

---

## Q2. Which Kubernetes issue caused the rollback failure in this incident?

### Answer

Insufficient CPU resources prevented Pods from being scheduled.

---

## Q3. How can rollback failures caused by infrastructure be prevented?

### Answer

By validating cluster health, monitoring resource utilization, maintaining spare capacity and verifying infrastructure readiness before deployment.

---

# Commands Reference

Status

```bash
helm status api-gateway -n api-prod
```

History

```bash
helm history api-gateway -n api-prod
```

Rollback

```bash
helm rollback api-gateway 5 -n api-prod
```

Deployment

```bash
kubectl describe deployment api-gateway-api-gateway -n api-prod
```

Pods

```bash
kubectl get pods -n api-prod
```

Nodes

```bash
kubectl get nodes
```

Resource Usage

```bash
kubectl top nodes
```

Rollout

```bash
kubectl rollout status deployment/api-gateway-api-gateway -n api-prod
```

---

# Marathi Quick Revision

- Rollback fail झाला.
- helm history तपासा.
- Pods Pending आहेत का तपासा.
- Nodes verify करा.
- CPU usage तपासा.
- Capacity वाढवा.
- Rollback पुन्हा करा.
- Validation करा.

---

# Marathi Summary (5+ Experience Revision)

या Incident मध्ये Production Helm Rollback योग्य command वापरूनही अयशस्वी झाला कारण Kubernetes cluster मध्ये पुरेसे CPU resources उपलब्ध नव्हते. Pods schedule न झाल्यामुळे rollout पूर्ण झाला नाही आणि Helm ने rollback `failed` म्हणून नोंदवला. Investigation मध्ये Helm history, deployment status, Pod events आणि node resource utilization तपासून cluster capacity हा root cause असल्याचे आढळले. अतिरिक्त worker capacity उपलब्ध करून rollback पुन्हा execute करण्यात आला आणि application यशस्वीरीत्या restore करण्यात आले. या Incident मधून Helm recovery ही Kubernetes infrastructure च्या health वर अवलंबून असल्याचे स्पष्ट होते.

