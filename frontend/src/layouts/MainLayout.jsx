import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

function MainLayout({ children }) {
  return (
    <div className="layout">

      <Sidebar />

      <div className="content">

        <Topbar />

        {children}

      </div>

    </div>
  );
}

export default MainLayout;