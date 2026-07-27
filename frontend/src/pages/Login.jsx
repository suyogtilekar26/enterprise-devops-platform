import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { useAuth } from "../context/useAuth";

function Login() {

    const navigate = useNavigate();

    const { login } = useAuth();

    const [environment, setEnvironment] = useState("DEV");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleLogin = async () => {

        if (username.trim() === "") {
            setError("Enter Username");
            return;
        }

        if (password.trim() === "") {
            setError("Enter Password");
            return;
        }

        setLoading(true);
        setError("");

        try {

            const response = await api.post("/auth/login", {

                username,

                password,

                environment

            });

            localStorage.setItem("token", response.data.token);

            login(response.data.user.username);

            localStorage.setItem(
                "user",
                JSON.stringify(response.data.user)
            );

            localStorage.setItem(
                "environment",
                response.data.user.environment
            );

            navigate("/dashboard");

        }

        catch (err) {

            if (err.response) {

                setError(err.response.data.message);

            }

            else {

                setError("Unable to connect to Auth Service.");

            }

        }

        finally {

            setLoading(false);

        }

    };

    return (

        <div className="bg">

            <div className="login-card">

                <h1>

                    🚀 Enterprise DevOps Portal

                </h1>

                <p className="subtitle">

                    Production Grade DevOps Management Platform

                </p>

                {

                    error &&

                    <p
                        style={{
                            color: "#ff4d4f",
                            marginBottom: "15px",
                            fontWeight: "600"
                        }}
                    >

                        {error}

                    </p>

                }

                <input

                    type="text"

                    placeholder="Username"

                    value={username}

                    onChange={(e) =>
                        setUsername(e.target.value)
                    }

                />

                <input

                    type="password"

                    placeholder="Password"

                    value={password}

                    onChange={(e) =>
                        setPassword(e.target.value)
                    }

                />

                <select

                    value={environment}

                    onChange={(e) =>
                        setEnvironment(e.target.value)
                    }

                >

                    <option value="DEV">DEV</option>

                    <option value="QA">QA</option>

                    <option value="UAT">UAT</option>

                    <option value="PROD">PROD</option>

                </select>

                <label className="remember">

                    <input type="checkbox"/>

                    Remember Me

                </label>

                <button

                    onClick={handleLogin}

                    disabled={loading}

                >

                    {

                        loading

                        ?

                        "Signing In..."

                        :

                        "SIGN IN"

                    }

                </button>

                <p className="forgot">

                    Forgot Password?

                </p>

                <div className="footer">

                    <p>

                        Version 1.0.0

                    </p>

                    <p>

                        Developed by

                        <b>

                            {" "}Suyog Tilekar ❤️

                        </b>

                    </p>

                </div>

            </div>

        </div>

    );

}

export default Login;
