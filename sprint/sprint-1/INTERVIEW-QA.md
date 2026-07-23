# Docker Interview Questions & Answers
## Experience Level: 4+ Years DevOps Engineer

===========================================================
QUESTION 1
===========================================================

Q. What is Docker?

Interview Answer

Docker is a containerization platform that packages an application along with its dependencies into a container. This ensures that the application runs consistently across development, testing, and production environments.

In our project, we containerized Flask microservices and the React frontend using Docker so every developer and server used the same runtime environment.

-----------------------------------------------------------

Don't Say

Docker is a virtual machine.

❌ Wrong

-----------------------------------------------------------

Production Example

Our API Gateway, Auth Service, Dashboard Service, and Frontend were all deployed as Docker containers.

-----------------------------------------------------------

Cross Questions

• Why Docker instead of Virtual Machine?
• Does Docker replace Virtual Machines?
• Does Docker have its own kernel?

-----------------------------------------------------------

Important Points

✔ Lightweight
✔ Fast Startup
✔ Portable
✔ Uses Host Kernel
✔ Isolation

===========================================================
QUESTION 2
===========================================================

Q. Difference between Docker Image and Docker Container?

Interview Answer

A Docker Image is a read-only template containing the application, dependencies, libraries, and runtime configuration.

A Docker Container is the running instance of that image.

One image can create multiple containers.

-----------------------------------------------------------

Production Example

Image

enterprise/auth-service:v1

Container

auth-service

-----------------------------------------------------------

Cross Questions

• Can multiple containers run from one image?

Answer

Yes.

-----------------------------------------------------------

Important Points

Image = Blueprint

Container = Running Application

===========================================================
QUESTION 3
===========================================================

Q. Explain Docker Architecture.

Interview Answer

Docker Architecture consists of:

Docker Client

Docker Daemon

Docker Registry

The Docker Client sends requests to the Docker Daemon.

The Docker Daemon builds images, creates containers, manages networks, and volumes.

Images are pulled from Docker Hub or private registries.

-----------------------------------------------------------

Cross Questions

Where does docker build execute?

Answer

Inside Docker Daemon.

-----------------------------------------------------------

Important Points

Client

↓

Daemon

↓

Registry

===========================================================
QUESTION 4
===========================================================

Q. What happens internally when you run docker run nginx?

Interview Answer

When docker run nginx is executed:

1. Docker checks whether the image exists locally.

2. If not found, it pulls the image from Docker Hub.

3. Creates a writable container layer.

4. Creates namespaces and cgroups.

5. Attaches networking.

6. Starts the container process.

-----------------------------------------------------------

Cross Questions

Difference between docker create and docker run?

===========================================================
QUESTION 5
===========================================================

Q. What is a Dockerfile?

Interview Answer

A Dockerfile is a text file that contains instructions used to build a Docker image.

Each instruction creates a new image layer.

-----------------------------------------------------------

Example

FROM

WORKDIR

COPY

RUN

EXPOSE

CMD

-----------------------------------------------------------

Production Example

We created separate Dockerfiles for:

API Gateway

Auth Service

Dashboard Service

Frontend

===========================================================
QUESTION 6
===========================================================

Q. Explain FROM instruction.

Interview Answer

The FROM instruction specifies the base image on which the new Docker image is built.

Every Dockerfile starts with FROM.

Example

FROM python:3.12-slim

===========================================================
QUESTION 7
===========================================================

Q. Why did you use python:3.12-slim instead of python:3.12?

Interview Answer

The slim image is much smaller because unnecessary packages are removed.

Smaller images improve download speed, deployment time, storage utilization, and reduce security vulnerabilities.

This is the preferred approach in production.

-----------------------------------------------------------

Cross Questions

Why not Alpine?

When will Alpine cause issues?

===========================================================
QUESTION 8
===========================================================

Q. Explain COPY vs ADD.

Interview Answer

COPY simply copies files from the local system into the Docker image.

ADD can also extract local tar files and download remote URLs.

In production, COPY is preferred because it is predictable and more secure.

===========================================================
QUESTION 9
===========================================================

Q. Explain CMD.

Interview Answer

CMD specifies the default command executed when the container starts.

It can be overridden during docker run.

Production Example

CMD ["gunicorn","--bind","0.0.0.0:5000","app:app"]

===========================================================
QUESTION 10
===========================================================

Q. Difference between CMD and ENTRYPOINT?

Interview Answer

ENTRYPOINT defines the main executable.

CMD provides default arguments.

ENTRYPOINT usually remains fixed.

CMD can be overridden.

Production Recommendation

ENTRYPOINT for executable.

CMD for arguments.

===========================================================

End of Part-1


===========================================================
QUESTION 11
===========================================================

Q. Difference between RUN, CMD and ENTRYPOINT?

Interview Answer

RUN is executed during image build time and is mainly used to install packages, create directories, or perform setup tasks.

CMD defines the default command that runs when the container starts. It can be overridden during runtime.

ENTRYPOINT defines the main executable of the container. It is generally fixed and ensures that the intended application always starts.

In production, we commonly use ENTRYPOINT for the application executable and CMD for default arguments.

-----------------------------------------------------------

Production Example

RUN pip install -r requirements.txt

CMD ["gunicorn","--bind","0.0.0.0:5000","app:app"]

-----------------------------------------------------------

Cross Questions

• Can a Dockerfile have multiple CMD instructions?

Answer

No. Only the last CMD instruction is used.

-----------------------------------------------------------

Don't Say

RUN and CMD are the same.

❌ Wrong

-----------------------------------------------------------

Important Points

RUN → Build Time

CMD → Runtime

ENTRYPOINT → Main Executable

===========================================================
QUESTION 12
===========================================================

Q. What is EXPOSE?

Interview Answer

EXPOSE is a documentation instruction that tells which port the application inside the container listens on.

It does not publish the port to the host.

To make the application accessible from outside the container, we must use the -p option while running the container.

-----------------------------------------------------------

Production Example

EXPOSE 5000

docker run -p 5000:5000 auth-service

-----------------------------------------------------------

Cross Questions

Does EXPOSE publish ports automatically?

Answer

