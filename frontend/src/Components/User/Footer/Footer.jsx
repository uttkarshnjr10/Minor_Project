import React from 'react';
import { Avatar, Box, Chip, Container, Divider, Grid, Stack, styled, Typography } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EmailIcon from '@mui/icons-material/Email';
import HealingTwoToneIcon from '@mui/icons-material/HealingTwoTone';
import CallIcon from '@mui/icons-material/Call';
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
// import { pink } from '@mui/material/colors'; // pink is no longer used
import { NavLink } from 'react-router-dom';

// This Root component is used for the Divider with a Chip in the middle.
// We'll ensure its styles are compatible with the new footer theme.
const Root = styled('div')(({ theme }) => ({
    width: '100%',
    ...theme.typography.body2,
    '& > :not(style) + :not(style)': {
        marginTop: theme.spacing(2),
    },
    // Style for the Divider within Root, to make it visible on dark background
    '& .MuiDivider-root': {
        '&::before, &::after': {
            borderColor: 'rgba(255, 255, 255, 0.3)', // Light border for divider lines
        },
    },
}));

// Copyright function for generate year automatically
function Copyright(props) {
    return (
        <Typography variant="body2" sx={{ color: '#B0C4DE' }} align="center" {...props}> {/* LightSteelBlue color for copyright */}
            {'Developed with 💙 by '}
            <a style={{ color: '#87CEFA', textDecoration: 'none' }} href="https://www.linkedin.com/in/utkarsh-agarwal-1a7798231/" target="_blank" rel="noreferrer noopener"> {/* LightSkyBlue for link */}
                <strong>Uttkarsh | Vansh | Suman </strong>
            </a>
            {' © '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const Footer = () => {
    const linkStyles = {
        color: 'white',
        textDecoration: 'none',
        '&:hover': {
            color: '#ADD8E6', // Light blue hover
            textDecoration: 'underline',
        },
    };

    const iconAvatarStyles = {
        bgcolor: 'rgba(255, 255, 255, 0.15)', // Subtle background for avatars
        color: 'white', // White icons
        width: 32,  // Slightly smaller avatars for a cleaner look
        height: 32,
    };
    
    const iconStyles = {
        fontSize: '1rem' // Smaller icons within avatars
    }

    return (
        <footer>
            {/* Main footer container with a dark blue background */}
            <Box
                className='sticky-container' // Assuming this class handles stickiness if needed
                sx={{
                    bgcolor: '#0D1B2A', // Dark Sapphire Blue background
                    color: 'white',     // Default text color to white
                    mt: 3,
                    pt: 4, // Increased top padding
                    pb: 3, // Increased bottom padding
                    top: 'auto'
                }}
            >
                <Container maxWidth="xl">
                    <Grid container
                        spacing={{ xs: 2, md: 4 }} // Adjusted spacing
                        columns={{ xs: 4, sm: 8, md: 12 }}
                        justifyContent="space-between" // Better alignment for columns
                    >
                        {/* Column 1: Hospital Info & Contact */}
                        <Grid item xs={12} sm={4} md={4}>
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                <Avatar sx={{ mr: 1.5, bgcolor: 'white' }}>
                                    <HealingTwoToneIcon
                                        sx={{ color: '#007BFF' }} // Using a specific blue for the primary icon
                                        fontSize='medium' />
                                </Avatar>
                                <Typography
                                    variant="h6"
                                    component="div"
                                    sx={{ color: 'white', fontWeight: 'bold' }}
                                >
                                    IIST Medical Services
                                </Typography>
                            </Box>
                            {/* Using Typography for text next to icons for consistent styling */}
                            <Stack direction="row" alignItems="center" spacing={1.5} sx={{ mb: 1.5 }}>
                                <Avatar sx={iconAvatarStyles}>
                                    <LocationOnIcon sx={iconStyles} />
                                </Avatar>
                                <Typography variant="body2" sx={{ color: '#E0E0E0' }}>Indore, India</Typography>
                            </Stack >

                            <Stack direction="row" alignItems="center" spacing={1.5} sx={{ mb: 1.5 }}>
                                <Avatar sx={iconAvatarStyles}>
                                    <EmailIcon sx={iconStyles} />
                                </Avatar>
                                <Typography variant="body2" component="a" href="mailto:Team@IISTgmail.com" sx={linkStyles}>
                                    Team@IISTgmail.com
                                </Typography>
                            </Stack >

                            <Stack direction="row" alignItems="center" spacing={1.5} sx={{ mb: 1.5 }}>
                                <Avatar sx={iconAvatarStyles}>
                                    <CallIcon sx={iconStyles} />
                                </Avatar>
                                <Typography variant="body2" component="a" href="tel:+916205407403" sx={linkStyles}>
                                    +91-6204011111
                                </Typography>
                            </Stack >
                        </Grid>

                        {/* Column 2: Our Services Links */}
                        <Grid item xs={12} sm={4} md={3}> {/* Adjusted grid size */}
                            <Root sx={{ mb: 1.5 }}> {/* Root component for Divider + Chip */}
                                <Divider>
                                    <Chip label="Our Services" sx={{ bgcolor: 'rgba(255, 255, 255, 0.15)', color: 'white', fontSize: '0.875rem' }} />
                                </Divider>
                            </Root>
                            {/* Using Typography for NavLinks for consistent styling and better control */}
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.8 }}>
                                <Typography component={NavLink} to='/doctor' sx={linkStyles}>Find a Doctor</Typography>
                                <Typography component={NavLink} to='/services' sx={linkStyles}>All Services</Typography>
                                <Typography component={NavLink} to='/doctor' sx={linkStyles}>Make An Appointment</Typography> {/* Consider a more specific link like /appointment */}
                                <Typography component={NavLink} to='/contact' sx={linkStyles}>Contact Us</Typography>
                            </Box>
                        </Grid>

                        {/* Column 3: Social Media Links */}
                        <Grid item xs={12} sm={4} md={3}> {/* Adjusted grid size */}
                            <Root sx={{ mb: 1.5 }}> {/* Root component for Divider + Chip */}
                                <Divider>
                                    <Chip label="Connect With Us" sx={{ bgcolor: 'rgba(255, 255, 255, 0.15)', color: 'white', fontSize: '0.875rem' }} />
                                </Divider>
                            </Root>
                             <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.8 }}>
                                <Stack component="a" href="https://facebook.com" target="_blank" rel="noopener noreferrer" direction="row" alignItems="center" spacing={1.5} sx={linkStyles}>
                                    <Avatar sx={iconAvatarStyles}> <FacebookIcon sx={iconStyles}/> </Avatar>
                                    <Typography variant="body2">Facebook</Typography>
                                </Stack >
                                <Stack component="a" href="https://linkedin.com" target="_blank" rel="noopener noreferrer" direction="row" alignItems="center" spacing={1.5} sx={linkStyles}>
                                    <Avatar sx={iconAvatarStyles}> <LinkedInIcon sx={iconStyles}/> </Avatar>
                                    <Typography variant="body2">LinkedIn</Typography>
                                </Stack >
                                <Stack component="a" href="https://github.com" target="_blank" rel="noopener noreferrer" direction="row" alignItems="center" spacing={1.5} sx={linkStyles}>
                                    <Avatar sx={iconAvatarStyles}> <GitHubIcon sx={iconStyles}/> </Avatar>
                                    <Typography variant="body2">GitHub</Typography>
                                </Stack >
                            </Box>
                        </Grid>
                    </Grid>

                    {/* Final Divider before Copyright */}
                    <Divider sx={{ mt: 3, mb: 2, borderColor: 'rgba(255, 255, 255, 0.2)' }} />
                    <Copyright />
                </Container>
            </Box>
        </footer>
    );
};

export default Footer;
