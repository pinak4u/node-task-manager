const express = require('express');
const router = express.Router();
const {PlayGroundController} = require("../controllers");

router.get('/test',async (req,res)=> await PlayGroundController.testTransactions(req,res));
router.get('/desc-test',async (req,res)=> await PlayGroundController.testDiscrimatorsTest(req,res));
router.get('/get-events',async (req,res)=> await PlayGroundController.getAllEvents(req,res));
router.get('/formal-events',async (req,res)=> await PlayGroundController.getFormalEvents(req,res));
router.get('/general-events',async (req,res)=> await PlayGroundController.getGeneralEvents(req,res));

module.exports = router;