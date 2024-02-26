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

export default router;
