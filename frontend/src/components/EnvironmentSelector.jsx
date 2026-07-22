import { useEnvironment } from "../context/EnvironmentContext";

function EnvironmentSelector(){

const {

environment,

changeEnvironment

}=useEnvironment();

return(

<select

className="env-dropdown"

value={environment}

onChange={(e)=>changeEnvironment(e.target.value)}

>

<option value="DEV">

🟢 DEV

</option>

<option value="QA">

🟡 QA

</option>

<option value="UAT">

🟠 UAT

</option>

<option value="PROD">

🔴 PROD

</option>

</select>

);

}

export default EnvironmentSelector;