No.

===========================================================
QUESTION 13
===========================================================

Q. What is WORKDIR?

Interview Answer

WORKDIR sets the default working directory inside the container.

All subsequent instructions such as COPY, RUN, and CMD execute relative to this directory.

Using WORKDIR makes the Dockerfile cleaner and easier to maintain.

-----------------------------------------------------------

Production Example

WORKDIR /app

===========================================================
QUESTION 14
===========================================================

Q. Difference between ENV and ARG?

Interview Answer

ARG is available only during image build time.

ENV is available both during image build and when the container is running.

ARG is commonly used for build-time variables such as version numbers.

ENV is used for runtime configuration.

-----------------------------------------------------------

Cross Questions

Which one remains available inside a running container?

Answer

ENV

===========================================================
QUESTION 15
===========================================================

Q. What are Docker Layers?

Interview Answer

Every instruction in a Dockerfile creates a new image layer.

Docker caches these layers to speed up future builds.

If a layer changes, Docker rebuilds that layer and all layers after it.

Understanding layers helps optimize build performance.

-----------------------------------------------------------

Production Example

FROM

COPY requirements.txt

RUN pip install

COPY .

Only application changes should rebuild the last COPY layer.

===========================================================
QUESTION 16
===========================================================

Q. How does Docker Build Cache work?

Interview Answer

Docker compares each instruction with the previously built image.

If nothing has changed, Docker reuses the cached layer.

If a layer changes, all subsequent layers are rebuilt.

To maximize cache usage, frequently changing files should be copied near the end of the Dockerfile.

-----------------------------------------------------------

Production Tip

Copy requirements.txt before application source code.

===========================================================
QUESTION 17
===========================================================

Q. Why do we use .dockerignore?

Interview Answer

The .dockerignore file excludes unnecessary files from the Docker build context.

This reduces image size, improves build speed, and prevents sensitive files from being copied into the image.

-----------------------------------------------------------

Examples

.git

node_modules

__pycache__

.env

*.log

===========================================================
QUESTION 18
===========================================================

Q. What is a Multi-stage Build?

Interview Answer

A multi-stage build uses multiple FROM instructions in a single Dockerfile.

The first stage is used to build the application.

The final stage contains only the runtime artifacts.

This significantly reduces the final image size.

-----------------------------------------------------------

Production Example

We used Node.js to build the React application and Nginx to serve the generated static files.

===========================================================
QUESTION 19
===========================================================

Q. Why did you use Nginx for the React application?

Interview Answer

The React application generates static files after the build process.

Nginx is lightweight, fast, and optimized for serving static content.

Instead of installing Node.js in production, only the generated files are copied into the Nginx image.

This reduces image size and improves security.

===========================================================
QUESTION 20
===========================================================

Q. What are Docker Best Practices?

Interview Answer

Some important Docker best practices are:

• Use lightweight base images.
• Use multi-stage builds.
• Avoid running containers as root.
• Keep images small.
• Use .dockerignore.
• Minimize the number of layers.
• Never store secrets inside the image.
• Tag images properly.
• Scan images for vulnerabilities.
• Write one responsibility per container.

-----------------------------------------------------------

Interview Closing Statement

These practices improve security, performance, maintainability, and deployment speed in production environments.

===========================================================

End of Part-2


===========================================================
QUESTION 21
===========================================================

Q. What is a Docker Volume?

Interview Answer

A Docker Volume is a persistent storage mechanism used to store container data outside the container's writable layer. Even if the container is deleted, the data stored in the volume remains intact.

We use volumes when application data must survive container recreation.

-----------------------------------------------------------

Production Example

Databases like MySQL, PostgreSQL, MongoDB, Jenkins and Grafana use Docker Volumes to persist data.

-----------------------------------------------------------

Cross Questions

• What happens if a container is deleted?

Answer

The container is deleted, but the volume remains unless it is explicitly removed.

-----------------------------------------------------------

Important Points

✔ Persistent Storage

✔ Managed by Docker

✔ Independent of Container Lifecycle

===========================================================
QUESTION 22
===========================================================

Q. Difference between Bind Mount and Docker Volume?

Interview Answer

A Bind Mount maps a specific directory from the host machine into the container.

A Docker Volume is managed by Docker and stored in Docker's own storage location.

In production, Docker Volumes are preferred because they are portable, easier to back up, and more secure.

-----------------------------------------------------------

Production Example

Bind Mount

Used during development for live code changes.

Docker Volume

Used for database storage.

-----------------------------------------------------------

Cross Questions

Which one is preferred in Production?

Answer

Docker Volumes.

===========================================================
QUESTION 23
===========================================================

Q. What is Docker Networking?

Interview Answer

Docker Networking allows containers to communicate with each other and with external systems.

Every container is attached to a network. Docker provides multiple network drivers depending on the use case.

-----------------------------------------------------------

Network Types

Bridge

Host

None

Overlay

Macvlan

-----------------------------------------------------------

Production Example

In our project, Docker Compose automatically created a bridge network so all services could communicate using their service names.

===========================================================
QUESTION 24
===========================================================

Q. What is the default Docker Network?

Interview Answer

The default Docker network is the Bridge network.

If no network is specified, Docker automatically connects the container to the default bridge network.

-----------------------------------------------------------

Cross Questions

How can you check the available Docker networks?

Answer

docker network ls

===========================================================
QUESTION 25
===========================================================

Q. How do containers communicate with each other?

Interview Answer

Containers connected to the same Docker network communicate using their container name or service name.

Docker provides an internal DNS service that automatically resolves container names to IP addresses.

-----------------------------------------------------------

Production Example

Instead of using IP addresses, services communicate using names such as:

api-gateway

auth-service

dashboard-service

This is more reliable because container IP addresses can change.

===========================================================
QUESTION 26
===========================================================

Q. What is docker inspect?

Interview Answer

docker inspect displays detailed information about Docker objects such as containers, images, networks, and volumes.

It is commonly used during troubleshooting.

-----------------------------------------------------------

Production Example

docker inspect auth-service

Useful Information

Container IP

Environment Variables

Mounts

Network

Restart Policy

