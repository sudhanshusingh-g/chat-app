const express=require("express");
const { chats } = require("./data/data");
const dotenv=require("dotenv");
const cors=require("cors");
const dbConnection=require("./config/db");
const userRoutes=require("./routes/userRoutes");
const chatRoutes = require("./routes/chatRoutes");
const messageRoutes = require("./routes/messageRoutes");
const {notFound,errorHandler}=require("./middlewares/errorMiddleware");

dotenv.config();
const app=express();
app.use(cors());
app.use(express.json())
dbConnection();

const PORT=process.env.PORT;

app.get("/",(req,res)=>{
    res.send("API running");
})




app.use("/api/user",userRoutes);
app.use("/api/chat",chatRoutes);
app.use("/api/message", messageRoutes);

app.use(notFound);
app.use(errorHandler);


app.listen(PORT,()=>{
    console.log(`Server started on port ${PORT}`);
})