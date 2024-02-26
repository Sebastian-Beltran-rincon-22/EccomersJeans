import express from 'express'
import { createUser, getUser, getUserForId, updateUserForId }from '../controller/User.js';
import { verifyToken, isAdmin } from '../middlewares/authJwt.js'
// import {upload, uploadFile} from '../controller/uploadImg.js'
const router = express.Router()

router.use((req, res, next) => {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  );
  next();
});
router.post('/createUser', verifyToken, isAdmin , createUser)

router.patch('/updateUserForId ', verifyToken, isAdmin , updateUserForId )
// router.post('/updateImg/', upload, uploadFile )

router.get('/getUserForId', verifyToken, isAdmin , getUserForId)

router.get('/', verifyToken, isAdmin , getUser)

export default router;
