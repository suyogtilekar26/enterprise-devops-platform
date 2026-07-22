import { motion } from "framer-motion";

function StatCard({

    title,
    value,
    subtitle,
    icon,
    color = "#3b82f6"

}) {

    return (

        <motion.div
            className="stat-card"
            whileHover={{
                scale: 1.04,
                y: -8
            }}
        >

            <div
                className="stat-icon"
                style={{
                    background: color
                }}
            >

                {icon}

            </div>

            <div className="stat-content">

                <h3>

                    {title}

                </h3>

                <h1>

                    {value}

                </h1>

                <p>

                    {subtitle}

                </p>

            </div>

        </motion.div>

    );

}

export default StatCard;