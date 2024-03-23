import React, { useState, useEffect } from 'react';
import './index.css';

const TaskMonitor = () => {
  const [task, setTask] = useState([]);
  const [localtask, setLocalTask] = useState(() => {
    const storedTasks = JSON.parse(localStorage.getItem('task'));
    return storedTasks || [];
  });
  const [pass, setPass] = useState('');
  const [text, setText] = useState('');

  const handlePass = (e) => {
    setPass(e.target.value);
  };

  const handleText = (e) => {
    setText(e.target.value);
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();
    const password = 'aaa';
    if (pass === password) {
      const status = 'pending';
      const taskId = Math.floor(Math.random() * 1000);
      const newTask = { taskId, text, status };
      setTask([...task, newTask]);
      setLocalTask([...localtask, newTask]);
      localStorage.setItem('task', JSON.stringify([...localtask, newTask]));
      setText('');
    } else {
      alert('Wrong password');
    }
  };

  useEffect(() => {
    localStorage.setItem('task', JSON.stringify(task));
  }, [task]);
  
  useEffect(() =>{
    const items = JSON.parse(localStorage.getItem('acceptarr'));
    console.log(items);
    if (items) {
      const updatedLocalTask = localtask.map(task => {
        const foundItem = items.find(item => item.taskId === task.taskId);
        if (foundItem) {
          return { ...task, status: foundItem.status };
        }
        return task;
      });
      setLocalTask(updatedLocalTask);
    }
  }, [localtask]);
  
  

  return (
    <div className="home">
      <div className="container1">
        <div className="content">
          <div className="left-section">
            <div className="question-statement">
              <h2>Task Monitor</h2>
              <table className="taskMonitorTable">
                <thead>
                  <tr>
                    <th>Task ID</th>
                    <th>Task Title</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {localtask.map((t) => (
                    <tr key={t.taskId}>
                      <td>{t.taskId}</td>
                      <td>{t.text}</td>
                      <td>{t.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="right-section">
            <div className="turn-in-assignment">
              <h2>Assign Task</h2>
              <form onSubmit={handleSubmitForm}>
                <label htmlFor="password">Password:</label>
                <input type="password" id="password" onChange={handlePass} /><br /><br />

                <label htmlFor="assignmentFile">Choose File:</label>
                <input type="file" id="assignmentFile" name="assignmentFile" accept=".pdf,.doc,.docx" />

                <label htmlFor="taskText">Task Title:</label>
                <textarea id="taskText" name="taskText" rows="8" cols="30" value={text} onChange={handleText}></textarea>

                <button type="submit" className="button button2">Submit Task</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TaskMonitor;
