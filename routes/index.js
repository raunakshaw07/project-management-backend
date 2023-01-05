const express = require("express");
const router = express.Router();

const {
    getUser,
    createUser,
    updateUser,
    login,
    logout
} = require('./UserRoute');

const {
    projectRoute,
    allProjects,
    singleProject,
    createProject,
    updateProject,
    deleteProject
} = require('./ProjectsRoute');

const {
    TaskRoute,
    getAllTask,
    createTask,
    updateTask,
    deleteTask
} = require("./TaskRoute");

// Index
router.get("/", (req, res) => { res.json({ msg : "Server running..." }) });


// User Routes
router.get('/user/get-user', getUser)
router.post('/user/create', createUser)
router.post('/user/update', updateUser)
router.post('/user/login', login)
router.get('/user/logout', logout)

// Project Routes
router.get('/project/', projectRoute);
router.post('/project/all-projects/', allProjects)
router.get('/project/:id/', singleProject)
router.post('/project/create', createProject);
router.post('/project/update/:id/', updateProject)
router.get('/project/delete/:id/', deleteProject)

// Task Routes
router.get('/task/', TaskRoute);
router.post('/task/all-tasks/', getAllTask)
router.post('/task/create', createTask);
router.post('/task/update/:id/', updateTask)
router.get('/task/delete/:id/', deleteTask)


module.exports = router;
