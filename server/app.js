const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');


const authRoute = require('./routes/auth');
const userRoute = require('./routes/users');


dotenv.config();


mongoose.connect(process.env.MONGO_URL).then(
        console.log("connected to MongoDB"));


app.use(express.json());

app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);



app.listen(8000, ()=>{
    console.log('Backend server is up and running');
});
