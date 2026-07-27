from flask import Blueprint, jsonify, request

from auth_service.services.auth_service import AuthService

auth_bp = Blueprint("auth", __name__)


@auth_bp.route("/login", methods=["POST"])
def login():
    """
    Authenticate user and return JWT token.
    """

    data = request.get_json()

    if not data:
        return jsonify({"success": False, "message": "Request body is required."}), 400

    username = data.get("username", "").strip()
    password = data.get("password", "")
    environment = data.get("environment", "").strip().upper()

    if not username or not password or not environment:
        return (
            jsonify(
                {
                    "success": False,
                    "message": "Username, password and environment are required.",
                }
            ),
            400,
        )

    response, status_code = AuthService.login(
        username=username, password=password, environment=environment
    )

    return jsonify(response), status_code
