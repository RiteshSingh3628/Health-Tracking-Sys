const app = require('.');
const PORT = 3000;
require('dotenv').config;
// connecting db
require('./config/db');

//listning port
app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`);
})