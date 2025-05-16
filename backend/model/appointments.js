const mongoose = require('mongoose');

// It's good practice to ensure consistent naming for schema variables.
// If you have 'appintments_schema' elsewhere, keep it.
// Otherwise, consider 'appointmentSchema' or 'appointmentsSchema'.
const appintments_schema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user", // Make sure 'user' matches the model name used in your User model
        required: true,
    },
    doctor:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "doctor", // Make sure 'doctor' matches the model name used in your Doctor model
        required: true,
    },
    payment:{
        type: String,
        default: 'unpaid'
    },
    status: {
        type: String,
        default: "unchecked", // e.g., "pending", "confirmed", "cancelled", "completed"
    },
    invoice: { // This field might be generated after payment or by an admin
        type: String,
        // 'require: true' is a typo, it should be 'required: true' if this field is mandatory
        // If it's not always present at creation, 'required: false' or omitting it is fine.
        // For now, assuming it might not be required at the moment of creation:
        // required: true, // Uncomment if it IS always required
    },
    disease: { // Or "reason_for_visit"
        type: String,
        default: "Healthy", // Consider if a default is appropriate or if it should be required
        required: true,
    },
    date: { // This should be the appointment date and time
        type: Date,
        required: true,
    },
    about:{ // Additional notes from the patient about the appointment
        type: String,
    },
    medicine:{ // Prescribed medicine by the doctor (likely filled in after the appointment)
        type: [String] // Array of medicine names or objects
    },
}, { timestamps: true }); // Added timestamps for createdAt and updatedAt

// Corrected export:
// The line 'const appointments = mongoose.model("appointments", appintments_schema);' has been removed
// as it's handled by the line below.
module.exports = mongoose.models.appointments || mongoose.model('appointments', appintments_schema);
