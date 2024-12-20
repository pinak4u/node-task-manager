const {User} = require("../db/schema")
const bcrypt = require("bcryptjs");

const getAllUsers = async (req, res) => {
    let users = [];
    if (req.user.email === "admin@gmail.com") {
        users = await User.find({});
    } else {
        users = await User.find({_id: req.user._id});
    }
    return res.status(200).send(users);
}
const getUser = async (req, res) => {
    const id = req.params.id;
    let user = null;
    if (req.user.email === "admin@gmail.com") {
        user = await User.findById(id);
        if (!user) {
            return res.status(404).send(`Can not find User with id : ${id}`);
        }
    } else {
        if (req.user._id != id) {
            return res.status(403).send(`You are not authorized to view this user`);
        }
        user = await User.findById(id);
        if (!user) {
            return res.status(404).send(`Can not find User with id : ${id}`);
        }
    }

    return res.status(200).send(user);
}

const createUser = async (req, res) => {
    const payload = req.body;
    payload.password = await bcrypt.hash(payload.password, 8);
    const user = await User.create(payload);
    if (!user) {
        return res.status(500).send(`Something went wrong creating User`);
    }
    return res.status(201).send(user);
};

const updateUser = async (req, res) => {
    const id = req.params.id;
    const payload = req.body;
    if (req.user.email === "admin@gmail.com") {
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).send(`Can not find User with id : ${id}`);
        }
        await user.findByIdAndUpdate(id, payload);
    } else {
        if (req.user._id != id) {
            return res.status(403).send(`You are not authorized to update this user`);
        }
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).send(`Can not find User with id : ${id}`);
        }
        console.log(user);
        await User.findByIdAndUpdate(id, payload);
    }
    const updatedUser = await User.findById(id);
    return res.status(200).send(updatedUser);
};

const deleteUser = async (req, res) => {
    const id = req.params.id;
    if (req.user.email === "admin@gmail.com") {
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).send(`Can not find User with id : ${id}`);
        }
    } else {
        if (req.user._id != id) {
            return res.status(403).send(`You are not authorized to delete this user`);
        }
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).send(`Can not find User with id : ${id}`);
        }
    }
    const user = await User.findByIdAndDelete(id);
    if (!user) {
        return res
            .status(500)
            .send(`Something went wrong deleting User with id : ${id}`);
    }
    return res.status(200).send(`User deleted with id : ${id}`);
}
module.exports = {
    getAllUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser,
};