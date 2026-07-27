from auth_service import app
from auth_service.services.auth_service import AuthService


def test_health_endpoint():
    client = app.test_client()

    response = client.get("/health")

    assert response.status_code == 200
    assert response.get_json() == {"status": "healthy"}


def test_home_endpoint():
    client = app.test_client()

    response = client.get("/")

    data = response.get_json()

    assert response.status_code == 200
    assert data["service"] == "Enterprise DevOps Auth Service"
    assert data["status"] == "Running"
    assert "environment" in data


def test_login_success(mocker):
    mocker.patch.object(
        AuthService,
        "login",
        return_value=(
            {
                "success": True,
                "token": "fake-jwt-token",
            },
            200,
        ),
    )

    client = app.test_client()

    response = client.post(
        "/api/auth/login",
        json={
            "username": "admin",
            "password": "password123",
            "environment": "DEV",
        },
    )

    data = response.get_json()

    assert response.status_code == 200
    assert data["success"] is True
    assert data["token"] == "fake-jwt-token"


def test_login_without_body():
    client = app.test_client()

    response = client.post("/api/auth/login", json={})

    data = response.get_json()

    assert response.status_code == 400
    assert data["success"] is False
    assert data["message"] == "Request body is required."


def test_login_with_missing_fields():
    client = app.test_client()

    response = client.post(
        "/api/auth/login",
        json={
            "username": "admin",
        },
    )

    data = response.get_json()

    assert response.status_code == 400
    assert data["success"] is False
    assert "required" in data["message"]
