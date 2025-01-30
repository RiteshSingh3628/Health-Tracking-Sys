const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwtProvider = require('../config/jwt');


function calculateAge(dob) {
    const today = new Date();
    const birthDate = new Date(dob);

    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    // Adjust the age if the birth date has not yet occurred this year
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }

    return age;
}




// creating user 
const createUser = async(userData)=>{

    try {

        // Checking if email already exists or not
        const email = userData.email;
        const isuser = await User.findOne({ email });
        if (isuser) {
            throw new Error('Email already exists with email',email);
        }

        // Hashing password
        const hashedPassword = await bcrypt.hash(userData.password, 10);
        // updating age from dob
      
        const age = calculateAge(userData.dob);
        // Creating new user
        const user = new User({...userData, password: hashedPassword,age:age });
        await user.save();
        console.log("created new user",user);
        return user;
        
    }
    catch (error) {
        console.error("error while creating user");
        throw new Error(error.message);
    }

}

// find user by id
const findUserById = async(userId)=>{
    try {
        const user = await User.findUserById(userId);
        if (!user) {
            throw new Error('User not found with id', userId);
        }
        console.log("found user",user);
        return user;
        
    } catch (error) {
        console.error("error while finding userbyId");
        throw new Error(error.message);
        
    }
    
}

// get user profile by token
const userProfile = async(token)=>{
    try {

        const userId = jwtProvider.getUserIdFromToken(token);
        const user = await findUserById(userId);
        if(!user){
            throw new Error('User not found with id',userId);
        }
        console.log("user profile",user);
        return user;
         
    } catch (error) {
        console.error("error while finding userbyId",error);
        throw new Error(error.message);
    }
}

// getting all users
const getAllUsers = async()=>{

    try {
        const users = await User.find();
        return users
        
    } catch (error) {
        throw new Error("error while getting allusers",error.message);
    }
}

const getUserByEmail = async(email)=>{
    try {
        const user = await User.findOne({ email });
        if (!user) {
            throw new Error('User not found with email', email);
        }
        return user;
        
    } catch (error) {
        console.error("error while finding user by email",error);
        throw new Error(error.message);
    }
}
module.exports = {createUser,getAllUsers,findUserById,userProfile,getUserByEmail};