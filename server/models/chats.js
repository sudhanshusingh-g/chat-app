const mongoose = require("mongoose");

const chatsModel = mongoose.Schema({
  chatName: { type: String, trim: true },
  isGroupChat: { type: Boolean, default: false },
  users:[{
    type:mongoose.Schema.ObjectId,
    ref:"User",
  }],
  latestMessage:{
    type:mongoose.Schema.ObjectId,
    ref:"Message",
  },
  groupAdmin:{
    type:mongoose.Schema.ObjectId,
    ref:"User",
  }
},{
    timeStamps:true,
});

const Chat=mongoose.model("Chat",chatsModel);
module.exports=Chat;
