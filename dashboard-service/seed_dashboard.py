from dashboard_service import app
from dashboard_service.database import db
from dashboard_service.models.dashboard import DashboardMetric


with app.app_context():

    db.create_all()

    existing = DashboardMetric.query.first()

    if existing:
        print("Dashboard data already exists")
    else:

        metric = DashboardMetric(
            cluster="Healthy",
            nodes=3,
            pods=18,
            running_pods=18,
            cpu_usage="42%",
            memory_usage="58%",
            deployments=6,
            docker_images=12,
            active_alerts=2,
            latest_deployment="Auth Service v2.0.0",
            environment="DEV"
        )

        db.session.add(metric)
        db.session.commit()

        print("Dashboard data seeded successfully")
