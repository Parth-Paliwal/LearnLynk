
const bcrypt = require("bcryptjs");
const User = require("../../models/Users");
const jwt = require("jsonwebtoken");
const salt = 10;

const registerUser = async(req , res)=>{
    const {userName , userEmail , password , role} = req.body;
    const existingUser = await User.findOne({ $or : [{userName} , {userEmail}] });

    if(existingUser){
        return res.status(400).json({
            success : false,
            message : 'User name or user Email already exists',
        })
    }

    const hashPassword = await bcrypt.hash(password , salt);
    const newUser = new User({userName , userEmail , role , password : hashPassword});

    await newUser.save();

    return res.status(201).json({
        success : true,
        message : "User registered successfully"
    })



}

const loginUser = async(req , res)=>{
    const {userEmail , password} = req.body;
    const checkUser = await User.findOne({userEmail});
    
    if(!checkUser || !(await bcrypt.compare(password , checkUser.password))){
        return res.status(401).json({
            success : false,
            message : "wrong credentials"
        })
    }

    const accessTocken = jwt.sign({
        _id : checkUser._id,
        userName : checkUser.userName,
        userEmail : checkUser.userEmail,
        role : checkUser.role
    } , 'JWT_SECRET' , {expiresIn : '120m'})

    res.status(200).json({
        success : true,
        message : "Logged In successfully",
        data : {
            accessTocken,
            user : {
                _id : checkUser._id,
                userName : checkUser.userName,
                userEmail : checkUser.userEmail,
                role : checkUser.role
            }
        }
    })

}
 

module.exports = {registerUser , loginUser};