===========================================================
QUESTION 27
===========================================================

Q. What is docker logs?

Interview Answer

docker logs displays the standard output and error logs generated by a container.

It is the first command executed while troubleshooting container startup issues.

-----------------------------------------------------------

Production Example

docker logs auth-service

-----------------------------------------------------------

Interview Tip

Always mention docker logs as the first troubleshooting step.

===========================================================
QUESTION 28
===========================================================

Q. What is docker exec?

Interview Answer

docker exec is used to execute commands inside a running container.

It is commonly used for debugging and verification.

-----------------------------------------------------------

Example

docker exec -it auth-service bash

-----------------------------------------------------------

Production Use Cases

Checking files

Testing connectivity

Verifying environment variables

===========================================================
QUESTION 29
===========================================================

Q. What is a Docker Health Check?

Interview Answer

A Health Check allows Docker to periodically verify whether the application inside the container is functioning correctly.

This is different from checking whether the container process is running.

-----------------------------------------------------------

Production Example

A Gunicorn process may be running, but the application can still be unhealthy.

A Health Check detects such failures.

-----------------------------------------------------------

Cross Questions

Does Docker automatically restart an unhealthy container?

Answer

No.

Health status and restart policy are different features.

===========================================================
QUESTION 30
===========================================================

Q. Explain Docker Restart Policies.

Interview Answer

Restart policies define how Docker should handle container failures.

Common restart policies are:

no

on-failure

always

unless-stopped

In production, we generally use unless-stopped or always depending on the application requirements.

-----------------------------------------------------------

Production Example

In our Docker Compose file, we used:

restart: unless-stopped

This ensures that containers automatically restart after system reboot unless they were intentionally stopped.

-----------------------------------------------------------

Important Points

✔ Improves Availability

✔ Automatic Recovery

✔ Useful for Production Deployments

===========================================================

End of Part-3


===========================================================
QUESTION 31
===========================================================

Q. What is Docker Compose?

Interview Answer

Docker Compose is a tool used to define and manage multi-container Docker applications using a YAML file.

Instead of running multiple docker run commands, all services can be started, stopped, and managed using a single command.

In our project, we used Docker Compose to deploy the Frontend, API Gateway, Auth Service, and Dashboard Service together.

-----------------------------------------------------------

Commands

docker compose up -d

docker compose down

docker compose ps

docker compose logs

-----------------------------------------------------------

Cross Questions

• Difference between Docker and Docker Compose?

• Can Docker Compose create networks automatically?

Answer

Yes. Docker Compose automatically creates a default network for all services.

===========================================================
QUESTION 32
===========================================================

Q. What is depends_on in Docker Compose?

Interview Answer

depends_on defines the startup order of services.

It ensures that dependent containers start before the current service.

However, it does not guarantee that the dependent application is fully ready.

For production environments, Health Checks should be used along with depends_on.

-----------------------------------------------------------

Production Example

API Gateway depends on Auth Service.

===========================================================
QUESTION 33
===========================================================

Q. How do you pass Environment Variables to a Container?

Interview Answer

Environment variables can be passed using:

• ENV instruction in Dockerfile

• docker run -e

• env_file

• .env file

• docker-compose.yml

For production, sensitive values should never be hardcoded inside the Dockerfile.

===========================================================
QUESTION 34
===========================================================

Q. Why should secrets not be stored inside a Docker Image?

Interview Answer

A Docker image is immutable and can be shared with others.

If secrets such as passwords, API keys, or tokens are stored inside the image, anyone with access to the image can retrieve them.

In production, secrets should be managed using Docker Secrets, Kubernetes Secrets, or a secret management solution such as HashiCorp Vault.

-----------------------------------------------------------

Don't Say

"I'll put passwords in the Dockerfile."

❌ Wrong

===========================================================
QUESTION 35
===========================================================

Q. How do you reduce Docker Image Size?

Interview Answer

There are several techniques to reduce image size:

• Use lightweight base images.

• Use Multi-stage Builds.

• Remove unnecessary packages.

• Clean package manager cache.

• Use .dockerignore.

• Copy only required files.

Smaller images improve deployment speed and reduce attack surface.

===========================================================
QUESTION 36
===========================================================

Q. Why should containers not run as Root?

Interview Answer

Running containers as root increases security risks.

If an attacker compromises the container, they may gain elevated privileges on the host system.

Production containers should run using a non-root user whenever possible.

-----------------------------------------------------------

Cross Questions

How do you create a non-root user?

Answer

USER instruction in Dockerfile.

===========================================================
QUESTION 37
===========================================================

Q. What is Docker Hub?

Interview Answer

Docker Hub is Docker's public image registry.

It stores and distributes Docker images.

Organizations can push custom images and pull official images.

-----------------------------------------------------------

Production Example

Instead of Docker Hub, most enterprises use private registries for security and compliance.

===========================================================
QUESTION 38
===========================================================

Q. What is a Private Docker Registry?

Interview Answer

A Private Docker Registry stores Docker images within an organization's infrastructure.

It provides better security, access control, and version management.

Common private registries include:

• Harbor

• AWS ECR

• Azure ACR

• Google Artifact Registry

• JFrog Artifactory

===========================================================
QUESTION 39
===========================================================

Q. How do you troubleshoot a container that keeps restarting?

Interview Answer

My troubleshooting approach is:

1. Check container status.

docker ps -a

2. View logs.

docker logs <container>

3. Inspect configuration.

docker inspect <container>

4. Verify port mapping.

5. Check environment variables.

6. Verify mounted volumes.

7. Review application logs.

I avoid restarting the container before identifying the root cause.

-----------------------------------------------------------

Interview Tip

Always explain your troubleshooting steps in sequence.

===========================================================
QUESTION 40
===========================================================

Q. Explain your Docker experience in your current project.

Interview Answer

In my project, I was responsible for containerizing Flask-based microservices and a React frontend.

I created Dockerfiles for all services, implemented a multi-stage build for the frontend, deployed the complete application using Docker Compose, configured networking, resolved port conflicts, investigated container issues using docker logs and docker inspect, and prepared the application for the CI/CD pipeline.

This helped standardize deployments across development environments and reduced environment-related issues.

