const {User} = require("../db/schema");
const mongoose = require("mongoose");

const testTransactions = async (req, res) => {
    let response;
    const pinakFilter = {name:"Pinak Patel"};
    const pinak = await User.findOne(pinakFilter);
    const harshilFilter = {name:"Harshil Patel"};
    const harshil = await User.findOne(harshilFilter);
    const transactionAmount = 2;
    const session = await mongoose.startSession();

    try {
        await session.startTransaction();
        const transactionDataForPinak = {amount:pinak.amount-transactionAmount};
        const transactionDataForHarshil = {amount:harshil.amount+transactionAmount};
        await User.findOneAndUpdate(pinakFilter,transactionDataForPinak,{session:session});
        await User.findOneAndUpdate(harshilFilter,transactionDataForHarshil,{session:session});

        await session.commitTransaction();
        response = {statusCode:200,message:"Transaction Successful"};
    }catch (e){
        await session.abortTransaction();
        response = {statusCode:500,message:"Something Went Wrong, Please Try Again"}
    }finally {
        await session.endSession();
    }
    return res.status(response.statusCode).send(response.message);
};


module.exports = {
    testTransactions
};