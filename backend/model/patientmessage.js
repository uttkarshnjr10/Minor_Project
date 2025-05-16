const mongoose = require('mongoose');

// This schema is for patient messages/queries, not for patient user accounts.
// Your user accounts are likely in user.js.
const patient_query_schema = mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true
    },
    contact:{
        type:String,
        required:true
    },
    message:{
        type:String,
        required: true
    },
    is_resolved: { // Optional: to track if the query has been addressed
        type: Boolean,
        default: false
    }
}, { timestamps: true }); // Added timestamps for createdAt and updatedAt

// Corrected export line:
// Note: The model name is 'patient_query' and the schema variable is 'patient_query_schema'
// The original code had 'const pquery = mongoose.model("patient_query",patient_query); module.exports = pquery;'
// Assuming 'patient_query' was a typo for 'patient_query_schema' in the original model creation.
module.exports = mongoose.models.patient_query || mongoose.model('patient_query', patient_query_schema);