-----------------------------------------------------------

This answer can be used when the interviewer asks:

"Explain your Docker experience."

===========================================================

End of Part-4


===========================================================
QUESTION 41
===========================================================

Q. What happens internally when you execute docker build?

Interview Answer

When docker build is executed, Docker first reads the Dockerfile from top to bottom.

It sends the build context to the Docker Daemon.

The daemon executes each instruction one by one.

Every instruction creates a separate image layer.

If Docker finds a cached layer, it reuses it instead of rebuilding.

Finally, Docker combines all layers and creates the final image.

-----------------------------------------------------------

Cross Questions

• What is Build Context?

Answer

The build context is the directory sent to Docker Daemon during docker build.

Everything inside that directory is available for COPY and ADD instructions.

-----------------------------------------------------------

Important Points

✔ Dockerfile is read line by line

✔ Every instruction creates a layer

✔ Docker Cache speeds up builds

===========================================================
QUESTION 42
===========================================================

Q. What is Docker Build Context?

Interview Answer

Docker Build Context is the set of files sent to the Docker Daemon during the build process.

Docker can only access files inside the build context.

If unnecessary files are included, build time increases.

Therefore, .dockerignore should always be used to exclude unwanted files.

-----------------------------------------------------------

Production Example

Without .dockerignore, node_modules and .git directories may also be sent to Docker Daemon, increasing build time.

===========================================================
QUESTION 43
===========================================================

Q. What is the difference between docker stop and docker kill?

Interview Answer

docker stop sends a SIGTERM signal first, allowing the application to shut down gracefully.

If the application does not stop within the timeout period, Docker sends SIGKILL.

docker kill immediately sends SIGKILL and forcefully terminates the container.

-----------------------------------------------------------

Production Recommendation

Always use docker stop unless there is a specific reason to forcefully terminate the container.

===========================================================
QUESTION 44
===========================================================

Q. Difference between docker create, docker start and docker run?

Interview Answer

docker create creates a container but does not start it.

docker start starts an already created container.

docker run combines both operations. It creates the container and starts it immediately.

-----------------------------------------------------------

Important Points

docker create

↓

docker start

=

docker run

===========================================================
QUESTION 45
===========================================================

Q. How do you check resource usage of containers?

Interview Answer

Docker provides the docker stats command.

It displays CPU usage, Memory usage, Network I/O and Block I/O for running containers.

-----------------------------------------------------------

Command

docker stats

-----------------------------------------------------------

Production Example

If an application becomes slow, docker stats helps identify whether CPU or Memory utilization is high.

===========================================================
QUESTION 46
===========================================================

Q. How do you troubleshoot a container that exits immediately?

Interview Answer

My approach is:

1. Check container status

docker ps -a

2. View logs

docker logs <container>

3. Inspect container

docker inspect <container>

4. Verify CMD or ENTRYPOINT

5. Verify application startup command

6. Check environment variables

7. Check mounted volumes

I avoid repeatedly restarting the container before identifying the actual issue.

===========================================================
QUESTION 47
===========================================================

Q. What is the difference between docker ps and docker ps -a?

Interview Answer

docker ps

Displays only running containers.

docker ps -a

Displays all containers including exited containers.

-----------------------------------------------------------

Interview Tip

When troubleshooting, always use docker ps -a first.

===========================================================
QUESTION 48
===========================================================

Q. Explain docker logs vs application logs.

Interview Answer

docker logs displays everything written to STDOUT and STDERR by the container.

Application logs are generated by the application itself and may be written to log files inside the container.

In containerized applications, logging to STDOUT is considered a best practice because Docker and Kubernetes can easily collect those logs.

===========================================================
QUESTION 49
===========================================================

Q. Why should one container have one responsibility?

Interview Answer

Containers should follow the Single Responsibility Principle.

Each container should run only one primary process.

This improves scalability, monitoring, troubleshooting and deployment.

For example, Nginx and MySQL should run in separate containers instead of the same container.

===========================================================
QUESTION 50
===========================================================

Q. What are the most important Docker Best Practices you follow?

Interview Answer

In every project I follow these practices:

• Use official base images whenever possible.

• Use lightweight images.

• Use Multi-stage Builds.

• Keep images small.

• Never store secrets in Dockerfiles.

• Use .dockerignore.

• Run containers as non-root.

• Use Health Checks.

• Tag images properly.

• Scan images for vulnerabilities.

• Keep one application per container.

• Use restart policies.

• Use volumes for persistent storage.

• Avoid latest tag in production.

-----------------------------------------------------------

Interview Closing Statement

Following these practices improves security, maintainability, deployment speed and operational stability in production environments.

===========================================================

End of Part-5


===========================================================
QUESTION 51
===========================================================

Q. A container is running but the application is not accessible. How will you troubleshoot?

Interview Answer

Whenever I face this issue, I follow a structured troubleshooting approach instead of randomly restarting the container.

Step 1
Check whether the container is actually running.

docker ps

Step 2
Check the container logs.

docker logs <container_name>

Step 3
Verify the application is listening on the expected port.

docker exec -it <container_name> sh

netstat -tulnp

Step 4
Verify port mapping.

docker ps

docker inspect <container_name>

Step 5
Check firewall or security group if required.

Step 6
Verify application configuration.

Step 7
Test the application locally inside the container.

curl localhost:<port>

-----------------------------------------------------------

Production Example

In our project, all containers were running but Frontend was inaccessible.

Investigation showed Host Port 3000 was already occupied by Grafana.

We changed the mapping to 3001 instead of stopping Grafana.

===========================================================
QUESTION 52
===========================================================

Q. Docker build suddenly became very slow. What could be the reasons?

Interview Answer

Possible reasons include:

• Large build context

• Missing .dockerignore

• Cache invalidation

• Downloading packages repeatedly

• Slow internet while pulling base images

• Copying unnecessary files

• Large base image

-----------------------------------------------------------

Production Solution

Copy dependency files first.

Example

COPY requirements.txt .

RUN pip install -r requirements.txt

COPY .

This allows Docker cache to be reused.

===========================================================
QUESTION 53
===========================================================

