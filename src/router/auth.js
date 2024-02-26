import express from 'express'
import controllerAuth from '../controller/auth.js';

const router = express.Router()

router.use((req, res, next) => {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  );
  next();
});

router.post('/signup', controllerAuth.signup)

router.post('/signin', controllerAuth.signinHandler)

//  Router to send a password reset link to user
router.post("/send-password-link", controllerAuth.sendPasswordLink)

//  Router for change a user´s password
router.post("/change-password", controllerAuth.changePassword)
export default router;
