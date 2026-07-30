from flask import Flask, jsonify
from flask_cors import CORS

from dashboard_service.config import Config
from dashboard_service.routes.dashboard import dashboard_bp
from dashboard_service.database import db
from dashboard_service.models.dashboard import DashboardMetric

app = Flask(__name__)

app.config["SQLALCHEMY_DATABASE_URI"] = Config.DATABASE_URI
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db.init_app(app)

CORS(app)

app.register_blueprint(dashboard_bp, url_prefix="/api/dashboard")


@app.route("/")
def home():
    return jsonify(
        {"service": "Dashboard Service", "status": "running", "version": "1.0.0"}
    )


@app.route("/health")
def health():
    return jsonify({"status": "healthy"})


if __name__ == "__main__":
    app.run(host=Config.HOST, port=Config.PORT, debug=Config.DEBUG)
