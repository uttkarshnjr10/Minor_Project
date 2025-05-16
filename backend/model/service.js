const mongoose = require('mongoose');

const service_schema = mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    features:{ // Array of strings describing features of the service
        type:[String],
        required:true
    },
    image:{ // URL for an image representing the service
        type:String,
        required:true
    },
    description: { // Optional: A more detailed description of the service
        type: String
    },
    department: { // Optional: Which department offers this service
        type: String
    },
    // price: { // Optional: If services have a fixed price
    //     type: Number
    // }
}, { timestamps: true }); // Added timestamps for createdAt and updatedAt

// Corrected export line
// The redundant doctor model definition at the end of your original input for service.js has been removed.
module.exports = mongoose.models.service || mongoose.model('service', service_schema);
