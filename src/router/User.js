const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth.js");
const {UserController} = require("../controllers");


router.get("/users", auth, async (req, res) => await UserController.getAllUsers(req, res));
router.get("/user/:id", auth, async (req, res) => await UserController.getUser(req, res));
router.post("/user", async (req, res) => await UserController.createUser(req, res));
router.patch("/user/:id", auth, async (req, res) => await UserController.updateUser(req, res));
router.delete("/user/:id", auth, async (req, res) => await UserController.deleteUser(req, res));

module.exports = router;
