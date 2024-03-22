import React, { useState, useEffect } from 'react';
import './index.css';

const TaskMonitor = () => {
  const [task, setTask] = useState([]);
  const [pass, setPass] = useState('')
  const [text, setText] = useState('');
  const [assi, setAssi] = useState('A');


  const handlePass = (e) => {
    setPass(e.target.value)
  }
  const handleText = (e) => {
    setText(e.target.value)
  }
  const handleAssi = (e) => {
    setAssi(e.target.value)
  }
  const handleSubmitForm = (e) => {
    e.preventDefault();
    const password = 'aaa';
    if(pass === password){
      const status = 'pending'
      const taskId = Math.floor(Math.random() * 1000);
      setTask([...task, {taskId, text, assi, status}])
    }
    else{
      alert("wrong pass");
    }
  }

  useEffect(() => {
    localStorage.setItem('task', JSON.stringify(task));
  }, [task])

 
  return (
    <div className='home'>
      <div className="container1">
        <div className="content">
          <div className="left-section">
            <div className="question-statement">
              <h2>Task Monitor</h2>
              <table className="taskMonitorTable">
                <thead>
                  <tr>
                    <th>Task ID</th>
                    <th>Task File</th>
                    <th>Assigned To</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {task.map(t => (
                    <tr key={t.taskId}>
                      <td>{t.taskId}</td>
                      <td>{t.text}</td>
                      <td>{t.assi}</td>
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
              <form>
                <label htmlFor="password">Password:</label>
                <input type="password" id="password" onChange={handlePass}/><br /><br />

                <label htmlFor="taskText">Task:</label>
                <textarea id="taskText" name="taskText" rows="10" cols="50" onChange={handleText}></textarea>

                <select id="assignee" name="assignee" onChange={handleAssi}>
                  <option value="A">A</option>
                  <option value="B">B</option>
                  <option value="C">C</option>
                </select><br /><br />
                <button type="submit" className="button button2" onClick={handleSubmitForm}>Submit Task</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TaskMonitor;