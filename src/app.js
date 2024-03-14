import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import firebaseConfig from './firebase.config.js';
firebase.initializeApp(firebaseConfig);


import express from 'express'
import cors from 'cors'
const app = express();
// import path from 'path';


//app.use
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(
  cors({
    // Permite conexiones de cualquier url
    //
    // methods: "GET,HEAD,PUT,PATCH,POST,DELETE"

    // Permite conexiones de la url especifica
      origin: "http://localhost:4200",
      methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
      credentials: true,
      preflightContinue: false,
      optionsSuccessStatus: 204,
  })
);

//Routers
import indexRouter from "./router/index.js"
import authRouter from "./router/auth/auth.js"
import userRouter from "./router/user/user.js"
import publicationRouter from './router/product/publication.js';
import pantsRouter from './router/product/pants.js'

import uploadImgRouter from "./router/uploadImg.js"

app.use("/api", indexRouter);
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/publication", publicationRouter)
app.use("/api/pants", pantsRouter)


app.use("/api/uploadImg", uploadImgRouter);


export default app;


// Handle router upload images to change ext
// app.get('/uploads/:filename.:ext', (req, res) => {
//   const filename = req.params.filename;
//   const ext = req.params.ext;

//   if (ext !== 'webp') {
//     res.redirect(`/uploads/${filename}.webp`);
//   } else {
//     res.sendFile(path.join(__dirname, `./uploads/${filename}.${ext}`));
//   }
// });
