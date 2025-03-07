import { useState, useEffect } from "react";

export default function GameList() {
  // Predefined list of 20 famous games with categories and descriptions
  const initialGames = [
    { 
      name: "Chess", 
      category: "Strategy", 
      status: "Available", 
      table: null, 
      startTime: null, 
      playerCount: null,
      description: "A classic two-player strategy game where players battle to capture the opponent's king. Chess requires tactical thinking and planning, with six different types of pieces each moving in unique patterns."
    },
    { 
      name: "Monopoly", 
      category: "Family", 
      status: "Available", 
      table: null, 
      startTime: null, 
      playerCount: null,
      description: "Buy, sell, and trade properties to build your real estate empire. Monopoly is a multiplayer economic game that combines luck and strategy as players aim to bankrupt their opponents."
    },
    { 
      name: "Catan", 
      category: "Strategy", 
      status: "Available", 
      table: null, 
      startTime: null, 
      playerCount: null,
      description: "Settlers compete to build settlements, cities, and roads on the island of Catan. Players gather and trade resources like wool, grain, and ore in this award-winning strategy game."
    },
    { 
      name: "Scrabble", 
      category: "Word", 
      status: "Available", 
      table: null, 
      startTime: null, 
      playerCount: null,
      description: "A word game where players score points by placing tiles with letters onto a board, forming words. Scrabble rewards vocabulary knowledge and strategic tile placement."
    },
    { 
      name: "Risk", 
      category: "Strategy", 
      status: "Available", 
      table: null, 
      startTime: null, 
      playerCount: null,
      description: "A game of global domination where players control armies to occupy territories and conquer continents. Risk combines strategy, diplomacy, and conflict in a battle for world conquest."
    },
    { 
      name: "Pandemic", 
      category: "Cooperative", 
      status: "Available", 
      table: null, 
      startTime: null, 
      playerCount: null,
      description: "Work together as a team of disease-fighting specialists to treat infections and find cures. Pandemic is a cooperative game where players must collaborate to save humanity."
    },
    { 
      name: "Ticket to Ride", 
      category: "Family", 
      status: "Available", 
      table: null, 
      startTime: null, 
      playerCount: null,
      description: "Build train routes across countries or continents to connect cities. Ticket to Ride is a cross-country train adventure where players collect cards to claim railway routes."
    },
    { 
      name: "Carcassonne", 
      category: "Strategy", 
      status: "Available", 
      table: null, 
      startTime: null, 
      playerCount: null,
      description: "Place tiles to build cities, roads, and fields in medieval France. Carcassonne is a tile-placement game where players strategically deploy their followers as knights, monks, or farmers."
    },
    { 
      name: "Codenames", 
      category: "Party", 
      status: "Available", 
      table: null, 
      startTime: null, 
      playerCount: null,
      description: "Two rival spymasters know the secret identities of 25 agents, and their teammates must guess correctly based on one-word clues. A popular word-association party game that tests communication."
    },
    { 
      name: "Dominion", 
      category: "Card", 
      status: "Available", 
      table: null, 
      startTime: null, 
      playerCount: null,
      description: "The first deck-building game where players start with identical cards and acquire new ones to build a more powerful deck. Dominion offers vast replayability with numerous card combinations."
    },
    { 
      name: "Azul", 
      category: "Abstract", 
      status: "Available", 
      table: null, 
      startTime: null, 
      playerCount: null,
      description: "Players collect colorful tiles to decorate the walls of a royal palace. Azul is a beautiful abstract game about tile drafting and pattern building with simple rules but deep strategy."
    },
    { 
      name: "7 Wonders", 
      category: "Strategy", 
      status: "Available", 
      table: null, 
      startTime: null, 
      playerCount: null,
      description: "Build one of the seven wonders of the ancient world while developing military, commercial, and scientific structures. A card drafting civilization game that plays in about 30 minutes."
    },
    { 
      name: "Splendor", 
      category: "Card", 
      status: "Available", 
      table: null, 
      startTime: null, 
      playerCount: null,
      description: "Collect gem tokens and cards to build your jewelry empire. Splendor is an engine-building game where players become Renaissance merchants trying to gain prestige through gem mines and shops."
    },
    { 
      name: "Dixit", 
      category: "Party", 
      status: "Available", 
      table: null, 
      startTime: null, 
      playerCount: null,
      description: "A storytelling game with surreal, dreamlike illustrations where players try to guess which image matches a cryptic clue. Dixit rewards creativity and understanding your friends' thinking patterns."
    },
    { 
      name: "Clue/Cluedo", 
      category: "Mystery", 
      status: "Available", 
      table: null, 
      startTime: null, 
      playerCount: null,
      description: "Solve a murder mystery by determining who committed the crime, with what weapon, and in which room. Clue is a classic deduction game where players collect evidence and eliminate possibilities."
    },
    { 
      name: "Terraforming Mars", 
      category: "Strategy", 
      status: "Available", 
      table: null, 
      startTime: null, 
      playerCount: null,
      description: "Corporations compete to make Mars habitable through raising temperature, creating oceans, and building cities. A deeply strategic game with hundreds of unique project cards."
    },
    { 
      name: "Uno", 
      category: "Card", 
      status: "Available", 
      table: null, 
      startTime: null, 
      playerCount: null,
      description: "Match cards by color or number and be the first to get rid of all your cards. Uno is a family-friendly card game with special action cards that can reverse play, skip players, or force others to draw."
    },
    { 
      name: "Jenga", 
      category: "Dexterity", 
      status: "Available", 
      table: null, 
      startTime: null, 
      playerCount: null,
      description: "Carefully remove blocks from a tower and place them on top without causing it to collapse. Jenga tests players' steady hands and strategic thinking in this classic physical skill game."
    },
    { 
      name: "Betrayal at House on the Hill", 
      category: "Mystery", 
      status: "Available", 
      table: null, 
      startTime: null, 
      playerCount: null,
      description: "Explore a haunted house room by room until a haunt begins and one player becomes a traitor. A horror-themed adventure game with 50+ different scenarios, each with unique rules and objectives."
    },
    { 
      name: "Wingspan", 
      category: "Strategy", 
      status: "Available", 
      table: null, 
      startTime: null, 
      playerCount: null,
      description: "Attract a diverse collection of birds to your wildlife preserves. Wingspan is a competitive, card-driven engine-building game featuring beautiful illustrations of 170 unique bird species."
    },
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
      // If any saved game is missing a category or description, use the initialGames as a reference
      if (parsedGames.some(game => !game.category || !game.description)) {
        // Merge saved data with initialGames to ensure descriptions are present
        return initialGames.map(initialGame => {
          const savedGame = parsedGames.find(g => g.name === initialGame.name);
          return savedGame ? { ...initialGame, ...savedGame } : initialGame;
        });
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
  const [expandedGame, setExpandedGame] = useState(null);
  const [showDescriptionModal, setShowDescriptionModal] = useState(false);
  const [selectedGameForDescription, setSelectedGameForDescription] = useState(null);

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

  // Show game description
  const showGameDescription = (game) => {
    setSelectedGameForDescription(game);
    setShowDescriptionModal(true);
  };

  // Hide description modal
  const hideDescriptionModal = () => {
    setShowDescriptionModal(false);
    setSelectedGameForDescription(null);
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

  // Get the background color for the description modal based on the game category
  const getModalHeaderColor = (category) => {
    return getCategoryColor(category);
  };

  return (
    <div>
      <h1>Board Game Cafe Management</h1>
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
            <th style={{ padding: "8px", textAlign: "left", border: "1px solid #ddd" }}>Info</th>
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
                    onClick={() => showGameDescription(game)}
                    style={{
                      padding: "3px 8px",
                      backgroundColor: "#34495e",
                      color: "white",
                      border: "none",
                      borderRadius: "4px",
                      cursor: "pointer",
                      fontSize: "0.9em"
                    }}
                  >
                    <span role="img" aria-label="info" style={{ marginRight: "4px" }}>ℹ️</span>
                    Details
                  </button>
                </td>
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
              <td colSpan="8" style={{ padding: "20px", textAlign: "center" }}>
                No games found in this category. Please select a different category.
              </td>
            </tr>
          )}
        </tbody>
      </table>
      
      {/* Game Description Modal */}
      {showDescriptionModal && selectedGameForDescription && (
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 1000
        }}>
          <div style={{
            backgroundColor: "white",
            borderRadius: "8px",
            width: "90%",
            maxWidth: "600px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
            overflow: "hidden"
          }}>
            <div style={{
              backgroundColor: getModalHeaderColor(selectedGameForDescription.category),
              color: "white",
              padding: "12px 20px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center"
            }}>
              <h3 style={{ margin: 0 }}>{selectedGameForDescription.name}</h3>
              <span 
                role="button" 
                onClick={hideDescriptionModal}
                style={{ 
                  cursor: "pointer", 
                  fontSize: "24px",
                  fontWeight: "bold"
                }}
              >
                &times;
              </span>
            </div>
            <div style={{ padding: "20px" }}>
              <div style={{ marginBottom: "15px" }}>
                <strong>Category:</strong> {selectedGameForDescription.category}
              </div>
              <div style={{ marginBottom: "15px" }}>
                <strong>Description:</strong>
                <p>{selectedGameForDescription.description}</p>
              </div>
              <div style={{ 
                padding: "10px", 
                backgroundColor: "#f8f9fa", 
                borderRadius: "4px",
                marginBottom: "15px"
              }}>
                <strong>Status:</strong> {selectedGameForDescription.status}
                {selectedGameForDescription.status === "Unavailable" && (
                  <div>
                    <div><strong>Table:</strong> {selectedGameForDescription.table}</div>
                    <div><strong>Players:</strong> {selectedGameForDescription.playerCount}</div>
                    <div><strong>Time in Use:</strong> {getElapsedTime(selectedGameForDescription.startTime)}</div>
                  </div>
                )}
              </div>
              <div style={{ textAlign: "right" }}>
                <button 
                  onClick={hideDescriptionModal}
                  style={{
                    padding: "8px 16px",
                    backgroundColor: "#6a89cc",
                    color: "white",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer"
                  }}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
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
