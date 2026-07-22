import MainLayout from "../layouts/MainLayout";
import StatCard from "../components/StatCard";
import DataTable from "../components/DataTable";

function Monitoring() {

    const alerts = [

        ["CPU Usage", "23%", "Healthy"],
        ["Memory Usage", "61%", "Healthy"],
        ["Disk Usage", "48%", "Healthy"],
        ["Network", "1.2 Gbps", "Normal"],
        ["API Response", "112 ms", "Healthy"]

    ];

    return (

        <MainLayout>

            <h1>📊 Monitoring Dashboard</h1>

            <p
                style={{
                    marginBottom: "30px",
                    opacity: .7
                }}
            >
                Prometheus & Grafana Monitoring
            </p>

            <div className="grid">

                <StatCard
                    title="CPU"
                    value="23%"
                    subtitle="Cluster CPU Usage"
                    icon="🖥"
                    color="#2563eb"
                />

                <StatCard
                    title="Memory"
                    value="61%"
                    subtitle="RAM Usage"
                    icon="💾"
                    color="#9333ea"
                />

                <StatCard
                    title="Disk"
                    value="48%"
                    subtitle="Disk Usage"
                    icon="💽"
                    color="#22c55e"
                />

                <StatCard
                    title="Latency"
                    value="112 ms"
                    subtitle="Average API Response"
                    icon="⚡"
                    color="#f59e0b"
                />

            </div>

            <DataTable

                title="Infrastructure Health"

                columns={[

                    "Metric",

                    "Value",

                    "Status"

                ]}

                data={alerts}

            />

        </MainLayout>

    );

}

export default Monitoring;