import MainLayout from "../layouts/MainLayout";

function Docker() {

  const containers = [
    {
      name: "auth-service",
      status: "Running",
      image: "auth:v1.0.0",
      port: "5001"
    },
    {
      name: "dashboard-service",
      status: "Running",
      image: "dashboard:v1.0.0",
      port: "5002"
    },
    {
      name: "api-service",
      status: "Running",
      image: "api:v1.0.0",
      port: "5003"
    }
  ];

  return (

    <MainLayout>

      <h1>🐳 Docker Management</h1>

      <p
        style={{
          marginBottom: "30px",
          opacity: .7
        }}
      >

        Enterprise Container Platform

      </p>

      <div className="grid">

        <div className="box">

          <h2>📦 Images</h2>

          <h1>3</h1>

          <p>Available Images</p>

        </div>

        <div className="box">

          <h2>🚀 Running</h2>

          <h1>3</h1>

          <p>Containers</p>

        </div>

        <div className="box">

          <h2>💾 Volumes</h2>

          <h1>2</h1>

          <p>Persistent Storage</p>

        </div>

        <div className="box">

          <h2>🌐 Networks</h2>

          <h1>1</h1>

          <p>Bridge Network</p>

        </div>

      </div>

      <br />
      <br />

      <div className="box">

        <h2>

          Running Containers

        </h2>

        <br />

        <table
          style={{
            width: "100%",
            borderCollapse: "collapse"
          }}
        >

          <thead>

            <tr>

              <th align="left">Container</th>

              <th>Status</th>

              <th>Image</th>

              <th>Port</th>

            </tr>

          </thead>

          <tbody>

            {

              containers.map((container,index)=>(

                <tr key={index}>

                  <td>

                    {container.name}

                  </td>

                  <td
                    style={{
                      color:"#22c55e"
                    }}
                  >

                    {container.status}

                  </td>

                  <td>

                    {container.image}

                  </td>

                  <td>

                    {container.port}

                  </td>

                </tr>

              ))

            }

          </tbody>

        </table>

      </div>

      <br />

      <div className="grid">

        <div className="box">

          <h3>

            Latest Image

          </h3>

          <br />

          enterprise-devops-platform:v1.0.0

        </div>

        <div className="box">

          <h3>

            Registry

          </h3>

          <br />

          Docker Hub

        </div>

        <div className="box">

          <h3>

            Last Build

          </h3>

          <br />

          2 Minutes Ago

        </div>

      </div>

    </MainLayout>

  );

}

export default Docker;