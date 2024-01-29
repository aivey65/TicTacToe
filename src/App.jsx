import { useState } from "react";
import Player from "./Components/Player.jsx";
import GameBoard from "./components/GameBoard.jsx";
import Log from "./components/Log.jsx";

function App() {
  const [turnData, setTurnData] = useState([]);
  const [activePlayer, setActivePlayer] = useState("X");

  function handleSelectSquare(rowIndex, colIndex) {
    setActivePlayer((currentActivePlayer) => currentActivePlayer == "X" ? "O" : "X");
    setTurnData(previousTurns => {
      let currentPlayer = "X";
      if (previousTurns.length > 0 && previousTurns[0].player == "X") {
        currentPlayer = "O";
      }
      const updatedturns = [
        { square: { row: rowIndex, col: colIndex }, player: currentPlayer},
        ...previousTurns
      ];

      return updatedturns;
    });
  }

  return <main>
    <div id="game-container">
      <ol id="players" className="highlight-player">
        <Player isActive={ activePlayer == "X" } name="Player 1" symbol="X"/>
        <Player isActive={ activePlayer == "O" }name="Player 2" symbol="O"/>
      </ol>

      <GameBoard turnData={turnData} onSelectSquare={handleSelectSquare}/>
    </div>

    <Log turnData={turnData}/>
  </main>
}

export default App