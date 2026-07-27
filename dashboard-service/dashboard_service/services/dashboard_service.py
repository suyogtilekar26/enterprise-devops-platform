class DashboardService:

    @staticmethod
    def get_dashboard():

        return {
            "cluster": "Healthy",
            "nodes": 3,
            "pods": 18,
            "running_pods": 18,
            "cpu_usage": "42%",
            "memory_usage": "58%",
            "deployments": 6,
            "docker_images": 12,
            "active_alerts": 2,
            "latest_deployment": "Auth Service v1.0.0",
            "environment": "DEV",
        }
