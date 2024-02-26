import express from 'express'
import {upload, uploadFile} from '../controller/uploadImg.js'
// import uploadImg from '../controller/uploadImg.js'
const router = express.Router()

router.use((req, res, next) => {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  );
  next();
});

router.post('/updateImg/', upload, uploadFile )


export default router;
