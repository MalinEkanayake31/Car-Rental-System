import mongoose from "mongoose";

const { Schema } = mongoose;

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  nic:{
    type:String,
    //required:true,
  },
  mobile:{
    type:String,
    //required:true,
  }
});

const User = mongoose.model("User", UserSchema);

export default User;

// const mongoose=require('mongoose');

// const Schema = mongoose.Schema;

// const UserSchema = new Schema({
// username:{
//     type: String,
//     required: true
// },

// email:{
//     type: String,
//     required: true
// },

// password:{
//     type: String,
//     required: true
// },

// })

// const User = mongoose.model("User",UserSchema);

// module.exports=User
