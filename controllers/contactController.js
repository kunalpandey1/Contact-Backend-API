// we have installed express async handler -> npm install express-async-handler
/*The purpose of asyncHandler is to handle errors that may occur within asynchronous functions and pass them to the Express.js error-handling middleware. It does not eliminate the need to use await when awaiting the completion of an asynchronous operation. So,Instead of using try catch block inside a asynchronous function you can use asyncHandler */



//@desc Get all Contacts
//@route GET /api/contacts
//@access private 

const asyncHandler = require("express-async-handler");
const contact = require("../models/ContactModel");


const getContacts = asyncHandler(async(req, res) => {
    const contacts = await contact.find({user_id: req.User.id});
  res.status(200).json(contacts);
});

//@desc Create New Contacts
//@route POST /api/contacts
//@access private 
const createContact = asyncHandler(async(req, res) => {
  console.log("The body message is ",req.body); 

  const{name,email,phone}=req.body; // destructuring

  if(!name||!email||!phone){
    res.status(400);
    throw new Error("All Fields are mandatory");
  }  
   
  const Contact_Creation = await contact.create({
    name,
    email,
    phone,
    user_id:req.User.id
  });

  res.status(201).json(Contact_Creation);
});

//@desc Create New Contacts
//@route GET /api/contacts
//@access private
const getContact = asyncHandler(async (req, res) => {
    const getcontact = await contact.findById(req.params.id);
    if(!getcontact){
        res.status(404);
        throw new Error("Contact Not Found");
    }
//   res.status(201).json({ message: `Get Contact for ${req.params.id}` });

res.status(201).json(getcontact);

});

//@desc update Contacts
//@route PUT /api/contacts
//@access private

const updateContact = asyncHandler(async(req, res) => {
    const getcontact = await contact.findById(req.params.id);
    if(!getcontact){
        res.status(404);
        throw new Error("Contact Not Found");
    }

 // The below code snippet is telling that the contact under the particular user id and the real user id . if both are same then only updation will happen otherwise it won't
     if(getcontact.user_id.toString() !== req.User.id){ 
  
      res.status(403);
      throw new Error("User Don't have Permission to Update other User Contacts");

     }

    const updatedContact = await contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new:true}
    );  
  res.status(200).json(updatedContact);
});

//@desc Delete Contacts
//@route delete /api/contacts
//@access private

const DeleteContact = asyncHandler(async(req, res) => {
    const getcontact = await contact.findById(req.params.id);
    if(!getcontact){
        res.status(404);
        throw new Error("Contact Not Found");
    } 

    if(getcontact.user_id.toString() !== req.User.id){

      res.status(403);
      throw new Error("User Don't have Permission to Delete other User Contacts");

     }

    //await contact.remove();
    const DeletedContact = await contact.findByIdAndDelete(
      // it is performing DeleteByOne in Backend as Mongoose is Performing
        req.params.id,
        req.body,
        {new:true}
    );  
  res.status(200).json(DeletedContact);
});

module.exports = {
  getContacts,
  createContact,
  getContact,
  updateContact,
  DeleteContact,
};
