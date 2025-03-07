import { useState } from "react";
import GameList from "./GameList";

export default function Admin() {
  return (
    <div>
      <h2>Admin Panel</h2>
      <GameList />
    </div>
  );
}
