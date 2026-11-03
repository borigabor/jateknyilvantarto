import React from "react";
import { useState } from "react";
import AuthForm from "../components/AuthForm";
import Welcome from "../components/Welcome";
import { registerUser, loginUser } from "../api/authService";
 
const Home = ({ onLoginSuccess, onLogout }) => {
  const [register, setRegister] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(
  !!localStorage.getItem("token")
);

  const toggleAuthMode = () => {
    setRegister((prev) => !prev);
  };

  const handleAuthSubmit = async (userData) => {
  try {
    if (register) {
      const response = await registerUser(userData);

      if (!response.ok) {
        throw new Error("Sikertelen regisztráció!");
      }

      alert("Sikeres regisztráció!");
      setRegister(false);
    } else {
      const response = await loginUser(userData);

      if (!response.ok) {
        throw new Error("Sikertelen bejelentkezés!");
      }

      const token = await response.text();

      localStorage.setItem("token", token);
      setIsLoggedIn(true);
      onLoginSuccess();

      alert("Sikeres bejelentkezés!");
    }
  } catch (error) {
    alert(error.message);
  }
};

const handleLogout = () => {
  localStorage.removeItem("token");
  onLogout();
  setIsLoggedIn(false);
  setRegister(false);

  alert("Sikeres kijelentkezés!");
};
  
  return (
    <div className="h-screen w-full  flex flex-col items-center bg-dark-surface">
      <h1 className="text-dark-surface">This is the Home Pages</h1>
      {isLoggedIn ? (
  <Welcome onLogout={handleLogout} />
) : (
  <AuthForm
    title={register ? "Regisztráció" : "Bejelentkezés"}
    register={register}
    onToggleMode={toggleAuthMode}
    onSubmit={handleAuthSubmit}
  />
)}

    </div>
  );
};

export default Home;
