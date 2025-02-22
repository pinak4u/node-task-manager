const mongoose = require('mongoose');
const Event = require('./Event');

const generalEventSchema = new mongoose.Schema({
    url: String
});

const GeneralEvent = Event.discriminator('GeneralEvent', generalEventSchema);
module.exports = GeneralEvent;