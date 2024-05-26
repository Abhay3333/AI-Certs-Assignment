import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import TaskList from './Pages/TaskList'
import TaskForm from './Pages/TaskForm'

const App = () => {
  return (
   <Router>
    <Routes>
      <Route path="/" element={<TaskList />} />
      <Route path="/task/create" element={<TaskForm />} />
      <Route path="/task/edit/:id" element={<TaskForm />} />
    </Routes>
   </Router>
  )
}

export default App


//useEffect(() => {
//   if (id) {
//     fetchTask();
//   }
// }, [id]);