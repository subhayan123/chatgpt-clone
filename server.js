const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
const colors = require("colors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const errorHandler = require("./middlewares/errorMiddleware");
const path=require("path");

//routes path
const authRoutes = require("./routes/authRoutes");

//dotenv
dotenv.config();
//mongo connecttion
connectDB();

const app = express();

//middlewares
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan('dev'));
app.use(errorHandler);
app.use(express.static(path.join(__dirname,'./client/build')))

// REST API
app.get('*',function(req,res){
    res.sendFile(path.join(__dirname,'./client/build/index.html'));
})

//listen server 
const PORT = process.env.PORT || 8080;

//API routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/openai", require("./routes/openaiRoutes"));

app.listen(PORT, () => {
    console.log(`server is running on ${process.env.DEV_MODE} mode on port ${PORT}`.bgCyan.white);
});