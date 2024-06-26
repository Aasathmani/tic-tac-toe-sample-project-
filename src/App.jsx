import React, { useState } from "react";
import { Players } from "./components/Players";
import { GameBoard } from "./components/GameBoard";
import { Log } from "./components/Log";
import { WINNING_COMBINATION } from "./winning-combination";

const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function derivedActivePlayer(gameTurns) {
  let currentPlayer = "X";

  if (gameTurns.length > 0 && gameTurns[0].player === "X") {
    currentPlayer = "O";
  }
  return currentPlayer;
}

function App() {
  const [gameTurns, setGameTurns] = useState([]);
  const activePlayer = derivedActivePlayer(gameTurns);
  const [gameBoard, setGameBoard] = useState(initialGameBoard);
  let winner = null;

  const handleSelectSquare = (rowIndex, colIndex) => {
    if (gameBoard[rowIndex][colIndex] === null) {
      const updatedBoard = [...gameBoard];
      updatedBoard[rowIndex][colIndex] = derivedActivePlayer(gameTurns);
      setGameBoard(updatedBoard);
      setGameTurns((prevTurns) => [
        {
          square: { row: rowIndex, col: colIndex },
          player: derivedActivePlayer(prevTurns),
        },
        ...prevTurns,
      ]);
    }
  };

  for(const combination of WINNING_COMBINATION){
    const firstSquareSymbol=gameBoard[combination[0].row][combination[0].column];
    const secondSquareSymbol=gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbol=gameBoard[combination[2].row][combination[2].column];
    if( firstSquareSymbol &&
      firstSquareSymbol === secondSquareSymbol &&
      secondSquareSymbol === thirdSquareSymbol){
      winner=firstSquareSymbol;
      break;
    }
  }
  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Players
            initialName="Player 1"
            symbol="X"
            isActive={activePlayer === "X"}
          />
          <Players
            initialName="Player 2"
            symbol="O"
            isActive={activePlayer === "O"}
          />
        </ol>
        {winner && <p>You won {winner}!</p>}
        <GameBoard onSelectSquare={handleSelectSquare} board={gameBoard} />
      </div>
      <Log turns={gameTurns} />
    </main>
  );
}

export default App;
