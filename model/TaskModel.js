const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    projectId: {
        type: String
    },
    laneId: {
        type: String
    },
    title: {
        type: String,
    },
    description: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
});

const Tasks = mongoose.model("Tasks", TaskSchema)
module.exports = Tasks