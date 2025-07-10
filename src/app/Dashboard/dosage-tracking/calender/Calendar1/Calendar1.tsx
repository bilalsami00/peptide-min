// src/app/Dashboard/dosage-tracking/calender/Calendar1/Calendar1.tsx
import React, { useState } from 'react';

const Calendar1: React.FC = () => {
  const [currentDate, setCurrentDate] = useState<Date>(new Date(2025, 0, 1)); // January 2025
  const [selectedDate, setSelectedDate] = useState<number | null>(null);

  // Weekday headers
  const weekdays = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  
  // Get the month and year
  const month = currentDate.toLocaleString('default', { month: 'long' });
  const year = currentDate.getFullYear();
  
  // Generate days for the current month
  const getDaysInMonth = (): (number | null)[] => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    
    // First day of the month
    const firstDay = new Date(year, month, 1);
    // Last day of the month
    const lastDay = new Date(year, month + 1, 0);
    // Days in the month
    const daysInMonth = lastDay.getDate();
    // Starting day of the week (0 = Sunday)
    const startDay = firstDay.getDay();
    
    const days: (number | null)[] = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startDay; i++) {
      days.push(null);
    }
    
    // Add days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }
    
    return days;
  };
  
  const days = getDaysInMonth();
  
  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };
  
  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };
  
  const handleDateSelect = (day: number | null) => {
    if (day !== null) {
      setSelectedDate(day);
    }
  };

  return (
    <div className="calendarContainer">
      <div className="calendar">
        <h2 className="calendarTitle">Select Date</h2>
        
        <div className="calendarHeader">
          <button className="navButton" onClick={handlePrevMonth}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 6L9 12L15 18" stroke="#626D6F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          
          <div className="monthYear">
            <span className="month">{month}</span>
            <span className="year">{year}</span>
          </div>
          
          <button className="navButton" onClick={handleNextMonth}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 6L15 12L9 18" stroke="#626D6F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
        
        <div className="weekdays">
          {weekdays.map((day, index) => (
            <div key={index} className="weekday">{day}</div>
          ))}
        </div>
        
        <div className="daysGrid">
          {days.map((day, index) => (
            <div 
              key={index} 
              className={`day ${day === selectedDate ? 'selected' : ''} ${day ? '' : 'empty'}`}
              onClick={() => handleDateSelect(day)}
            >
              {day}
            </div>
          ))}
        </div>
        
        <button className="continueButton">
          Continue
        </button>
      </div>

      <style jsx>{`
        .calendarContainer {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
        }
        
        .calendar {
          background-color: white;
          border-radius: 16px;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
          padding: 24px;
          width: 100%;
          max-width: 360px;
        }
        
        .calendarTitle {
          color: #2D3748;
          font-size: 20px;
          font-weight: 600;
          text-align: center;
          margin-bottom: 24px;
        }
        
        .calendarHeader {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }
        
        .navButton {
          background: none;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          transition: background-color 0.2s;
        }
        
        .navButton:hover {
          background-color: #F2F5F6;
        }
        
        .monthYear {
          display: flex;
          align-items: center;
          gap: 8px;
          font-weight: 600;
          color: #2D3748;
        }
        
        .month {
          font-size: 18px;
        }
        
        .year {
          font-size: 18px;
          color: #718096;
        }
        
        .weekdays {
          display: grid;
          grid-template-columns: repeat(7, 1fr);
          margin-bottom: 16px;
        }
        
        .weekday {
          text-align: center;
          font-size: 14px;
          color: #718096;
          font-weight: 500;
        }
        
        .daysGrid {
          display: grid;
          grid-template-columns: repeat(7, 1fr);
          gap: 8px;
        }
        
        .day {
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          font-size: 14px;
          color: #2D3748;
          cursor: pointer;
          transition: all 0.2s;
        }
        
        .day:hover:not(.empty) {
          background-color: #EDF2F7;
        }
        
        .day.selected {
          background-color: #3182CE;
          color: white;
          font-weight: 600;
        }
        
        .empty {
          background-color: transparent;
          cursor: default;
        }
        
        .continueButton {
          width: 100%;
          padding: 14px;
          margin-top: 24px;
          background-color: #3182CE;
          color: white;
          border: none;
          border-radius: 8px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: background-color 0.2s;
        }
        
        .continueButton:hover {
          background-color: #2B6CB0;
        }
      `}</style>
    </div>
  );
};

export default Calendar1;