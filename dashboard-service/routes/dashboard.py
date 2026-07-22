from flask import Blueprint, jsonify
from services.dashboard_service import DashboardService

dashboard_bp = Blueprint("dashboard", __name__)


@dashboard_bp.route("/", methods=["GET"])
def dashboard():

    data = DashboardService.get_dashboard()

    return jsonify({
        "success": True,
        "data": data
    })
