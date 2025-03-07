import { useState, useEffect } from "react";

export default function GameList() {
  // Predefined list of 10 games with additional properties
  const initialGames = [
    { name: "Chess", status: "Available", table: null, startTime: null },
    { name: "Monopoly", status: "Available", table: null, startTime: null },
    { name: "Catan", status: "Available", table: null, startTime: null },
    { name: "Mario Kart", status: "Available", table: null, startTime: null },
    { name: "Street Fighter", status: "Available", table: null, startTime: null },
    { name: "Fortnite", status: "Available", table: null, startTime: null },
    { name: "Call of Duty", status: "Available", table: null, startTime: null },
    { name: "Minecraft", status: "Available", table: null, startTime: null },
    { name: "FIFA 24", status: "Available", table: null, startTime: null },
    { name: "Among Us", status: "Available", table: null, startTime: null },
  ];

  const [games, setGames] = useState(initialGames);
  const [tableNumber, setTableNumber] = useState("");
  const [, setTick] = useState(0); // Used to force re-renders

  // Update the timer every minute
  useEffect(() => {
    const interval = setInterval(() => {
      setTick(prev => prev + 1); // Force component to re-render
    }, 60000);
    
    return () => clearInterval(interval);
  }, []);

  // Calculate elapsed time and format as HH:MM
  const getElapsedTime = (startTime) => {
    if (!startTime) return "-";
    
    // Calculate elapsed time in milliseconds
    const elapsed = Date.now() - new Date(startTime).getTime();
    
    // Convert to minutes and hours
    const totalMinutes = Math.floor(elapsed / (1000 * 60));
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    
    // Format as HH:MM
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  };

  // Toggle game status between Available and Unavailable
  const toggleStatus = (index) => {
    const updatedGames = [...games];
    const game = updatedGames[index];
    
    if (game.status === "Available") {
      // If making unavailable, prompt for table number
      if (!tableNumber.trim()) {
        alert("Please enter a table number!");
        return;
      }
      
      updatedGames[index] = {
        ...game,
        status: "Unavailable",
        table: tableNumber,
        startTime: new Date().toISOString() // Store current time
      };
      setTableNumber(""); // Reset table input
    } else {
      // If making available, clear table and timer
      updatedGames[index] = {
        ...game,
        status: "Available",
        table: null,
        startTime: null
      };
    }
    
    setGames(updatedGames);
  };

  return (
    <div>
      <h1>Admin Panel</h1>
      <h2>Game Management</h2>
      
      <div>
        <label htmlFor="tableNumber">Table Number: </label>
        <input
          type="text"
          id="tableNumber"
          value={tableNumber}
          onChange={(e) => setTableNumber(e.target.value)}
          placeholder="Enter table #"
        />
      </div>
      
      <table>
        <thead>
          <tr>
            <th>Game</th>
            <th>Status</th>
            <th>Table</th>
            <th>Time in Use</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {games.map((game, index) => (
            <tr key={index}>
              <td>{game.name}</td>
              <td><b>{game.status}</b></td>
              <td>{game.table || "-"}</td>
              <td>{game.startTime ? getElapsedTime(game.startTime) : "-"}</td>
              <td>
                <button onClick={() => toggleStatus(index)}>
                  Mark as {game.status === "Available" ? "Unavailable" : "Available"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
