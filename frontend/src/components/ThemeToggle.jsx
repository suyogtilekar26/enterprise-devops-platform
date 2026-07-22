import { FaMoon, FaSun } from "react-icons/fa";
import { useTheme } from "../context/ThemeContext";

function ThemeToggle(){

const {theme,toggleTheme}=useTheme();

return(

<button

className="notification"

onClick={toggleTheme}

>

{

theme==="dark"

?

<FaSun/>

:

<FaMoon/>

}

</button>

);

}

export default ThemeToggle;