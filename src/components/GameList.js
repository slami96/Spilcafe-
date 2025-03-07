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

  const [games, setGames] = useState(() => {
    // Check if we have saved state in localStorage
    const savedGames = localStorage.getItem('cafeGames');
    return savedGames ? JSON.parse(savedGames) : initialGames;
  });
  
  const [tableNumber, setTableNumber] = useState("");
  const [time, setTime] = useState(new Date()); // Current time for timer calculations

  // Update timer every second
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000); // Update every second instead of every minute
    
    return () => clearInterval(interval);
  }, []);

  // Save games to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('cafeGames', JSON.stringify(games));
  }, [games]);

  // Calculate and format elapsed time as HH:MM:SS
  const getElapsedTime = (startTime) => {
    if (!startTime) return "-";
    
    // Parse startTime and calculate difference in milliseconds
    const start = new Date(startTime);
    const elapsed = time.getTime() - start.getTime();
    
    // Negative time check (shouldn't happen, but just in case)
    if (elapsed < 0) return "00:00:00";
    
    // Convert to hours, minutes, seconds
    const totalSeconds = Math.floor(elapsed / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    
    // Format as HH:MM:SS
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  // Toggle game status between Available and Unavailable
  const toggleStatus = (index) => {
    const updatedGames = [...games];
    const game = updatedGames[index];
    
    if (game.status === "Available") {
      // If making unavailable, require a table number
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
