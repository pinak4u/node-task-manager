const {Task} = require('../db/schema');

const getAllTasks = async (req, res) => {
    const tasks = await Task.find({owner: req.user._id});
    return res.status(200).send(tasks);
}

const getSingleTask = async (req, res) => {
    const id = req.params.id;
    const task = await Task.findOne({owner: req.user._id, _id: id});
    if (!task) {
        return res.status(404).send(`Can not find task with id : ${id}`);
    }
    return res.status(200).send(task);
}

const createTask = async (req, res) => {
    const payload = req.body;
    payload.owner = req.user._id;
    const task = await Task.create(payload);
    if (!task) {
        return res.status(500).send(`Something went wrong creating task`);
    }
    return res.status(201).send(task);
}

const updateTask = async (req, res) => {
    const id = req.params.id;
    const payload = req.body;
    const task = await Task.findById(id);
    if (!task) {
        return res.status(404).send(`Unable to find the task with id : ${id}`);
    }
    if (task.owner.toString() !== req.user._id.toString()) {
        return res.status(403).send(`Un Authorized to update task with id : ${id}`);
    }
    await Task.findByIdAndUpdate(id, payload);
    const updatedTask = await Task.findById(id);
    return res.status(200).send(updatedTask);
}

const deleteTask = async (req, res) => {
    const id = req.params.id;
    const task = await Task.findById(id);
    if (!task) {
        return res.status(404).send(`Unable to find the task with id : ${id}`);
    }
    if (task.owner.toString() !== req.user._id.toString()) {
        return res.status(403).send(`Un Authorized to delete task with id : ${id}`);
    }

    await Task.deleteOne({_id: id});
    return res.status(200).send(`Task deleted with id : ${id}`);
}

module.exports = {
    getAllTasks,
    getSingleTask,
    createTask,
    updateTask,
    deleteTask
};
