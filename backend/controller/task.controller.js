const Task = require('../models/task.model');


//Create task
const createTask = async (req, res) => {
  try {
     
      const { _id, ...rest } = req.body;
      const task = new Task(rest);
      await task.save();
      res.status(201).send(task);
  } catch (error) {
      console.error(error);
      res.status(400).json({ error: error.message });
  }
}


//All task
const getTasks = async (req, res) => {
    try {
        const tasks = await Task.find();
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


//By ID
const getTaskbyID = async (req, res) => {
    try {
      const task = await Task.findById(req.params.id);
      if (!task) {
        return res.status(404).json({ message: 'Task not found' });
      }
      res.status(200).json(task);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  const updateTask = async (req, res) => {
    try {
      const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!task) {
        return res.status(404).json({ message: 'Task not found' });
      }
      res.status(200).json(task);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };


//Delete task by ID
  const deleteTask = async (req, res) => {
    try {
      const task = await Task.findByIdAndDelete(req.params.id);
      if (!task) {
        return res.status(404).json({ message: 'Task not found' });
      }
      res.status(200).json({ message: 'Task deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

//Delete All

const deleteAllTasks = async (req, res) => {
    try {
      await Task.deleteMany({});
      res.status(200).json({ message: 'All tasks deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };


module.exports = {
    createTask,
    getTasks,
    getTaskbyID,
    updateTask,
    deleteTask,
    deleteAllTasks
}


