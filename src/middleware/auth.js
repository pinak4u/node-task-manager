const jwt = require('jsonwebtoken');
const User = require('../db/schema/user.js');
const authSecret = 'AuthSecret';

const auth = async (req,res,next)=>{
    if(!req.headers.authorization){
        return res.status(403).send({error:"Un Authenticated User 0"});
    }

    const token = req.headers.authorization.split(' ')[1];
    if(!token){
        return res.status(403).send({error:"Un Authenticated User 1"});
    }
    const decoded = jwt.verify(token,authSecret);
    
    const user = await User.findById(decoded.id);
    if(!user){
        return res.status(403).send({error:"Un Authenticated User 2"});
    }

    const userHasToken = user.tokens.includes(token);
    if(!userHasToken){
        return res.status(403).send({error:"Un Authenticated User 3"});
    }

    req.user = user;
    req.token = token;
    next();
}
module.exports = auth;