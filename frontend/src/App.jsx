import { Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Docker from "./pages/Docker";
import Github from "./pages/Github";
import Kubernetes from "./pages/Kubernetes";
import Monitoring from "./pages/Monitoring";
import Incidents from "./pages/Incidents";
import Runbooks from "./pages/Runbooks";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

import ProtectedRoute from "./components/ProtectedRoute";

function App() {

    return (

        <Routes>

            {/* Public */}

            <Route
                path="/"
                element={<Login />}
            />

            <Route
                path="/login"
                element={<Login />}
            />

            {/* Protected */}

            <Route

                path="/dashboard"

                element={

                    <ProtectedRoute>

                        <Dashboard/>

                    </ProtectedRoute>

                }

            />

            <Route

                path="/docker"

                element={

                    <ProtectedRoute>

                        <Docker/>

                    </ProtectedRoute>

                }

            />

            <Route

                path="/github"

                element={

                    <ProtectedRoute>

                        <Github/>

                    </ProtectedRoute>

                }

            />

            <Route

                path="/kubernetes"

                element={

                    <ProtectedRoute>

                        <Kubernetes/>

                    </ProtectedRoute>

                }

            />

            <Route

                path="/monitoring"

                element={

                    <ProtectedRoute>

                        <Monitoring/>

                    </ProtectedRoute>

                }

            />

            <Route

                path="/incidents"

                element={

                    <ProtectedRoute>

                        <Incidents/>

                    </ProtectedRoute>

                }

            />

            <Route

                path="/runbooks"

                element={

                    <ProtectedRoute>

                        <Runbooks/>

                    </ProtectedRoute>

                }

            />

            <Route

                path="/settings"

                element={

                    <ProtectedRoute>

                        <Settings/>

                    </ProtectedRoute>

                }

            />

            {/* Future Pages */}

            <Route

                path="*"

                element={<NotFound/>}

            />

        </Routes>

    );

}

export default App;