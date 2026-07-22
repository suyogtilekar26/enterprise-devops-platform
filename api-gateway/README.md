# API Gateway

## Description

API Gateway routes incoming requests to backend microservices.

## Services

- Auth Service
- Dashboard Service

## Port

8080

## Run

pip install -r requirements.txt

python app.py

## Docker

docker build -t api-gateway:v1 .

docker run -d \
--name api-gateway \
-p 8080:8080 \
api-gateway:v1
