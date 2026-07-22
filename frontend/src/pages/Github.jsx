import MainLayout from "../layouts/MainLayout";

function Github() {

  const workflows = [
    {
      workflow: "CI Pipeline",
      branch: "main",
      status: "Success",
      duration: "2m 14s",
      commit: "a82fd31"
    },
    {
      workflow: "Docker Build",
      branch: "develop",
      status: "Running",
      duration: "1m 08s",
      commit: "bc214ef"
    },
    {
      workflow: "Deploy Kubernetes",
      branch: "main",
      status: "Queued",
      duration: "--",
      commit: "91ad22f"
    }
  ];

  return (

    <MainLayout>

      <h1>🚀 GitHub Actions</h1>

      <p
        style={{
          marginBottom: "30px",
          opacity: .7
        }}
      >
        Enterprise CI/CD Dashboard
      </p>

      <div className="grid">

        <div className="box">

          <h2>✅ Success</h2>

          <h1>15</h1>

          <p>Successful Builds</p>

        </div>

        <div className="box">

          <h2>🏃 Running</h2>

          <h1>1</h1>

          <p>Active Workflow</p>

        </div>

        <div className="box">

          <h2>📦 Artifacts</h2>

          <h1>18</h1>

          <p>Available</p>

        </div>

        <div className="box">

          <h2>🖥 Runner</h2>

          <h1>Ubuntu</h1>

          <p>Self Hosted</p>

        </div>

      </div>

      <br/>
      <br/>

      <div className="box">

        <h2>

          Workflow History

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

              <th align="left">Workflow</th>

              <th>Branch</th>

              <th>Status</th>

              <th>Duration</th>

              <th>Commit</th>

            </tr>

          </thead>

          <tbody>

            {

              workflows.map((workflow,index)=>(

                <tr key={index}>

                  <td>{workflow.workflow}</td>

                  <td>{workflow.branch}</td>

                  <td
                    style={{
                      color:
                      workflow.status==="Success"
                      ? "#22c55e"
                      : workflow.status==="Running"
                      ? "#facc15"
                      : "#94a3b8"
                    }}
                  >
                    {workflow.status}
                  </td>

                  <td>{workflow.duration}</td>

                  <td>{workflow.commit}</td>

                </tr>

              ))

            }

          </tbody>

        </table>

      </div>

      <br/>

      <div className="grid">

        <div className="box">

          <h3>Latest Build</h3>

          <br/>

          Build #125

        </div>

        <div className="box">

          <h3>Branch</h3>

          <br/>

          main

        </div>

        <div className="box">

          <h3>Last Deployment</h3>

          <br/>

          5 Minutes Ago

        </div>

      </div>

    </MainLayout>

  );

}

export default Github;