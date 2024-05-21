const mongoose=require("mongoose");

const dbConnection=async()=>{
    try {
        const connection = await mongoose.connect(process.env.MONGODB_URI);
        console.log(`MongoDB connected : ${connection.connection.host}`);
    } catch (error) {
        console.error(`Error : ${error.message}`);
    }
}

module.exports=dbConnection