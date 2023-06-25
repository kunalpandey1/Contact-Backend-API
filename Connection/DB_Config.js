/*When connecting to MongoDB Atlas, you will also need to provide connection details, but they are specific to the MongoDB Atlas environment. These details include the connection string, which you can obtain from the Atlas dashboard. The connection string typically contains the server hostname, port number, username, password, and other parameters necessary to establish a connection to your Atlas cluster. */



/*The code snippet uses the Mongoose library to connect to a MongoDB database. It defines an async function called connectDB that attempts to establish a connection to the database using the mongoose.connect() method. */

const mongoose = require("mongoose");

const connectDB = async ()=>{

try{
    const connect = await mongoose.connect(process.env.CONNECTION_STRING);
    console.log("Database Connected:",connect.connection.host,connect.connection.name);
} catch(err){
    console.log(err);
    process.exit(1);
}
};

module.exports =  connectDB;