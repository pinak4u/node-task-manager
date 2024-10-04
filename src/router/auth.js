const express = require('express');
const jwt = require('jsonwebtoken');
const User = require("../db/schema/user.js");
const auth = require("../middleware/auth");

const router = express.Router();
const authSecret = 'AuthSecret';

router.post('/login',async (req,res)=>{
    const email = req.body.email;
    const password = req.body.password;
    const user = await User.findUserByCredentials(email,password);
    const payload = {
        "id":user._id,
        "name":user.name,
        "email":user.email
    }
    const token = jwt.sign(payload,authSecret);
    await user.addToken(token);
    return res.send({user});
})

router.post('/logout',auth, async (req,res)=>{
    await req.user.removeToken(req.token);
    return res.send('User logged out successfully');
})

module.exports = router;