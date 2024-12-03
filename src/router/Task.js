const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth.js');
const {TaskController} = require("../controllers");

router.get('/tasks',auth,async (req,res)=> await TaskController.getAllTasks(req,res));
router.get('/task/:id',auth,async (req,res)=>await TaskController.getSingleTask(req,res));
router.post('/task',auth,async (req,res)=>await TaskController.createTask(req,res));
router.patch('/task/:id',auth,async (req,res)=>await TaskController.updateTask(req,res));
router.delete('/task/:id',auth,async (req,res)=>await TaskController.deleteTask(req,res));

module.exports = router;