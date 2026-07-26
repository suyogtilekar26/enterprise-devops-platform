import pytest
from unittest.mock import patch

from app import app


@pytest.fixture
def client():
    app.config["TESTING"] = True
    with app.test_client() as client:
        yield client


def test_home(client):
    response = client.get("/")
    assert response.status_code == 200

    data = response.get_json()
    assert data["service"] == "API Gateway"
    assert data["status"] == "running"
    assert data["version"] == "1.0.0"


def test_health(client):
    response = client.get("/health")

    assert response.status_code == 200
    assert response.get_json()["status"] == "healthy"


@patch("routes.gateway.requests.get")
def test_dashboard_success(mock_get, client):
    mock_get.return_value.status_code = 200
    mock_get.return_value.json.return_value = {
        "success": True,
        "message": "Dashboard data",
    }

    response = client.get("/api/dashboard/")

    assert response.status_code == 200
    assert response.get_json()["success"] is True


def test_login_body_required(client):
    response = client.post("/api/auth/login", json={})

    assert response.status_code == 400

    data = response.get_json()
    assert data["success"] is False
    assert data["message"] == "Request body is required"


@patch("routes.gateway.requests.post")
def test_login_success(mock_post, client):
    mock_post.return_value.status_code = 200
    mock_post.return_value.json.return_value = {"success": True, "token": "demo-token"}

    response = client.post(
        "/api/auth/login",
        json={"username": "admin", "password": "admin123"},
    )

    assert response.status_code == 200
    assert response.get_json()["success"] is True
