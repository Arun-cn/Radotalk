const mongoose = require('mongoose');
const dotenv = require("dotenv");
dotenv.config();

const connectDB = async () => {
    
    
    try{
        const conn = await mongoose.connect(`${process.env.MONGODB_URL}/radotalk`);
        console.log('connected to mongo db');
    } catch (error) {
        console.log('error to conect mongo db');

    }
}

module.exports= connectDB;