const express = require('express');
require ('./db/mongoose.js');

const {AuthRouter, TaskRouter, UserRouter, PlayGroundRouter } = require('./router');

const port = process.env.PORT ||3000;
const app = new express();
app.use(express.json());

//routers
app.use(AuthRouter);
app.use(UserRouter);
app.use(TaskRouter);
app.use(PlayGroundRouter);


//start web server
app.listen(port,()=>{
	console.log(`Connection to server on port ${port}`); 
});

