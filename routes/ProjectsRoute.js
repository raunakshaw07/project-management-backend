const Project = require('../model/ProjectsModel');

const projectRoute = (req, res) => {
    res.json({ msg: "Running" });
}

const allProjects = async (req, res) => {
    try {
        const userId = req.body.id;
        const response = await Project.find({ userId });
        if (response.length === 0)
            return res.json({ status: false, data: [] })
        else
            return res.json({ status: true, data: response })
    } catch (err) {
        console.error(err)
    }
}

const singleProject = async (req, res) => {
    try {
        const id = req.params.id;
        const response = await Project.findOne({ _id: id })
        if (!response)
            return res.json({ status: false, data: {} })
        return res.json({ status: true, data: response });
    } catch (err) {
        console.error(err)
    }
}

const createProject = async (req, res) => {
    try {
        const project = {
            userId: req.body.userId,
            title: req.body.title,
            description: req.body.desc,
            lanes: req.body.lanes
        }
        const newProject = new Project(project);
        const st = await newProject.save();
        if (!st)
            return res.json({ status: false, msg: "Error in creating project..." });
        return res.json({ status: true, data: st, msg: "Project Created Successfully..." });
    } catch (err) {
        throw err;
    }
}

const updateProject = async (req, res) => {
    try {
        const id = req.params.id;
        const response = await Project.findOne({ _id: id });
        if (!response) res.json({ msg: "No Data Found..." });

        const update = await Project.updateOne({ _id: id }, {
            $set: {
                title: req.body.title,
                description: req.body.desc,
            }
        })

        const data = await Project.findOne({ _id: id });

        if (!update) {
            return res.json({ status: false, data: {}, msg: "Error in updating" });
        }
        return res.json({ status: true, data: data, msg: "Project Updated Successfully..." });
    } catch (err) {
        throw err;
    }
}

const deleteProject = async (req, res) => {
    try {
        const id = req.params.id;
        const response = await Project.find({ _id: id });
        if (!response) res.json({ status: false, msg: "Project Not Found..." });

        const st = await Project.findByIdAndDelete({ _id: id });
        if (!st)
            return res.json({ status: false, msg: "Error in deleting project..." });
        return res.json({ status: true, msg: "Project Deleted Successfully..." });
    } catch (err) {
        throw err;
    }
}

module.exports = {
    projectRoute, allProjects, singleProject, createProject, updateProject, deleteProject
}