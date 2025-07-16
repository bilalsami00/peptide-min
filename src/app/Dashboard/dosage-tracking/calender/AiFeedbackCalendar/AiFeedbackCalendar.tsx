import React, { useState, useEffect } from 'react';
import { IoMdArrowDropdown } from 'react-icons/io';
import { MdChevronLeft, MdChevronRight } from "react-icons/md";

const Calendar1: React.FC = () => {
//   const [currentDate, setCurrentDate] = useState<Date>(new Date(2025, 0, 1)); // January 2025
  const [currentDate, setCurrentDate] = useState<Date>(new Date()); // current date
  const [startDate, setStartDate] = useState<number | null>(null);
  const [endDate, setEndDate] = useState<number | null>(null);
  const [showYearDropdown, setShowYearDropdown] = useState(false);

  // Weekday headers
  const weekdays = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  
  // Get the month and year
  const month = currentDate.toLocaleString('default', { month: 'long' });
  const year = currentDate.getFullYear();
  

  // Get today's date without time component
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Disable future dates
  const isFutureDate = (day: number | null) => {
    if (day === null) return false;
    const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    return date > today;
  };

  // Disable next month button if next month is in the future
  const isNextMonthDisabled = () => {
    const nextMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1);
    return nextMonth > today;
  };



  // Generate years for dropdown
  const generateYears = () => {
    const currentYear = new Date().getFullYear();
    const years = [];
    for (let i = currentYear - 4; i <= currentYear + 0; i++) {
      years.push(i);
    }
    return years;
  };

  const years = generateYears();
  
  // Generate days for the current month
  const getDaysInMonth = (): (number | null)[] => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startDay = firstDay.getDay();
    
    const days: (number | null)[] = [];
    
    for (let i = 0; i < startDay; i++) {
      days.push(null);
    }
    
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
    if (day === null) return;

    // Reset selection if both dates are already selected
    if (startDate !== null && endDate !== null) {
      setStartDate(day);
      setEndDate(null);
      return;
    }

    // First selection
    if (startDate === null) {
      setStartDate(day);
      return;
    }

    // Second selection - set end date
    setEndDate(day);
    
    // Ensure dates are in correct order
    if (day < startDate) {
      setStartDate(day);
      setEndDate(startDate);
    }
  };

  const handleYearChange = (selectedYear: number) => {
    setCurrentDate(new Date(selectedYear, currentDate.getMonth(), 1));
    setShowYearDropdown(false);
  };

  // Helper functions for styling
  const isStartDate = (day: number) => startDate === day;
  const isEndDate = (day: number) => endDate === day;
  const isInRange = (day: number) => {
    if (startDate === null || endDate === null) return false;
    const min = Math.min(startDate, endDate);
    const max = Math.max(startDate, endDate);
    return day > min && day < max;
  };

  // Reset selection when month changes
  useEffect(() => {
    setStartDate(null);
    setEndDate(null);
  }, [currentDate]);

  // Helper function to get all dates in a range
  const getDatesInRange = (start: number, end: number): number[] => {
    const min = Math.min(start, end);
    const max = Math.max(start, end);
    const dates = [];
    for (let i = min; i <= max; i++) {
      dates.push(i);
    }
    return dates;
  };

  // Get selected range as Date objects and all dates in range
  const getSelectedRange = () => {
    if (startDate === null) return null;
    
    const end = endDate || startDate;
    const rangeStart = new Date(currentDate.getFullYear(), currentDate.getMonth(), startDate);
    const rangeEnd = new Date(currentDate.getFullYear(), currentDate.getMonth(), end);
    const allDates = getDatesInRange(startDate, end);
    
    return {
      start: rangeStart,
      end: rangeEnd,
      allDates: allDates.map(day => 
        new Date(currentDate.getFullYear(), currentDate.getMonth(), day)
      )
    };
  };

  const handleContinue = () => {
    const range = getSelectedRange();
    if (range) {
      console.log("Start Date:", range.start.toDateString());
      console.log("End Date:", range.end.toDateString());
      console.log("All Dates:", 
        range.allDates.map(d => d.toDateString()).join(", ")
      );
      
      // Format dates for display
      const formattedDates = range.allDates.map(date => 
        date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
      );
      
      alert(
        `Selected Range:\n\n` +
        `Start: ${range.start.toDateString()}\n` +
        `End: ${range.end.toDateString()}\n\n` +
        `All Dates:\n${formattedDates.join(", ")}`
      );
    } else {
      alert('Please select at least one date');
    }
  };

  return (
    <div className="flex flex-col items-center w-full max-w-[448px] min-h-[360px] gap-6">
      {/* Calendar Container */}
      <div
        className="bg-white rounded-4xl px-6 py-2 w-full"
        style={{ boxShadow: '0px 1px 3px 1px #00000026, 0px 1px 2px 0px #0000004D' }}
      >
        {/* Calendar Header */}
        <div className="flex justify-between items-center w-full mb-2">
          <div className="flex txt-14 items-center gap- font-medium text-[#626D6F]">
            <span>{month}</span>
            <div className="relative">
              <span 
                className="flex items-end gap-2 text-[#626D6F] cursor-pointer p-1 rounded"
                onClick={() => setShowYearDropdown(!showYearDropdown)}
              >
                {year}
                <IoMdArrowDropdown className={`text-[#626D6F] text-lg transition-transform ${showYearDropdown ? 'rotate-0' : ''}`} />
              </span>
              
              {showYearDropdown && (
                <div className="absolute top-full left-0 bg-white border border-gray-200 rounded-lg shadow-md z-10 max-h-52 overflow-auto w-20">
                  {years.map((y) => (
                    <div
                      key={y}
                      className={`px-3 py-2 cursor-pointer hover:bg-gray-100 ${y === year ? 'bg-blue-500 text-white hover:bg-blue-500' : ''}`}
                      onClick={() => handleYearChange(y)}
                    >
                      {y}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          
          <div className='flex'>
            {/* <button 
              className="flex items-center justify-center rounded-full w-12 h-12 hover:bg-gray-100 transition-colors"
              onClick={handlePrevMonth}
            >
              <MdChevronLeft className="text-[#626D6F] text-2xl" />
            </button>
            <button 
              className="flex items-center justify-center rounded-full w-12 h-12 hover:bg-gray-100 transition-colors"
              onClick={handleNextMonth}
            >
              <MdChevronRight className="text-[#626D6F] text-2xl" />
            </button> */}
            <button 
              className="flex items-center justify-center rounded-full w-12 h-12 hover:bg-gray-100 transition-colors"
              onClick={handlePrevMonth}
            >
              <MdChevronLeft className="text-[#626D6F] text-2xl" />
            </button>
            <button 
              className={`flex items-center justify-center rounded-full w-12 h-12 ${
                isNextMonthDisabled() 
                  ? 'opacity-50 cursor-not-allowed' 
                  : 'hover:bg-gray-100 transition-colors'
              }`}
              onClick={isNextMonthDisabled() ? undefined : handleNextMonth}
              disabled={isNextMonthDisabled()}
            >
              <MdChevronRight 
                className={`text-2xl ${
                  isNextMonthDisabled() 
                    ? 'text-gray-400' 
                    : 'text-[#626D6F]'
                }`}
              />
            </button>
          </div>
        </div>
        
        {/* Weekday Headers */}
        <div className="grid grid-cols-7 mb-4">
          {weekdays.map((day, index) => (
            <div key={index} className="text-center txt-14 text-[#25292A] font-medium">{day}</div>
          ))}
        </div>
        
        {/* Calendar Days */}
        {/* <div className="grid grid-cols-7 gap-2">
          {days.map((day, index) => (
            <div 
              key={index} 
              className="aspect-square flex" // Container for perfect square
              onClick={() => handleDateSelect(day)}
            >
              {day ? (
                <div 
                  className={`w-full h-full rounded-full flex items-center justify-center txt-14 cursor-pointer transition-colors
                    ${isStartDate(day) || isEndDate(day)
                      ? 'bg-[#224674] text-white font-semibold' 
                      : isInRange(day)
                        ? 'bg-[#C8E4FC] text-[#224674]'
                        : 'text-gray-800 hover:bg-gray-100'}`}
                >
                  {day}
                </div>
              ) : (
                <div className="w-full h-full"></div> // Empty cell
              )}
            </div>
          ))} */}
          {/* Calendar Days */}
        <div className="grid grid-cols-7 gap-2">
          {days.map((day, index) => (
            <div 
              key={index} 
              className="aspect-square flex" // Container for perfect square
              onClick={() => !isFutureDate(day) && handleDateSelect(day)}
            >
              {day ? (
                <div 
                  className={`w-full h-full rounded-full flex items-center justify-center txt-14 ${
                    isFutureDate(day)
                      ? 'text-gray-400 cursor-not-allowed'
                      : 'cursor-pointer text-gray-800 hover:bg-gray-100'
                  } ${
                    !isFutureDate(day) && (isStartDate(day) || isEndDate(day)
                      ? 'bg-[#224674] text-white font-semibold' 
                      : isInRange(day)
                        ? 'bg-[#C8E4FC] text-[#224674]'
                        : '')
                  }`}
                >
                  {day}
                </div>
              ) : (
                <div className="w-full h-full"></div> // Empty cell
              )}
            </div>
          ))}
        </div>
      </div>
      
      {/* Continue Button */}
      <button 
        className="w-full py-3.5 bg-[#224674] !text-white rounded-full font-semibold transition-colors hover:bg-[#1a3559]"
        onClick={handleContinue}
      >
        Continue
      </button>
      
      {/* Range Information (for demo purposes) */}
      {/* <div className="mt-4 p-4 bg-gray-50 rounded-lg w-full text-sm">
        <h3 className="font-semibold mb-2">How it works:</h3>
        <ul className="list-disc pl-5 space-y-1">
          <li>Select your <span className="bg-[#224674] text-white px-1 rounded">start date</span></li>
          <li>Select your <span className="bg-[#224674] text-white px-1 rounded">end date</span></li>
          <li>Dates between get <span className="bg-[#C8E4FC] text-[#224674] px-1 rounded">light blue styling</span></li>
          <li>Continue button collects all dates in the range</li>
        </ul>
      </div> */}
    </div>
  );
};

export default Calendar1;