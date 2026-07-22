# Lab 31 - Kubernetes CronJob

# 1. Objective

The objective of this lab is to understand how Kubernetes CronJobs execute scheduled tasks automatically at predefined intervals.

By the end of this lab you will be able to

- Create CronJobs
- Understand Cron syntax
- Verify scheduled execution
- Configure CronJob policies
- Troubleshoot CronJobs
- Explain enterprise scheduling
- Compare Job and CronJob

CronJobs are used for recurring batch workloads like backups, cleanup, report generation and scheduled maintenance.

---

# 2. Prerequisites

Complete

- Lab 01 - Lab 30

Verify

```bash
kubectl get nodes

kubectl get cronjobs

kubectl get jobs

kubectl get pods
```

---

# 3. Enterprise Usage

Typical enterprise CronJobs

```
Every Night

↓

Database Backup

↓

S3
```

```
Every Hour

↓

Log Cleanup
```

```
Every Morning

↓

Report Generation
```

```
Every Sunday

↓

Security Scan
```

```
Every Month

↓

Archive Old Data
```

CronJobs automate repetitive operational activities.

---

# 4. Usage in THIS Project

Future CronJobs

```
Nightly Database Backup

↓

Backup Storage
```

```
Container Cleanup

↓

Disk Optimization
```

```
Smoke Test

↓

Health Report
```

```
Certificate Validation

↓

Alerting
```

---

# 5. Architecture

```
Cron Schedule

↓

CronJob Controller

↓

Job

↓

Pod

↓

Task Execution

↓

Completed
```

---

# 6. Step-by-Step Implementation

## Step 1

Create CronJob

```bash
cat > cronjob.yaml <<EOF
apiVersion: batch/v1
kind: CronJob
metadata:
  name: hello-cronjob
spec:
  schedule: "*/2 * * * *"
  successfulJobsHistoryLimit: 3
  failedJobsHistoryLimit: 2
  jobTemplate:
    spec:
      template:
        spec:
          restartPolicy: Never
          containers:
          - name: hello
            image: busybox:1.36
            command:
            - sh
            - -c
            - |
              date
              echo "Enterprise DevOps Platform"
