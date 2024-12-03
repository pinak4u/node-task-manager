const express = require('express');
const auth = require("../middleware/auth");
const {AuthController} = require("../controllers");

const router = express.Router();

router.post('/login',async (req,res)=> await AuthController.login(req,res))
router.post('/logout',auth, async (req,res)=>await AuthController.logout(req,res))

module.exports = router;