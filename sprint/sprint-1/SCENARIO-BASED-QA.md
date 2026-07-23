# Docker Production Scenario Based Interview Questions
# Experience Level: 4+ to 8+ Years DevOps Engineer

===========================================================
SCENARIO 1
===========================================================

Interview Question

Your application container is running successfully but users cannot access the application.
How will you troubleshoot?

-----------------------------------------------------------

Production Situation

Application deployed successfully.

Container Status:

Running

Users report:

Application not opening.

-----------------------------------------------------------

Investigation Steps

Step 1

Check container status.

docker ps

-----------------------------------------------------------

Step 2

Check logs.

docker logs <container>

-----------------------------------------------------------

Step 3

Verify port mapping.

docker ps

docker inspect <container>

-----------------------------------------------------------

Step 4

Login into container.

docker exec -it <container> sh

-----------------------------------------------------------

Step 5

Verify application.

curl localhost:<port>

-----------------------------------------------------------

Step 6

Check firewall.

-----------------------------------------------------------

Step 7

Check reverse proxy.

-----------------------------------------------------------

Root Cause

Wrong Host Port Mapping.

-----------------------------------------------------------

Resolution

Corrected docker-compose.yml

Restarted deployment.

-----------------------------------------------------------

What Not To Do

❌ Restart container immediately.

Always investigate first.

-----------------------------------------------------------

Interview Answer

Whenever an application is inaccessible, I first verify whether the issue is with Docker, networking, or the application itself. I begin by checking the container status using docker ps, followed by docker logs to identify startup issues. Then I verify port mapping using docker inspect and confirm the application is listening on the expected port inside the container. Only after identifying the root cause do I implement the fix.

===========================================================
SCENARIO 2
===========================================================

Interview Question

A container is restarting continuously.
How will you investigate?

-----------------------------------------------------------

Investigation

docker ps -a

docker logs

docker inspect

Verify CMD

Verify ENTRYPOINT

Verify Environment Variables

Verify mounted volumes

-----------------------------------------------------------

Possible Root Causes

Wrong CMD

Application Crash

Database Connectivity

Missing Environment Variables

Permission Issues

-----------------------------------------------------------

Resolution

Identify the actual startup failure.

Fix configuration.

Deploy new image.

-----------------------------------------------------------

Interview Tip

Never say

"I will restart the container."

===========================================================
SCENARIO 3
===========================================================

Interview Question

Frontend deployed successfully but browser shows connection refused.

-----------------------------------------------------------

Real Project Example

Our project experienced this issue.

Investigation

sudo lsof -i :3000

-----------------------------------------------------------

Root Cause

Grafana already occupied Port 3000.

-----------------------------------------------------------

Resolution

Changed frontend mapping.

3001:80

-----------------------------------------------------------

Production Decision

Did not stop Grafana because monitoring services should not be interrupted without approval.

-----------------------------------------------------------

Interview Answer

Instead of assuming the issue was with Nginx or React, I first verified whether another process was already using the host port. After identifying Grafana on port 3000, I changed the frontend mapping to port 3001. This resolved the issue without impacting monitoring services.

===========================================================

END OF PART-1


===========================================================
SCENARIO 4
===========================================================

Interview Question

Docker image build suddenly increased from 300 MB to 2 GB.
How will you investigate?

-----------------------------------------------------------

Production Situation

Earlier image size

300 MB

Current image size

2 GB

Deployment time increased significantly.

-----------------------------------------------------------

Investigation Steps

Step 1

Check Dockerfile.

-----------------------------------------------------------

Step 2

Verify Base Image.

-----------------------------------------------------------

Step 3

Check installed packages.

-----------------------------------------------------------

Step 4

Verify COPY instructions.

-----------------------------------------------------------

Step 5

Check .dockerignore.

-----------------------------------------------------------

Step 6

Run

docker history <image>

-----------------------------------------------------------

Possible Root Causes

• Using full OS image instead of slim/alpine

• node_modules copied

• .git copied

• Log files copied

• Package cache not removed

• Temporary files retained

-----------------------------------------------------------

Resolution

Use Multi-stage Build.

Use .dockerignore.

Remove cache after installation.

Use lightweight base image.

-----------------------------------------------------------

Interview Answer

My first step is to identify which layer caused the increase. I inspect the Dockerfile and use docker history to understand layer sizes. Then I verify whether unnecessary files such as node_modules, logs, or .git have been copied. Finally, I optimize the image using multi-stage builds and lightweight base images.

