import { useState } from "react";
import GameList from "./GameList";
export default function Admin() {
  return (
    <div>
      <img src="/images/spilcafe_logo .png" alt="Board Game Cafe Logo" className="cafe-logo" />
      <GameList />
    </div>
  );
}

