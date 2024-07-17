import React from "react";
import { logout } from "../../const/axios";

const Logout = () => {
  const handleLogout = async () => {
    try {
      await logout();
      localStorage.removeItem("token");
      alert("Logout successful");
    } catch (error) {
      alert("Logout failed");
    }
  };

  return <button onClick={handleLogout}>Logout</button>;
};

export default Logout;
