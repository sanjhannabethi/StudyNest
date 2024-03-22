import React, {useState, useEffect }from 'react'
import './index.css'; 
const Assignment = () => {
    const [storedvalue, setStoredvalue] = useState([]);

    useEffect(() => {
      const items = JSON.parse(localStorage.getItem('task'));
      if(items){
        setStoredvalue(items)
      }
    }, [])
    console.log(storedvalue)
    
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
                    <th>Task File</th>
                  
                    
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
            {/* Turn in Assignment */}
            <div className="turn-in-assignment">
              <h2>Turn in Assignment</h2>
              <form>
                
                <div className="form-group">
                    <label htmlFor="Task Id">Task ID:</label>
                    <input type="integer" id="Taskid" name="Taskid" required />
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
  }
  
  export default Assignment;