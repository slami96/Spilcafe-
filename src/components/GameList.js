import { useState, useEffect } from "react";

export default function GameList() {
  // Predefined list of 20 famous games with categories
  const initialGames = [
    { name: "Chess", category: "Strategy", status: "Available", table: null, startTime: null, playerCount: null },
    { name: "Monopoly", category: "Family", status: "Available", table: null, startTime: null, playerCount: null },
    { name: "Catan", category: "Strategy", status: "Available", table: null, startTime: null, playerCount: null },
    { name: "Scrabble", category: "Word", status: "Available", table: null, startTime: null, playerCount: null },
    { name: "Risk", category: "Strategy", status: "Available", table: null, startTime: null, playerCount: null },
    { name: "Pandemic", category: "Cooperative", status: "Available", table: null, startTime: null, playerCount: null },
    { name: "Ticket to Ride", category: "Family", status: "Available", table: null, startTime: null, playerCount: null },
    { name: "Carcassonne", category: "Strategy", status: "Available", table: null, startTime: null, playerCount: null },
    { name: "Codenames", category: "Party", status: "Available", table: null, startTime: null, playerCount: null },
    { name: "Dominion", category: "Card", status: "Available", table: null, startTime: null, playerCount: null },
    { name: "Azul", category: "Abstract", status: "Available", table: null, startTime: null, playerCount: null },
    { name: "7 Wonders", category: "Strategy", status: "Available", table: null, startTime: null, playerCount: null },
    { name: "Splendor", category: "Card", status: "Available", table: null, startTime: null, playerCount: null },
    { name: "Dixit", category: "Party", status: "Available", table: null, startTime: null, playerCount: null },
    { name: "Clue/Cluedo", category: "Mystery", status: "Available", table: null, startTime: null, playerCount: null },
    { name: "Terraforming Mars", category: "Strategy", status: "Available", table: null, startTime: null, playerCount: null },
    { name: "Uno", category: "Card", status: "Available", table: null, startTime: null, playerCount: null },
    { name: "Jenga", category: "Dexterity", status: "Available", table: null, startTime: null, playerCount: null },
    { name: "Betrayal at House on the Hill", category: "Mystery", status: "Available", table: null, startTime: null, playerCount: null },
    { name: "Wingspan", category: "Strategy", status: "Available", table: null, startTime: null, playerCount: null },
  ];

  // Initialize game history from localStorage or empty array
  const [history, setHistory] = useState(() => {
    const savedHistory = localStorage.getItem('gameHistory');
    return savedHistory ? JSON.parse(savedHistory) : [];
  });

  const [games, setGames] = useState(() => {
    // Check if we have saved state in localStorage
    const savedGames = localStorage.getItem('cafeGames');
    // Ensure all saved games have category information
    if (savedGames) {
      const parsedGames = JSON.parse(savedGames);
      // If any saved game is missing a category, use the initialGames as a reference
      if (parsedGames.some(game => !game.category)) {
        return initialGames;
      }
      return parsedGames;
    }
    return initialGames;
  });
  
  // Get unique categories from the games list
  const categories = ["All", ...Array.from(new Set(games.map(game => game.category)))];
  
  const [tableNumber, setTableNumber] = useState("");
  const [playerCount, setPlayerCount] = useState("");
  const [time, setTime] = useState(new Date()); // Current time for timer calculations
  const [totalPlayers, setTotalPlayers] = useState(0);
  const [showHistory, setShowHistory] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Update timer every second
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000); // Update every second
    
    return () => clearInterval(interval);
  }, []);

  // Calculate total number of active players
  useEffect(() => {
    const total = games.reduce((sum, game) => {
      return sum + (game.playerCount ? parseInt(game.playerCount) : 0);
    }, 0);
    setTotalPlayers(total);
  }, [games]);

  // Save games to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('cafeGames', JSON.stringify(games));
  }, [games]);

  // Save history to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('gameHistory', JSON.stringify(history));
  }, [history]);

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

  // Calculate total time for a history record
  const getTotalTime = (startTime, endTime) => {
    if (!startTime || !endTime) return "-";
    
    const start = new Date(startTime);
    const end = new Date(endTime);
    const elapsed = end.getTime() - start.getTime();
    
    if (elapsed < 0) return "00:00:00";
    
    const totalSeconds = Math.floor(elapsed / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  // Format date for history display
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
  };

  // Toggle game status between Available and Unavailable
  const toggleStatus = (index) => {
    const updatedGames = [...games];
    const game = updatedGames[index];
    
    if (game.status === "Available") {
      // If making unavailable, require a table number and player count
      if (!tableNumber.trim()) {
        alert("Please enter a table number!");
        return;
      }
      
      if (!playerCount.trim() || isNaN(playerCount) || parseInt(playerCount) <= 0) {
        alert("Please enter a valid number of players!");
        return;
      }
      
      updatedGames[index] = {
        ...game,
        status: "Unavailable",
        table: tableNumber,
        playerCount: playerCount,
        startTime: new Date().toISOString() // Store current time
      };
      
      setTableNumber(""); // Reset input fields
      setPlayerCount("");
    } else {
      // When marking as available (game returned), add to history
      const currentTime = new Date().toISOString();
      
      // Add to history
      const historyEntry = {
        id: Date.now(), // Unique ID for the history entry
        gameName: game.name,
        category: game.category,
        table: game.table,
        playerCount: game.playerCount,
        startTime: game.startTime,
        endTime: currentTime,
        totalTime: getTotalTime(game.startTime, currentTime)
      };
      
      setHistory(prev => [historyEntry, ...prev]); // Add to beginning of history
      
      // Reset game status
      updatedGames[index] = {
        ...game,
        status: "Available",
        table: null,
        playerCount: null,
        startTime: null
      };
    }
    
    setGames(updatedGames);
  };

  // Filter games by category
  const filteredGames = selectedCategory === "All" 
    ? games 
    : games.filter(game => game.category === selectedCategory);

  // Clear all history
  const clearHistory = () => {
    if (window.confirm("Are you sure you want to clear all history? This cannot be undone.")) {
      setHistory([]);
    }
  };

  // Get color for category labels
  const getCategoryColor = (category) => {
    const colors = {
      "Strategy": "#4a6fa5",
      "Family": "#53a567",
      "Word": "#9c59b6",
      "Card": "#e67e22",
      "Party": "#f1c40f",
      "Cooperative": "#3498db",
      "Abstract": "#e74c3c",
      "Mystery": "#8e44ad",
      "Dexterity": "#d35400"
    };
    return colors[category] || "#7f8c8d"; // Default color if category not found
  };

  return (
    <div>
      <h1>Admin Panel</h1>
      <h2>Game Management</h2>
      
      <div style={{ marginBottom: "10px" }}>
        <div style={{ marginBottom: "5px" }}>
          <label htmlFor="tableNumber" style={{ marginRight: "5px" }}>Table Number:</label>
          <input
            type="text"
            id="tableNumber"
            value={tableNumber}
            onChange={(e) => setTableNumber(e.target.value)}
            placeholder="Enter table #"
            style={{ marginRight: "15px" }}
          />
          
          <label htmlFor="playerCount" style={{ marginRight: "5px" }}>Number of Players:</label>
          <input
            type="number"
            id="playerCount"
            min="1"
            value={playerCount}
            onChange={(e) => setPlayerCount(e.target.value)}
            placeholder="Enter player count"
          />
        </div>
        
        <div style={{ fontWeight: "bold", marginTop: "5px", marginBottom: "15px" }}>
          Total Active Players: {totalPlayers}
        </div>

        {/* Category filter */}
        <div style={{ marginBottom: "15px" }}>
          <label htmlFor="categoryFilter" style={{ marginRight: "10px" }}>Filter by Category:</label>
          <select 
            id="categoryFilter" 
            value={selectedCategory} 
            onChange={(e) => setSelectedCategory(e.target.value)}
            style={{
              padding: "5px 10px",
              borderRadius: "4px",
              border: "1px solid #ddd"
            }}
          >
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>
        
        <button 
          onClick={() => setShowHistory(!showHistory)} 
          style={{
            padding: "5px 10px",
            backgroundColor: "#6a89cc",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            marginRight: "10px"
          }}
        >
          {showHistory ? "Hide History" : "Show History"}
        </button>
        
        {showHistory && 
          <button 
            onClick={clearHistory} 
            style={{
              padding: "5px 10px",
              backgroundColor: "#eb4d4b",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer"
            }}
          >
            Clear History
          </button>
        }
      </div>
      
      <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: "20px" }}>
        <thead>
          <tr style={{ backgroundColor: "#f2f2f2" }}>
            <th style={{ padding: "8px", textAlign: "left", border: "1px solid #ddd" }}>Game</th>
            <th style={{ padding: "8px", textAlign: "left", border: "1px solid #ddd" }}>Category</th>
            <th style={{ padding: "8px", textAlign: "left", border: "1px solid #ddd" }}>Status</th>
            <th style={{ padding: "8px", textAlign: "left", border: "1px solid #ddd" }}>Table</th>
            <th style={{ padding: "8px", textAlign: "left", border: "1px solid #ddd" }}>Players</th>
            <th style={{ padding: "8px", textAlign: "left", border: "1px solid #ddd" }}>Time in Use</th>
            <th style={{ padding: "8px", textAlign: "left", border: "1px solid #ddd" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredGames.map((game, index) => {
            // Find actual index in original array for proper toggle function
            const originalIndex = games.findIndex(g => g.name === game.name);
            
            return (
              <tr key={originalIndex} style={{ backgroundColor: game.status === "Unavailable" ? "#ffeeee" : "white" }}>
                <td style={{ padding: "8px", border: "1px solid #ddd" }}>{game.name}</td>
                <td style={{ padding: "8px", border: "1px solid #ddd" }}>
                  {game.category && (
                    <span style={{ 
                      display: "inline-block",
                      backgroundColor: getCategoryColor(game.category),
                      color: "white",
                      padding: "2px 6px",
                      borderRadius: "4px",
                      fontSize: "0.85em"
                    }}>
                      {game.category}
                    </span>
                  )}
                </td>
                <td style={{ padding: "8px", border: "1px solid #ddd", fontWeight: "bold" }}>{game.status}</td>
                <td style={{ padding: "8px", border: "1px solid #ddd" }}>{game.table || "-"}</td>
                <td style={{ padding: "8px", border: "1px solid #ddd" }}>{game.playerCount || "-"}</td>
                <td style={{ padding: "8px", border: "1px solid #ddd" }}>{game.startTime ? getElapsedTime(game.startTime) : "-"}</td>
                <td style={{ padding: "8px", border: "1px solid #ddd" }}>
                  <button 
                    onClick={() => toggleStatus(originalIndex)}
                    style={{
                      padding: "5px 10px",
                      backgroundColor: game.status === "Available" ? "#ff6b6b" : "#4ecdc4",
                      color: "white",
                      border: "none",
                      borderRadius: "4px",
                      cursor: "pointer"
                    }}
                  >
                    Mark as {game.status === "Available" ? "Unavailable" : "Available"}
                  </button>
                </td>
              </tr>
            );
          })}
          {filteredGames.length === 0 && (
            <tr>
              <td colSpan="7" style={{ padding: "20px", textAlign: "center" }}>
                No games found in this category. Please select a different category.
              </td>
            </tr>
          )}
        </tbody>
      </table>
      
      {/* History Section */}
      {showHistory && (
        <div>
          <h2>Game Usage History</h2>
          {history.length === 0 ? (
            <p>No history yet. History will be recorded when games are returned.</p>
          ) : (
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ backgroundColor: "#f2f2f2" }}>
                  <th style={{ padding: "8px", textAlign: "left", border: "1px solid #ddd" }}>Game</th>
                  <th style={{ padding: "8px", textAlign: "left", border: "1px solid #ddd" }}>Category</th>
                  <th style={{ padding: "8px", textAlign: "left", border: "1px solid #ddd" }}>Table</th>
                  <th style={{ padding: "8px", textAlign: "left", border: "1px solid #ddd" }}>Players</th>
                  <th style={{ padding: "8px", textAlign: "left", border: "1px solid #ddd" }}>Start Time</th>
                  <th style={{ padding: "8px", textAlign: "left", border: "1px solid #ddd" }}>End Time</th>
                  <th style={{ padding: "8px", textAlign: "left", border: "1px solid #ddd" }}>Total Time</th>
                </tr>
              </thead>
              <tbody>
                {history.map((entry) => (
                  <tr key={entry.id}>
                    <td style={{ padding: "8px", border: "1px solid #ddd" }}>{entry.gameName}</td>
                    <td style={{ padding: "8px", border: "1px solid #ddd" }}>
                      {entry.category && (
                        <span style={{ 
                          display: "inline-block",
                          backgroundColor: getCategoryColor(entry.category),
                          color: "white",
                          padding: "2px 6px",
                          borderRadius: "4px",
                          fontSize: "0.85em"
                        }}>
                          {entry.category}
                        </span>
                      )}
                    </td>
                    <td style={{ padding: "8px", border: "1px solid #ddd" }}>{entry.table}</td>
                    <td style={{ padding: "8px", border: "1px solid #ddd" }}>{entry.playerCount}</td>
                    <td style={{ padding: "8px", border: "1px solid #ddd" }}>{formatDate(entry.startTime)}</td>
                    <td style={{ padding: "8px", border: "1px solid #ddd" }}>{formatDate(entry.endTime)}</td>
                    <td style={{ padding: "8px", border: "1px solid #ddd", fontWeight: "bold" }}>{entry.totalTime}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
}
