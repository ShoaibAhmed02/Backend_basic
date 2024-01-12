const router = require("express").Router();
const { upload } = require("../Middleware/upload");
const {register,file_upload,SignIn,GetUser}= require("../controllers/userController")
const authUser = require('../Middleware/authUser')
const {JoiValidation} = require("../Middleware/joi")
router.post('/signin',SignIn)
router.post("/register",register);
router.post('/file_upload',upload.fields([{ name: "file"}]),file_upload)
router.get('/get-all-user',GetUser)
router.post('/joi',JoiValidation)
module.exports = router;