const mongoose = require("mongoose");
const colors = require("colors");
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log(`Connected to Mongodb database ${mongoose.connection.host}`.bgGreen.white);
    } catch (error) {
        console.log(`Mongodb connection error ${error}`.bgRed.white);
    }
}
module.exports = connectDB;