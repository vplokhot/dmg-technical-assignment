import "./App.css";
import React, { useEffect } from "react";
import { Navbar } from "./components/Navbar";
import { BrowserRouter, Outlet } from "react-router-dom";
import { useUser } from "./context/UserContext"; // Import your UserProvider
import { Container } from "@mui/material";
import { AppRoutes } from "routes/routes";

function App() {
  const { login } = useUser();

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("token"));

    if (userData) {
      login(userData);
    }
  }, []);
  return (
    <BrowserRouter>
      <Navbar />
      <AppRoutes />
      <Container>
        <Outlet />
      </Container>
    </BrowserRouter>
  );
}

export default App;
