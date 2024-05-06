const Router = require('express').Router;
const router = Router();
const tasksController = require('../controllers/task.controller');
const authVerify = require('../middlewares/auth/authVerify.middleware');
const loadTasks = require('../middlewares/tasks/loadTasks.middleware');
const saveTask = require('../middlewares/tasks/saveTask.middleware');
const deleteTask = require('../middlewares/tasks/deleteTask.middleware');

router.get('/', [authVerify, loadTasks], tasksController.getTasks);
router.get('/new', [authVerify], tasksController.getNewTask);
router.post('/new', [authVerify, saveTask], tasksController.postNewTask);
router.post('/delete/:id', [authVerify, deleteTask], tasksController.deleteTask);

module.exports = router;