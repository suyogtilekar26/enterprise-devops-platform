import MainLayout from "../layouts/MainLayout";
import ActivityTimeline from "../components/ActivityTimeline";
import StatCard from "../components/StatCard";

function Dashboard() {

    const username = localStorage.getItem("username") || "Suyog";
    const environment = localStorage.getItem("environment") || "DEV";

    return (

        <MainLayout>

            <h1>

                Welcome {username} 👋

            </h1>

            <p
                style={{
                    marginBottom: "30px",
                    opacity: .7
                }}
            >

                Current Environment :

                <b>

                    {" "}

                    {environment}

                </b>

            </p>

            <div className="grid">

                <StatCard

                    title="GitHub Actions"

                    value="SUCCESS"

                    subtitle="Build #125"

                    icon="🚀"

                    color="#22c55e"

                />

                <StatCard

                    title="Docker"

                    value="3"

                    subtitle="Running Containers"

                    icon="🐳"

                    color="#2563eb"

                />

                <StatCard

                    title="Kubernetes"

                    value="12"

                    subtitle="Running Pods"

                    icon="☸"

                    color="#9333ea"

                />

                <StatCard

                    title="Monitoring"

                    value="Healthy"

                    subtitle="CPU 23%"

                    icon="📊"

                    color="#f59e0b"

                />

                <StatCard

                    title="AWS"

                    value="Mumbai"

                    subtitle="ap-south-1"

                    icon="☁"

                    color="#0ea5e9"

                />

                <StatCard

                    title="Incidents"

                    value="0"

                    subtitle="No Critical"

                    icon="🚨"

                    color="#ef4444"

                />

            </div>

            <div
                style={{
                    marginTop: "30px"
                }}
            >

                <div className="grid">

                    <div className="box">

                        <h3>

                            Latest Deployment

                        </h3>

                        <br />

                        <p>

                            Version :
                            <b> v1.0.0</b>

                        </p>

                        <br />

                        <p>

                            Branch :
                            <b> main</b>

                        </p>

                        <br />

                        <p>

                            Status :
                            <span
                                style={{
                                    color: "#22c55e"
                                }}
                            >

                                {" "}SUCCESS

                            </span>

                        </p>

                    </div>

                    <div className="box">

                        <h3>

                            Cluster Overview

                        </h3>

                        <br />

                        <p>

                            Nodes :
                            <b> 3</b>

                        </p>

                        <br />

                        <p>

                            Pods :
                            <b> 12</b>

                        </p>

                        <br />

                        <p>

                            Deployments :
                            <b> 5</b>

                        </p>

                        <br />

                        <p>

                            Services :
                            <b> 8</b>

                        </p>

                    </div>

                </div>

            </div>

            <ActivityTimeline/>

        </MainLayout>

    );

}

export default Dashboard;