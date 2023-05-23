const Tasks = require('../model/TaskModel');

const TaskRoute = (req, res) => {
    res.json({ msg: "Tasks route running" });
}

const getAllTask = async (req, res) => {
    try {
        const projectId = req.body.id;
        const response = await Tasks.find({ projectId });
        if (response.length === 0) {
            return res.json({ status: false, data: [] });
        }
        return res.json({ status: true, data: response });
    } catch (err) {
        throw err;
    }
 }

const createTask = async (req, res) => { 
    try {
        const projectId = req.body.projectId;
        const lane = req.body.lane;
        const title = req.body.title;
        const description = req.body.desc;
        const task = { projectId, lane, title, description }
        const newTask = new Tasks(task)
        const response = await newTask.save();
        if (!response)
            return res.json({ status: false, msg: "Error in creating task..." });
        // console.log(response);
        return res.json({ status: true, data: response, msg: "Task created successfully..." });
    } catch (err) {
        throw err;
    }
}

const updateTask = async (req, res) => {
    try {
        const id = req.params.id;
        const response = await Tasks.findOne({ _id: id });
        if (!response) res.json({ msg: "No Data Found..." });

        const update = await Tasks.updateOne({ _id: id }, {
            $set: {
                lane: req.body.lane,
                title: req.body.title,
                description: req.body.description,
            }
        })

        const data = await Tasks.findOne({ _id: id });

        if (!update) {
            return res.json({ status: false, data: {}, msg: "Error in updating" });
        }
        return res.json({ status: true, data: data, msg: "Task Updated Successfully..." });

    } catch (err) {
        throw err;
    }
 }

const deleteTask = async (req, res) => {
    try {
        const id = req.params.id;
        const response = await Tasks.find({ _id: id });
        if (!response) res.json({ status: false, msg: "Task Not Found..." });

        const st = await Tasks.findByIdAndDelete({ _id: id });
        if (!st)
            return res.json({ status: false, msg: "Error in deleting Tasks..." });
        return res.json({ status: true, msg: "Task Deleted Successfully..." });
    } catch (err) {
        throw err;
    }
 }

module.exports = { TaskRoute, getAllTask, createTask, updateTask, deleteTask }