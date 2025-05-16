import React, { useState } from "react"; // Ensured React is imported
import {
  AppBar,
  Toolbar,
  IconButton,
  Box,
  Button,
  useTheme, // useTheme is already here
  useMediaQuery,
  Avatar,
  Menu,
  MenuItem,
  Tooltip,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
  ListItemIcon,
} from "@mui/material";
import { alpha } from '@mui/material/styles'; // Added MISSING alpha import
import Drawor from "./Drawor";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../slices/Loginslice";
import logo from "../assets/logo.png";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import AssignmentIcon from '@mui/icons-material/Assignment';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings'; // Icon for Admin Dashboard

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const data = useSelector((state) => state.login); // data variable not used, can be removed if not needed for other logic
  // console.log(data);

  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down("md"));
  const [anchorEl, setAnchorEl] = useState(null);
  const [loginMenuAnchorEl, setLoginMenuAnchorEl] = useState(null);

  const userMenuOpen = Boolean(anchorEl);
  const loginMenuOpen = Boolean(loginMenuAnchorEl);

  const item = localStorage.getItem("jwt");
  const is_admin = localStorage.getItem("is_admin");
  const userName = localStorage.getItem("user");

  const handleUserMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleUserMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLoginMenuClick = (event) => {
    setLoginMenuAnchorEl(event.currentTarget);
  };

  const handleLoginMenuClose = () => {
    setLoginMenuAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(logout());
    handleUserMenuClose();
    navigate("/");
  };

  // Style for NavLink components in the main navigation
  const navLinkStyle = ({ isActive }) => ({
    color: isActive ? theme.palette.primary.main : theme.palette.text.primary,
    textDecoration: "none",
    fontWeight: isActive ? "bold" : "normal",
    padding: "8px 12px", // Adjusted padding
    borderRadius: "4px",
    display: 'inline-block', // Ensures padding and hover effects apply correctly
    '&:hover': {
      backgroundColor: alpha(theme.palette.primary.main, 0.08), // Subtle hover
      color: theme.palette.primary.dark,
    },
  });
  
  // Style for MenuItem components in dropdowns
  const menuItemStyle = {
    '&:hover': {
      backgroundColor: theme.palette.action.hover,
    },
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(1), // Consistent gap using theme spacing
  };


  return (
    <>
      <AppBar 
        sx={{ 
          background: "#FFFFFF",
          position: "sticky", 
          top: "0px",
          boxShadow: "0px 2px 4px -1px rgba(0,0,0,0.06), 0px 4px 5px 0px rgba(0,0,0,0.04), 0px 1px 10px 0px rgba(0,0,0,0.08)"
        }}
      >
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Box component={Link} to="/" sx={{ display: 'flex', alignItems: 'center', textDecoration: 'none', '&:hover': { backgroundColor: 'transparent' } }}>
            <IconButton
              size="large"
              aria-label="logo of health haven hospital"
              color="inherit"
              sx={{ p: 0 }} // Remove padding from IconButton if logo itself is clickable
            >
              <img
                style={{
                  width: 60, // Adjusted size
                  height: 50, // Adjusted size
                  objectFit: 'contain',
                }}
                src={logo}
                alt="Health Haven Hospital Logo"
              />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ ml: 1, color: theme.palette.primary.main, fontWeight: 'bold', display: { xs: 'none', sm: 'block' } }}>
              Health Haven
            </Typography>
          </Box>

          {isMatch ? (
            <Drawor />
          ) : (
            <>
              <List
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  gap: "2px", // Minimal gap, padding is on buttons
                  color: theme.palette.text.secondary,
                  alignItems: 'center',
                  padding: 0, // Remove padding from List itself
                }}
              >
                {[{label: "Home", to:"/"}, {label: "Contact", to:"/contact"}, {label: "About", to:"/about"}, {label: "Doctors", to:"/doctor"}, {label: "Services", to:"/services"}, {label: "Ambulance", to:"/ambulance-booking"}].map((navItem) => (
                  <ListItem key={navItem.label} disablePadding>
                    <ListItemButton
                      component={NavLink}
                      to={navItem.to}
                      style={navLinkStyle} // Apply active and hover styles from function
                      sx={{ 
                        textAlign: "center", 
                        textTransform: 'none',
                        // Active styles are now primarily handled by the `style` prop function
                      }}
                    >
                      <ListItemText primary={navItem.label} primaryTypographyProps={{ fontSize: '0.9rem', fontWeight: 500 }} />
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>

              <Box sx={{ marginLeft: "auto", display: 'flex', alignItems: 'center' }}>
                {item && is_admin === "false" ? (
                  <>
                    <Tooltip title={userName || "User Profile"}>
                      <IconButton
                        id="user-menu-button"
                        aria-controls={userMenuOpen ? "user-menu" : undefined}
                        aria-haspopup="true"
                        aria-expanded={userMenuOpen ? "true" : undefined}
                        onClick={handleUserMenuClick}
                        sx={{ p: 0.5, ml: 1 }} // Added some padding to IconButton
                      >
                        <Avatar sx={{ bgcolor: theme.palette.secondary.main, width: 36, height: 36 }}>
                          {userName ? userName.charAt(0).toUpperCase() : <AccountCircleIcon />}
                        </Avatar>
                      </IconButton>
                    </Tooltip>
                    <Menu
                      id="user-menu"
                      anchorEl={anchorEl}
                      open={userMenuOpen}
                      onClose={handleUserMenuClose}
                      MenuListProps={{ "aria-labelledby": "user-menu-button" }}
                      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                      PaperProps={{
                        elevation: 3, // Add some shadow to the menu
                        sx: { borderRadius: '6px' }
                      }}
                    >
                      <MenuItem component={NavLink} to="/appointment" onClick={handleUserMenuClose} sx={menuItemStyle}>
                        <ListItemIcon><AssignmentIcon fontSize="small" /></ListItemIcon>
                        My Appointments
                      </MenuItem>
                      <MenuItem component={NavLink} to="/userprofile" onClick={handleUserMenuClose} sx={menuItemStyle}>
                        <ListItemIcon><AccountCircleIcon fontSize="small" /></ListItemIcon>
                        Profile
                      </MenuItem>
                      <MenuItem onClick={handleLogout} sx={menuItemStyle}>
                        <ListItemIcon><ExitToAppIcon fontSize="small" /></ListItemIcon>
                        Logout
                      </MenuItem>
                    </Menu>
                  </>
                ) : item && is_admin === "true" ? (
                  <>
                     <Tooltip title={userName || "Admin Menu"}>
                      <IconButton
                        id="admin-menu-button"
                        onClick={handleUserMenuClick}
                        sx={{ p: 0.5, ml: 1 }}
                      >
                        <Avatar sx={{ bgcolor: theme.palette.primary.main, width: 36, height: 36 }}>
                          {userName ? userName.charAt(0).toUpperCase() : <AdminPanelSettingsIcon />}
                        </Avatar>
                      </IconButton>
                    </Tooltip>
                    <Menu
                      id="admin-menu"
                      anchorEl={anchorEl}
                      open={userMenuOpen}
                      onClose={handleUserMenuClose}
                      MenuListProps={{ "aria-labelledby": "admin-menu-button" }}
                      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                      PaperProps={{
                        elevation: 3,
                        sx: { borderRadius: '6px' }
                      }}
                    >
                      <MenuItem component={NavLink} to="/admin/dashboard" onClick={handleUserMenuClose} sx={menuItemStyle}> 
                        <ListItemIcon><AdminPanelSettingsIcon fontSize="small" /></ListItemIcon>
                        Admin Dashboard
                      </MenuItem>
                       <MenuItem component={NavLink} to="/userprofile" onClick={handleUserMenuClose} sx={menuItemStyle}>
                        <ListItemIcon><AccountCircleIcon fontSize="small" /></ListItemIcon>
                        Profile
                      </MenuItem>
                      <MenuItem onClick={handleLogout} sx={menuItemStyle}>
                        <ListItemIcon><ExitToAppIcon fontSize="small" /></ListItemIcon>
                        Logout
                      </MenuItem>
                    </Menu>
                  </>
                ) : (
                  <Box sx={{ display: "flex", alignItems: "center", gap: "12px" }}> {/* Increased gap */}
                    <Button
                      id="login-button"
                      aria-controls={loginMenuOpen ? 'login-menu' : undefined}
                      aria-haspopup="true"
                      aria-expanded={loginMenuOpen ? 'true' : undefined}
                      onClick={handleLoginMenuClick}
                      variant="outlined"
                      color="primary"
                      size="small" // Made buttons slightly smaller
                      sx={{ 
                        textTransform: 'none',
                        fontWeight: '600',
                        borderRadius: '20px', // More rounded
                         padding: '5px 15px',
                        '&:hover': {
                            backgroundColor: alpha(theme.palette.primary.main, 0.08),
                        }
                      }}
                    >
                      Login
                    </Button>
                    <Menu
                      id="login-menu"
                      anchorEl={loginMenuAnchorEl}
                      open={loginMenuOpen}
                      onClose={handleLoginMenuClose}
                      MenuListProps={{ 'aria-labelledby': 'login-button' }}
                      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                       PaperProps={{
                        elevation: 3,
                        sx: { borderRadius: '6px' }
                      }}
                    >
                      <MenuItem component={NavLink} to="/login" onClick={handleLoginMenuClose} sx={menuItemStyle}>Login as User</MenuItem>
                      <MenuItem component={NavLink} to="/doctorlogin" onClick={handleLoginMenuClose} sx={menuItemStyle}>Login as Doctor</MenuItem>
                    </Menu>
                    <Button
                      variant="contained"
                      color="primary"
                      size="small" // Made buttons slightly smaller
                      sx={{ 
                        textTransform: 'none',
                        fontWeight: '600',
                        boxShadow: 'none',
                        borderRadius: '20px', // More rounded
                        padding: '5px 15px',
                        '&:hover': {
                            backgroundColor: theme.palette.primary.dark,
                        }
                      }}
                      component={Link}
                      to="/SignUp"
                    >
                      Sign Up
                    </Button>
                  </Box>
                )}
              </Box>
            </>
          )}
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Navbar;