import { FaHandshakeSimple } from "react-icons/fa6";

export default function GameOver({ winner, onRematch }) {
  return (
    <div id="game-over">
      <h2>Game-Over</h2>
      {winner && <p>{winner} Won!</p>}
      {!winner && (
        <p>
          It's a draw <FaHandshakeSimple />
        </p>
      )}
      <button onClick={onRematch}>Rematch!</button>
    </div>
  );
}