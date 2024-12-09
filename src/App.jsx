import { Fragment, useState } from "react";
import Header from "./components/header";
import Player from "./components/Player";
import GameBoard from "./components/GameBoard";
import Log from "./components/Log";
import { WINNING_COMBINATIONS } from "./winning-combination";
import GameOver from "./components/GameOver";

const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

export default function App() {
  const [activePlayer, setActivePlayer] = useState("X");
  const [gameTurns, setGameTurns] = useState([]);

  let winner = null;
  const isDraw = gameTurns.length === 9 && !winner;

  let gameBoard = [...initialGameBoard.map((array) => [...array])];

  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;

    gameBoard[row][col] = player;
  }

  for (const combination of WINNING_COMBINATIONS) {
    const firstSquareSymbol =
      gameBoard[combination[0].row][combination[0].column];
    const secondSquareSymbol =
      gameBoard[combination[1].row][combination[1].column];

    const thirdSquareSymbol =
      gameBoard[combination[2].row][combination[2].column];

    if (
      firstSquareSymbol &&
      firstSquareSymbol === secondSquareSymbol &&
      firstSquareSymbol === thirdSquareSymbol
    ) {
      winner = firstSquareSymbol;
    }
  }

  function handleSelectedSquare(rowIndex, colIndex) {
    setGameTurns((prevTurns) => {
      const updatedTurns = [
        ...prevTurns,
        { square: { row: rowIndex, col: colIndex }, player: activePlayer },
      ];
      return updatedTurns;
    });

    setActivePlayer((curActivePlayer) => (curActivePlayer === "X" ? "O" : "X"));
  }

  function handleRematch() {
    setGameTurns([]);
  }

  return (
    <Fragment>
      <Header />

      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            initialName="Player 1"
            symbol="X"
            isActive={activePlayer === "X"}
          />
          <Player
            initialName="Player 2"
            symbol="O"
            isActive={activePlayer === "O"}
          />
        </ol>
        {(winner || isDraw) && (
          <GameOver winner={winner} onRematch={handleRematch} />
        )}
        <GameBoard onSelectedSquare={handleSelectedSquare} turns={gameBoard} />
      </div>

      <Log turns={gameTurns} />
    </Fragment>
  );
}
