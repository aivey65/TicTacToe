import { useState } from "react";

export default function Player({name, symbol, isActive}) {
    const [isEditing, setIsEditing] = useState(false);
    const [playerName, setPlayerName] = useState(name);

    function toggleIsEditing() {
        setIsEditing((editing) => !editing);
    }

    function updatePlayerName(event) {
        setPlayerName(event.target.value);
    }

    return (
        <li className={ isActive ? "active" : ""}>
            <span className="player">
                { isEditing ?
                    <input type="text" defaultValue={playerName} onChange={updatePlayerName} required></input>
                    :
                    <span className="player-name">{playerName}</span>
                }
                <span className="player-symbol">{symbol}</span>
            </span>
            <button onClick={toggleIsEditing}>
                { isEditing ? "Save" : "Edit" }
            </button>
        </li>
    )
}