===========================================================
SCENARIO 5
===========================================================

Interview Question

COPY instruction is failing during docker build.

-----------------------------------------------------------

Investigation

Verify file exists.

pwd

ls

Check Dockerfile path.

Check build context.

Verify .dockerignore.

-----------------------------------------------------------

Common Root Causes

Wrong path

File outside build context

Typo in filename

Excluded by .dockerignore

-----------------------------------------------------------

Resolution

Correct COPY path.

Run build from correct directory.

===========================================================
SCENARIO 6
===========================================================

Interview Question

Container shows "Permission Denied".

-----------------------------------------------------------

Investigation

docker exec -it <container> sh

whoami

id

ls -l

-----------------------------------------------------------

Possible Root Causes

Wrong ownership

Wrong permissions

Non-root user

Mounted volume permissions

Missing execute permission

-----------------------------------------------------------

Commands

chmod

chown

id

whoami

-----------------------------------------------------------

Interview Answer

I first verify which user the application is running as and then inspect the ownership and permissions of the affected files. I avoid changing permissions blindly and identify the exact permission issue before applying a fix.

===========================================================
SCENARIO 7
===========================================================

Interview Question

Docker reports

No space left on device

-----------------------------------------------------------

Investigation

df -h

docker system df

-----------------------------------------------------------

Commands

docker image prune

docker container prune

docker network prune

docker volume prune

docker builder prune

docker system prune -a

-----------------------------------------------------------

Root Cause

Unused images

Unused containers

Unused build cache

Unused volumes

-----------------------------------------------------------

Interview Tip

Always verify before deleting resources in Production.

===========================================================
SCENARIO 8
===========================================================

Interview Question

docker pull fails.

-----------------------------------------------------------

Investigation

Check Internet

Check Registry

Check Authentication

docker login

Check Image Name

Check Image Tag

Check DNS

-----------------------------------------------------------

Possible Root Causes

Wrong Image

Wrong Tag

Authentication Failure

Registry Down

Network Issue

-----------------------------------------------------------

Resolution

Authenticate again.

Verify image name.

Verify registry access.

===========================================================
SCENARIO 9
===========================================================

Interview Question

Application works inside the container but not from the browser.

-----------------------------------------------------------

Investigation

docker exec -it <container> sh

curl localhost:<port>

docker ps

docker inspect

-----------------------------------------------------------

Possible Root Causes

Wrong port mapping

Firewall

Reverse Proxy

Application listening on localhost instead of 0.0.0.0

-----------------------------------------------------------

Resolution

Bind application to

0.0.0.0

Correct port mapping.

===========================================================
SCENARIO 10
===========================================================

Interview Question

A developer says:

"It works on my machine."

How will you respond?

-----------------------------------------------------------

Interview Answer

I would first compare both environments instead of assuming the application is correct.

I would verify:

Docker Version

Image Version

Environment Variables

Port Mapping

Volumes

Network

Operating System

Application Configuration

The objective is to identify configuration differences rather than blaming the application or infrastructure.

-----------------------------------------------------------

Production Lesson

Containerization helps eliminate "Works on My Machine" issues by ensuring the same runtime environment across Development, QA, UAT, and Production.

===========================================================

END OF PART-2


===========================================================
SCENARIO 11
===========================================================

Interview Question

Docker Compose deployment completed successfully, but one service is not starting.

-----------------------------------------------------------

Investigation

docker compose ps

docker compose logs <service>

docker inspect <container>

docker exec -it <container> sh

-----------------------------------------------------------

Possible Root Causes

• Wrong Image

• Application Crash

• Missing Environment Variables

• Port Conflict

• Database Not Reachable

• Wrong Startup Command

-----------------------------------------------------------

Resolution

Fix application configuration.

Validate dependencies.

Deploy again.

-----------------------------------------------------------

Interview Answer

I first identify which service failed instead of assuming Docker Compose itself has an issue. I review logs, inspect the container configuration, and verify whether the application or one of its dependencies is preventing startup.

===========================================================
SCENARIO 12
===========================================================

Interview Question

Application cannot connect to the database.

-----------------------------------------------------------

Investigation

docker network ls

docker network inspect

docker exec -it app sh

ping database

nslookup database

-----------------------------------------------------------

Possible Root Causes

• Database Container Down

• Wrong Service Name

• Wrong Credentials

• Wrong Network

• Firewall

-----------------------------------------------------------

Resolution

