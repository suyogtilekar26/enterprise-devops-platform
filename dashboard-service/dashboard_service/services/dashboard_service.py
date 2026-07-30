from dashboard_service.models.dashboard import DashboardMetric


class DashboardService:

    @staticmethod
    def get_dashboard():

        metric = DashboardMetric.query.first()

        if not metric:
            return {
                "message": "No dashboard data found"
            }

        return {
            "cluster": metric.cluster,
            "nodes": metric.nodes,
            "pods": metric.pods,
            "running_pods": metric.running_pods,
            "cpu_usage": metric.cpu_usage,
            "memory_usage": metric.memory_usage,
            "deployments": metric.deployments,
            "docker_images": metric.docker_images,
            "active_alerts": metric.active_alerts,
            "latest_deployment": metric.latest_deployment,
            "environment": metric.environment,
        }
