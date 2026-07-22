# Lab 30 - Kubernetes Job

# 1. Objective

The objective of this lab is to understand how Kubernetes Jobs execute one-time batch workloads and ensure successful task completion.

By the end of this lab you will be able to

- Create a Job
- Execute one-time tasks
- Verify Job completion
- Understand Job lifecycle
- Configure retries
- Troubleshoot Jobs
- Explain enterprise batch processing

Jobs are designed for workloads that must complete successfully at least once.

---

# 2. Prerequisites

Complete

- Lab 01 - Lab 29

Verify

```bash
kubectl get nodes

kubectl get jobs

kubectl get pods
```

---

# 3. Enterprise Usage

Unlike Deployments, Jobs execute tasks once and then terminate.

Typical enterprise Jobs

```
Database Backup

↓

Job

↓

Complete
```

```
Database Migration

↓

Job

↓

Complete
```

```
Report Generation

↓

Job

↓

Complete
```

```
Cache Warm-up

↓

Job

↓

Complete
```

```
Image Processing

↓

Job

↓

Complete
```

---

# 4. Usage in THIS Project

Future enterprise jobs

```
Database Migration

↓

Job
```

```
Initial Database Seed

↓

Job
```

```
Backup Verification

↓

Job
```

```
Application Smoke Test

↓

Job
```

Jobs will be executed before or after deployments through CI/CD pipelines.

---

# 5. Architecture

```
Job

↓

Job Controller

↓

Pod

↓

Execute Task

↓

Exit Code 0

↓

Completed
```

---

# 6. Step-by-Step Implementation

## Step 1

Create Job

```bash
cat > job.yaml <<EOF
apiVersion: batch/v1
kind: Job
metadata:
  name: hello-job
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
          echo "Enterprise DevOps Platform"
          sleep 10
          echo "Job Completed"
