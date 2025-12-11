import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../index.css";

export default function HomePage() {
    const [username, setUsername] = useState("");
    const [error, setError] = useState("");
    const nav = useNavigate();

    function PlayHandle() {
        if (!username.trim()) {
            setError("Please enter a username");
            return;
        }
        if (username.length < 3) {
            setError("Username must be at least 3 characters");
            return;
        }

        localStorage.setItem("username", username);
        nav("/choix-level");
    }

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            PlayHandle();
        }
    };

    return (
        <div className="home-container">
            <div className="home-content">
                <div className="game-header">
                    <h1 className="game-title"><i class="fa-solid fa-gamepad"></i> RAYANN GAME</h1>
                    <div className="title-underline"></div>
                </div>

                <p className="game-description">
                    Explore mysterious labyrinths, discover hidden treasures, and master challenging levels!
                </p>

                <div className="form-container">
                    <div className="form-group">
                        <label htmlFor="username">Enter Your Name</label>
                        <input
                            id="username"
                            type="text"
                            placeholder="Your username..."
                            value={username}
                            onChange={(e) => {
                                setUsername(e.target.value);
                                setError("");
                            }}
                            onKeyPress={handleKeyPress}
                            className="username-input"
                        />
                        {error && <span className="error-message">{error}</span>}
                    </div>

                    <button onClick={PlayHandle} className="play-button">
                        <span>PLAY NOW</span>
                        <i class="fa-solid fa-play"></i>



                    </button>
                </div>
            </div>
        </div>
    );
}



