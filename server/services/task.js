const task= require('../models/task');

const addTask =  async (req, res) => {
    try{
        const {title, description, priority, status} = req.body
        const {user} = req;
        if(!title || !description){return res.status(400).json({error: "Please fill all the fields"})}
        if(title.length < 3){return res.status(400).json({error: "Title should be at least 3 characters long"})}
        if(description.length < 10){return res.status(400).json({error: "Description should be at least 10 characters long"})}
        const newTask = new task({ title, description, priority, status})
        await newTask.save()
        user.tasks.push(newTask._id)
        await user.save()
        return res.status(200).json({success: "Task Added"})
    }catch (error) {
        return res.status(404).json({error: "Internal server error"})
    }
}

//edit task
const editTask =  async (req, res) => {
    // console.log("edit task called")
    try{
        const {id} = req.params
        const {title, description, priority, status} = req.body
        // const {user} = req.user;
        if(!title || !description){return res.status(400).json({error: "Please fill all the fields"})}
        if(title.length < 3){return res.status(400).json({error: "Title should be at least 3 characters long"})}
        if(description.length < 10){return res.status(400).json({error: "Description should be at least 10 characters long"})}
        await task.findByIdAndUpdate(id, { title, description, priority, status})
        return res.status(200).json({success: "Task Updated"})
    }catch (error) {
        return res.status(404).json({error: "Internal server error"})
    }
}

//get task ->1
const getTask =  async (req, res) => {
    // console.log("get task called")
    try{
        const {id} = req.params
        const taskData = await task.findById(id)
        return res.status(200).json({taskData})
    }catch (error) {
        return res.status(404).json({error: "Internal server error"})
    }
}

//delete task
const deleteTask =  async (req, res) => {
    try{
        const {id} = req.params
        const {user} = req;
        await task.findByIdAndDelete(id)
        user.tasks.pull(id)
        await user.save()
        return res.status(200).json({success: "Task Deleted"})
    }catch (error) {
        return res.status(404).json({error: "Internal server error"})
    }
}

module.exports = {
    addTask,
    editTask,
    getTask,
    deleteTask
}