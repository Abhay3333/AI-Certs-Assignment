const express = require('express');
const {createTask,getTaskbyID,getTasks,deleteTask,updateTask,deleteAllTasks} = require('../controller/task.controller');

const router = express.Router();


router.get('/tasks', getTasks);
router.get('/tasks/:id', getTaskbyID);
router.post('/tasks', createTask);
router.put('/tasks/:id', updateTask);
router.delete('/tasks/:id', deleteTask);
router.delete('/tasks', deleteAllTasks);

module.exports = router;
