const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
	"description":{
		"type": String,
		"required":true
	},
	"completed":{
		"type": Boolean,
		"default":false
	},
	"owner":{
		"type": mongoose.Schema.Types.ObjectId,
		"required":true,
		"ref":"User"
	}
});

taskSchema.methods.addUser = async function(user){
	this.owner = user;
	await this.save();
	return this;
}

const Task = mongoose.model('Task',taskSchema)
module.exports = Task;