Q. Your Docker image size increased from 300MB to 2GB. How will you investigate?

Interview Answer

I would first inspect the Dockerfile.

Then check:

• Base Image

• Installed Packages

• Temporary Files

• Package Cache

• Logs

• Build Artifacts

• node_modules

• Unnecessary COPY instructions

-----------------------------------------------------------

Production Solution

Use Multi-stage Build

Remove package cache

Use .dockerignore

Choose lightweight base images

===========================================================
QUESTION 54
===========================================================

Q. COPY instruction is failing during docker build.

How will you troubleshoot?

Interview Answer

I verify:

• File exists

• Correct path

• Build context

• File permissions

• .dockerignore

Most COPY failures happen because the file is outside the Docker build context.

===========================================================
QUESTION 55
===========================================================

Q. What causes "Permission Denied" inside a container?

Interview Answer

Common reasons include:

• Wrong file permissions

• Wrong ownership

• Running as non-root

• Mounted volume permissions

• Missing execute permission

-----------------------------------------------------------

Commands

ls -l

whoami

id

chmod

chown

===========================================================
QUESTION 56
===========================================================

Q. Explain "exec format error".

Interview Answer

This error usually occurs when the application binary is built for a different CPU architecture.

For example,

ARM Image

running on

AMD64 Server

-----------------------------------------------------------

Production Solution

Build image using the correct platform.

Example

docker build --platform linux/amd64 .

===========================================================
QUESTION 57
===========================================================

Q. Docker reports "No space left on device".

How will you resolve it?

Interview Answer

First I verify disk usage.

df -h

docker system df

Then remove unused resources.

docker image prune

docker container prune

docker volume prune

docker network prune

If required,

docker system prune -a

===========================================================
QUESTION 58
===========================================================

Q. Container keeps restarting continuously.

How will you investigate?

Interview Answer

I follow this sequence:

docker ps -a

docker logs

docker inspect

Verify CMD

Verify ENTRYPOINT

Verify Environment Variables

Verify mounted volumes

Verify application startup

I avoid restarting repeatedly before identifying the root cause.

===========================================================
QUESTION 59
===========================================================

Q. How do you debug a running container?

Interview Answer

docker exec -it <container> sh

Inside the container I verify:

pwd

ls

env

ps

netstat

curl

cat configuration files

This helps identify runtime issues quickly.

===========================================================
QUESTION 60
===========================================================

Q. Explain one production issue you resolved using Docker.

Interview Answer

In our project, the React frontend was not accessible after deployment.

Initially, we suspected an issue with Nginx.

Instead of restarting services immediately, I checked the running containers, verified Docker logs, and inspected port mappings.

Using:

sudo lsof -i :3000

I found that Grafana was already using port 3000.

Instead of stopping Grafana, which is a monitoring tool, we updated the Docker Compose configuration to expose the frontend on port 3001.

After redeployment, the application became accessible.

This approach minimized impact on existing services and followed production best practices.

===========================================================

End of Part-6


===========================================================
QUESTION 51
===========================================================

Q. A container is running but the application is not accessible. How will you troubleshoot?

Interview Answer

Whenever I face this issue, I follow a structured troubleshooting approach instead of randomly restarting the container.

Step 1
Check whether the container is actually running.

docker ps

Step 2
Check the container logs.

docker logs <container_name>

Step 3
Verify the application is listening on the expected port.

docker exec -it <container_name> sh

netstat -tulnp

Step 4
Verify port mapping.

docker ps

docker inspect <container_name>

Step 5
Check firewall or security group if required.

Step 6
Verify application configuration.

Step 7
Test the application locally inside the container.

curl localhost:<port>

-----------------------------------------------------------

Production Example

In our project, all containers were running but Frontend was inaccessible.

Investigation showed Host Port 3000 was already occupied by Grafana.

We changed the mapping to 3001 instead of stopping Grafana.

===========================================================
QUESTION 52
===========================================================

Q. Docker build suddenly became very slow. What could be the reasons?

Interview Answer

Possible reasons include:

• Large build context

• Missing .dockerignore

• Cache invalidation

• Downloading packages repeatedly

• Slow internet while pulling base images

• Copying unnecessary files

• Large base image

-----------------------------------------------------------

Production Solution

Copy dependency files first.

Example

COPY requirements.txt .

RUN pip install -r requirements.txt

COPY .

This allows Docker cache to be reused.

===========================================================
QUESTION 53
===========================================================

Q. Your Docker image size increased from 300MB to 2GB. How will you investigate?

Interview Answer

I would first inspect the Dockerfile.

Then check:

• Base Image

• Installed Packages

• Temporary Files

• Package Cache

• Logs

• Build Artifacts

• node_modules

• Unnecessary COPY instructions

-----------------------------------------------------------

Production Solution

Use Multi-stage Build

Remove package cache

Use .dockerignore

Choose lightweight base images

===========================================================
QUESTION 54
===========================================================

Q. COPY instruction is failing during docker build.

How will you troubleshoot?

Interview Answer

I verify:

• File exists

• Correct path

• Build context

• File permissions

• .dockerignore

Most COPY failures happen because the file is outside the Docker build context.

===========================================================
QUESTION 55
===========================================================

Q. What causes "Permission Denied" inside a container?

Interview Answer

Common reasons include:

• Wrong file permissions

• Wrong ownership

• Running as non-root

• Mounted volume permissions

• Missing execute permission

-----------------------------------------------------------

Commands

ls -l

whoami

id

chmod

chown

===========================================================
QUESTION 56
===========================================================

Q. Explain "exec format error".

Interview Answer

This error usually occurs when the application binary is built for a different CPU architecture.

For example,

ARM Image

running on

AMD64 Server

-----------------------------------------------------------

Production Solution

Build image using the correct platform.

Example

docker build --platform linux/amd64 .

===========================================================
QUESTION 57
===========================================================

Q. Docker reports "No space left on device".

How will you resolve it?

Interview Answer

First I verify disk usage.

df -h

docker system df

Then remove unused resources.

docker image prune

docker container prune

docker volume prune

docker network prune

If required,

docker system prune -a

===========================================================
QUESTION 58
===========================================================

