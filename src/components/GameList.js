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
  const [currentTime, setCurrentTime] = useState(new Date());
  
  // Update the current time every minute
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    
    return () => clearInterval(interval);
  }, []);

  // Calculate elapsed time in minutes
  const getElapsedTime = (startTime) => {
    if (!startTime) return 0;
    const elapsed = Math.floor((currentTime - new Date(startTime)) / (1000 * 60));
    return elapsed;
  };

  // Format elapsed time as HH:MM
  const formatElapsedTime = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
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
        startTime: new Date().toISOString()
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
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Game Management</h2>
      
      <div className="mb-4">
        <label htmlFor="tableNumber" className="block mb-2">Table Number:</label>
        <input
          type="text"
          id="tableNumber"
          value={tableNumber}
          onChange={(e) => setTableNumber(e.target.value)}
          className="border p-2 mr-2"
          placeholder="Enter table #"
        />
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">Game</th>
              <th className="border p-2">Status</th>
              <th className="border p-2">Table</th>
              <th className="border p-2">Time in Use</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {games.map((game, index) => (
              <tr key={index} className={game.status === "Unavailable" ? "bg-red-50" : ""}>
                <td className="border p-2">{game.name}</td>
                <td className="border p-2 font-bold">{game.status}</td>
                <td className="border p-2">{game.table || "-"}</td>
                <td className="border p-2">
                  {game.startTime ? formatElapsedTime(getElapsedTime(game.startTime)) : "-"}
                </td>
                <td className="border p-2">
                  <button 
                    onClick={() => toggleStatus(index)}
                    className={`px-3 py-1 rounded ${
                      game.status === "Available" 
                        ? "bg-red-500 text-white" 
                        : "bg-green-500 text-white"
                    }`}
                  >
                    Mark as {game.status === "Available" ? "Unavailable" : "Available"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
