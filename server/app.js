const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');


const authRoute = require('./routes/auth');
const userRoute = require('./routes/users');


dotenv.config();


mongoose.connect("mongodb://finlab-database/cryptoDB").then(
        console.log("connected to MongoDB"));


app.use(express.json());
app.use(cors());

app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);



app.listen(8000, ()=>{
    console.log('Backend server is up and running');
});
