const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
}, { discriminatorKey: 'kind' });

const Event = mongoose.model('Event', eventSchema);
module.exports = Event;