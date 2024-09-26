const mongoose = require('mongoose')
const dotenv = require('dotenv');
const colors = require("colors")
mongoose.set('strictQuery', false);
dotenv.config();
const connectDB = async () => {
    try {
        const conn = await mongoose.connect("mongodb+srv://shyvikas63:shyvikas63@cluster0.2a1gfmc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")

        console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline)
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}

module.exports = connectDB