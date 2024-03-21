import React from 'react';
import './index.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowAltCircleLeft } from '@fortawesome/free-solid-svg-icons';

const Cal = () => {
    const handleSubmit = (event) => {
        event.preventDefault(); // Prevent page reload on form submission
        // Add your form submission logic here
    };

    return (
        <div className="container4 cal">
            <div className="content">
                <div className="left-section">
                    <div className="question-statement">
                        <h2>Enter Details</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="name">Name:</label>
                                <input type="text" id="name" name="name" required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">Email:</label>
                                <input type="email" id="email" name="email" required />
                            </div>
                            <button type="submit" className="button button2">Add Guest</button>
                            <div className="form-group add-guests">
                                <textarea id="guests" name="guests" rows="4" cols="50" placeholder="Please share the reason for the meeting in brief"></textarea>
                            </div>
                            <button type="submit" className="button button2">Schedule Event</button>
                        </form>
                    </div>
                </div>
                <div className="right-section">
                    <div className="turn-in-assignment">
                        <FontAwesomeIcon icon={faArrowAltCircleLeft} className="icon" />
                        <h1 className="mt-4">15 Minute Meeting</h1>
                        <p>15 min</p>
                        <p>10.00am-10.15am, Jan 28 2022</p>
                        <p>India Standard Time</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Cal;
