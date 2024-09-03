import mongoose from "mongoose";

const { Schema } = mongoose;

const UserSchema = new Schema({
  profilepicture:{
    type:String,
    default:"https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-image-182145777.jpg"
  },

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
  },
  role:{
    type:String,
    required:true
  }
});

const User = mongoose.model("User", UserSchema);

export default User;

