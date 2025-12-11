import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../index.css";


export default function GamePage() {
    const navigate = useNavigate();
    const storedUsername = localStorage.getItem("username");
    const [grid, setGrid] = useState(null);
    const [revealed, setRevealed] = useState([]);
    const [playerPos, setPlayerPos] = useState(null);
    const [lvl, setLevel] = useState(null);
    const [score, setScore] = useState(0);
    const [moves, setMoves] = useState(0);
    const [gameWon, setGameWon] = useState(false);

    useEffect(() => {
        if (!storedUsername) navigate("/");
    }, []);

    useEffect(() => {
        const levelId = localStorage.getItem("level");
        axios
            .get(`http://localhost:4000/api/levels/${levelId}`)
            .then((res) => {
                const levelData = res.data;
                setLevel(levelData);
                setGrid(levelData.grid);
                setPlayerPos(levelData.start);

                const init = Array(levelData.rows)
                    .fill(null)
                    .map(() => Array(levelData.cols).fill(false));
                init[levelData.start.row][levelData.start.col] = true;
                setRevealed(init);
            })
            .catch((err) => console.error("API Error:", err));
    }, []);

    function isAdjacent(r, c) {
        if (!playerPos) return false;
        const dr = Math.abs(r - playerPos.row);
        const dc = Math.abs(c - playerPos.col);
        return dr + dc === 1;
    }

    function revealTile(r, c) {
    if (!isAdjacent(r, c)) return;

    const newRev = [...revealed];
    newRev[r][c] = true; 
    setRevealed(newRev);
    setMoves(moves + 1);

    const cell = grid[r][c];


        if (cell === "W") {
        }
        else if (cell === "E") {
            setGameWon(true);
            setScore(score + 1000 - moves * 10);
        }

        else if (cell === "K:red") {
            setScore(score + 100);
            setPlayerPos({ row: r, col: c });
        }

        else if (cell === "D:red") {
            if (inventory.has("K:red")) {
                setPlayerPos({ row: r, col: c });
                setScore(score + 10); 
            } else {
                
            }
        }

        else if (cell === "O:rock") {
            if (inventory.has("I:pickaxe")) {
                setScore(score + 50);
                setPlayerPos({ row: r, col: c });
            } else {
                
            }
        }

        else if (cell === "O:fire") {
            if (inventory.has("I:water_bucket")) {
                setScore(score + 30); 
                setPlayerPos({ row: r, col: c });
            } else {
                setScore(Math.max(0, score - 100)); 
                setPlayerPos({ row: r, col: c });
            }
        }

        else if (cell === "O:water") {
            if (inventory.has("I:swim_boots")) {
                setScore(score + 20);
                setPlayerPos({ row: r, col: c });
            } else {
            }
        }

        else if (cell === "I:pickaxe") {
            setScore(score + 75);
            setPlayerPos({ row: r, col: c });
        }

        else if (cell === "I:swim_boots") {
            setScore(score + 75);
            setPlayerPos({ row: r, col: c });
        }

        else if (cell === "I:water_bucket") {
            setScore(score + 75);
            setPlayerPos({ row: r, col: c });
        }

        else if (cell === "M:goblin") {
            setScore(Math.max(0, score - 50));
            setPlayerPos({ row: r, col: c });
        }

        else if (cell === "M:slime") {
            setScore(Math.max(0, score - 30));
            setPlayerPos({ row: r, col: c });
        }

        else if (cell === "M:orc") {
            setScore(Math.max(0, score - 100));
            setPlayerPos({ row: r, col: c });
        }

        else {
            setPlayerPos({ row: r, col: c });
        }
    }

    function getTileDisplay(cell) {
        if (cell === "W") return "🧱";
        if (cell === "S") return "🟢";
        if (cell === "E") return "🏁";
        if (cell === "K:red") return "🔑";
        if (cell?.startsWith("M:")) return "👹";
        return "·";
    }

    function renderTile(cell, r, c) {
        const isRevealed = revealed?.[r]?.[c];
        const isPlayer = playerPos?.row === r && playerPos?.col === c;

        let bg = "#2a2a2a";
        let display = "?";

        if (isRevealed) {
            display = getTileDisplay(cell);
            if (cell === "W") bg = "#18c7d7";
            else if (cell === "S") bg = "#4caf50";
            else if (cell === "E") bg = "#f44336";
            else if (cell === "M:goblin") bg = "#ff5722";
            else if (cell === "K:red") bg = "#ffc107";
            else if (cell === "D:red") bg = "#4d07ffff"
            else bg = "#555";
        }

        return (
            <button
                key={c}
                onClick={() => revealTile(r, c)}
                className="game-tile"
                style={{
                    backgroundColor: bg,
                    borderColor: isPlayer ? "#00ff00" : "#444",
                }}
                title={isRevealed ? cell : "Unrevealed"}
            >
                {isPlayer ? "👤" : display}
            </button>
        );
    }

    function renderGrid() {
        if (!grid || !lvl) return <div className="loading">Loading maze...</div>;

        return (
            <div
                className="game-grid"
                style={{
                    gridTemplateColumns: `repeat(${lvl.cols}, 1fr)`,
                }}
            >
                {grid.map((row, r) =>
                    row.map((cell, c) => renderTile(cell, r, c))
                )}
            </div>
        );
    }

    return (
        <div className="game-container">
            <div className="game-hud">
                <div className="hud-item">
                    <span className="hud-label">Player</span>
                    <span className="hud-value">{storedUsername}</span>
                </div>
                <div className="hud-item">
                    <span className="hud-label">Level</span>
                    <span className="hud-value">{localStorage.getItem("level")}</span>
                </div>
                <div className="hud-item">
                    <span className="hud-label">Score</span>
                    <span className="hud-value highlight">{score}</span>
                </div>
                <div className="hud-item">
                    <span className="hud-label">Moves</span>
                    <span className="hud-value">{moves}</span>
                </div>
            </div>

            <div className="game-main">
                <h1 className="game-title"><i class="fa-solid fa-gamepad"></i> Maze Challenge</h1>
                {gameWon && (
                    <div className="win-message">
                        <h2><i class="fa-solid fa-award"></i> Level Complete!</h2>
                        <p>Score: {score}</p>
                        <button onClick={() => navigate("/choix-level")} className="continue-button">
                            Next Level
                        </button>
                    </div>
                )}
                {renderGrid()}
            </div>

            <div className="game-controls">
                <div className="controls-info">
                    <p>Click adjacent tiles to move</p>
                    <p>🟢 Start | 🏁 End | 🔑 Key | 👹 Monster | 🧱 Wall</p>
                </div>
                <button onClick={() => navigate("/choix-level")} className="exit-button">
                    ← Back to Levels
                </button>
            </div>
        </div>
    );
}
