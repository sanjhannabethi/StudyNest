import React, { useState, useEffect } from 'react';
import './index.css';

const BTaskMonitor = () => {
 
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
                    <th>Task Description</th>
                  
                  </tr>
                </thead>
                <tbody>
                  
                
                </tbody>
              </table>
            </div>
          </div>
          <div className="right-section">
            <div className="turn-in-assignment">
              <h2>Assign Task</h2>
              <form >


                <label htmlFor="assignmentFile">Choose File:</label>
                <input type="file" id="assignmentFile" name="assignmentFile" accept=".pdf,.doc,.docx" />

                <label htmlFor="taskText">Task Description:</label>
                <textarea id="taskText" name="taskText" rows="8" cols="30"  placeholder='Describe task'></textarea>

                <button type="submit" className="button button2">Submit Task</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BTaskMonitor;
