import { FaTimes } from "react-icons/fa";

function NotificationPanel({ open, onClose }) {

    if (!open) return null;

    const notifications = [

        {
            title: "GitHub Actions",
            message: "CI Pipeline completed successfully.",
            status: "success"
        },

        {
            title: "Docker",
            message: "New image pushed to Docker Hub.",
            status: "info"
        },

        {
            title: "Kubernetes",
            message: "api-service restarted successfully.",
            status: "warning"
        },

        {
            title: "Monitoring",
            message: "CPU usage exceeded 80%.",
            status: "danger"
        }

    ];

    return (

        <div className="notification-panel">

            <div className="notification-header">

                <h3>Notifications</h3>

                <button onClick={onClose}>

                    <FaTimes/>

                </button>

            </div>

            {

                notifications.map((item,index)=>(

                    <div
                        key={index}
                        className={`notification-item ${item.status}`}
                    >

                        <h4>{item.title}</h4>

                        <p>{item.message}</p>

                    </div>

                ))

            }

        </div>

    );

}

export default NotificationPanel;