Q. Container keeps restarting continuously.

How will you investigate?

Interview Answer

I follow this sequence:

docker ps -a

docker logs

docker inspect

Verify CMD

Verify ENTRYPOINT

Verify Environment Variables

Verify mounted volumes

Verify application startup

I avoid restarting repeatedly before identifying the root cause.

===========================================================
QUESTION 59
===========================================================

Q. How do you debug a running container?

Interview Answer

docker exec -it <container> sh

Inside the container I verify:

pwd

ls

env

ps

netstat

curl

cat configuration files

This helps identify runtime issues quickly.

===========================================================
QUESTION 60
===========================================================

Q. Explain one production issue you resolved using Docker.

Interview Answer

In our project, the React frontend was not accessible after deployment.

Initially, we suspected an issue with Nginx.

Instead of restarting services immediately, I checked the running containers, verified Docker logs, and inspected port mappings.

Using:

sudo lsof -i :3000

I found that Grafana was already using port 3000.

Instead of stopping Grafana, which is a monitoring tool, we updated the Docker Compose configuration to expose the frontend on port 3001.

After redeployment, the application became accessible.

This approach minimized impact on existing services and followed production best practices.

===========================================================

End of Part-6


===========================================================
QUESTION 61
===========================================================

Q. How do you secure a Docker Image?

Interview Answer

Whenever I build a Docker image, security is one of my primary considerations.

The practices I follow are:

• Use official or trusted base images.
• Use lightweight images such as slim or alpine whenever suitable.
• Avoid installing unnecessary packages.
• Never hardcode passwords, API keys or secrets.
• Run the application as a non-root user.
• Remove temporary files after installation.
• Scan images for vulnerabilities.
• Keep the base image updated.

These practices reduce the attack surface and improve security.

-----------------------------------------------------------

Cross Questions

• Why should we avoid latest tag?

• Why shouldn't containers run as root?

===========================================================
QUESTION 62
===========================================================

Q. What is Image Scanning?

Interview Answer

Image scanning is the process of checking Docker images for security vulnerabilities such as outdated packages and known CVEs.

Before deploying an image to production, it should always be scanned.

Common tools include:

Docker Scout

Trivy

Snyk

Anchore

===========================================================
QUESTION 63
===========================================================

Q. What is a CVE?

Interview Answer

CVE stands for Common Vulnerabilities and Exposures.

It is a publicly known security vulnerability assigned a unique identification number.

During image scanning, security tools identify packages affected by CVEs so they can be updated before deployment.

===========================================================
QUESTION 64
===========================================================

Q. Why should you avoid using the latest tag in production?

Interview Answer

The latest tag changes over time.

If we deploy today and redeploy next week, the image behind latest may be completely different.

This makes deployments unpredictable.

Instead, production images should use version tags.

Example

enterprise/auth-service:v1.0.0

===========================================================
QUESTION 65
===========================================================

Q. Explain Docker Image Tagging Strategy.

Interview Answer

A proper tagging strategy improves traceability and rollback.

Examples:

v1.0.0

v1.0.1

release-2025.07

build-245

git-commit-sha

In CI/CD pipelines, image tags are often generated using the Git commit ID or build number.

===========================================================
QUESTION 66
===========================================================

Q. How do you rollback a bad Docker deployment?

Interview Answer

If a deployment fails, I immediately identify the last stable image version.

Then I redeploy the previous image.

Example

docker run enterprise/auth-service:v1.0.3

instead of

v1.0.4

This minimizes downtime and restores the service quickly.

===========================================================
QUESTION 67
===========================================================

Q. What is Docker Registry Authentication?

Interview Answer

Private Docker registries require authentication before pushing or pulling images.

Authentication is performed using:

docker login

Credentials should never be hardcoded inside scripts.

In CI/CD, credentials should be stored securely using secret management.

===========================================================
QUESTION 68
===========================================================

Q. What is the role of Docker in a CI/CD Pipeline?

Interview Answer

Docker provides a consistent deployment artifact.

The pipeline generally performs the following steps:

• Build application

• Build Docker image

• Scan image

• Push image to registry

• Deploy image

Using Docker ensures the same image is promoted across Development, QA, UAT and Production environments.

===========================================================
QUESTION 69
===========================================================

Q. Explain the Docker workflow used in your project.

Interview Answer

The workflow followed in our project was:

Developer pushes code

↓

Git Repository

↓

Docker Image Build

↓

Image Testing

↓

Docker Compose Deployment

↓

Validation

↓

Ready for CI/CD Integration

This ensured consistency across environments.

===========================================================
QUESTION 70
===========================================================

Q. What are the most common Docker interview mistakes candidates make?

Interview Answer

Some common mistakes are:

• Saying Docker is a Virtual Machine.

• Confusing Images and Containers.

• Not knowing Docker Networking.

• Not understanding Docker Layers.

• Using latest tag in production.

• Running everything as root.

• Storing secrets inside Dockerfiles.

• Unable to explain a real production issue.

• Memorizing commands without understanding concepts.

-----------------------------------------------------------

Interview Tip

Always answer with a real project example.

Interviewers are more interested in how you solved production problems than how many commands you remember.

===========================================================

End of Part-7


===========================================================
QUESTION 71
===========================================================

Q. How do you optimize Docker image build time?

Interview Answer

Whenever I optimize a Docker build, I focus on reducing unnecessary rebuilds.

The practices I follow are:

• Use Docker cache effectively.
• Copy dependency files first.
• Install dependencies before copying application code.
• Use .dockerignore.
• Use lightweight base images.
• Use multi-stage builds.
• Avoid unnecessary RUN instructions.

Production Example

COPY requirements.txt .

RUN pip install -r requirements.txt

COPY .

This allows Docker to reuse cached dependency layers if only application code changes.

-----------------------------------------------------------

Interview Tip

Mention Docker Layer Caching. Interviewers expect this from a 4+ year DevOps Engineer.

===========================================================
QUESTION 72
===========================================================

Q. Why do we copy requirements.txt before copying the application source?

Interview Answer

Dependency files change less frequently than application source code.

