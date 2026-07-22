import { Link, useLocation } from "react-router-dom";
import {
FaHome,
FaDocker,
FaGithub,
FaServer,
FaChartLine,
FaBook,
FaExclamationTriangle,
FaCog,
FaSignOutAlt
} from "react-icons/fa";

function Sidebar(){

const location=useLocation();

const menu=[

{title:"Dashboard",icon:<FaHome/>,path:"/dashboard"},
{title:"Docker",icon:<FaDocker/>,path:"/docker"},
{title:"GitHub Actions",icon:<FaGithub/>,path:"/github"},
{title:"Kubernetes",icon:<FaServer/>,path:"/kubernetes"},
{title:"Monitoring",icon:<FaChartLine/>,path:"/monitoring"},
{title:"Incidents",icon:<FaExclamationTriangle/>,path:"/incidents"},
{title:"Runbooks",icon:<FaBook/>,path:"/runbooks"},
{title:"Settings",icon:<FaCog/>,path:"/settings"}

];

return(

<div className="sidebar">

<div className="logo">

<h2>🚀 EDMP</h2>

<p>Enterprise DevOps Portal</p>

</div>

<div className="sidebar-user">

<h4>Suyog Tilekar</h4>

<span>Senior DevOps Engineer</span>

</div>

<nav>

{

menu.map((item)=>(

<Link
key={item.path}
to={item.path}
className={
location.pathname===item.path
?
"sidebar-link active"
:
"sidebar-link"
}
>

<span className="icon">

{item.icon}

</span>

<span>

{item.title}

</span>

</Link>

))

}

</nav>

<div className="logout-section">

<Link
to="/"
className="sidebar-link logout"
>

<FaSignOutAlt/>

<span>

Logout

</span>

</Link>

</div>

</div>

);

}

export default Sidebar;