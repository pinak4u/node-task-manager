const mongoose = require('mongoose');
const Event = require('./Event');

const formalEvent = new mongoose.Schema({
    venue: String
});

const FormalEvent = Event.discriminator('FormalEvent', formalEvent);
module.exports = FormalEvent;