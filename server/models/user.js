import mongoose from "mongoose";
const userSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  pic:{type:String,required:true,default:"https://icon-library.com/images/22215-dog.ico.ico"}
},{
    timestamps:true,
});

const User=mongoose.model("User",userSchema);
module.exports=User;