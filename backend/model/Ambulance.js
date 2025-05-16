const mongoose = require('mongoose');

// This is a plausible schema based on your backend controller for ambulance booking.
// Please verify if these are the correct fields for your ambulance bookings.
const ambulance_schema = mongoose.Schema({
    name: { // Name of the person booking or for whom it's booked
        type: String,
        required: true,
    },
    phoneNumber: {
        type: String,
        required: true,
    },
    address: { // Pickup address
        type: String,
        required: true,
    },
    emergencyType: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    state: {
        type: String,
        required: true,
    },
    zip: {
        type: String,
        required: true,
    },
    status: { // e.g., "Pending", "Dispatched", "OnSite", "Transporting", "Completed", "Cancelled"
        type: String,
        default: "Pending"
    },
    // You might want to add references to a user if a logged-in user books it
    // user: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "user"
    // },
    // You might also want to add details about the assigned ambulance vehicle or driver if you manage a fleet
}, { timestamps: true }); // Added timestamps for createdAt and updatedAt

// Corrected export line
module.exports = mongoose.models.ambulance || mongoose.model('ambulance', ambulance_schema);
