import React, { useState } from 'react';
import {
  Box,
  Container,
  Grid,
  Typography,
  TextField,
  Button,
} from '@mui/material';
import { Email, Phone, LocationOn } from '@mui/icons-material';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const ContactUsPage = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [contact, setContact] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      name,
      email,
      message,
      contact,
    };
    try {
      // Ensure the API endpoint is correct and the backend is running
      const response = await axios.post('http://localhost:8080/patient/patientmessage', data);
      if (response.status === 200) {
        toast.success(response.data.message || "Message sent successfully!");
        setName(""); // Clear fields after successful submission
        setEmail("");
        setMessage("");
        setContact("");
        // navigate("/"); // Optional: navigate after success
      } else {
        toast.error(response.data.message || "Failed to send message.");
      }
    } catch (error) {
      console.error("Error submitting contact form:", error);
      toast.error(error.response?.data?.message || "An error occurred. Please try again.");
    }
  };

  return (
    <Box py={4} sx={{ backgroundColor: '#ced3db' }}> {/* Light greyish-blue background */}
      <Container maxWidth="md">
        <Typography variant="h4" align="center" gutterBottom sx={{ color: '#1a237e' }}> {/* Darker color for title */}
          Contact Us
        </Typography>

        <Grid container spacing={2} alignItems="center" mt={3}>
          <Grid item xs={12} sm={6}>
            <Box display="flex" alignItems="center">
              <Email sx={{ mr: 1, color: '#00796b' }} /> {/* Icon color */}
              <Typography variant="body1" sx={{ color: '#212121' }}> {/* Dark text color for visibility */}
                Email: Team@IISTgmail.com
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box display="flex" alignItems="center">
              <Phone sx={{ mr: 1, color: '#00796b' }} /> {/* Icon color */}
              <Typography variant="body1" sx={{ color: '#212121' }}> {/* Dark text color for visibility */}
                Phone: +91-9862164447
              </Typography>
            </Box>
          </Grid>
        </Grid>

        <Box mt={4}>
          <Typography variant="h6" gutterBottom sx={{ color: '#3f51b5' }}> {/* Darker color for subtitle */}
            Address
          </Typography>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} sm={6}> {/* Adjusted grid for potentially longer addresses */}
              <Box display="flex" alignItems="center">
                <LocationOn sx={{ mr: 1, color: '#d32f2f' }} /> {/* Icon color */}
                <Typography variant="body1" sx={{ color: '#212121' }}> {/* Dark text color for visibility */}
                  123 Health St, Medical Nagar,
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
               <Box display="flex" alignItems="center">
                 <LocationOn sx={{ mr: 1, color: '#d32f2f', visibility: 'hidden' }} /> {/* Hidden icon for alignment if needed */}
                 <Typography variant="body1" sx={{ color: '#212121' }}> {/* Dark text color for visibility */}
                    Indore, Madhya Pradesh, 452001
                 </Typography>
               </Box>
            </Grid>
          </Grid>
        </Box>

        <Box mt={4}>
          <Typography variant="h6" gutterBottom sx={{ color: '#3f51b5' }}> {/* Darker color for subtitle */}
            Map
          </Typography>
          <Box 
            height={400} 
            mt={2} 
            sx={{ 
              width: '100%', 
              borderRadius: '8px', // Added rounded corners to map container
              overflow: 'hidden', // Ensures iframe respects border radius
              boxShadow: '0 4px 8px rgba(0,0,0,0.1)' // Added subtle shadow
            }}
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3680.092514211048!2d75.77210987521516!3d22.725644279397404!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39630386717aa4cd%3A0x62d0bbdd0cb09f13!2sIndore%20Institute%20of%20Science%20and%20Technology!5e0!3m2!1sen!2sin!4v1715597014204!5m2!1sen!2sin
" // This should be a valid Google Maps embed URL for Indore
              width="100%"
              height="100%" // Changed to 100% to fill the Box height
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Google Map of Indore"
            ></iframe>
          </Box>
        </Box>

        <Box mt={4} p={3} sx={{ backgroundColor: '#ffffff', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}> {/* Form container styling */}
          <Typography variant="h6" gutterBottom sx={{ color: '#3f51b5' }}> {/* Darker color for subtitle */}
            Contact Form
          </Typography>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Name"
                  variant="outlined"
                  fullWidth
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Email"
                  variant="outlined"
                  type="email" // Added type email for validation
                  fullWidth
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}> {/* Changed sm to 6 to align with others if desired, or keep 12 for full width */}
                <TextField
                  label="Contact Number"
                  variant="outlined"
                  type="tel" // Added type tel
                  fullWidth
                  required
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Message"
                  variant="outlined"
                  multiline
                  rows={4}
                  fullWidth
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <Button variant="contained" color="primary" type="submit" sx={{backgroundColor: '#00796b', '&:hover': {backgroundColor: '#004d40'} }}>
                  Submit
                </Button>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Container>
    </Box>
  );
};

export default ContactUsPage;
