import React from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "../../const/axios";

const Logout = () => {
  const navigate = useNavigate(); // Hook para la redirección

  const handleLogout = async () => {
    try {
      await logout();
      localStorage.removeItem("token");
      alert("Logout successful");
      navigate("/login"); // Redirige al login
    } catch (error) {
      alert("Logout failed");
    }
  };

  return <button onClick={handleLogout}>Logout</button>;
};

export default Logout;
