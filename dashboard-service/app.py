from flask import Flask, jsonify
from flask_cors import CORS

from config import Config
from routes.dashboard import dashboard_bp

app = Flask(__name__)

CORS(app)

app.register_blueprint(
    dashboard_bp,
    url_prefix="/api/dashboard"
)


@app.route("/")
def home():
    return jsonify({
        "service": "Dashboard Service",
        "status": "running",
        "version": "1.0.0"
    })


@app.route("/health")
def health():
    return jsonify({
        "status": "healthy"
    })


if __name__ == "__main__":
    app.run(
        host=Config.HOST,
        port=Config.PORT,
        debug=Config.DEBUG
    )
