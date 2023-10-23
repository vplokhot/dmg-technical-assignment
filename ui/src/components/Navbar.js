import React from "react";
import { Link } from "react-router-dom";
import { useUser } from "../context/UserContext";
import { Grid, Typography, Button, AppBar } from "@mui/material";

export const Navbar = () => {
  const { user, logout } = useUser();
  return (
    <AppBar sx={{ padding: "10px" }}>
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid item xs={8} display="flex" gap={2}>
          <Button component={Link} to={{ pathname: "/" }} color="secondary">
            Home
          </Button>
          <Button
            component={Link}
            to={{ pathname: "/miners" }}
            color="secondary"
          >
            Miners
          </Button>
        </Grid>
        <Grid
          item
          xs={4}
          display="flex"
          gap={2}
          justifyContent="flex-end"
          alignItems="center"
        >
          {user ? (
            <>
              <Typography variant="p">Welcome, {user.username}</Typography>
              <Button color="secondary" onClick={logout}>
                Log Out
              </Button>
            </>
          ) : (
            <>
              <Link to={{ pathname: "/login" }}>
                <Button color="secondary">Login</Button>
              </Link>
              <Link to={{ pathname: "/register" }}>
                <Button color="secondary">Register</Button>
              </Link>
            </>
          )}
        </Grid>
      </Grid>
    </AppBar>
  );
};
