const router = require("express").Router();
const { upload } = require("../Middleware/upload");
const {register,file_upload,SignIn}= require("../controllers/userController")
const authUser = require('../Middleware/authUser')

router.post('/signin',SignIn)
router.post("/register",register);
router.post('/file_upload',upload.fields([{ name: "file"}]),file_upload)
router.post('/verify',authUser, (req,res)=>{
    res.send({message: "successfylly!"})
})
module.exports = router;