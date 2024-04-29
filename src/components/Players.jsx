import { useState } from "react";

export function Players({ initialName, symbol ,isActive}) {
  const [playerName,setPlayerName]=useState(initialName)
  const [isEditing, isSetEditing] = useState(false);

  function handleClick() {
    isSetEditing(() => !isEditing);
  }

  function handleNameChange(event){
    setPlayerName(event.target.value)
  }

  let btnChange = "Edit";
  let editablePlayerName = <span id="player-name">{playerName}</span>;
  if (isEditing) {
    btnChange = "Save";
    editablePlayerName = (
      <span>
        <input type="text" required value={playerName} onChange={handleNameChange}></input>
      </span>
    );
  }

  return (
    <li className={isActive? "active":undefined}>
      <span id="players">
        {editablePlayerName}
        <span id="player-symbol">{symbol}</span>
      </span>
      <button onClick={handleClick}>{btnChange}</button>
    </li>
  );
}
