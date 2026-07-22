# Dashboard Service

## Description
Dashboard Service provides dashboard information for the Enterprise DevOps Platform.

## Tech Stack
- Python
- Flask
- Gunicorn
- Docker

## Endpoints

GET /

GET /health

GET /api/dashboard/

## Run

pip install -r requirements.txt

python app.py

## Docker

docker build -t dashboard-service:v1 .

docker run -d \
--name dashboard-service \
-p 5001:5001 \
dashboard-service:v1
