// This is a mongoose Schema structure
const mongoose = require("mongoose");

const contactSchema = mongoose.Schema(
    {
    
    user_id: {

        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"users" // users table or collection reference 
    },    
    name: {
        type:String,
        required:[true,"Please add the contact name"]
    },
    email:{
        type:String,
        required:[true,"Please add the contact email address"]
    },
   phone:{
    type:String,
    required:[true,"Please add the Contact phone Number"]
   },
},{
    timestamps:true,
 }
);

module.exports = mongoose.model("contact",contactSchema);