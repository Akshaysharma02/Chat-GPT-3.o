import React from "react";
import { Box, Typography, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
const Navbar = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const loggedIn = JSON.parse(localStorage.getItem("authToken"));

  //handle logout
  const handleLogout = async () => {
    try {
      await axios.post("/api/v1/auth/logout");
      localStorage.removeItem("authToken");
      toast.success("logout successfully ");
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Box
      width={"100%"}
      backgroundColor={theme.palette.background.alt}
      p="1rem 6%"
      textAlign={"center"}
      sx={{ boxShadow: 3, mb: 2,  bgcolor:"orange" , color:"white"}}
    >
      <Typography variant="h1" color="black" fontWeight="bold">
        CHAT GPT 3.o 
      </Typography>
      {loggedIn ? (
        <>
          <NavLink to="/" p={1}>
            <button> Home </button>
          </NavLink>
          <NavLink to="/login" onClick={handleLogout} p={1}>
            <button> Logout </button>
          </NavLink>
        </>
      ) : (
        <>
          <NavLink to="/register" p={1}>
            <button> Sign Up </button>
          </NavLink>
          <NavLink to="/login" p={1}>
            <button> Log In </button>
          </NavLink>
        </>
      )}
    </Box>
  );
};

export default Navbar;
