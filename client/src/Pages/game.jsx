import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";

export default function GamePage() {
    const [_username, setUsername] = useState("");
    const navigate = useNavigate();
    const storedUsername = localStorage.getItem("username");
    useEffect(() => {
        if (storedUsername) {
            setUsername(storedUsername);
        } else {
            navigate("/");
        }
    }  , []);
    return (
        <div>
            <h1>Jeux Videal idéal : Bienvenu {storedUsername} </h1>
            <p className="game-description"></p>
        </div>



    );
}


