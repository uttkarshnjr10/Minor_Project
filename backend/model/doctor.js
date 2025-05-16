const mongoose = require('mongoose');

const doctor_schema = mongoose.Schema({
    name:{
        type:String,
        // default:"Dr. Ram Swami ayer", // Consider removing default if names are always unique and provided
        required:true,
    },
    expertise:{
        type:[String],
        required:true
    },
    image:{
        type:String,
        // default:"https://img.freepik.com/premium-vector/doctor-surgeon-pharmacist-therapist-with-stethoscope-smiling-medic-worker-medical-staff_458444-338.jpg", // Consider if a default image is always appropriate
        required:true
    },
    email:{
        type:String,
        required:true,
        unique: true // Emails should typically be unique for login purposes
    },
    password:{
        type:String,
        required:true
    },
    contact:{
        type:String,
        required:true
    },
    desc:{ // Description of the doctor
        type:String,
        required:true
    },
    date:{ // Availability (e.g., ["Monday 10am-1pm", "Wednesday 2pm-5pm"])
        type:[String],
        required:true
    },
    ammount:{ // Consultation fee
        type:Number,
        required:true
    },
    is_doctor:{
        type:Boolean,
        default:true
    }
}, { timestamps: true }); // Added timestamps for createdAt and updatedAt

// Corrected export line
module.exports = mongoose.models.doctor || mongoose.model('doctor', doctor_schema);
