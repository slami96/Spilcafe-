import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Admin from "./components/Admin";
import { AuthProvider } from './contexts/AuthContext';
import Login from './components/Login';

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Admin />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}
