import { useRole } from "../context/RoleContext";

function RoleSelector(){

const {role,changeRole}=useRole();

return(

<select

className="env-dropdown"

value={role}

onChange={(e)=>changeRole(e.target.value)}

>

<option>

Admin

</option>

<option>

DevOps Engineer

</option>

<option>

Developer

</option>

</select>

);

}

export default RoleSelector;