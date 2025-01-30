const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/healthTracking');

// Access the connection object
const db = mongoose.connection;

// Event listeners for connection
db.on('connected', () => {
    console.log('Connected to MongoDB');
});

db.on('error', (err) => {
    console.log('Error connecting to MongoDB', err);
});

db.on('disconnected', () => {
    console.log('Disconnected from MongoDB');
});

// Export the connection to use in other parts of the app
module.exports = db;
