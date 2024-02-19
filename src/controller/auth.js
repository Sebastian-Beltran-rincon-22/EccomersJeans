import jwt from 'jsonwebtoken'
import Auth from '../schema/auth.js'
import dotenv from 'dotenv';
dotenv.config();
import { SECRET } from '../config.js';
// const bcrypt = require('bcrypt')
// const nodemailer = require('nodemailer')

// const transporter = nodemailer.createTransport({
//   service:"gmail",
//   auth:{
//     user: config.ADMIN_EMAIL,
//     pass:config.ADMIN_PASSWORD
//   }
// });


const controllerAuth = {

      signup: async(req,res)=> {
        try{
          const {firstName, lastName, email, password, phoneNumber, country, years} = req.body;

          const existingEmail = await Auth.findOne({email:email}).exec();
          if(existingEmail){
            return res.status(400).json({ message: 'El email ya existe en la base de datos.' });
          }

          // const roles  req.body.roles ? req.body.roles :["usuario"];

          const newAuth = new Auth({
            firstName,
            lastName,
            email,
            password,
            phoneNumber,
            country,
            years,
          })

          const savedUser = await newAuth.save();

          const tokenData = {id:savedUser._id }

          const token = jwt.sign(tokenData, SECRET, {
            expiresIn:86400
          })

          res.status(200).json({token,savedUser})
        }catch(error){
          return res.status(500).json({error:"Error interno del servidor", details: error.message});
        }
      }
}
export default controllerAuth;
