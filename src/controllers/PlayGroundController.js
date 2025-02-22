const { User, GeneralEvent, FormalEvent, Event } = require("../db/schema");
const mongoose = require("mongoose");

const testTransactions = async (req, res) => {
    let response;
    const pinakFilter = { name: "Pinak Patel" };
    const pinak = await User.findOne(pinakFilter);
    const harshilFilter = { name: "Harshil Patel" };
    const harshil = await User.findOne(harshilFilter);
    const transactionAmount = 2;
    const session = await mongoose.startSession();

    try {
        await session.startTransaction();
        const transactionDataForPinak = { amount: pinak.amount - transactionAmount };
        const transactionDataForHarshil = { amount: harshil.amount + transactionAmount };
        await User.findOneAndUpdate(pinakFilter, transactionDataForPinak, { session: session });
        await User.findOneAndUpdate(harshilFilter, transactionDataForHarshil, { session: session });

        await session.commitTransaction();
        response = { statusCode: 200, message: "Transaction Successful" };
    } catch (e) {
        await session.abortTransaction();
        response = { statusCode: 500, message: "Something Went Wrong, Please Try Again" }
    } finally {
        await session.endSession();
    }
    return res.status(response.statusCode).send(response.message);
};

const testDiscrimatorsTest = async (req, res) => {
    const eventData = {
        'name': "Standup Meeting",
        'date': new Date(),
    }
    const ge = new GeneralEvent({ ...eventData, 'url': "https://www.google.com" });
    await ge.save();
    const fe = new FormalEvent({ ...eventData, 'name': "Company Meeting", 'venue': "Surat" });
    await fe.save();
    res.status(201).send("Event Created");
}

const getAllEvents = async (req, res) => {
    const events = await Event.find({});
    res.status(200).send(events);
}

const getFormalEvents = async (req, res) => {
    const events = await FormalEvent.find({});
    res.status(200).send(events);
}
const getGeneralEvents = async (req, res) => {
    const events = await GeneralEvent.find({});
    res.status(200).send(events);
}
module.exports = {
    testTransactions,
    testDiscrimatorsTest,
    getAllEvents,
    getFormalEvents,
    getGeneralEvents
};