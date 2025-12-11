import { useState, useEffect, use } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function GamePage() {
    const navigate = useNavigate();
    const storedUsername = localStorage.getItem("username");
    const [grid, setGrid] = useState(null);
    const [revealed, setRevealed] = useState([]);
    const [playerPos, setPlayerPos] = useState(null);
    const [ showLevel, setShowLevel ] = useState(false); 
    const [lvl, setLevel] = useState(0);

    // Si pas de pseudo → retour accueil
    useEffect(() => {
        if (!storedUsername) navigate("/");
    }, []);

    // Charger le niveau
    useEffect(() => {
        console.log(localStorage.getItem ("level"))
        setLevel(localStorage.getItem("level"));
        console.log(lvl)

        
        axios
            .get(`http://localhost:4000/api/levels/${localStorage.getItem("level")}`)
            .then((res) => {
                const lvl = res.data;

                setLevel(lvl);
                setGrid(lvl.grid);
                setPlayerPos(lvl.start);

                const init = Array(lvl.rows)
                    .fill(null)
                    .map(() => Array(lvl.cols).fill(false));

                init[lvl.start.row][lvl.start.col] = true; 
                setRevealed(init);
            })
            .catch((err) => console.error("Erreur API :", err));
    }, []);

    function isAdjacent(r, c) {
        const dr = Math.abs(r - playerPos.row);
        const dc = Math.abs(c - playerPos.col);
        return dr + dc === 1;
    }

    function revealTile(r, c) {
        if (!isAdjacent(r, c)) return;

        const newRev = [...revealed];
        newRev[r][c] = true;
        setRevealed(newRev);

        
        if (grid[r][c] !== "W") {
            setPlayerPos({ row: r, col: c });
        }
    }

    function renderTile(cell, r, c) {
        const isRevealed = revealed?.[r]?.[c];
        const isPlayer = playerPos?.row === r && playerPos?.col === c;

        let bg = "#222";

        if (isRevealed) {
            if (cell === "W") bg = "#18c7d7ff";
            else if (cell === "S") bg = "#4caf50";
            else if (cell === "E") bg = "#f44336"; 
            else if (cell === "M:goblin") bg = "#f436b8ff"
            else if (cell === "K:red") bg = "#04ffbcff"
            else if (cell === "K:red") bg = "#04ffbcff"
            else bg = "#ddd"; 
        }

        return (

            <button
                key={c}
                onClick={() => revealTile(r, c)}
                style={{
                    width: 40,
                    height: 40,
                    border: "1px solid #ff0000ff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: bg,
                    cursor: "pointer",
                    fontSize: "20px",
                }}
            >
                {isPlayer ? "👤" : ""}
            </button>
            
        );
        
    }

    // Affichage de la grille
    function renderGrid() {
        if (!grid) return <p>Chargement de la grille...</p>;

        return (
            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: `repeat(${lvl.cols}, 40px)`,
                    gap: "2px",
                    marginTop: "20px",
                }}
            >
                {grid.map((row, r) =>
                    row.map((cell, c) => renderTile(cell, r, c))
                )}
            </div>
        );
    }

    return (
        <>
            <h1>Labyrinthe - Bienvenue {storedUsername}</h1>

            <h2>Grille :</h2>
            {renderGrid()}
        </>
    );
}
