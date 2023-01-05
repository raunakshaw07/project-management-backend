const mongoose = require('mongoose'); 

const LaneSchema = new mongoose.Schema({
    title: {    
        type: String,
    },
});

const ProjectSchema = new mongoose.Schema({
    userId: {
        type: String,
    },
    title: {
        type: String,
    },
    description: {
        type: String,
    },
    lanes: [LaneSchema],
    createdAt: {
        type: Date,
        default: Date.now()
    }
});

const Projects = mongoose.model('Projects', ProjectSchema);

module.exports = Projects;