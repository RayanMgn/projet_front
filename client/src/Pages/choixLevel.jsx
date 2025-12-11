import { useNavigate } from "react-router-dom";

export default function ChoixLevelPage() {
    const nav = useNavigate(); 

    function HandleLevel(recupLevel) {
        localStorage.setItem("level",recupLevel)
        nav("/game");

    }


    return (
        <>        
        <button onClick={()=> HandleLevel(1)}>
        Niveau 1
        </button>

        <button onClick={()=> HandleLevel(2)}>
        Niveau 2
        </button>

        <button onClick={()=> HandleLevel(3)}>
        Niveau 3
        </button>

        <button onClick={()=> HandleLevel(4)}>
        Niveau 4
        </button>

        
        </>
    );

}