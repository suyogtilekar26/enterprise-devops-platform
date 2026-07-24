import bcrypt
from flask_jwt_extended import create_access_token

from models.user import User


class AuthService:

    @staticmethod
    def login(username, password, environment):
        """
        Authenticate user and generate JWT token.
        """

        user = User.get_user(username)

        if not user:
            return {"success": False, "message": "Invalid username or password."}, 401

        if user["environment"] != environment:
            return {"success": False, "message": "Invalid environment selected."}, 401

        if not bcrypt.checkpw(password.encode(), user["password"]):
            return {"success": False, "message": "Invalid username or password."}, 401

        access_token = create_access_token(
            identity=username,
            additional_claims={
                "role": user["role"],
                "environment": user["environment"],
            },
        )

        return {
            "success": True,
            "message": "Login successful.",
            "token": access_token,
            "user": {
                "username": username,
                "role": user["role"],
                "environment": user["environment"],
            },
        }, 200
