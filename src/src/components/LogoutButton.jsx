import React from 'react';
import { useNavigate } from 'react-router-dom';
import { logoutUser } from '../services/auth';

function LogoutButton() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logoutUser();
      navigate('/login');
    } catch (error) {
      console.error("Failed to log out", error);
    }
  };

  return (
    <button onClick={handleLogout} className="logout-button">
      Log Out
    </button>
  );
}

export default LogoutButton;
