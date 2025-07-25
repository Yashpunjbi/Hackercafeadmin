import { useContext } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import Dashboard from "./components/Dashboard";
import Orders from "./components/Orders";
import Login from "./components/Login";
import { AuthContext } from "./context/AuthContext";

function App() {
  const { currentUser } = useContext(AuthContext);

  const RequireAuth = ({ children }) => {
    return currentUser ? children : <Navigate to="/login" />;
  };

  return (
    <Router>
      <div className="flex h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
        {currentUser && <Sidebar />}
        <div className="flex-1 flex flex-col">
          {currentUser && <Topbar />}
          <div className="p-4 overflow-auto">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/" element={<RequireAuth><Dashboard /></RequireAuth>} />
              <Route path="/orders" element={<RequireAuth><Orders /></RequireAuth>} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;