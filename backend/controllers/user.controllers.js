const User = require("../models/user.models");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  const existingUser = await User.findOne(req.body);
  if (existingUser) {
    return res.status(401).json("User already registered");
  }

  try {
    const user = await User.create({
      username,
      email,
      password,
    });
    return res.status(200).json("User created successfully");
  } catch (err) {
    return res.status(500).json(err);
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({email});
    if (!user) {
      return res.status(401).json("User doesn't exists");
    }
    const userPas = await User.findOne({password});
    if (!userPas) {
      return res.status(401).json("Wrong credentials");
    }
    const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {
      expiresIn: "3d",
    });
    const {password:hashedPassword, ...rest} = user._doc
    return res
      .cookie("token", token)
      .status(200)
      .json(rest)
  } catch (err) {
    return res.status(500).json(err);
  }
};

const logoutUser = async(req,res)=>{
    const token = req.cookies
    if(!token){
        return res.status(401).json("Token is not valid")
    }
    return res.clearCookie('token').status(200).json("User successfully logged out")
}

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
};
