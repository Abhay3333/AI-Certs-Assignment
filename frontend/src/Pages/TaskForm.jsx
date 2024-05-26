import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Datetime from 'react-datetime';
import 'react-datetime/css/react-datetime.css';
import moment from 'moment';

const url = import.meta.env.VITE_API_BASE_URL;

const TaskForm = () => {
  const [task, setTask] = useState({
    title: '',
    taskStatus: 'Pending',
    description: '',
    dueDateTime: null, // Combine dueDate and dueTime into a single DateTime object
  });
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      fetchTask();
    }
  }, [id]);

  const fetchTask = async () => {
    try {
      const response = await axios.get(`${url}/api/v1/task/tasks/${id}`);
      setTask(response.data);
    } catch (error) {
      console.error('Error fetching task:', error);
    }
  };

  const handleDateTimeChange = (dateTime) => {
    setTask({ ...task, dueDateTime: dateTime });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask({ ...task, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = {
        ...task,
        dueDateTime: task.dueDateTime ? task.dueDateTime.toISOString() : null, // Convert DateTime object to ISO string
      };
      if (id) {
        await axios.put(`${url}/api/v1/task/tasks/${id}`, formData);
      } else {
        await axios.post(`${url}/api/v1/task/tasks`, formData);
      }
      navigate('/');
    } catch (error) {
      console.error('Error saving task:', error);
    }
  };

  return (
    <div className="container mx-auto py-8">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          {id ? 'Edit Task' : 'Create New Task'}
        </h1>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6">
          <div>
            <input
              type="text"
              name="title"
              placeholder="Title"
              value={task.title}
              onChange={handleChange}
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div>
            <select
              name="taskStatus"
              value={task.taskStatus}
              onChange={handleChange}
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Done">Done</option>
            </select>
          </div>
          <div>
            <textarea
              name="description"
              placeholder="Description"
              value={task.description}
              onChange={handleChange}
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              rows="3"
              required
            />
          </div>
          <div>
            <Datetime
              name="dueDateTime"
              value={task.dueDateTime}
              onChange={handleDateTimeChange}
              dateFormat="YYYY-MM-DD"
              timeFormat="HH:mm"
              inputProps={{
                placeholder: 'Due Date and Time',
                className:
                  'appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline',
              }}
              closeOnSelect
            />
          </div>
          <button
            type="submit"
            className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded transition-colors duration-300"
          >
            {id ? 'Update Task' : 'Create Task'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default TaskForm;