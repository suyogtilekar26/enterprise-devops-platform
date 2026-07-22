import { createContext, useContext, useState } from "react";

const RoleContext = createContext();

export function RoleProvider({ children }) {

    const [role, setRole] = useState(

        localStorage.getItem("role") || "DevOps Engineer"

    );

    const changeRole = (newRole) => {

        localStorage.setItem("role", newRole);

        setRole(newRole);

    };

    return (

        <RoleContext.Provider

            value={{

                role,

                changeRole

            }}

        >

            {children}

        </RoleContext.Provider>

    );

}

export function useRole(){

    return useContext(RoleContext);

}