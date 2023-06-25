const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const user = require("../models/userModel");
const jwt = require("jsonwebtoken");
//@desc Register a User
//@route post /api/users/register
//@access public
const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    res.status(400);
    throw new Error("All Fields are Mandatory");
  }
  const userAvailable = await user.findOne({ email });
  if (userAvailable) {
    res.status(400);
    throw new Error("User already Registered");
  }
  // first create the Hash Password
  const hashedPassword = await bcrypt.hash(password, 10);
  console.log("Hashed Password:", hashedPassword);

  const User_Creation = await user.create({
    username,
    email,
    password: hashedPassword,
  });

  console.log(`User Created Successfully${User_Creation}`);
  if (User_Creation) {
    res.status(201).json({ _id: user.id, email: user.email });
  } else {
    res.status(400);
    throw new Error("User Data is not Valid");
  }
  res.json({ message: "Register the user" });
});

//@desc login  User
//@route post /api/users/login
//@access public
const loginUser = asyncHandler(async (req, res) => {
   const{email,password} = req.body;
   if(!email||!password){
    res.status(400);
    throw new Error("All fields are mandatory");
   }
   const User_Check = await user.findOne({email});
   // Compare Password with HashedPassword
   if(User_Check && (await bcrypt.compare(password,User_Check.password))){
      
      const accessToken = jwt.sign({
        user:{
            username:User_Check.username,
            email:User_Check.email,
            id:User_Check.id
        },
       },
       process.env.ACCESS_TOKEN_SECRET,
       {expiresIn:"20m"}
      );
      res.status(200).json({ accessToken });
   } else{
    res.status(401);
    throw new Error("Email and Password Not Valid");
   }
});

//@desc Current User
//@route Get /api/users/current
//@access private
const CurrentUser = asyncHandler(async (req, res) => {
  res.json(req.User);
});

module.exports = { registerUser, loginUser, CurrentUser };
