import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Admin from "./components/Admin";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Admin />} />
      </Routes>
    </Router>
  );
}
