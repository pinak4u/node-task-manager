const authRouter = require('./Auth');
const taskRouter = require('./Task');
const userRouter = require('./User');

module.exports = {
    AuthRouter: authRouter,
    TaskRouter: taskRouter,
    UserRouter: userRouter
};