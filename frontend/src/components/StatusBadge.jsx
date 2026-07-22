function StatusBadge({ status }) {

    const getColor = () => {

        switch (status.toLowerCase()) {

            case "running":
            case "healthy":
            case "success":
            case "active":
            case "completed":
                return "#22c55e";

            case "building":
            case "deploying":
            case "pending":
            case "warning":
                return "#f59e0b";

            case "failed":
            case "error":
            case "critical":
            case "stopped":
                return "#ef4444";

            default:
                return "#64748b";
        }

    };

    return (

        <span
            className="status-badge"
            style={{
                background: getColor()
            }}
        >

            {status}

        </span>

    );

}

export default StatusBadge;