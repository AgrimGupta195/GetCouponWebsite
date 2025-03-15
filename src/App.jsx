import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import Navbar from "./components/Navbar";
import { useUserStore } from "./stores/useUserStore";
import { Toaster } from "react-hot-toast";
import { useCallback, useEffect } from "react";
import LoadingSpinner from "./components/LoadinSpinner";
import Dashboard from "./pages/DashBoard";

function App() {
  const { user, checkAuth, checkingAuth } = useUserStore();
  const handleCheckAuth = useCallback(() => {
    checkAuth();
  }, [checkAuth]);
  useEffect(() => {
    handleCheckAuth();
  }, [handleCheckAuth]); 

  if (checkingAuth) return <LoadingSpinner />; // Show loading while checking auth

  return (
    <div className="min-h-screen bg-gray-900 text-white relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(ellipse_at_top,rgba(16,185,129,0.3)_0%,rgba(10,80,60,0.2)_45%,rgba(0,0,0,0.1)_100%)]" />
        </div>
      </div>
      <div className="relative z-50 pt-20">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/login"
            element={!user ? <LoginPage /> : <Navigate to="/dashboard" />}
          />
          <Route path="/dashboard" element={user ? <Dashboard/> : <Navigate to="/" />} />
        </Routes>
      </div>
      <Toaster />
    </div>
  );
}

export default App;
