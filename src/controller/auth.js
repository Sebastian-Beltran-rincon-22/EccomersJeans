import jwt from 'jsonwebtoken'
import Auth from '../schema/auth.js'
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
          const {name, username, email, password,} = req.body;

          const existingEmail = await Auth.findOne({email:email}).exec();
          if(existingEmail){
            return res.status(400).json({ message: 'El email ya existe en la base de datos.' });
          }

          // const roles = req.body.roles ? req.body.roles :["user"];

          const newAuth = new Auth({
            name,
            username,
            email,
            password,
            // roles
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
      },
    signinHandler:  async (req, res) => {
      try {
        const userFound = await Auth.findOne({ email: req.body.email }).populate("roles");

        if (!userFound) return res.status(400).json({ message: "User Not Found" });

        const matchPassword = await Auth.comparePassword(
          req.body.password,
          userFound.password
          );

        if (!matchPassword)
        return res.status(401).json({token: null,message: "Invalid Password"});

        const token = jwt.sign({ id: userFound._id }, SECRET, {
          expiresIn: 604800 // 24 hours
        });

        res.json({ token });
      } catch (error) {
        console.log(error);
      }
    }
};

export default controllerAuth;
