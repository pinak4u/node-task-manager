const User = require("../db/schema/User");
const jwt = require("jsonwebtoken");
const authSecret = 'AuthSecret';

const login = async (req, res) => {
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
};

const logout = async (req, res) => {
    await req.user.removeToken(req.token);
    return res.send('User logged out successfully');
};

module.exports = {
    login,
    logout
};