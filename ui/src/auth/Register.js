import React, { useState } from "react";
import { useUser } from "../context/UserContext";
import { TextField, Button, Grid, Paper, Snackbar } from "@mui/material"; // Import Material-UI components
import instance from "api/axios";
import { useNavigate } from "react-router-dom";

export const Register = () => {
  const { login } = useUser();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await instance.post("/register", {
        username: formData.username,
        password: formData.password,
      });
      const userData = response.data;
      console.log(userData, " user data");
      // If the registration was successful, update the user context
      if (userData.success) {
        navigate("/login"); // Redirect to the login page
      } else {
        setError("Registration failed. Please try again.");
        setOpen(true);
      }
    } catch (error) {
      setError("An error occurred. Please try again later.");
      setOpen(true);
    }
  };

  return (
    <Grid container justifyContent="center">
      <Grid item xs={10} sm={6} md={4}>
        <Paper elevation={3} style={{ padding: "20px", marginTop: "20px" }}>
          <h2>Register</h2>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <Button type="submit" variant="contained" color="primary">
              Register
            </Button>
          </form>
        </Paper>
      </Grid>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message={error}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      />
    </Grid>
  );
};
