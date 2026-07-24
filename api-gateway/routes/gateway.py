from flask import Blueprint, request, jsonify
import requests

from config import Config

gateway_bp = Blueprint("gateway", __name__)


@gateway_bp.route("/api/dashboard/", methods=["GET"])
def dashboard():
    try:
        response = requests.get(
            f"{Config.DASHBOARD_SERVICE_URL}/api/dashboard/", timeout=10
        )

        return response.json(), response.status_code

    except requests.RequestException as error:
        return (
            jsonify(
                {
                    "success": False,
                    "message": "Dashboard Service unavailable",
                    "error": str(error),
                }
            ),
            503,
        )


@gateway_bp.route("/api/auth/login", methods=["POST"])
def login():
    try:
        data = request.get_json()

        if not data:
            return (
                jsonify({"success": False, "message": "Request body is required"}),
                400,
            )

        response = requests.post(
            f"{Config.AUTH_SERVICE_URL}/api/auth/login", json=data, timeout=10
        )

        return response.json(), response.status_code

    except requests.RequestException as error:
        return (
            jsonify(
                {
                    "success": False,
                    "message": "Auth Service unavailable",
                    "error": str(error),
                }
            ),
            503,
        )
