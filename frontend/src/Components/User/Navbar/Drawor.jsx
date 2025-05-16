import React from 'react'; // React was already imported
import { Drawer, List, Divider, ListItemButton, ListItemText, IconButton, Box, Typography, Avatar, ListItemIcon } from '@mui/material'; // Added ListItemIcon
import MenuIcon from '@mui/icons-material/Menu';
import { Link, NavLink } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import ContactsIcon from '@mui/icons-material/Contacts';
import InfoIcon from '@mui/icons-material/Info';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import PeopleIcon from '@mui/icons-material/People';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { useTheme, alpha } from '@mui/material/styles';


const Drawor = () => {
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  // Common style for drawer ListItems, incorporating active state
  const drawerListItemStyle = (isActive) => ({
    padding: '10px 20px', // Adjusted padding
    borderRadius: '4px',
    margin: '4px 0', // Add some margin between items
    color: isActive ? theme.palette.primary.main : theme.palette.text.primary,
    backgroundColor: isActive ? alpha(theme.palette.primary.main, 0.1) : 'transparent',
    '&:hover': {
      backgroundColor: alpha(theme.palette.primary.main, 0.08),
      color: isActive ? theme.palette.primary.main : theme.palette.primary.dark, // Keep active color on hover
    },
    '& .MuiListItemIcon-root': { // Style icon
        color: isActive ? theme.palette.primary.main : theme.palette.text.secondary,
        minWidth: '36px', // Slightly reduced icon spacing
    },
    '& .MuiListItemText-primary': {
        fontWeight: isActive ? '600' : '500',
        fontSize: '0.95rem',
    }
  });
  
  const drawerItems = [
    { text: "Home", to: "/", icon: <HomeIcon fontSize="small"/> },
    { text: "Contact Us", to: "/contact", icon: <ContactsIcon fontSize="small"/> },
    { text: "About Us", to: "/about", icon: <InfoIcon fontSize="small"/> },
    { text: "Services", to: "/services", icon: <MedicalServicesIcon fontSize="small"/> },
    { text: "Doctors", to: "/doctor", icon: <PeopleIcon fontSize="small"/> },
  ];

  const authDrawerItems = [
    { text: "User Login", to: "/login", icon: <ExitToAppIcon fontSize="small"/> },
    { text: "Doctor Login", to: "/doctorlogin", icon: <ExitToAppIcon fontSize="small"/> },
    { text: "Sign Up", to: "/SignUp", icon: <PersonAddIcon fontSize="small"/> },
  ];

  return (
    <>
      <IconButton sx={{ color: theme.palette.text.primary, marginLeft: "auto" }} onClick={toggleDrawer(true)}>
        <MenuIcon />
      </IconButton>
      <Drawer anchor="right" open={open} onClose={toggleDrawer(false)} PaperProps={{sx: {borderTopLeftRadius: '16px', borderBottomLeftRadius: '16px'}}}> {/* Added rounded corners to Drawer paper */}
        <Box
          sx={{ width: 260, p: 2, display: 'flex', flexDirection: 'column', height: '100%' }}
          role="presentation"
        >
          <Typography variant="h6" sx={{ mb: 2, ml: 0.5, color: theme.palette.primary.main, fontWeight:'bold' }}>Menu</Typography>
          <List sx={{flexGrow: 1}}> {/* Allow list to grow */}
            {drawerItems.map((item) => (
              <ListItemButton 
                key={item.text} 
                component={NavLink} 
                to={item.to} 
                onClick={toggleDrawer(false)} // Close drawer on click
                style={({ isActive }) => drawerListItemStyle(isActive)} // Use style prop for NavLink active state
              >
                 <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            ))}
          </List>
          <Divider sx={{ my: 1 }} />
          <List>
            {authDrawerItems.map((item) => (
              <ListItemButton 
                key={item.text} 
                component={NavLink} 
                to={item.to} 
                onClick={toggleDrawer(false)} // Close drawer on click
                style={({ isActive }) => drawerListItemStyle(isActive)} // Use style prop for NavLink active state
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            ))}
          </List>
        </Box>
      </Drawer>
    </>
  );
};

export default Drawor;

