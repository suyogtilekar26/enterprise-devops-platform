import MainLayout from "../layouts/MainLayout";
import StatCard from "../components/StatCard";

function Runbooks() {

    const runbooks = [

        {
            title: "Docker",
            description: "Container build, image push, cleanup & troubleshooting.",
            icon: "🐳",
            color: "#2563eb"
        },

        {
            title: "Kubernetes",
            description: "Pods, deployments, services, ingress & rollback.",
            icon: "☸",
            color: "#9333ea"
        },

        {
            title: "GitHub Actions",
            description: "CI/CD workflow failures and recovery steps.",
            icon: "🚀",
            color: "#22c55e"
        },

        {
            title: "AWS",
            description: "EC2, IAM, ECR, ECS & networking operations.",
            icon: "☁️",
            color: "#f59e0b"
        },

        {
            title: "Monitoring",
            description: "Prometheus, Grafana alerts & health checks.",
            icon: "📊",
            color: "#0ea5e9"
        },

        {
            title: "Networking",
            description: "DNS, Load Balancer, Ingress & Firewall troubleshooting.",
            icon: "🌐",
            color: "#ef4444"
        }

    ];

    return (

        <MainLayout>

            <h1>📘 DevOps Runbooks</h1>

            <p
                style={{
                    marginBottom: "30px",
                    opacity: .7
                }}
            >

                Standard Operating Procedures & Troubleshooting Guides

            </p>

            <div className="grid">

                {

                    runbooks.map((book,index)=>(

                        <StatCard

                            key={index}

                            title={book.title}

                            value={book.icon}

                            subtitle={book.description}

                            icon={book.icon}

                            color={book.color}

                        />

                    ))

                }

            </div>

        </MainLayout>

    );

}

export default Runbooks;