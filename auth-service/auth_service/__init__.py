from flask import Flask, jsonify
from flask_cors import CORS
from flask_jwt_extended import JWTManager

from auth_service.config import Config
from auth_service.routes.auth import auth_bp
from auth_service.database import db

app = Flask(__name__)
app.config.from_object(Config)

app.config["SQLALCHEMY_DATABASE_URI"] = Config.DATABASE_URI
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db.init_app(app)

# Enable CORS
CORS(app)

# Initialize JWT
jwt = JWTManager(app)

# Register Blueprints
app.register_blueprint(auth_bp, url_prefix="/api/auth")


@app.route("/", methods=["GET"])
def home():
    return (
        jsonify(
            {
                "service": "Enterprise DevOps Auth Service",
                "status": "Running",
                "environment": app.config["ENVIRONMENT"],
            }
        ),
        200,
    )


@app.route("/health", methods=["GET"])
def health():
    return jsonify({"status": "healthy"}), 200


@app.errorhandler(404)
def not_found(error):
    return jsonify({"error": "Resource not found"}), 404


@app.errorhandler(500)
def internal_error(error):
    return jsonify({"error": "Internal server error"}), 500


if __name__ == "__main__":
    app.run(host=Config.HOST, port=Config.PORT, debug=Config.DEBUG)
