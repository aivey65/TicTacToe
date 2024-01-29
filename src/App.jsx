import { useState } from "react";
import Player from "./Components/Player.jsx";
import GameBoard from "./components/GameBoard.jsx";
import Log from "./components/Log.jsx";
import GameOver from "./components/GameOver.jsx";
import { WINNING_COMBINATIONS } from "./winning-combinations.js";

const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null]
];

function findActivePlayer(gameTurns) {
  let currentPlayer = "X";

  if (gameTurns.length > 0 && gameTurns[0].player == "X") {
    currentPlayer = "O";
  }

  return currentPlayer;
}

function App() {
  const [turnData, setTurnData] = useState([]);
  const activePlayer = findActivePlayer(turnData);

  let gameBoard = [...initialGameBoard.map((row) => [...row])];
  for (const turn of turnData) {
    const { square, player } = turn;
    gameBoard[square.row][square.col] = player;
  }

  let winner = null;
  for (const combo of WINNING_COMBINATIONS) {
    const firstSquare = gameBoard[combo[0].row][combo[0].col];
    const secondSquare = gameBoard[combo[1].row][combo[1].col];
    const thirdSquare = gameBoard[combo[2].row][combo[2].col];

    if (firstSquare && firstSquare == secondSquare && secondSquare == thirdSquare) {
      winner = firstSquare
    }
  }

  let hasDraw = turnData.length == 9 && !winner;

  function handleSelectSquare(rowIndex, colIndex) {
    setTurnData(previousTurns => {
      const currentPlayer = findActivePlayer(previousTurns);
      const updatedturns = [
        { square: { row: rowIndex, col: colIndex }, player: currentPlayer},
        ...previousTurns
      ];

      return updatedturns;
    });
  }

  function handleRestart() {
    setTurnData([]);
  }

  return <main>
    <div id="game-container">
      <ol id="players" className="highlight-player">
        <Player isActive={ activePlayer == "X" } name="Player 1" symbol="X"/>
        <Player isActive={ activePlayer == "O" }name="Player 2" symbol="O"/>
      </ol>

      { (winner || hasDraw) && <GameOver winner={winner} handleRestart={handleRestart} /> }

      <GameBoard board={gameBoard} onSelectSquare={handleSelectSquare}/>
    </div>

    <Log turnData={turnData}/>
  </main>
}

export default App