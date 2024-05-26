import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import moment from 'moment';

const url = import.meta.env.VITE_API_BASE_URL;

const TaskList = () => {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    try {
      const response = await axios.get(`${url}/api/v1/task/tasks`);
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const deleteTask = async (id) => {
    try {
      await axios.delete(`${url}/api/v1/task/tasks/${id}`);
      fetchTasks();
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const formatDateTime = (dateTime) => {
    if (!dateTime) return '';
    return moment(dateTime).format('YYYY-MM-DD HH:mm');
  };

  return (
    <div className="container mx-auto py-8">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Task List</h1>
          <Link to="/task/create">
            <button className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-1 px-3 rounded transition-colors duration-300">
              Create
            </button>
          </Link>
        </div>
        <ul>
          {tasks.map((task) => (
            <li key={task._id} className="bg-gray-100 rounded-lg p-4 mb-4 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-1">{task.title}</h3>
                  <p className="text-gray-600 mb-1">Status: {task.taskStatus}</p>
                  <p className="text-gray-600 mb-1">Due Date and Time: {formatDateTime(task.dueDateTime)}</p>
                </div>
                <div className="flex items-center">
                  <Link to={`/task/edit/${task._id}`}>
                    <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-3 rounded mr-2 transition-colors duration-300">
                      Edit
                    </button>
                  </Link>
                  <button
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded transition-colors duration-300"
                    onClick={() => deleteTask(task._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TaskList;