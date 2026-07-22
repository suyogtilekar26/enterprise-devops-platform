function ActivityTimeline() {

    const activities = [

        {
            time: "09:15 AM",
            title: "Docker Image Built",
            description: "enterprise-devops-platform:v1.0.0"
        },

        {
            time: "09:35 AM",
            title: "GitHub Actions",
            description: "CI Pipeline Completed"
        },

        {
            time: "10:00 AM",
            title: "Kubernetes Deployment",
            description: "dashboard-service deployed"
        },

        {
            time: "10:20 AM",
            title: "Monitoring",
            description: "Prometheus Health Check Passed"
        },

        {
            time: "10:40 AM",
            title: "Incident",
            description: "No Active Incidents"
        }

    ];

    return (

        <div className="timeline-card">

            <h2>

                Recent Activity

            </h2>

            {

                activities.map((activity,index)=>(

                    <div
                        className="timeline-item"
                        key={index}
                    >

                        <div className="timeline-dot"></div>

                        <div className="timeline-content">

                            <span>

                                {activity.time}

                            </span>

                            <h4>

                                {activity.title}

                            </h4>

                            <p>

                                {activity.description}

                            </p>

                        </div>

                    </div>

                ))

            }

        </div>

    );

}

export default ActivityTimeline;