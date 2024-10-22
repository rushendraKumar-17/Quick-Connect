import userModel from "../model/userModel.js";
import jwt from "jsonwebtoken";
const SECRET = "@rushendra17";
export const signup = async (req, res) => {
  console.log(req.body);
  const { uname, email, password } = req.body;
  if (!uname || !email || !password)
    res.status(400).json({ error: true, message: "All fields are mandatory" });
  else {
    const user = await userModel.create({ uname, email, password });
    res.status(200).json(user);
  }
};
export const signin = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    res
      .status(400)
      .json({ error: true, message: "Please provide the all the credentials" });
  else {
    const user = await userModel.findOne({ email });
    if (!user)
      res.status(404).json({
        error: true,
        message: "Please create an account first before signing in",
      });
    else {
      if (user.password === password) {
        const payload = {
            name:user.uname,
            email,
            password
        }
        const token = jwt.sign(payload,SECRET,{expiresIn:"100d"});
        res.status(200).json({token});
      } else {
        res.status(400).send("Invalid credentials");
      }
    }
  }
};

export const verifyToken = async(req,res)=>{
  const token = req.headers.authorization.split(' ')[1];
  const decoded = jwt.verify(token,SECRET);
  const {email,password} = decoded;
  const userExists = await userModel.findOne({email});
  if(userExists && userExists.password === password){
    res.status(200).send("Success");
  }else{
    res.status(401).send("Invalid Credentials");
  }

}