Verify service name.

Verify credentials.

Verify network connectivity.

===========================================================
SCENARIO 13
===========================================================

Interview Question

Container cannot communicate with another container.

-----------------------------------------------------------

Investigation

docker network ls

docker network inspect

docker exec -it app sh

ping auth-service

-----------------------------------------------------------

Root Cause

Containers connected to different networks.

-----------------------------------------------------------

Resolution

Attach both containers to the same Docker network.

===========================================================
SCENARIO 14
===========================================================

Interview Question

Health Check is failing continuously.

-----------------------------------------------------------

Investigation

docker inspect

docker logs

curl localhost:<port>

-----------------------------------------------------------

Possible Root Causes

Application not ready

Wrong health endpoint

Wrong port

Application startup delay

-----------------------------------------------------------

Resolution

Correct health endpoint.

Increase startup timeout if required.

===========================================================
SCENARIO 15
===========================================================

Interview Question

Application CPU utilization suddenly becomes very high.

-----------------------------------------------------------

Investigation

docker stats

top

ps

docker logs

-----------------------------------------------------------

Possible Root Causes

Infinite Loop

Memory Leak

Heavy Traffic

Application Bug

-----------------------------------------------------------

Resolution

Identify application issue.

Optimize code.

Scale application if required.

===========================================================
SCENARIO 16
===========================================================

Interview Question

Memory usage keeps increasing until the container crashes.

-----------------------------------------------------------

Investigation

docker stats

Application Logs

Memory Profiling

-----------------------------------------------------------

Possible Root Causes

Memory Leak

Large Cache

Infinite Objects

-----------------------------------------------------------

Resolution

Fix application memory leak.

Configure memory limits.

===========================================================
SCENARIO 17
===========================================================

Interview Question

A secret was accidentally committed inside the Docker image.

-----------------------------------------------------------

Production Response

Immediately revoke the secret.

Generate a new secret.

Build a new image.

Delete the vulnerable image from the registry.

Review Git history.

-----------------------------------------------------------

Interview Answer

I would never continue using that image. Even if the file is deleted later, the secret may still exist in previous image layers. I would rotate the secret, rebuild the image, and remove the compromised image from the registry.

===========================================================
SCENARIO 18
===========================================================

Interview Question

The wrong image version was deployed to production.

-----------------------------------------------------------

Investigation

docker images

docker inspect

Verify Image Tag

-----------------------------------------------------------

Resolution

Rollback to the previous stable image.

Validate deployment.

Document RCA.

===========================================================
SCENARIO 19
===========================================================

Interview Question

A deployment succeeded, but users report intermittent failures.

-----------------------------------------------------------

Investigation

docker logs

docker stats

Application Logs

Load Balancer

Network

-----------------------------------------------------------

Possible Root Causes

Resource Exhaustion

Application Bug

Network Latency

Backend Failure

-----------------------------------------------------------

Resolution

Collect evidence.

Identify Root Cause.

Implement permanent fix.

===========================================================
SCENARIO 20
===========================================================

Interview Question

Explain your RCA process after resolving a production issue.

-----------------------------------------------------------

Interview Answer

My RCA process is:

1. Understand the incident.

2. Collect logs and evidence.

3. Reproduce the issue if possible.

4. Identify the actual root cause.

5. Implement the fix.

6. Validate the solution.

7. Monitor after deployment.

8. Document preventive actions.

I focus on preventing the issue from happening again rather than only fixing the immediate problem.

===========================================================

END OF PART-3


===========================================================
SCENARIO 21
===========================================================

Interview Question

Docker image was successfully built and pushed to the registry, but deployment failed.

-----------------------------------------------------------

Investigation

1. Verify image tag.

docker images

2. Verify deployment configuration.

3. Verify image pull.

docker pull image:tag

4. Verify registry authentication.

docker login

5. Verify deployment logs.

-----------------------------------------------------------

Possible Root Causes

• Wrong image tag

• Image not pushed

• Authentication failure

• Network issue

• Registry unavailable

-----------------------------------------------------------

Resolution

Verify the correct image tag.

Authenticate to the registry.

Redeploy after validation.

===========================================================
SCENARIO 22
===========================================================

Interview Question

Container starts successfully but exits after 5 seconds.

-----------------------------------------------------------

Investigation

docker ps -a

docker logs <container>

docker inspect <container>

-----------------------------------------------------------

Possible Root Causes

• Wrong CMD

• Application crash

