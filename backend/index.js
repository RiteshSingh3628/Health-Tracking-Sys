const express  = require('express');
const authRouter = require('./routes/AuthRouter');

const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

app.get("/",(req,res)=>{
    return res.status(200).send({message:"Welcome to health tracker api!"});
})


//creating endpoint for routes
app.use('/auth', authRouter);


module.exports = app;