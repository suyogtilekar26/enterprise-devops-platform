# Kubernetes Jobs and CronJobs

# 1. Purpose

The purpose of Jobs and CronJobs is to execute tasks that are temporary instead of continuously running.

Unlike Deployments, Jobs complete their work and exit successfully.

CronJobs execute Jobs automatically on a schedule.

---

# 2. Introduction

Not every application should run forever.

Examples

- Database Backup
- Log Cleanup
- Monthly Reports
- Data Migration
- Email Notifications
- Batch Processing

These are one-time or scheduled tasks.

Kubernetes provides

- Job
- CronJob

for these workloads.

---

# 3. Enterprise Usage

Jobs are commonly used for

- Database Migration
- Initial Data Loading
- Batch Processing
- Manual Backup
- Cache Warm-up

CronJobs are commonly used for

- Daily Backup
- Weekly Cleanup
- Monthly Reports
- Certificate Renewal
- Log Rotation
- Health Checks

---

# 4. Usage in THIS Project

Our Enterprise DevOps Platform will use

```
Daily

↓

Database Backup

↓

CronJob

----------------------------

Weekly

↓

Log Cleanup

↓

CronJob

----------------------------

Deployment

↓

Database Migration

↓

Job
```

---

# 5. Architecture

```
               Kubernetes

                     │

        ┌────────────┴────────────┐

        ▼                         ▼

      Job                    CronJob

        │                         │

Run One Time          Runs on Schedule

        │                         │

        ▼                         ▼

      Pod                     Creates Job

                                │

                                ▼

                               Pod
```

---

# 6. Internal Workflow

## Job

```
Create Job

↓

Pod Starts

↓

Task Executes

↓

Task Completed

↓

Pod Exits

↓

Job Success
```

---

## CronJob

```
Cron Schedule

↓

CronJob

↓

Creates Job

↓

Creates Pod

↓

Task Executes

↓

Completed

↓

Wait for Next Schedule
```

---

# 7. Job vs CronJob

Job

```
Run Once

↓

Complete

↓

Exit
```

CronJob

```
Schedule

↓

Run Automatically

↓

Repeat Forever
```

---

# 8. Why Not Use Deployments?

Deployment

```
Pod

↓

Runs Forever
```

Job

```
Pod

↓

Runs

↓

Finishes

↓

Stops
```

CronJob

```
Every Day

↓

Run

↓

Finish

↓

Wait

↓

Run Again
```

---

# 9. Daily DevOps Activities

- Monitor Job Status
- Verify Cron Schedule
- Check Backup Success
- Review Failed Jobs
- Clean Old Jobs
- Verify Logs

---

# 10. Production Best Practices

- Keep Jobs Idempotent.
- Configure Retry Limits.
- Remove Old Completed Jobs.
- Monitor Failed Jobs.
- Schedule Heavy Jobs During Off-Peak Hours.
- Send Alerts for Failed Backups.

---

# 11. Security

- Use Service Accounts.
- Store Credentials in Secrets.
- Restrict RBAC.
- Encrypt Backup Data.
- Monitor Job Execution.

---

# 12. Troubleshooting

List Jobs

```bash
kubectl get jobs
```

List CronJobs

```bash
kubectl get cronjobs
```

Describe Job

```bash
kubectl describe job backup-job
```

Describe CronJob

```bash
kubectl describe cronjob daily-backup
```

View Logs

```bash
kubectl logs <pod-name>
```

---

# 13. Real Production Scenarios

## Scenario 1

### Daily Backup Failed

Symptoms

Backup file missing.

Investigation

```bash
kubectl get cronjobs

kubectl get jobs

kubectl logs <pod-name>
```

Root Cause

Database credentials expired.

Resolution

Update Secret.

Run Job again.

---

## Scenario 2

### Migration Failed

Application deployment stopped.

Reason

Database migration Job failed.

Investigation

Check migration logs.

Fix SQL script.

Run Job again.

---

## Scenario 3

### Too Many Old Jobs

Cluster contained thousands of completed Jobs.

Result

API performance degraded.

Resolution

Configure Job history limits.

---

# 14. Scenario Interview Questions

Q1. What is a Kubernetes Job?

Answer

A Job executes a task once and exits after successful completion.

---

Q2. What is a CronJob?

Answer

A CronJob creates Jobs automatically according to a schedule.

---

Q3. When should we use a Job?

Answer

For one-time operations like database migration or manual backup.

---

Q4. When should we use a CronJob?

Answer

For recurring scheduled tasks such as daily backups and log cleanup.

---

# 15. Architecture Interview Questions

Explain Job flow.

```
Job

↓

Pod

↓

Complete
```

Explain CronJob flow.

```
Schedule

↓

CronJob

↓

Job

↓

Pod

↓

Complete
```

---

Q2.

Why shouldn't backups run as Deployments?

Answer

Because Deployments are intended for continuously running applications, while backups are short-lived tasks.

---

# 16. Production Support Interview Questions

Production Investigation Flow

```
Backup Failed

↓

CronJob

↓

Job

↓

Pod

↓

Logs

↓

Database

↓

Resolved
```

Manager Question

"Today's Production backup did not run."

Expected Answer

- Verify CronJob
- Verify Schedule
- Check Job Status
- Review Pod Logs
- Verify Database Connectivity
- Re-run Job if necessary

---

# 17. Related Runbooks

- cronjob-backup-failure.md
- database-migration-failed.md
- job-pod-failed.md

---

# 18. Common Incidents

- Backup Failure
- Job Failed
- Cron Schedule Incorrect
- Authentication Failure
- Too Many Completed Jobs

---

# 19. Commands

```bash
kubectl get jobs

kubectl get cronjobs

kubectl describe job backup-job

kubectl describe cronjob daily-backup

kubectl logs <pod-name>

kubectl delete job <job-name>
```

---

# 20. Marathi Quick Revision

- Job एकदाच Run होतो.
- CronJob Schedule प्रमाणे पुन्हा पुन्हा Run होतो.
- Database Backup साठी CronJob वापरतात.
- Migration साठी Job वापरतात.
- Task पूर्ण झाल्यावर Pod Exit होतो.

---

# 21. Marathi Summary (5+ Years Experience Revision)

## Interview Summary

Job हा One-Time Task साठी वापरला जातो.

CronJob हा Scheduled Task साठी वापरला जातो.

Production मध्ये Database Backup, Log Cleanup, Certificate Renewal आणि Batch Processing साठी CronJobs मोठ्या प्रमाणावर वापरले जातात.

## Production Investigation Flow

```
Backup Failed

↓

CronJob

↓

Job

↓

Pod

↓

Logs

↓

Database

↓

Resolved
```

## Production Story

Production मध्ये रात्रीचा Database Backup झाला नव्हता.

Investigation मध्ये CronJob ने Job तयार केला होता, पण Pod Database Authentication Error मुळे Fail झाला.

Database Secret Update करून Job पुन्हा Run केला आणि Backup यशस्वी झाला.

## Memory Trick

**Job = Run Once**

**CronJob = Run on Schedule**

Remember

**Backup = CronJob**

**Migration = Job**

