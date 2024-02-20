import express from 'express'
import controllerAuth from '../controller/auth.js';
const router = express.Router()
// const authJwt = require('../middlewares/authJwt')
// const validateRoles = require('../middlewares/verifyRole')


router.post('/signup', controllerAuth.signup)

export default router;
