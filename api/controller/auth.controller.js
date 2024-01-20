import{ User} from "../models/user.model.js"
import bcryptjs from "bcryptjs"
import { errorHandler } from "../utils/error.js";
import Jwt from "jsonwebtoken";

export const signup=async (req,res,next)=>{



    const {username,email,password}=req.body;
    const hashPassword=bcryptjs.hashSync(password,10)
    const newUser=new User({username,email,password:hashPassword});
  try {
    await newUser.save()
    res.status(201).json("user created suceesfully")
  } catch (error) {
    next(error)
  }
 
}

export  const signin=async(req,res,next)=>{
  const {email,password}=req.body
  try {
   const validUser=await User.findOne({email})
   if(!validUser){
    return next(errorHandler(404,"user not found"))
   }
   const validPassword=bcryptjs.compareSync(password,validUser.password)
   if(!validPassword){return next(errorHandler(401,"wrong credetionals"))}
    const token=Jwt.sign({
      id:validUser._id
    },
    process.env.JWT_SECRET)

    res.cookie('acess_token',token,{httpOnly:true})
    .status(200)
    .json(validUser)
    
  } catch (error) {
    next(error)
  }
}