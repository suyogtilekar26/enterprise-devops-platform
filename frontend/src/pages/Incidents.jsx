import MainLayout from "../layouts/MainLayout";
import StatCard from "../components/StatCard";
import DataTable from "../components/DataTable";

function Incidents() {

    const incidents = [

        [
            "INC-1001",
            "Critical",
            "api-service",
            "PROD",
            "Open"
        ],

        [
            "INC-1002",
            "High",
            "dashboard-service",
            "QA",
            "Investigating"
        ],

        [
            "INC-1003",
            "Medium",
            "auth-service",
            "DEV",
            "Resolved"
        ]

    ];

    return (

        <MainLayout>

            <h1>🚨 Incident Management</h1>

            <p
                style={{
                    marginBottom:"30px",
                    opacity:.7
                }}
            >

                Enterprise Incident Dashboard

            </p>

            <div className="grid">

                <StatCard

                    title="Open"

                    value="2"

                    subtitle="Active Incidents"

                    icon="🚨"

                    color="#ef4444"

                />

                <StatCard

                    title="Resolved"

                    value="15"

                    subtitle="Today"

                    icon="✅"

                    color="#22c55e"

                />

                <StatCard

                    title="Critical"

                    value="1"

                    subtitle="Needs Attention"

                    icon="⚠"

                    color="#f59e0b"

                />

                <StatCard

                    title="MTTR"

                    value="18 min"

                    subtitle="Average Resolution"

                    icon="⏱"

                    color="#2563eb"

                />

            </div>

            <DataTable

                title="Incident List"

                columns={[

                    "Incident ID",

                    "Severity",

                    "Service",

                    "Environment",

                    "Status"

                ]}

                data={incidents}

            />

        </MainLayout>

    );

}

export default Incidents;