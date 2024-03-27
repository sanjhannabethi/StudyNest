import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./App.css";

function App() {
  const [date, setDate] = useState(new Date());
  const [timeSlots, setTimeSlots] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const [selectedTimeOption, setSelectedTimeOption] = useState("");

  useEffect(() => {
    // Example function to fetch or determine available time slots
    const fetchTimeSlots = () => {
      // Simulate fetching time slots based on the selected date and time option
      let slots = [];
      switch (selectedTimeOption) {
        case "morning":
          slots = [
            "9:00 AM",
            "9:15 AM",
            "9:30 AM",
            "9:45 AM",
            "10:00 AM",
            "10:15 AM",
            "10:30 AM",
            "10:45 AM",
          ];
          break;
        case "afternoon":
          slots = [
            "12:00 PM",
            "12:15 PM",
            "12:30 PM",
            "12:45 PM",
            "1:00 PM",
            "1:15 PM",
            "1:30 PM",
            "1:45 PM",
          ];
          break;
        case "evening":
          slots = [
            "4:00 PM",
            "4:15 PM",
            "4:30 PM",
            "4:45 PM",
            "5:00 PM",
            "5:15 PM",
            "5:30 PM",
            "5:45 PM",
          ];
          break;
        default:
          slots = [];
      }
      setTimeSlots(slots);
    };

    fetchTimeSlots();
  }, [selectedDate, selectedTimeOption]);

  const handleDateChange = (value) => {
    setDate(value);
    setSelectedDate(value);
  };

  const handleTimeSlotClick = (slot) => {
    setSelectedTimeSlot(slot);
  };

  const handleConfirmClick = () => {
    // Handle confirmation logic here
    console.log(
      "Appointment confirmed for",
      selectedDate.toDateString(),
      selectedTimeSlot
    );
  };

  const handleTimeOptionChange = (option) => {
    setSelectedTimeOption(option);
  };

  return (
    <div className="app">
      <div className="card">
        <div className="content">
          <div className="left-column">
            <div className="meeting-type">
              <div className="clock-icon">⏰</div>
              <div className="meeting-details">
                <h2>15 Minute Meeting</h2>
                <p>15 min</p>
              </div>
            </div>
            <h2 className="select-date-heading">Select a Date & Time</h2>
            <div className="calendar-container">
              <Calendar
                onChange={handleDateChange}
                value={date}
                minDate={new Date()}
                maxDate={
                  new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000)
                } // Next 7 days
                tileClassName={({ date, view }) =>
                  view === "month" && date.getDate() === selectedDate?.getDate()
                    ? "highlight"
                    : null
                }
                showWeekNumbers={false}
              />
            </div>
          </div>
          <div className="right-column">
            {selectedDate && (
              <div className="time-slots">
                <h2 className="selected-date">{selectedDate.toDateString()}</h2>
                <h3>Time Slots</h3>
                {timeSlots.map((slot, index) => (
                  <div key={index} className="time-slot-container">
                    <button
                      className={`time-slot-button ${
                        selectedTimeSlot === slot ? "selected" : ""
                      }`}
                      onClick={() => handleTimeSlotClick(slot)}
                    >
                      {slot}
                    </button>
                    {selectedTimeSlot === slot && (
                      <button
                        className="confirm-button"
                        onClick={handleConfirmClick}
                      >
                        Confirm
                      </button>
                    )}
                  </div>
                ))}
                {!selectedTimeOption && (
                  <div className="time-option-container">
                    <button
                      className={`time-option-button ${
                        selectedTimeOption === "morning" ? "selected" : ""
                      }`}
                      onClick={() => handleTimeOptionChange("morning")}
                    >
                      Morning
                    </button>
                    <button
                      className={`time-option-button ${
                        selectedTimeOption === "afternoon" ? "selected" : ""
                      }`}
                      onClick={() => handleTimeOptionChange("afternoon")}
                    >
                      Afternoon
                    </button>
                    <button
                      className={`time-option-button ${
                        selectedTimeOption === "evening" ? "selected" : ""
                      }`}
                      onClick={() => handleTimeOptionChange("evening")}
                    >
                      Evening
                    </button>
                  </div>
                )}
                {selectedTimeOption && (
                  <div className="time-option-container">
                    <button
                      className="reset-button"
                      onClick={() => handleTimeOptionChange("")}
                    >
                      Reset
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
