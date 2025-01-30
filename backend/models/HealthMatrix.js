const mongoose = require('mongoose');

const HealthMatrixSchema = new mongoose.Schema({
    userid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    date: {
        type: Date,
        required: true,
        defualt:Date.now
    },
    blood_pressure_systolic:{
        type: Number,
        required: true
    },
    blood_pressure_diastolic:{
        type: Number,
        required: true
    },
    heart_rate:{
        type: Number,
        required: true
    },
    steps:{
        type: Number,
        required: true
    },
    calories_burned:{
        type: Number,
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    
})

const HealthMatrix = mongoose.model('HealthMatrix',HealthMatrixSchema);
module.exports = HealthMatrix;