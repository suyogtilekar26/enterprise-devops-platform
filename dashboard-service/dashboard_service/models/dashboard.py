from dashboard_service.database import db


class DashboardMetric(db.Model):

    __tablename__ = "dashboard_metrics"

    id = db.Column(
        db.Integer,
        primary_key=True
    )

    cluster = db.Column(
        db.String(50),
        nullable=False
    )

    nodes = db.Column(
        db.Integer,
        nullable=False
    )

    pods = db.Column(
        db.Integer,
        nullable=False
    )

    running_pods = db.Column(
        db.Integer,
        nullable=False
    )

    cpu_usage = db.Column(
        db.String(20),
        nullable=False
    )

    memory_usage = db.Column(
        db.String(20),
        nullable=False
    )

    deployments = db.Column(
        db.Integer,
        nullable=False
    )

    docker_images = db.Column(
        db.Integer,
        nullable=False
    )

    active_alerts = db.Column(
        db.Integer,
        nullable=False
    )

    latest_deployment = db.Column(
        db.String(100),
        nullable=False
    )

    environment = db.Column(
        db.String(50),
        nullable=False
    )
