import {
FaUser,
FaCog,
FaSignOutAlt,
FaKey,
FaFileDownload
} from "react-icons/fa";

import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import { useRole } from "../context/RoleContext";

function ProfileDropdown({ open }) {

    const navigate = useNavigate();

    const { logout } = useAuth();

    const { role } = useRole();

    if (!open) return null;

    const handleLogout = () => {

        logout();

        navigate("/");

    };

    return (

        <div className="profile-dropdown">

            <div className="profile-header">

                <h3>

                    Suyog Tilekar

                </h3>

                <p>

                    {role}

                </p>

            </div>

            <button>

                <FaUser />

                My Profile

            </button>

            <button>

                <FaCog />

                Settings

            </button>

            <button>

                <FaKey />

                Change Password

            </button>

            <button>

                <FaFileDownload />

                Export Report

            </button>

            <button

                className="logout-btn"

                onClick={handleLogout}

            >

                <FaSignOutAlt />

                Logout

            </button>

        </div>

    );

}

export default ProfileDropdown;