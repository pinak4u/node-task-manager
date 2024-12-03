const authRouter = require('./Auth');
const taskRouter = require('./Task');
const userRouter = require('./User');
const PlayGroundRouter = require('./PlayGround');

module.exports = {
    AuthRouter: authRouter,
    TaskRouter: taskRouter,
    UserRouter: userRouter,
    PlayGroundRouter: PlayGroundRouter,
};