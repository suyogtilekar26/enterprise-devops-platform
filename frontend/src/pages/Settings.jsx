import MainLayout from "../layouts/MainLayout";

function Settings() {

    return (

        <MainLayout>

            <h1>⚙ Platform Settings</h1>

            <p
                style={{
                    marginBottom:"30px",
                    opacity:.7
                }}
            >
                Enterprise DevOps Configuration
            </p>

            <div className="grid">

                <div className="box">

                    <h3>🌍 Default Environment</h3>

                    <br/>

                    <select
                        style={{
                            width:"100%",
                            padding:"12px",
                            borderRadius:"10px"
                        }}
                    >
                        <option>DEV</option>
                        <option>QA</option>
                        <option>UAT</option>
                        <option>PROD</option>
                    </select>

                </div>

                <div className="box">

                    <h3>🐳 Docker Registry</h3>

                    <br/>

                    <input
                        type="text"
                        value="docker.io/company"
                        readOnly
                    />

                </div>

                <div className="box">

                    <h3>🚀 GitHub Repository</h3>

                    <br/>

                    <input
                        type="text"
                        value="enterprise-devops-platform"
                        readOnly
                    />

                </div>

                <div className="box">

                    <h3>☸ Kubernetes Cluster</h3>

                    <br/>

                    <input
                        type="text"
                        value="dev-cluster"
                        readOnly
                    />

                </div>

                <div className="box">

                    <h3>📊 Prometheus</h3>

                    <br/>

                    <input
                        type="text"
                        value="Connected"
                        readOnly
                    />

                </div>

                <div className="box">

                    <h3>📈 Grafana</h3>

                    <br/>

                    <input
                        type="text"
                        value="Healthy"
                        readOnly
                    />

                </div>

            </div>

        </MainLayout>

    );

}

export default Settings;