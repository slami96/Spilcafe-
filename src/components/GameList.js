import { useState } from "react";

export default function GameList() {
  // Predefined list of 10 games with initial status "Available"
  const initialGames = [
    { name: "Chess", status: "Available" },
    { name: "Monopoly", status: "Available" },
    { name: "Catan", status: "Available" },
    { name: "Mario Kart", status: "Available" },
    { name: "Street Fighter", status: "Available" },
    { name: "Fortnite", status: "Available" },
    { name: "Call of Duty", status: "Available" },
    { name: "Minecraft", status: "Available" },
    { name: "FIFA 24", status: "Available" },
    { name: "Among Us", status: "Available" },
  ];

  const [games, setGames] = useState(initialGames);

  // Toggle game status between Available and Unavailable
  const toggleStatus = (index) => {
    const updatedGames = games.map((game, i) =>
      i === index ? { ...game, status: game.status === "Available" ? "Unavailable" : "Available" } : game
    );
    setGames(updatedGames);
  };

  return (
    <div>
      <h2>Game Management</h2>
      <ul>
        {games.map((game, index) => (
          <li key={index}>
            {game.name} - <b>{game.status}</b>
            <button onClick={() => toggleStatus(index)}>
              Mark as {game.status === "Available" ? "Unavailable" : "Available"}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
