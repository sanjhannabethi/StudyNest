import React, { useState, useEffect } from 'react';
import './index.css';

const Assignment = () => {
  const [storedvalue, setStoredvalue] = useState([]);
  const [assignment, setAssignment] = useState([]);

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem('task'));
    if (items) {
      setStoredvalue(items);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('assignment', JSON.stringify(assignment));
  }, [assignment]);

  const handleSubmit = (e) => {
    e.preventDefault();
    let flag = 1;
    storedvalue.forEach((ele) => {
      if (ele.taskId === parseInt(e.target[0].value)) {
        const taskId = parseInt(e.target[0].value);
        const title = ele.text;
        const menteeId = parseInt(e.target[1].value);
        const file = e.target[2].value;
        setAssignment([...assignment, { taskId, title, menteeId, file }]);
        flag = 0;
        alert('task submitted successfully');
      }
    });
    if (flag) {
      alert('No task ID matching');
    }
  };

  return (
    <div className="container2 assignment">
      <div className="content">
        <div className="left-section">
          <div className="question-statement">
            <h2>Question Statement</h2>
            <table className="taskMonitorTable">
              <thead>
                <tr>
                  <th>Task ID</th>
                  <th>Task Title</th>
                </tr>
              </thead>
              <tbody>
                {storedvalue.map((task) => (
                  <tr key={task.taskId}>
                    <td>{task.taskId}</td>
                    <td>{task.text}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="right-section">
          <div className="turn-in-assignment">
            <h2>Turn in Assignment</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="Task Id">Task ID:</label>
                <input type="integer" id="Taskid" name="Taskid" required />
              </div>
              <div className="form-group">
                <label htmlFor="Mentee Id">Mentee ID:</label>
                <input type="integer" id="Menteeid" name="Menteeid" required />
              </div>
              <label htmlFor="assignmentFile">Choose File:</label>
              <input type="file" id="assignmentFile" name="assignmentFile" accept=".pdf,.doc,.docx" />
              <button className="button button2">Submit Assignment</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Assignment;
