import MainLayout from "../layouts/MainLayout";

function Kubernetes() {

  const deployments = [
    {
      name: "auth-service",
      replicas: "2/2",
      status: "Running",
      namespace: "dev"
    },
    {
      name: "dashboard-service",
      replicas: "2/2",
      status: "Running",
      namespace: "dev"
    },
    {
      name: "api-service",
      replicas: "1/1",
      status: "Running",
      namespace: "dev"
    }
  ];

  return (

    <MainLayout>

      <h1>☸ Kubernetes Dashboard</h1>

      <p
        style={{
          marginBottom:"30px",
          opacity:.7
        }}
      >
        Enterprise Kubernetes Cluster
      </p>

      <div className="grid">

        <div className="box">

          <h2>🖥 Nodes</h2>

          <h1>3</h1>

          <p>Healthy</p>

        </div>

        <div className="box">

          <h2>📦 Pods</h2>

          <h1>12</h1>

          <p>Running</p>

        </div>

        <div className="box">

          <h2>🚀 Deployments</h2>

          <h1>5</h1>

          <p>Available</p>

        </div>

        <div className="box">

          <h2>🌐 Services</h2>

          <h1>4</h1>

          <p>ClusterIP</p>

        </div>

      </div>

      <br/>
      <br/>

      <div className="box">

        <h2>

          Deployments

        </h2>

        <br/>

        <table
          style={{
            width:"100%",
            borderCollapse:"collapse"
          }}
        >

          <thead>

            <tr>

              <th align="left">Deployment</th>

              <th>Replicas</th>

              <th>Status</th>

              <th>Namespace</th>

            </tr>

          </thead>

          <tbody>

            {

              deployments.map((item,index)=>(

                <tr key={index}>

                  <td>{item.name}</td>

                  <td>{item.replicas}</td>

                  <td
                    style={{
                      color:"#22c55e"
                    }}
                  >
                    {item.status}
                  </td>

                  <td>{item.namespace}</td>

                </tr>

              ))

            }

          </tbody>

        </table>

      </div>

      <br/>

      <div className="grid">

        <div className="box">

          <h3>

            Ingress

          </h3>

          <br/>

          Active

        </div>

        <div className="box">

          <h3>

            ConfigMaps

          </h3>

          <br/>

          8

        </div>

        <div className="box">

          <h3>

            Secrets

          </h3>

          <br/>

          5

        </div>

      </div>

    </MainLayout>

  );

}

export default Kubernetes;