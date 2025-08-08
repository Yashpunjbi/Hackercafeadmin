seimport { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import Dashboard from "./components/Dashboard";
import Orders from "./components/Orders";
import Products from "./components/Products";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import Topbar from "./components/Topbar";
import useIsMobile from "./hooks/useIsMobile";
import OffersAdmin from "./components/OffersAdmin";
import Banners from "./components/Banners";
import Categories from "./components/Categories";
import PromoCodeManager from './components/PromoCodeManager';

function App() {
  const { user } = useAuth();
  const isMobile = useIsMobile();

  const PrivateRoute = ({ children }) => {
    return user ? children : <Navigate to="/login" />;
  };

  return (
    <BrowserRouter>
      {user && (isMobile ? <Sidebar /> : <Topbar />)}

      <div className="flex flex-col p-4">
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

          <Route
            path="/products"
            element={
              <PrivateRoute>
                <Products />
              </PrivateRoute>
            }
          />

          <Route
            path="/offersadmin"
            element={
              <PrivateRoute>
                <OffersAdmin />
              </PrivateRoute>
            }
          />

          <Route
            path="/banners"
            element={
              <PrivateRoute>
                <Banners />
              </PrivateRoute>
            }
          />

          <Route
            path="/categories"
            element={
              <PrivateRoute>
                <Categories />
              </PrivateRoute>
            }
          />

<Route
  path="/promo-codes"
  element={
    <PrivateRoute>
      <PromoCodeManager />
    </PrivateRoute>
  }
/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;