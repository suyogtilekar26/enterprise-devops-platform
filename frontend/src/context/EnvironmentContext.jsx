import { createContext, useContext, useState } from "react";

const EnvironmentContext = createContext();

export function EnvironmentProvider({ children }) {

    const [environment, setEnvironment] = useState(

        localStorage.getItem("environment") || "DEV"

    );

    const changeEnvironment = (env) => {

        localStorage.setItem("environment", env);

        setEnvironment(env);

    };

    return (

        <EnvironmentContext.Provider

            value={{

                environment,

                changeEnvironment

            }}

        >

            {children}

        </EnvironmentContext.Provider>

    );

}

export function useEnvironment(){

    return useContext(EnvironmentContext);

}