By copying requirements.txt first, Docker caches the dependency installation layer.

If only application code changes, Docker skips reinstalling dependencies, making builds significantly faster.

===========================================================
QUESTION 73
===========================================================

Q. Explain Docker Layer Caching with an example.

Interview Answer

Docker builds images layer by layer.

If a layer has not changed, Docker reuses it from cache.

If one layer changes, Docker rebuilds that layer and all layers after it.

Example

FROM python:3.12-slim

COPY requirements.txt .

RUN pip install -r requirements.txt

COPY .

If only application files change, Docker reuses the first three layers and rebuilds only the last layer.

===========================================================
QUESTION 74
===========================================================

Q. What is the difference between docker save and docker export?

Interview Answer

docker save exports a Docker image along with its layers and metadata.

docker export exports only the container filesystem.

docker save is used for backing up or transferring images.

docker export is used when only the filesystem is required.

-----------------------------------------------------------

Cross Questions

docker load works with?

Answer

docker save

docker import works with?

Answer

docker export

===========================================================
QUESTION 75
===========================================================

Q. Explain docker commit.

Interview Answer

docker commit creates a new image from the current state of a running container.

Although useful for quick testing, it is not recommended in production.

Production images should always be built using Dockerfiles to ensure consistency and version control.

===========================================================
QUESTION 76
===========================================================

Q. How do you check which ports are mapped for a container?

Interview Answer

The following commands can be used:

docker ps

docker port <container_name>

docker inspect <container_name>

These commands show both container ports and host port mappings.

===========================================================
QUESTION 77
===========================================================

Q. A container is healthy, but users cannot access the application. What will you check?

Interview Answer

I follow this sequence:

1. Verify application is running.

2. Check docker logs.

3. Verify application is listening on the expected port.

4. Verify port mapping.

5. Verify firewall or security groups.

6. Verify reverse proxy configuration.

7. Verify DNS if applicable.

I avoid assuming the issue is inside Docker until networking is verified.

===========================================================
QUESTION 78
===========================================================

Q. Why should Docker images be immutable?

Interview Answer

An immutable image never changes after it is built.

If changes are required, a new image is created instead of modifying the existing one.

This provides consistency, traceability, easier rollback, and predictable deployments.

Production deployments always use versioned immutable images.

===========================================================
QUESTION 79
===========================================================

Q. Explain the difference between mutable and immutable infrastructure.

Interview Answer

Mutable infrastructure allows changes to existing servers.

Immutable infrastructure replaces the existing server or container with a new version.

Docker follows the immutable infrastructure model.

Instead of modifying running containers, new containers are created from updated images.

===========================================================
QUESTION 80
===========================================================

Q. If an interviewer asks, "Rate your Docker knowledge", what should you answer?

Interview Answer

I would say:

"I am comfortable with Docker fundamentals, Dockerfile creation, multi-stage builds, Docker Compose, networking, volumes, image optimization, troubleshooting, and integrating Docker into CI/CD pipelines. I have also worked on resolving production-like deployment issues and follow Docker security best practices. However, I believe there is always scope to learn more."

This answer sounds confident without appearing overconfident.

===========================================================

End of Part-8


===========================================================
QUESTION 81
===========================================================

Q. A Docker image builds successfully but the container exits immediately. How will you troubleshoot?

Interview Answer

Whenever a container exits immediately, I don't restart it repeatedly. I investigate first.

My approach is:

1. Check exited containers

docker ps -a

2. View logs

docker logs <container>

3. Inspect startup command

docker inspect <container>

4. Verify CMD or ENTRYPOINT

5. Verify application startup manually

docker exec -it <container> sh

6. Verify application configuration

7. Check environment variables

Most of the time, the issue is an incorrect startup command or the application crashing during startup.

-----------------------------------------------------------

Interview Tip

Never say "I'll restart the container."

Always investigate first.

===========================================================
QUESTION 82
===========================================================

Q. Docker image is working on your laptop but not on the server. What could be the reason?

Interview Answer

Possible reasons include:

• CPU Architecture mismatch

• Missing environment variables

• Incorrect port mapping

• Firewall rules

• Different Docker versions

• Missing mounted volumes

• SELinux or AppArmor restrictions

• Incorrect permissions

I compare both environments before making changes.

===========================================================
QUESTION 83
===========================================================

Q. Image pull is failing from Docker Hub. How will you troubleshoot?

Interview Answer

I verify:

• Internet connectivity

• Image name

• Image tag

• Authentication

• Registry availability

• Docker login

• Proxy configuration

• DNS resolution

Commands

docker login

docker pull image:tag

===========================================================
QUESTION 84
===========================================================

Q. What is the difference between docker pull and docker run?

Interview Answer

docker pull

Downloads the image only.

docker run

Downloads the image if required, creates the container and starts it.

===========================================================
QUESTION 85
===========================================================

Q. Explain docker rm, docker rmi and docker system prune.

Interview Answer

docker rm

Removes containers.

docker rmi

Removes Docker Images.

docker system prune

Removes unused containers, images, networks and build cache.

Use docker system prune -a carefully because it removes all unused images.

===========================================================
QUESTION 86
===========================================================

Q. How do you clean unused Docker resources?

Interview Answer

Commands

docker container prune

docker image prune

docker volume prune

docker network prune

docker builder prune

docker system prune -a

I always verify before deleting resources in production.

===========================================================
QUESTION 87
===========================================================

Q. What is the purpose of docker inspect during production troubleshooting?

Interview Answer

docker inspect provides detailed metadata about Docker objects.

I use it to verify:

• Network

• IP Address

• Port Mapping

• Environment Variables

• Volumes

• Restart Policy

• Image Information

It helps identify configuration issues without modifying the container.

===========================================================
QUESTION 88
===========================================================

Q. What Docker commands do you use daily?

Interview Answer

The commands I use most frequently are:

docker ps

docker ps -a

docker images

docker build

docker run

docker logs

docker exec

docker inspect

docker compose up -d

docker compose down

docker stats

docker network ls

docker volume ls

===========================================================
QUESTION 89
===========================================================

Q. Explain a Docker issue that improved your troubleshooting skills.

Interview Answer

