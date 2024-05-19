const express=require("express");
const { chats } = require("./data/data");
const dotenv=require("dotenv");
const cors=require("cors");

dotenv.config();
const app=express();
app.use(cors());
const PORT=process.env.PORT;

app.get("/",(req,res)=>{
    res.send("Server started");
})

app.get("/api/chats",(req,res)=>{
    res.send(chats);
})

app.get("/api/chats/:id", (req, res) => {
  const id=req.params.id;
  const singleChat= chats.find((c)=>c._id === id);
  res.send(singleChat);
});

app.listen(PORT,()=>{
    console.log(`Server started on port ${PORT}`);
})