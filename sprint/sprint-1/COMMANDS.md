# Docker Commands Handbook
# Enterprise DevOps Platform
# Sprint-1

=========================================================
IMAGE COMMANDS
=========================================================

Build Image

docker build -t enterprise/auth-service:v1 .

Purpose

Builds a Docker image from a Dockerfile.

---------------------------------------------------------

List Images

docker images

Purpose

Displays all locally available images.

---------------------------------------------------------

Remove Image

docker rmi <image_id>

Purpose

Deletes a Docker image.

---------------------------------------------------------

Image History

docker history <image>

Purpose

Shows image layers.

Useful for troubleshooting image size.

=========================================================
CONTAINER COMMANDS
=========================================================

Run Container

docker run -d -p 5000:5000 enterprise/auth-service:v1

Purpose

Creates and starts a container.

---------------------------------------------------------

List Running Containers

docker ps

---------------------------------------------------------

List All Containers

docker ps -a

---------------------------------------------------------

Stop Container

docker stop <container>

---------------------------------------------------------

Start Container

docker start <container>

---------------------------------------------------------

Restart Container

docker restart <container>

---------------------------------------------------------

Remove Container

docker rm <container>

=========================================================
DEBUGGING COMMANDS
=========================================================

View Logs

docker logs <container>

Purpose

First command during troubleshooting.

---------------------------------------------------------

Interactive Shell

docker exec -it <container> sh

Purpose

Login into running container.

---------------------------------------------------------

Inspect Container

docker inspect <container>

Purpose

Shows complete metadata.

---------------------------------------------------------

Container Statistics

docker stats

Purpose

Shows CPU and Memory utilization.

=========================================================
NETWORK COMMANDS
=========================================================

List Networks

docker network ls

---------------------------------------------------------

Inspect Network

docker network inspect <network>

---------------------------------------------------------

Create Network

docker network create enterprise-network

=========================================================
VOLUME COMMANDS
=========================================================

List Volumes

docker volume ls

---------------------------------------------------------

Inspect Volume

docker volume inspect <volume>

---------------------------------------------------------

Remove Volume

docker volume rm <volume>

=========================================================
DOCKER COMPOSE COMMANDS
=========================================================

Start Services

docker compose up -d

---------------------------------------------------------

Stop Services

docker compose down

---------------------------------------------------------

View Running Services

docker compose ps

---------------------------------------------------------

View Logs

docker compose logs

docker compose logs -f

=========================================================
CLEANUP COMMANDS
=========================================================

Remove Unused Containers

docker container prune

---------------------------------------------------------

Remove Unused Images

docker image prune

---------------------------------------------------------

Remove Unused Volumes

docker volume prune

---------------------------------------------------------

Remove Unused Networks

docker network prune

---------------------------------------------------------

Complete Cleanup

docker system prune -a

=========================================================
DISK USAGE
=========================================================

Docker Disk Usage

docker system df

---------------------------------------------------------

Linux Disk Usage

df -h

=========================================================
PROJECT COMMANDS
=========================================================

Build Project

docker compose build

---------------------------------------------------------

Deploy Project

docker compose up -d

---------------------------------------------------------

Stop Project

docker compose down

---------------------------------------------------------

Check Project

docker compose ps

=========================================================
INTERVIEW MOST USED COMMANDS
=========================================================

docker build

docker run

docker ps

docker ps -a

docker logs

docker exec

docker inspect

docker images

docker stats

docker network ls

docker volume ls

docker compose up -d

docker compose down

docker compose logs

docker system df

=========================================================
END OF DOCUMENT
=========================================================

