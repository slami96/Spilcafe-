import { useState } from "react";

export default function GameList() {
  const [games, setGames] = useState([]);
  const [newGame, setNewGame] = useState("");

  const addGame = () => {
    if (newGame.trim() === "") return;
    setGames([...games, newGame]);
    setNewGame("");
  };

  const removeGame = (index) => {
    setGames(games.filter((_, i) => i !== index));
  };

  return (
    <div>
      <h2>Game Management</h2>
      <input 
        type="text" 
        value={newGame} 
        onChange={(e) => setNewGame(e.target.value)} 
        placeholder="Enter game name"
      />
      <button onClick={addGame}>Add Game</button>
      
      <ul>
        {games.map((game, index) => (
          <li key={index}>
            {game} 
            <button onClick={() => removeGame(index)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
