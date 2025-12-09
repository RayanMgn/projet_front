import { useState } from "react";


export default function HomePage() {
    const [username, setUsername] = useState("");

    function SubmitHandle() {

        if (!username.trim()) {
            alert("Please enter a username");
            return;
        }

        console.log("Submit:", username);
        localStorage.setItem("username", username)
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

            <button onClick={SubmitHandle}>
                Submit
            </button>

            <button>JOUER</button>

            <p>{username}</p>
        </div>
    );
}


