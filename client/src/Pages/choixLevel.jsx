import { useNavigate } from "react-router-dom";
import "../index.css";

export default function ChoixLevelPage() {
    const nav = useNavigate();

    const levels = [
        { id: 1, name: "Novice", difficulty: "Easy", description: "Perfect for beginners", icon: "🟢" },
        { id: 2, name: "Adventurer", difficulty: "Medium", description: "Getting more challenging", icon: "🟡" },
        { id: 3, name: "Champion", difficulty: "Hard", description: "For experienced players", icon: "🔴" },
        { id: 4, name: "Legend", difficulty: "Insane", description: "Ultimate challenge awaits", icon: "💀" },
    ];

    function HandleLevel(levelId) {
        localStorage.setItem("level", levelId);
        nav("/game");
    }

    return (
        <div className="level-container">
            <div className="level-content">
                <div className="level-header">
                    <h1 className="level-title">Select Your Level</h1>
                    <p className="level-subtitle">Choose your challenge and prove your skills!</p>
                </div>

                <div className="levels-grid">
                    {levels.map((level) => (
                        <div key={level.id} className="level-card">
                            <div className="level-card-header">
                                <span className="level-icon">{level.icon}</span>
                                <span className="level-number">Level {level.id}</span>
                            </div>

                            <h3 className="level-name">{level.name}</h3>
                            <p className="level-description">{level.description}</p>

                            <div className="difficulty-badge">
                                <span className={`difficulty ${level.difficulty.toLowerCase()}`}>
                                    {level.difficulty}
                                </span>
                            </div>

                            <button
                                onClick={() => HandleLevel(level.id)}
                                className="level-play-button"
                            >
                                Start Challenge
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}