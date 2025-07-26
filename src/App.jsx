import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import Dashboard from "./components/Dashboard";
import Orders from "./components/Orders";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import Topbar from "./components/Topbar";
import useIsMobile from "./hooks/useIsMobile";
function App() {

  const { user } = useAuth();
  const isMobile = useIsMobile();
  const PrivateRoute = ({ children }) => {
    return user ? children : <Navigate to="/login" />;
  };

  return (
    <BrowserRouter>
      {user && (isMobile ? <Navbar /> : <Topbar />)}
      <div className="flex flex-col flex-1">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/orders"
            element={
              <PrivateRoute>
                <Orders />
              </PrivateRoute>
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;