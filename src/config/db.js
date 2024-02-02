const mongoose = require('mongoose');
const dotenv = require("dotenv");
dotenv.config();

const connectDB = async () => {
    console.log(process.env.MONGODB_URL);
    const conn = await mongoose.connect(process.env.MONGODB_URL);
    try{
        console.log('connected to mongo db');
    } catch (error) {
        console.log('error to conect mongo db');

    }
}

module.exports= connectDB;