• Missing configuration

• Database connection failure

-----------------------------------------------------------

Interview Answer

I first check docker logs to identify why the main process exited. Since a container runs only while its main process is active, the container automatically stops if that process terminates.

===========================================================
SCENARIO 23
===========================================================

Interview Question

Docker Compose deployment works locally but fails on another server.

-----------------------------------------------------------

Investigation

Compare:

Docker Version

Compose Version

OS

Ports

Volumes

Environment Variables

Network

-----------------------------------------------------------

Root Cause

Environment mismatch.

-----------------------------------------------------------

Resolution

Standardize configuration.

Use .env files.

Maintain version consistency.

===========================================================
SCENARIO 24
===========================================================

Interview Question

Application cannot resolve another container name.

-----------------------------------------------------------

Investigation

docker network inspect

docker exec -it app sh

ping auth-service

-----------------------------------------------------------

Possible Root Causes

• Different networks

• Wrong service name

• DNS issue

-----------------------------------------------------------

Resolution

Connect both services to the same Docker network.

Use Docker Compose service names.

===========================================================
SCENARIO 25
===========================================================

Interview Question

Container consumes 100% CPU.

-----------------------------------------------------------

Investigation

docker stats

top

ps

Application logs

-----------------------------------------------------------

Possible Root Causes

• Infinite loop

• Heavy traffic

• Poor application logic

• Resource-intensive process

-----------------------------------------------------------

Resolution

Identify the process.

Optimize application.

Scale if required.

===========================================================
SCENARIO 26
===========================================================

Interview Question

Users report intermittent application failures.

-----------------------------------------------------------

Investigation

Application logs

docker stats

Load balancer

Network latency

Backend services

-----------------------------------------------------------

Possible Root Causes

Resource exhaustion

Backend instability

Network latency

Application defects

-----------------------------------------------------------

Interview Answer

Intermittent issues require collecting evidence over time. I avoid assuming the first observed symptom is the root cause and correlate logs, metrics, and application behavior before taking action.

===========================================================
SCENARIO 27
===========================================================

Interview Question

Container cannot write data to disk.

-----------------------------------------------------------

Investigation

df -h

docker inspect

ls -l

whoami

-----------------------------------------------------------

Possible Root Causes

• Read-only filesystem

• Volume permission issues

• Disk full

• Wrong ownership

-----------------------------------------------------------

Resolution

Correct permissions.

Verify mounted volumes.

Check available disk space.

===========================================================
SCENARIO 28
===========================================================

Interview Question

A developer accidentally pushed an image containing sensitive information.

-----------------------------------------------------------

Production Response

Immediately revoke exposed credentials.

Generate new credentials.

Delete the compromised image.

Rebuild a clean image.

Update CI/CD secrets.

Review repository history.

-----------------------------------------------------------

Interview Tip

Never say:

"I'll just delete the file."

Deleting the file does not remove it from previous image layers.

===========================================================
SCENARIO 29
===========================================================

Interview Question

Application deployment succeeded but response time became very slow.

-----------------------------------------------------------

Investigation

docker stats

Application logs

Database latency

Network latency

Resource utilization

-----------------------------------------------------------

Possible Root Causes

High CPU

Memory pressure

Database bottleneck

Slow external API

-----------------------------------------------------------

Resolution

Identify bottleneck.

Optimize application.

Scale resources if necessary.

===========================================================
SCENARIO 30
===========================================================

Interview Question

Explain a real production issue that demonstrates your troubleshooting approach.

Interview Answer

During our Docker Compose deployment, the frontend application was inaccessible.

Instead of restarting services, I first verified container status and checked Docker logs.

The application itself was healthy, so I inspected the host ports and used:

sudo lsof -i :3000

This showed that Grafana was already using port 3000.

Rather than stopping a monitoring service, I updated the Docker Compose configuration to expose the frontend on port 3001.

After redeployment, the application became accessible.

The key learning was to validate the actual root cause before making changes, especially in environments where multiple services share the same host.

===========================================================

END OF PART-4


===========================================================
SCENARIO 31
===========================================================

Interview Question

The application suddenly becomes unavailable after a new Docker image deployment.

-----------------------------------------------------------

Investigation

Check deployment timeline.

Verify image tag.

docker images

docker inspect <container>

docker logs <container>

Compare with previous image.

-----------------------------------------------------------

Possible Root Causes

• Wrong image deployed

• Application bug

• Configuration change

• Missing environment variables

