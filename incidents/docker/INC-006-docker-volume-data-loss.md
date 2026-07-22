# Incident ID

INC-006

# Incident Title

Docker Volume Misconfiguration Caused Persistent Application Data Loss

---

# Severity

SEV-1

---

# Status

Resolved

---

# Date

2025-06-25

---

# Reported By

Application Monitoring

---

# Environment

Production

---

# Services Impacted

- Grafana
- PostgreSQL
- Dashboard Service

---

# Business Impact

- Grafana dashboards disappeared.
- Dashboard Service could not retrieve historical data.
- Database appeared empty after deployment.
- Engineering teams temporarily lost operational visibility.

---

# Detection

Application monitoring detected missing dashboards.

Application logs

```
No dashboards found
```

Database logs

```
Database initialized successfully
```

The database initialized unexpectedly instead of loading existing data.

---

# Timeline

## 08:42

Monitoring reported missing Grafana dashboards.

---

## 08:45

On-call DevOps engineer acknowledged the alert.

---

## 08:48

Verified running containers.

```bash
docker ps
```

---

## 08:51

Reviewed Docker volumes.

```bash
docker volume ls
```

Expected production volume was missing.

---

## 08:55

Inspected Compose configuration.

```bash
docker compose config
```

Discovered an incorrect volume definition introduced during the latest deployment.

---

## 09:02

Verified mount configuration.

```bash
docker inspect grafana
```

Container was using a newly created empty volume.

---

## 09:08

Stopped affected services.

```bash
docker compose down
```

---

## 09:15

Restored the original persistent volume configuration.

---

## 09:21

Recovered data from the latest verified backup.

---

## 09:30

Restarted services.

```bash
docker compose up -d
```

---

## 09:36

Verified dashboards.

Grafana loaded successfully.

---

## 09:40

Verified application functionality.

---

## 09:43

Incident resolved.

---

# Root Cause

A Docker Compose configuration change unintentionally created a new named volume instead of attaching the existing production volume, resulting in the application starting with empty persistent storage.

---

# Investigation

Commands executed

```bash
docker volume ls
```

```bash
docker volume inspect grafana-data
```

```bash
docker inspect grafana
```

```bash
docker compose config
```

```bash
docker compose ps
```

---

# Resolution

- Identified incorrect volume mapping.
- Restored the original volume configuration.
- Restored persistent data from backup.
- Restarted all affected services.
- Verified dashboard availability.
- Confirmed application functionality.

---

# Verification

Volume verification

```bash
docker volume ls
```

Volume inspection

```bash
docker volume inspect grafana-data
```

Container verification

```bash
docker inspect grafana
```

Application verification

- Grafana dashboards available
- Database records restored
- Dashboard Service operating normally

---

# Customer Impact

Operational dashboards were unavailable for approximately one hour.

No permanent data loss occurred because recent backups were available.

---

# Preventive Actions

- Protect production volume definitions with code review.
- Validate volume mappings during CI/CD.
- Automate backup verification.
- Prevent accidental creation of replacement production volumes.
- Add deployment validation for persistent storage.

---

# Lessons Learned

- Incorrect volume mappings can appear as application data loss.
- Persistent storage should always be validated after deployments.
- Backup verification is as important as backup creation.
- Production volumes should never be recreated without approval.

---

# Related Runbook

- runbooks/docker/docker-volume-data-loss.md

