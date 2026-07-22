import { Link } from "react-router-dom";

function NotFound(){

return(

<div className="loading-container">

<h1
style={{
fontSize:"120px"
}}
>

404

</h1>

<h2>

Page Not Found

</h2>

<p>

The page you are looking for doesn't exist.

</p>

<br/>

<Link

to="/dashboard"

>

<button>

Go To Dashboard

</button>

</Link>

</div>

);

}

export default NotFound;