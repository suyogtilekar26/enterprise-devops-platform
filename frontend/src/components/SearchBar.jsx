import { FaSearch } from "react-icons/fa";
import { useState } from "react";

function SearchBar() {

    const [search, setSearch] = useState("");

    return (

        <div className="search-container">

            <FaSearch className="search-icon"/>

            <input

                type="text"

                placeholder="Search deployments, pods, containers..."

                value={search}

                onChange={(e)=>setSearch(e.target.value)}

                className="search-input"

            />

        </div>

    );

}

export default SearchBar;