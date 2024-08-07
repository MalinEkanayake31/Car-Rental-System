import { errorHandler } from "../utills/error.js";
import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";
import User from "../models/UserModel.js";

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;

  if (
    !username ||
    !email ||
    !password ||
    username === "" ||
    email === "" ||
    password === ""
  ) {
    next(errorHandler(400, "All field are requrired"));
  }

  const hashedpassword = bcryptjs.hashSync(password, 10);

  const newUser = new User({
    username,
    email,
    password: hashedpassword,
  });

  try {
    await newUser.save();
    res.json("Sign up successful");
  } catch (error) {
    next(error);
  }
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password || email === "" || password === "") {
    return next(errorHandler(400, "All fields are required"));
  }

  try {
    const validUser = await User.findOne({ email });
    if (!validUser) {
      return next(errorHandler(404, "User not found"));
    }
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) {
      return next(errorHandler(404, "Invalid password"));
    }

    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
    const { password: pass, ...rest } = validUser._doc;

    res
      .status(200)
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .json(rest);
  } catch (error) {
    next(error);
  }
};

// const { errorHandler } = require("../utills/error")
// const User = require("../models/UserModel")
// const  bcryptjs = require('bcryptjs');
// const jwt =require('jsonwebtoken')

// async function signup(req,res,next){
//     const {username , email ,password}=req.body;

//     if(!username|| !email || !password || username==='' || email==='' || password===''){
//         next(errorHandler(400,'All field are requrired'));
//     }
//     const hashedpassword = bcryptjs.hashSync(password,10);

//     const newUser = new User({
//         username,
//         email,
//         password:hashedpassword,
//     });

//     try {
//         await newUser.save();
//     res.json('sign up sucessfull');
//     } catch (error) {
//         next(error);
//     }

// }

// async function signin (req,res, next){
//     const {email, password} = req.body;

//     if(!email  || !password || email===''||  password===''){
//       return next(errorHandler(400,'All fields are required'));

//     }

//     try{
//     const validUser = await User.findOne({email});
//     if (!validUser){
//       return next(errorHandler(404, 'user not found'));
//     }
//     const validPassword = bcryptjs.compareSync(password,validUser.password);
//     if(!validPassword){
//       return next(errorHandler(404, 'invalid password'));
//     }

//     const token = jwt.sign({id:validUser._id,  }, process.env.JWT_SECRET);
//     const {password: pass, ...rest} =validUser._doc;

//     res.status(200).cookie('access_token', token, {
//      httpOnly:true}).json(rest);
//     }catch(error){
//       next(error);
//     }

//   };

//   module.exports=signin
//   module.exports=signup
