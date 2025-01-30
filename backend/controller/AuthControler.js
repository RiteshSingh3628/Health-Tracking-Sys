const userServices  = require('../services/UserServices');
const jwtProvider = require('../config/jwt');
const bcrypt = require('bcrypt');
const register = async(req,res)=>{
    try {
        const user = await userServices.createUser(req.body);
        const token = jwtProvider.genToken(user);
        return res.status(200).send({token,message:"register success"});
    } catch (error) {
        return res.status(500).send({error: error.message});
    }
}

const login = async(req,res)=>{
    const {password,email} = req.body;
    try {
        const user = await userServices.getUserByEmail(email);
        if(!user) return res.status(404).send({message:"User not found with email"});

        const isPasswordValid = await bcrypt.compare(password,user.password);
        if(!isPasswordValid){
            res.status(401).send({message:"Invalid Password"});
        }
        const token = jwtProvider.genToken(user);
        return res.status(200).send({token,message:"login success"});
    } catch (error) {
        return res.status(500).send({error: error.message});
    }
}

module.exports = {
    register,
    login
}