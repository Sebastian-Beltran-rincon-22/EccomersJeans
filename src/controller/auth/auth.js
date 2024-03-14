import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import nodemailer from 'nodemailer'
import Auth from '../../schema/auth/auth.js'
import Role from '../../schema/user/Role.js';

// Inicialization firebase
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth';
import firebaseConfig from '../../firebase.config.js';
firebase.initializeApp(firebaseConfig);


import { ADMIN_EMAIL, SECRET, ADMIN_PASSWORD, URL } from '../../config.js';

const transporter = nodemailer.createTransport({
  service:"gmail",
  auth:{
    user: ADMIN_EMAIL,
    pass:ADMIN_PASSWORD
  }
});

const controllerAuth = {
    // Funtion to signIn with google
    signInWithGoogle: async (req, res)=>{
      try{
        const idToken = req.body.access_token;
        // console.log('token receive from frontend:', idToken)

        const credential = firebase.auth.GoogleAuthProvider.credential(idToken, null, null);

        // console.log('credential procces:', credential)

        const userCredential = await firebase.auth().signInWithCredential(credential);
        // console.log('userCredential receive from signInWithGoogle:', userCredential)

        res.status(200).json({ user: userCredential.user })

      }catch(error){
        return res.status(500).json({error:"Error al autenticar con Google:", details: error.message});
      }
    },
      // // Funtion to test from postman
      // signInWithGooglePostman: async (req, res) => {
      //   try {
      //     const { access_token } = req.body;

      //     if (!access_token) {
      //       return res.status(400).json({ error: 'Token de acceso no proporcionado' });
      //     }

      //     return res.status(200).json({ access_token });
      //   } catch (error) {
      //     return res.status(500).json({ error: 'Error al autenticar con Google', details: error.message });
      //   }
      // },
      signup: async(req,res)=> {
        try{
          const {name, username, email, password, } = req.body;


          const existingEmail = await Auth.findOne({email:email}).exec();
          if(existingEmail){
            return res.status(400).json({ message: 'El email ya existe en la base de datos.' });
          }

        const roles = req.body.roles ? req.body.roles :["user"];

          const newUser = new Auth({
            name,
            username,
            email,
            password,

          })

          if (roles && roles.length > 0) {
            const foundRoles = await Role.find({ name: { $in: roles } });
            if (!foundRoles || foundRoles.length === 0) {
              return res.status(400).json({ message: "Roles not found" });
            }
            newUser.roles = foundRoles.map((role) => role._id);
          } else {
            const defaultRole = await Role.findOne({ name: "user" });
            newUser.roles = [defaultRole._id];
          }

          const savedUser = await newUser.save();

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
        return res.status(500).json({ msg: 'Error interno del servidor', details: error.message });
      }
    },
    // Function to send an email link for password reset
    sendPasswordLink : async (req, res) => {
    const email = await req.body.email;
      // console.log(req.body.email)
      // Check if a valid email is provided
      if (!email) {
          return res.status(406).json({ message: "Ingresa un correo válido." });
      }

      try {
          // Find the user in the database based on the provided email
          const userFound = await Auth.findOne({ email: req.body.email });

          // Check if the user exists
          if (!userFound) {
            return res.status(406).json({ message: "Ingresa un correo válido." });
          }


          // Generate a token for resetting the password
          const token = jwt.sign({ id: userFound._id }, SECRET, {
            expiresIn: 3600, // Token expiration time: 1 hour
          });

          // Configure mail options for sending the reset password email
          const mailOptions = {
          from: ADMIN_EMAIL,
          to: email,
          subject: "Enviando correo electrónico para restablecer la contraseña",
          html: `
           <html>
            <head>
              <style>
              body {
                font-family: Arial, sans-serif;
                background-color: #f4f4f4;
              }
              .container {
                  max-width: 600px;
                  margin: 0 auto;
                  padding: 20px;
                  background-color: #fff;
                  border-radius: 5px;
                  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
              }
              img {
                  width:100px;
                  height:200px;
                  height: auto;
                  display: flex;
                  justify-content:center;
                  margin: 0 auto;
              }
              </style>
            </head>
            <body>
              <div class="container">
                  <img src="https://i.pinimg.com/564x/fa/d7/e4/fad7e46ef884c8152422f173a29b9ae7.jpg" alt="Logo Eccommerce">

                  <p>¡Hola!</p>
                  <p>Recibiste este correo electrónico porque solicitaste restablecer tu contraseña.</p>
                  <p>Por favor, haz clic en el siguiente enlace para restablecer tu contraseña:</p>
                  <p><a href="${URL}/change-password/${token}">Restablecer contraseña</a></p>
                  <p>Este enlace es válido por 1 hora.</p>
                  <p>Si no solicitaste este cambio, puedes ignorar este correo electrónico.</p>
                  <p>Gracias.</p>
              </div>
            </body>
          </html>
          `,
          // text: `Este Enlace es válido por 1 horas ${URL}/change-password/${token}`,
          };

          // Send the email with the reset password link
          transporter.sendMail(mailOptions, (error, ) => {
          if (error) {
              // console.log("error", error);
              return res.status(406).json({ message: "El correo no fue enviado.", error });
          } else {
              // console.log("Email sent", info.response);
              return res.status(200).json({
                status: 200,
                message: "El correo fue enviado satisfactoriamente.",
              });
          }
          });
        } catch (error) {
            // If an invalid user or other error occurs, show an error
            return res.status(401).json({ status: 401, message: "Usuario inválido." });
        }
      },
      // Function for changing user password
      changePassword: async (req, res) => {
        try{
          // Get the new password from the request's body
          const newPassword = req.body.password;
          // Get the user's ID from the request
          const id = req.body._id;

          // Generate a new salt for password hashing
          const saltRounds = 10;
          const salt = await bcrypt.genSalt(saltRounds);

          // Hash the new password using the new salt
          const hashedPassword = await bcrypt.hash(newPassword, salt);

          // Update the user's password in the database
          await Auth.findByIdAndUpdate(
            {_id: id},
            { password: hashedPassword },
          );

          // Respond with a success message
          res.status(201).json({message: "Password changed"});

        }catch(error){
          // If a server error occurs, respond with an error message
          // console.log(error)
          res.status(401).json({status:401, error:"Server error"});
        }
      }

};

export default controllerAuth;
