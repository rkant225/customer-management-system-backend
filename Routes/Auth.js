const express = require('express');
const User = require('../Models/User');

const Router = express.Router();
const defaultResponse = {isSuccessfull : true};

Router.post('/register', async (req,res,next)=>{
    const {name, password, mobileNo} = req.body;
    try{
        const existingUser = await User.findOne({mobileNo : mobileNo});
        if(!existingUser){
            const createdUser = new User({
                name : name,
                password : password,
                mobileNo : mobileNo,
            });
            await createdUser.save();

            const newUserExcludingPassword = await User.findById(createdUser.id).select("-password");
    
            res.status(200);
            res.send({...defaultResponse, user : newUserExcludingPassword});
        } else {
            res.status(200);
            res.send({isSuccessfull : false, errorMessage : 'User with this Mobile No. is already registered.'})
        }
    } catch(err){
        res.status(200);
        res.send({isSuccessfull : false, errorMessage : 'Something went wrong, Unable to add user.',  error : err})
    }
});

Router.post('/login', async (req, res, next)=>{
    try{
        const {mobileNo, password} = req.body;
        const existingUser = await User.findOne({mobileNo : mobileNo}).exec();
        if(existingUser){
            const isValidPassword = password == existingUser.password;
            if(isValidPassword){
                res.status(200);
                const userWithoutPassword = await User.findById(existingUser.id).select('-password');
                res.send({...defaultResponse, user : userWithoutPassword})
            } else {
                res.status(200);
                res.send({isSuccessfull : false, errorMessage : 'Invalid password.'})
            }

        } else {
            res.status(200);
            res.send({isSuccessfull : false, errorMessage : 'User not found.'})
        }

    }catch(err){
        res.status(200);
        res.send({isSuccessfull : false, errorMessage : 'Something went wrong, Unable to login.',  error : err})
    }
})

module.exports = Router;