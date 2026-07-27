import pytest
from unittest.mock import patch

from dashboard_service import app


@pytest.fixture
def client():
    app.config["TESTING"] = True
    with app.test_client() as client:
        yield client


def test_home(client):
    response = client.get("/")

    assert response.status_code == 200

    data = response.get_json()
    assert data["service"] == "Dashboard Service"
    assert data["status"] == "running"
    assert data["version"] == "1.0.0"


def test_health(client):
    response = client.get("/health")

    assert response.status_code == 200
    assert response.get_json()["status"] == "healthy"


@patch("dashboard_service.routes.dashboard.DashboardService.get_dashboard")
def test_dashboard_api(mock_dashboard, client):
    mock_dashboard.return_value = {
        "total_users": 10,
        "total_orders": 25,
        "revenue": 15000,
    }

    response = client.get("/api/dashboard/")

    assert response.status_code == 200

    data = response.get_json()

    assert data["success"] is True
    assert data["data"]["total_users"] == 10
    assert data["data"]["total_orders"] == 25
    assert data["data"]["revenue"] == 15000