During our project deployment, the React frontend was inaccessible.

Initially, it appeared to be an Nginx issue.

Instead of restarting services, I verified Docker logs and checked the host port.

Using:

sudo lsof -i :3000

I identified that Grafana was already using port 3000.

Rather than stopping the monitoring service, I changed the frontend mapping to port 3001.

The deployment succeeded without affecting existing services.

This reinforced the importance of validating assumptions before making changes.

===========================================================
QUESTION 90
===========================================================

Q. As a DevOps Engineer, what is your Docker troubleshooting methodology?

Interview Answer

Whenever I troubleshoot Docker issues, I follow a structured approach:

1. Understand the problem.

2. Verify container status.

3. Check logs.

4. Inspect configuration.

5. Verify networking.

6. Verify ports.

7. Verify environment variables.

8. Check storage and volumes.

9. Validate application inside the container.

10. Identify Root Cause.

11. Implement the fix.

12. Validate the solution.

13. Document the RCA.

I avoid making random changes without understanding the root cause.

===========================================================

End of Part-9


===========================================================
QUESTION 91
===========================================================

Q. If Docker and Kubernetes are both available, why do we still need Docker?

Interview Answer

Docker and Kubernetes solve different problems.

Docker is responsible for packaging the application into a container image.

Kubernetes is responsible for orchestrating those containers.

In our project, Docker was used to build the application image. Later, Kubernetes will deploy, scale and manage those images.

-----------------------------------------------------------

Interviewer Expectation

The interviewer wants to check whether you understand that Docker and Kubernetes complement each other rather than replace each other.

===========================================================
QUESTION 92
===========================================================

Q. Explain the Docker workflow in your project from code commit to deployment.

Interview Answer

In our project, developers first committed code to Git.

The CI pipeline then built the Docker image using the Dockerfile.

The image was tagged with the build number or version and pushed to a container registry.

After validation, Docker Compose was used for deployment in the development environment.

In future sprints, the same image will be deployed through Kubernetes and ArgoCD.

-----------------------------------------------------------

Interviewer Tip

Always explain the flow in sequence. Avoid listing tools randomly.

===========================================================
QUESTION 93
===========================================================

Q. Which Docker command do you use first while troubleshooting?

Interview Answer

The first command depends on the problem, but in most application-related issues I start with:

docker ps

to verify the container state.

Then:

docker logs <container>

to understand why the application failed.

Only after reviewing logs do I proceed with docker inspect or docker exec if required.

-----------------------------------------------------------

Wrong Answer

"I restart the container."

This is not a good production approach.

===========================================================
QUESTION 94
===========================================================

Q. How do you know whether the issue is in Docker or in the application?

Interview Answer

I isolate the problem step by step.

First, I verify whether the container is running.

Then I check Docker logs.

If Docker is functioning correctly but the application is failing, I investigate the application logs, configuration, environment variables and connectivity.

I avoid blaming Docker without evidence.

===========================================================
QUESTION 95
===========================================================

Q. Have you ever modified a running container in production?

Interview Answer

No.

In production we avoid modifying running containers because containers should remain immutable.

Any required change is made in the source code or Dockerfile, a new image is built, tested and deployed.

This ensures consistency and makes rollback easier.

===========================================================
QUESTION 96
===========================================================

Q. What is the biggest mistake people make while learning Docker?

Interview Answer

Many people memorize Docker commands without understanding Docker architecture.

In production, understanding images, containers, networking, storage, build optimization and troubleshooting is much more important than remembering every command.

===========================================================
QUESTION 97
===========================================================

Q. Which Docker topic do interviewers ask most frequently?

Interview Answer

Based on my experience, the most frequently asked topics are:

• Docker Architecture

• Dockerfile

• CMD vs ENTRYPOINT

• Multi-stage Builds

• Docker Networking

• Docker Volumes

• Docker Compose

• Troubleshooting

• Security Best Practices

• Production Scenarios

===========================================================
QUESTION 98
===========================================================

Q. If you had to improve your Docker knowledge further, what would you learn next?

Interview Answer

I would focus on:

• Docker Security

• Rootless Docker

• Image Signing

• Docker BuildKit

• Docker Compose Advanced Features

• Container Observability

• Kubernetes Integration

Continuous learning is important because container technologies evolve rapidly.

===========================================================
QUESTION 99
===========================================================

Q. What Docker topics have you worked on in this project?

Interview Answer

During this project I worked on:

• Dockerfile creation

• Multi-stage build

• Docker image creation

• Docker Compose

• Container networking

• Port mapping

• Container troubleshooting

• Docker logs

• Docker inspect

• Image optimization

• Production issue investigation

• Preparing the application for CI/CD

===========================================================
QUESTION 100
===========================================================

Q. Summarize your Docker experience in two minutes.

Interview Answer

I have hands-on experience in containerizing applications using Docker. In my project, I created Dockerfiles for Flask-based microservices and a React frontend. I implemented a multi-stage build for the frontend, built optimized Docker images, and deployed the complete application using Docker Compose.

I have worked with Docker networking, port mapping, container lifecycle, image optimization, volumes, restart policies, and troubleshooting using commands like docker logs, docker inspect and docker exec.

I also resolved production-like issues such as port conflicts and startup failures by following a structured Root Cause Analysis approach instead of making random changes.

I understand Docker best practices including lightweight images, multi-stage builds, non-root containers, image tagging, and avoiding hardcoded secrets. I have also integrated Docker into a CI/CD workflow and understand how Docker images are promoted across environments.

===========================================================

DOCKER INTERVIEW HANDBOOK - COMPLETED

Total Questions : 100

Topics Covered

✔ Docker Fundamentals
✔ Docker Architecture
✔ Docker Images
✔ Docker Containers
✔ Dockerfile
✔ Docker Layers
✔ Docker Cache
✔ Multi-stage Build
✔ Docker Networking
✔ Docker Volumes
✔ Docker Compose
✔ Docker Security
✔ Image Optimization
✔ Docker Registry
✔ CI/CD Integration
✔ Production Troubleshooting
✔ Root Cause Analysis
✔ Real Interview Scenarios
✔ Best Practices

