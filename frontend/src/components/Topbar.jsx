import { FaBell, FaUserCircle } from "react-icons/fa";
import { useState } from "react";

import SearchBar from "./SearchBar";
import NotificationPanel from "./NotificationPanel";
import ProfileDropdown from "./ProfileDropdown";
import ThemeToggle from "./ThemeToggle";
import RoleSelector from "./RoleSelector";
import EnvironmentSelector from "./EnvironmentSelector";

function Topbar() {

    const username = localStorage.getItem("username") || "Suyog";

    const [showNotifications, setShowNotifications] = useState(false);
    const [showProfile, setShowProfile] = useState(false);

    return (

        <div className="topbar">

            <div>

                <h2>

                    🚀 Enterprise DevOps Management Portal

                </h2>

                <p>

                    Production Enterprise Platform

                </p>

            </div>

            <div className="top-right">

                <SearchBar />

                <EnvironmentSelector />

                <RoleSelector />

                <button

                    className="notification"

                    onClick={() =>
                        setShowNotifications(!showNotifications)
                    }

                >

                    <FaBell />

                </button>

                <ThemeToggle />

                <div

                    className="profile-box"

                    onClick={() =>
                        setShowProfile(!showProfile)
                    }

                    style={{
                        cursor: "pointer"
                    }}

                >

                    <FaUserCircle

                        size={42}

                    />

                    <div>

                        <b>

                            {username}

                        </b>

                        <p>

                            Senior DevOps Engineer

                        </p>

                    </div>

                </div>

            </div>

            <NotificationPanel

                open={showNotifications}

                onClose={() =>
                    setShowNotifications(false)
                }

            />

            <ProfileDropdown

                open={showProfile}

                onClose={() =>
                    setShowProfile(false)
                }

            />

        </div>

    );

}

export default Topbar;