const express = require('express');
const router = express.Router();
const {PlayGroundController} = require("../controllers");

router.get('/test',async (req,res)=> await PlayGroundController.testTransactions(req,res));

module.exports = router;