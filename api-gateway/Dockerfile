FROM python:3.12-slim

LABEL maintainer="Suyog Tilekar"
LABEL project="Enterprise DevOps Platform"

WORKDIR /app

ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1

RUN groupadd -r appgroup && \
    useradd -r -g appgroup appuser

COPY requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt

COPY . .

RUN chown -R appuser:appgroup /app

USER appuser

EXPOSE 8080

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
CMD python -c "import urllib.request; urllib.request.urlopen('http://localhost:8080/health')"

CMD ["gunicorn","--workers","2","--threads","2","--bind","0.0.0.0:8080","api_gateway:app"]
