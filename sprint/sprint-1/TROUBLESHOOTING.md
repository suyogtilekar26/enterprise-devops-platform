# Docker Troubleshooting Handbook
# Enterprise DevOps Platform
# Sprint-1

=========================================================
DOCKER TROUBLESHOOTING FLOW
=========================================================

          Issue Reported
                 |
                 V
        Check Container Status
                 |
                 V
           Check Docker Logs
                 |
                 V
       Verify Container Config
                 |
                 V
        Verify Port Mapping
                 |
                 V
      Verify Network Connectivity
                 |
                 V
 Verify Environment Variables
                 |
                 V
      Verify Volumes & Storage
                 |
                 V
      Verify Application Health
                 |
                 V
       Root Cause Analysis
                 |
                 V
      Implement Permanent Fix
                 |
                 V
      Validate & Monitor
                 |
                 V
          Document RCA

=========================================================
ISSUE 1
=========================================================

Problem

Container is not running.

Investigation

docker ps -a

Possible Causes

• Wrong CMD

• Application Crash

• Missing Files

• Missing Environment Variables

Resolution

docker logs <container>

Fix Root Cause

Deploy Again

=========================================================
ISSUE 2
=========================================================

Problem

Container exits immediately.

Investigation

docker logs

docker inspect

Verify CMD

Verify ENTRYPOINT

Resolution

Correct startup command.

=========================================================
ISSUE 3
=========================================================

Problem

Application is not accessible.

Investigation

docker ps

docker logs

docker inspect

docker port

curl localhost:<port>

Possible Causes

Wrong Port Mapping

Firewall

Application Crash

Wrong Bind Address

Resolution

Bind application to

0.0.0.0

Correct port mapping.

=========================================================
ISSUE 4
=========================================================

Problem

Port already in use.

Investigation

sudo lsof -i :<port>

ss -tulnp

Possible Causes

Another application

Existing Container

Resolution

Use another port

OR

Stop unused service after approval

=========================================================
ISSUE 5
=========================================================

Problem

Docker Build Failed.

Investigation

Read build output carefully.

Check Dockerfile.

Check COPY paths.

Verify build context.

Resolution

Correct Dockerfile.

Run build again.

=========================================================
ISSUE 6
=========================================================

Problem

COPY Failed

Investigation

pwd

ls

Verify Docker Context

Check .dockerignore

Resolution

Correct path.

=========================================================
ISSUE 7
=========================================================

Problem

Permission Denied

Investigation

whoami

id

ls -l

Possible Causes

Wrong Owner

Wrong Permission

Volume Permission

Resolution

chmod

chown

=========================================================
ISSUE 8
=========================================================

Problem

No Space Left On Device

Investigation

df -h

docker system df

Resolution

docker system prune -a

Only after validation.

=========================================================
ISSUE 9
=========================================================

Problem

Container Restarting Continuously

Investigation

docker ps -a

docker logs

docker inspect

Verify Application

Verify Config

Resolution

Fix startup issue.

=========================================================
ISSUE 10
=========================================================

Problem

Image Pull Failed

Investigation

docker login

docker pull

Verify Internet

Verify Registry

Verify Tag

Resolution

Correct credentials.

Correct image tag.

=========================================================
ROOT CAUSE ANALYSIS TEMPLATE
=========================================================

Issue

Date

Impact

Symptoms

Investigation

Evidence Collected

Root Cause

Resolution

Validation

Preventive Action

Owner

=========================================================
PRODUCTION RULES
=========================================================

✔ Never restart immediately.

✔ Collect evidence first.

✔ Preserve logs.

✔ Identify Root Cause.

✔ Implement permanent fix.

✔ Validate after deployment.

✔ Document RCA.

✔ Share lessons learned.

=========================================================
MOST IMPORTANT COMMANDS
=========================================================

docker ps

docker ps -a

docker logs

docker inspect

docker exec

docker stats

docker images

docker network ls

docker volume ls

docker compose ps

docker compose logs

docker system df

df -h

=========================================================
END OF DOCUMENT
=========================================================

