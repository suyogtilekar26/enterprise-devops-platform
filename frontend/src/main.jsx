import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App";

import "./styles/login.css";

import { AuthProvider } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";
import { RoleProvider } from "./context/RoleContext";
import { EnvironmentProvider } from "./context/EnvironmentContext";

ReactDOM.createRoot(document.getElementById("root")).render(

<React.StrictMode>

<BrowserRouter>

<ThemeProvider>

<RoleProvider>

<EnvironmentProvider>

<AuthProvider>

<App/>

</AuthProvider>

</EnvironmentProvider>

</RoleProvider>

</ThemeProvider>

</BrowserRouter>

</React.StrictMode>

);