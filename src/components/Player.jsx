import { useState } from "react";

export default function Player({ initialName, symbol, isActive }) {
  const [playerName, setPlayerName] = useState(initialName);
  const [isEditing, setIsEditing] = useState(false);

  function handleEditClick() {
    setIsEditing((editing) => !editing);
  }

  function handleChange(event) {
    setPlayerName(event.target.value);
  }

  let editAblePlayerName = <span className="player-name">{playerName}</span>;

  if (isEditing) {
    editAblePlayerName = (
      <input type="text" value={playerName} onChange={handleChange} />
    );
  }

  return (
    <>
      <li className={isActive ? "active" : null}>
        <span className="player">
          {editAblePlayerName}
          <span className="player-symbol">{symbol}</span>
        </span>
        <button onClick={handleEditClick}>{isEditing ? "Save" : "Edit"}</button>
      </li>
    </>
  );
}
