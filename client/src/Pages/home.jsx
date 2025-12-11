import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
    const [username, setUsername] = useState("");
    const nav = useNavigate();

    function PlayHandle() {
        if (!username.trim()) {
            alert("Please enter a username");
            return;
        }

        console.log("Submit:", username);
        localStorage.setItem("username", username)

        console.log("Play:");
        nav("/choix-level");

    }
    return (
        <div>
            <h1>RAYANN GAME</h1>
            <p className="game-description">
            </p>
            <input
                type="text"
                placeholder="Enter name"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <button onClick={PlayHandle}>
                JOUER
            </button>

            <p>{username}</p>
        </div>
    );
}



