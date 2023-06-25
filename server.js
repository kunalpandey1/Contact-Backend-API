const express = require('express');
const errorHandler = require('./middleware/errorHandler');
const connectDB = require('./Connection/DB_Config');
const dotenv = require("dotenv").config(); // install dotenv file first (npm install dotenv) and then make .env file and place your port there
connectDB();
const app = express();

const port = process.env.PORT || 5000

app.use(express.json()); // this is going to act as a parser as for the data we received for client from the server side acts as a middleware
app.use("/api/contacts",require("./routes/contactRoutes")); // this is acting as a middle wares for routes 
app.use("/api/users",require("./routes/userRoutes")); // 
app.use(errorHandler);

app.listen(port,()=>{

    console.log(`App is Running on Port ${port}`);

});

