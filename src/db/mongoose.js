const mongoose = require('mongoose');

const connectionString = "mongodb://127.0.0.1:27017/task-management";
// const connectionString = "mongodb+srv://pinakprostartme:6oiHKFo6D52UVQbY@cluster0.ikp1o.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(connectionString,{
	// useNewUrlParser: true,
  	// useUnifiedTopology: true,
})
.then(()=>{
	console.log("Database connected");
})
.catch((err)=>{
	console.log("Error in connecting database");
})	

