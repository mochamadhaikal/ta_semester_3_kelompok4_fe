import { AppBar, Button, Toolbar, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
// Import lainnya...

function Navbar() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h5" sx={{ marginRight: 5 }}>
          Risa's DVD library
        </Typography>
        <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
          <Button color="inherit">Home</Button>
        </Link>
        <Link to="/dvd" style={{ color: "inherit", textDecoration: "none" }}>
          <Button color="inherit">DVD</Button>
        </Link>
        <Link to="/friend" style={{ color: "inherit", textDecoration: "none" }}>
          <Button color="inherit">Friend</Button>
        </Link>
        <Link to="/loan" style={{ color: "inherit", textDecoration: "none" }}>
          <Button color="inherit">Loan</Button>
        </Link>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
