import React from 'react'
import './index.css'; 
const assignment = () => {
    return (
      <div className="container2 assignment">
        <div className="content">
          <div className="left-section">
            {/* Question Statement */}
            <div className="question-statement">
              <h2>Question Statement</h2>
              <p id="taskContent"></p>
            </div>
            {/* Grid layout for left section */}
          </div>
          <div className="right-section">
            {/* Turn in Assignment */}
            <div className="turn-in-assignment">
              <h2>Turn in Assignment</h2>
              <form>
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
  
  export default assignment;