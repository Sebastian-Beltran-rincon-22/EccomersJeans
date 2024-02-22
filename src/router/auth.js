import express from 'express'
import {signinHandler, signup} from '../controller/auth.js';
const router = express.Router()
// const authJwt = require('../middlewares/authJwt')
// const validateRoles = require('../middlewares/verifyRole')

router.use((req, res, next) => {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  );
  next();
});

router.post('/signup', signup)

router.post('/signin', signinHandler)

export default router;