-----------------------------------------------------------

Resolution

Rollback to previous stable image.

Validate deployment.

Perform RCA.

-----------------------------------------------------------

Interview Answer

The first thing I verify is whether the issue started immediately after deployment. If yes, I compare the currently deployed image with the previous stable version. If the new image is responsible, I perform an immediate rollback to restore service and investigate the failed image separately.

===========================================================
SCENARIO 32
===========================================================

Interview Question

Container cannot reach an external API.

-----------------------------------------------------------

Investigation

curl https://api.example.com

ping

nslookup

cat /etc/resolv.conf

-----------------------------------------------------------

Possible Root Causes

• DNS failure

• Firewall

• Proxy configuration

• Network policy

-----------------------------------------------------------

Resolution

Verify DNS.

Verify outbound connectivity.

Validate proxy settings.

===========================================================
SCENARIO 33
===========================================================

Interview Question

Application works locally but fails inside Docker.

-----------------------------------------------------------

Investigation

Compare:

Environment Variables

Installed Packages

Python Version

Node Version

Working Directory

Application Path

-----------------------------------------------------------

Root Cause

Environment mismatch.

-----------------------------------------------------------

Resolution

Ensure Docker environment matches application requirements.

===========================================================
SCENARIO 34
===========================================================

Interview Question

Container is healthy but users experience slow responses.

-----------------------------------------------------------

Investigation

docker stats

docker logs

Application metrics

Database performance

Network latency

-----------------------------------------------------------

Possible Root Causes

High CPU

Memory pressure

Slow database

External API delay

-----------------------------------------------------------

Resolution

Identify bottleneck.

Optimize application.

Scale resources where required.

===========================================================
SCENARIO 35
===========================================================

Interview Question

Docker daemon is not responding.

-----------------------------------------------------------

Investigation

systemctl status docker

journalctl -u docker

docker info

-----------------------------------------------------------

Possible Root Causes

Docker service stopped

Disk full

Configuration issue

Daemon crash

-----------------------------------------------------------

Resolution

Restart Docker only after identifying the root cause.

Verify daemon logs before taking action.

===========================================================
SCENARIO 36
===========================================================

Interview Question

A deployment introduced a configuration error.

-----------------------------------------------------------

Investigation

Compare previous configuration.

Check Git history.

Verify .env values.

Review deployment logs.

-----------------------------------------------------------

Resolution

Restore previous configuration.

Validate in lower environment.

Redeploy.

===========================================================
SCENARIO 37
===========================================================

Interview Question

Developers report that containers behave differently across environments.

-----------------------------------------------------------

Investigation

Compare:

Docker Version

Compose Version

OS

Image Tag

Environment Variables

Volumes

Networks

-----------------------------------------------------------

Resolution

Standardize runtime configuration.

Use version-controlled Compose files.

===========================================================
SCENARIO 38
===========================================================

Interview Question

Image scanning reports High Severity CVEs.

-----------------------------------------------------------

Investigation

Review scan report.

Identify vulnerable packages.

Check base image version.

-----------------------------------------------------------

Resolution

Update base image.

Upgrade affected packages.

Rebuild image.

Scan again.

-----------------------------------------------------------

Interview Tip

Never ignore High or Critical CVEs before production deployment.

===========================================================
SCENARIO 39
===========================================================

Interview Question

A rollback was required after production deployment.

-----------------------------------------------------------

Investigation

Verify deployment history.

Identify last stable image.

-----------------------------------------------------------

Resolution

Deploy previous image version.

Validate application.

Monitor logs and metrics.

Document RCA.

-----------------------------------------------------------

Interview Answer

Rollback is not considered a failure. It is a controlled recovery mechanism to restore service quickly while the engineering team investigates the failed release.

===========================================================
SCENARIO 40
===========================================================

Interview Question

What is your complete production troubleshooting strategy?

-----------------------------------------------------------

Interview Answer

Whenever I receive a production issue, I follow a structured approach.

1. Understand the incident.

2. Identify business impact.

3. Check container status.

4. Review Docker logs.

5. Inspect container configuration.

6. Verify networking.

7. Verify storage and volumes.

8. Validate application health.

9. Correlate logs with deployment history.

10. Identify Root Cause.

11. Implement the fix.

12. Validate the solution.

13. Monitor after deployment.

14. Document RCA and preventive actions.

I avoid making assumptions or restarting services without evidence because that can hide the actual root cause.

===========================================================

END OF PART-5

