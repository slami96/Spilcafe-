import { useState } from "react";
import GameList from "./GameList";
import LogoutButton from "./LogoutButton";

export default function Admin() {
  return (
    <div>
      <div className="admin-header">
        <img src="/images/spilcafe_logo.png" alt="Board Game Cafe Logo" className="cafe-logo" />
        <LogoutButton />
      </div>
      <GameList />
    </div>
  );
}
