// // src/app/Dashboard/dosage-tracking/calender/Calendar1/Calendar1.tsx
// import React, { useState } from 'react';

// const Calendar1: React.FC = () => {
//   const [currentDate, setCurrentDate] = useState<Date>(new Date(2025, 0, 1)); // January 2025
//   const [selectedDate, setSelectedDate] = useState<number | null>(null);

//   // Weekday headers
//   const weekdays = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  
//   // Get the month and year
//   const month = currentDate.toLocaleString('default', { month: 'long' });
//   const year = currentDate.getFullYear();
  
//   // Generate days for the current month
//   const getDaysInMonth = (): (number | null)[] => {
//     const year = currentDate.getFullYear();
//     const month = currentDate.getMonth();
    
//     // First day of the month
//     const firstDay = new Date(year, month, 1);
//     // Last day of the month
//     const lastDay = new Date(year, month + 1, 0);
//     // Days in the month
//     const daysInMonth = lastDay.getDate();
//     // Starting day of the week (0 = Sunday)
//     const startDay = firstDay.getDay();
    
//     const days: (number | null)[] = [];
    
//     // Add empty cells for days before the first day of the month
//     for (let i = 0; i < startDay; i++) {
//       days.push(null);
//     }
    
//     // Add days of the month
//     for (let i = 1; i <= daysInMonth; i++) {
//       days.push(i);
//     }
    
//     return days;
//   };
  
//   const days = getDaysInMonth();
  
//   const handlePrevMonth = () => {
//     setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
//   };
  
//   const handleNextMonth = () => {
//     setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
//   };
  
//   const handleDateSelect = (day: number | null) => {
//     if (day !== null) {
//       setSelectedDate(day);
//     }
//   };

//   return (
//     <div className="calendarContainer">
//       <div className="calendar">
//         {/* <h2 className="calendarTitle">Select Date</h2> */}
        
//         <div className="calendarHeader">
          
          
//          <div className='flex w-full justify-between items-center'>
//           <div className="monthYear txt-20">
//             <span className="month">{month}</span>
//             <span className="year">{year}</span>
//           </div>
//              <div className='flex'>
//                 <button className="navButton" onClick={handlePrevMonth}>
//             <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//               <path d="M15 6L9 12L15 18" stroke="#626D6F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
//             </svg>
//           </button>
//           <button className="navButton" onClick={handleNextMonth}>
//             <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//               <path d="M9 6L15 12L9 18" stroke="#626D6F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
//             </svg>
//           </button>
//              </div>
//          </div>

//         </div>
        
//         <div className="weekdays">
//           {weekdays.map((day, index) => (
//             <div key={index} className="weekday">{day}</div>
//           ))}
//         </div>
        
//         <div className="daysGrid">
//           {days.map((day, index) => (
//             <div 
//               key={index} 
//               className={`day ${day === selectedDate ? 'selected' : ''} ${day ? '' : 'empty'}`}
//               onClick={() => handleDateSelect(day)}
//             >
//               {day}
//             </div>
//           ))}
//         </div>
        
//         <button className="continueButton">
//           Continue
//         </button>
//       </div>

//       <style jsx>{`
//         .calendarContainer {
//           display: flex;
//           justify-content: center;
//           align-items: center;
//           width: 100%;
//         }
        
//         .calendar {
//           background-color: white;
//           border-radius: 16px;
//           box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
//           padding: 24px;
//           width: 100%;
//           max-width: 448px;
//         }
        
//         .calendarTitle {
//           color: #2D3748;
//           font-size: 20px;
//           font-weight: 600;
//           text-align: center;
//           margin-bottom: 24px;
//         }
        
//         .calendarHeader {
//           display: flex;
//           justify-content: space-between;
//           align-items: center;
//           margin-bottom: 20px;
//         }
        
//         .navButton {
//           background: none;
//           border: none;
//           cursor: pointer;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           width: 48px;
//           height: 48px;
//           border-radius: 50%;
//           transition: background-color 0.2s;
//         }
        
//         .navButton:hover {
//           background-color: #F2F5F6;
//         }
        
//         .monthYear {
//           display: flex;
//           align-items: center;
//           gap: 8px;
//           font-weight: 600;
//           color: #2D3748;
//         }
        
//         .month {
//         //   font-size: 18px;
//         }
        
//         .year {
//         //   font-size: 18px;
//           color: #718096;
//         }
        
//         .weekdays {
//           display: grid;
//           grid-template-columns: repeat(7, 1fr);
//           margin-bottom: 16px;
//         }
        
//         .weekday {
//           text-align: center;
//           font-size: 14px;
//           color: #718096;
//           font-weight: 500;
//         }
        
//         .daysGrid {
//           display: grid;
//           grid-template-columns: repeat(7, 1fr);
//           gap: 8px;
//         }
        
//         .day {
//           height: 40px;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           border-radius: 50%;
//           font-size: 14px;
//           color: #2D3748;
//           cursor: pointer;
//           transition: all 0.2s;
//         }
        
//         .day:hover:not(.empty) {
//         //   background-color: #EDF2F7;
//         }
        
//         .day.selected {
//           background-color: #224674;
//           color: white;
//           font-weight: 600;

//         }
        
//         .empty {
//           background-color: transparent;
//           cursor: default;
//         }
        
//         .continueButton {
//           width: 100%;
//           padding: 14px;
//           margin-top: 24px;
//           background-color: #3182CE;
//           color: white;
//           border: none;
//           border-radius: 8px;
//           font-size: 16px;
//           font-weight: 600;
//           cursor: pointer;
//           transition: background-color 0.2s;
//         }
        
//         .continueButton:hover {
//           background-color: #2B6CB0;
//         }
//       `}</style>
//     </div>
//   );
// };

// export default Calendar1;



// src/app/Dashboard/dosage-tracking/calender/Calendar1/Calendar1.tsx
// import React, { useState } from 'react';
// import { IoMdArrowDropdown } from 'react-icons/io';

// const Calendar1: React.FC = () => {
//   const [currentDate, setCurrentDate] = useState<Date>(new Date(2025, 0, 1)); // January 2025
//   const [selectedDate, setSelectedDate] = useState<number | null>(null);
//   const [showYearDropdown, setShowYearDropdown] = useState(false);

//   // Weekday headers
//   const weekdays = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  
//   // Get the month and year
//   const month = currentDate.toLocaleString('default', { month: 'long' });
//   const year = currentDate.getFullYear();
  
//   // Generate years for dropdown (from current year - 10 to current year + 10)
//   const generateYears = () => {
//     const currentYear = new Date().getFullYear();
//     const years = [];
//     for (let i = currentYear - 4; i <= currentYear + 0; i++) {
//       years.push(i);
//     }
//     return years;
//   };

//   const years = generateYears();
  
//   // Generate days for the current month
//   const getDaysInMonth = (): (number | null)[] => {
//     const year = currentDate.getFullYear();
//     const month = currentDate.getMonth();
    
//     // First day of the month
//     const firstDay = new Date(year, month, 1);
//     // Last day of the month
//     const lastDay = new Date(year, month + 1, 0);
//     // Days in the month
//     const daysInMonth = lastDay.getDate();
//     // Starting day of the week (0 = Sunday)
//     const startDay = firstDay.getDay();
    
//     const days: (number | null)[] = [];
    
//     // Add empty cells for days before the first day of the month
//     for (let i = 0; i < startDay; i++) {
//       days.push(null);
//     }
    
//     // Add days of the month
//     for (let i = 1; i <= daysInMonth; i++) {
//       days.push(i);
//     }
    
//     return days;
//   };
  
//   const days = getDaysInMonth();
  
//   const handlePrevMonth = () => {
//     setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
//   };
  
//   const handleNextMonth = () => {
//     setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
//   };
  
//   const handleDateSelect = (day: number | null) => {
//     if (day !== null) {
//       setSelectedDate(day);
//     }
//   };

//   const handleYearChange = (selectedYear: number) => {
//     setCurrentDate(new Date(selectedYear, currentDate.getMonth(), 1));
//     setShowYearDropdown(false);
//   };

//   return (
//     <div className="calendarContainer">
//       <div className="calendar">
//         <div className="calendarHeader">
//           <div className='flex w-full justify-between items-center'>
//             <div className="monthYear txt-20">
//               <span className="month">{month}</span>
//               <div className="yearDropdownContainer">
//                 <span 
//                   className="year" 
//                   onClick={() => setShowYearDropdown(!showYearDropdown)}
//                 >
//                   {year}
//                   {/* <svg 
//                     width="12" 
//                     height="8" 
//                     viewBox="0 0 12 8" 
//                     fill="none" 
//                     xmlns="http://www.w3.org/2000/svg"
//                     className={`dropdownIcon ${showYearDropdown ? 'rotate-180' : ''}`}
//                   >
//                     <path d="M1 1L6 6L11 1" stroke="#718096" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
//                   </svg> */}
//                           <IoMdArrowDropdown className="text-[#8D9A9B] text-lg" />
                  
//                 </span>
//                 {showYearDropdown && (
//                   <div className="yearDropdown">
//                     {years.map((y) => (
//                       <div
//                         key={y}
//                         className={`yearOption ${y === year ? 'selectedYear' : ''}`}
//                         onClick={() => handleYearChange(y)}
//                       >
//                         {y}
//                       </div>
//                     ))}
//                   </div>
//                 )}
//               </div>
//             </div>
//             <div className='flex'>
//               <button className="navButton" onClick={handlePrevMonth}>
//                 <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//                   <path d="M15 6L9 12L15 18" stroke="#626D6F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
//                 </svg>
//               </button>
//               <button className="navButton" onClick={handleNextMonth}>
//                 <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//                   <path d="M9 6L15 12L9 18" stroke="#626D6F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
//                 </svg>
//               </button>
//             </div>
//           </div>
//         </div>
        
//         <div className="weekdays">
//           {weekdays.map((day, index) => (
//             <div key={index} className="weekday">{day}</div>
//           ))}
//         </div>
        
//         <div className="daysGrid">
//           {days.map((day, index) => (
//             <div 
//               key={index} 
//               className={`day ${day === selectedDate ? 'selected' : ''} ${day ? '' : 'empty'}`}
//               onClick={() => handleDateSelect(day)}
//             >
//               {day}
//             </div>
//           ))}
//         </div>
        
//       </div>
//         <button className="continueButton">
//           Continue
//         </button>

//       <style jsx>{`
//         .calendarContainer {
//           display: flex;
//           flex-direction: column;
//           justify-content: center;
//           align-items: center;
//           width: 100%;
//           height: 100%;
//         }
        
//         .calendar {
//           background-color: white;
//           border-radius: 16px;
//           box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
//           padding: 14px 24px;
//           width: 100%;
//           max-width: 448px;
//           min-height: 360px;
//         }
        
//         .calendarHeader {
//           display: flex;
//           justify-content: space-between;
//           align-items: center;
//           margin-bottom: 20px;
//         }
        
//         .navButton {
//           background: none;
//           border: none;
//           cursor: pointer;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           width: 48px;
//           height: 48px;
//           border-radius: 50%;
//           transition: background-color 0.2s;
//         }
        
//         .navButton:hover {
//           background-color: #F2F5F6;
//         }
        
//         .monthYear {
//           display: flex;
//           align-items: center;
//           gap: 8px;
//           font-weight: 600;
//           color: #2D3748;
//         }
        
//         .yearDropdownContainer {
//           position: relative;
//           display: inline-block;
//         }
        
//         .year {
//           display: flex;
//           align-items: center;
//           gap: 4px;
//           color: #718096;
//           cursor: pointer;
//           padding: 4px 8px;
//           border-radius: 4px;
//           transition: background-color 0.2s;
//         }
        
//         .year:hover {
//           background-color: #F2F5F6;
//         }
        
//         .dropdownIcon {
//           transition: transform 0.2s;
//         }
        
//         .rotate-180 {
//           transform: rotate(180deg);
//         }
        
//         .yearDropdown {
//           position: absolute;
//           top: 100%;
//           left: 0;
//           background-color: white;
//           border: 1px solid #E2E8F0;
//           border-radius: 8px;
//           box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
//           z-index: 10;
//           max-height: 200px;
//           overflow-y: auto;
//           width: 80px;
//         }
        
//         .yearOption {
//           padding: 8px 12px;
//           cursor: pointer;
//           transition: background-color 0.2s;
//         }
        
//         .yearOption:hover {
//           background-color: #F2F5F6;
//         }
        
//         .selectedYear {
//           background-color: #3182CE;
//           color: white;
//         }
        
//         .selectedYear:hover {
//           background-color: #3182CE;
//         }
        
//         .weekdays {
//           display: grid;
//           grid-template-columns: repeat(7, 1fr);
//           margin-bottom: 16px;
//         }
        
//         .weekday {
//           text-align: center;
//           font-size: 14px;
//           color: #718096;
//           font-weight: 500;
//         }
        
//         .daysGrid {
//           display: grid;
//           grid-template-columns: repeat(7, 1fr);
//           gap: 8px;
//         }
        
//         .day {
//           height: 40px;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           border-radius: 50%;
//           font-size: 14px;
//           color: #2D3748;
//           cursor: pointer;
//           transition: all 0.2s;
//         }
        
//         // .day:hover:not(.empty) {
//         //   background-color: #EDF2F7;
//         // }
        
//         .day.selected {
//           background-color: #224674;
//           color: white;
//           font-weight: 600;
//         }
        
//         .empty {
//           background-color: transparent;
//           cursor: default;
//         }
        
//         .continueButton {
//           width: 100%;
//           padding: 14px;
//           margin-top: 24px;
//           background-color: #224674;
//           color: white;
//           border: none;
//           border-radius: 96px;
//           font-size: 16px;
//           font-weight: 600;
//           cursor: pointer;
//           transition: background-color 0.2s;
//         }
        
//         // .continueButton:hover {
//         //   background-color: #2B6CB0;
//         // }
//       `}</style>
//     </div>
//   );
// };

// export default Calendar1;




//  fully styled calendar component with year dropdown and navigation buttons
// import React, { useState } from 'react';
// import { IoMdArrowDropdown } from 'react-icons/io';
// import { MdChevronLeft, MdChevronRight } from "react-icons/md";


// const Calendar1: React.FC = () => {
//   const [currentDate, setCurrentDate] = useState<Date>(new Date(2025, 0, 1)); // January 2025
//   const [selectedDate, setSelectedDate] = useState<number | null>(null);
//   const [showYearDropdown, setShowYearDropdown] = useState(false);

//   // Weekday headers
//   const weekdays = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  
//   // Get the month and year
//   const month = currentDate.toLocaleString('default', { month: 'long' });
//   const year = currentDate.getFullYear();
  
//   // Generate years for dropdown
//   const generateYears = () => {
//     const currentYear = new Date().getFullYear();
//     const years = [];
//     for (let i = currentYear - 4; i <= currentYear + 0; i++) {
//       years.push(i);
//     }
//     return years;
//   };

//   const years = generateYears();
  
//   // Generate days for the current month
//   const getDaysInMonth = (): (number | null)[] => {
//     const year = currentDate.getFullYear();
//     const month = currentDate.getMonth();
    
//     const firstDay = new Date(year, month, 1);
//     const lastDay = new Date(year, month + 1, 0);
//     const daysInMonth = lastDay.getDate();
//     const startDay = firstDay.getDay();
    
//     const days: (number | null)[] = [];
    
//     for (let i = 0; i < startDay; i++) {
//       days.push(null);
//     }
    
//     for (let i = 1; i <= daysInMonth; i++) {
//       days.push(i);
//     }
    
//     return days;
//   };
  
//   const days = getDaysInMonth();
  
//   const handlePrevMonth = () => {
//     setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
//   };
  
//   const handleNextMonth = () => {
//     setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
//   };
  
//   const handleDateSelect = (day: number | null) => {
//     if (day !== null) {
//       setSelectedDate(day);
//     }
//   };

//   const handleYearChange = (selectedYear: number) => {
//     setCurrentDate(new Date(selectedYear, currentDate.getMonth(), 1));
//     setShowYearDropdown(false);
//   };

//   return (
//     <div className="flex flex-col items-center w-full max-w-[448px] min-h-[360px] gap-6">
//       {/* Calendar Container */}
//       {/* <div className="bg-white rounded-2xl shadow-lg px-6 py- w-full"> */}
//       <div
//   className="bg-white rounded-4xl px-6 py- pt-2 w-full"
//   style={{ boxShadow: '0px 1px 3px 1px #00000026, 0px 1px 2px 0px #0000004D' }}
// >

//         {/* Calendar Header */}
//         <div className="flex justify-between items-center w-full  mb-2">
//           <div className="flex txt-14 items-center gap- font-medium text-[#626D6F]">
//             <span>{month}</span>
//             <div className="relative">
//               <span 
//                 className="flex items-end gap-2 text-[#626D6F] cursor-pointer p-1 rounded  "
//                 onClick={() => setShowYearDropdown(!showYearDropdown)}
//               >
//                 {year}
//                 <IoMdArrowDropdown className={`text-[#626D6F] text-lg transition-transform ${showYearDropdown ? 'rotate-0' : ''}`} />
//               </span>
              
//               {showYearDropdown && (
//                 <div className="absolute top-full left-0 bg-white border border-gray-200 rounded-lg shadow-md z-10 max-h-52 overflow-auto w-20">
//                   {years.map((y) => (
//                     <div
//                       key={y}
//                       className={`px-3 py-2 cursor-pointer hover:bg-gray-100 ${y === year ? 'bg-blue-500 text-white hover:bg-blue-500' : ''}`}
//                       onClick={() => handleYearChange(y)}
//                     >
//                       {y}
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>
//           </div>
          
//           <div className='flex'>
//             <button 
//               className="flex items-center justify-center rounded-full w-12 h-12 hover:bg-gray-100 transition-colors"
//               onClick={handlePrevMonth}
//             >
//               {/* <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//                 <path d="M15 6L9 12L15 18" stroke="#626D6F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
//               </svg> */}
//               <MdChevronLeft className="text-[#626D6F] text-2xl" />
//             </button>
//             <button 
//               className="flex items-center justify-center rounded-full w-12 h-12 hover:bg-gray-100 transition-colors"
//               onClick={handleNextMonth}
//             >
//               {/* <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//                 <path d="M9 6L15 12L9 18" stroke="#626D6F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
//               </svg> */}
//               <MdChevronRight className="text-[#626D6F] text-2xl" />
//             </button>
//           </div>
//         </div>
        
//         {/* Weekday Headers */}
//         <div className="grid grid-cols-7 mb-4">
//           {weekdays.map((day, index) => (
//             <div key={index} className="text-center txt-14 text-[#25292A] font-medium">{day}</div>
//           ))}
//         </div>
        
//         {/* Calendar Days */}
//         <div className="grid grid-cols-7 gap-2">
//           {days.map((day, index) => (
//             <div 
//               key={index} 
//               className="aspect-square flex" // Container for perfect square
//               onClick={() => handleDateSelect(day)}
//             >
//               {day ? (
//                 <div 
//                   className={`w-full h-full rounded-full flex items-center justify-center txt-14 font-medium cursor-pointer transition-colors
//                     ${day === selectedDate 
//                       ? 'bg-[#224674] text-white font-semibold' 
//                       : 'text-gray-800 hover:bg-gray-100'}`}
//                 >
//                   {day}
//                 </div>
//               ) : (
//                 <div className="w-full h-full"></div> // Empty cell
//               )}
//             </div>
//           ))}
//         </div>
//       </div>
      
//       {/* Continue Button with 24px gap */}
//       <button className="w-full py-3.5 bg-[#224674] !text-white rounded-full font-semibold   transition-colors hover:bg-[#1a3559]">
//         Continue
//       </button>
//     </div>
//   );
// };

// export default Calendar1;


// fully range not code
// import React, { useState, useEffect } from 'react';
// import { IoMdArrowDropdown } from 'react-icons/io';
// import { MdChevronLeft, MdChevronRight } from "react-icons/md";

// const Calendar1: React.FC = () => {
//   const [currentDate, setCurrentDate] = useState<Date>(new Date(2025, 0, 1)); // January 2025
//   const [startDate, setStartDate] = useState<number | null>(null);
//   const [endDate, setEndDate] = useState<number | null>(null);
//   const [showYearDropdown, setShowYearDropdown] = useState(false);

//   // Weekday headers
//   const weekdays = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  
//   // Get the month and year
//   const month = currentDate.toLocaleString('default', { month: 'long' });
//   const year = currentDate.getFullYear();
  
//   // Generate years for dropdown
//   const generateYears = () => {
//     const currentYear = new Date().getFullYear();
//     const years = [];
//     for (let i = currentYear - 4; i <= currentYear + 0; i++) {
//       years.push(i);
//     }
//     return years;
//   };

//   const years = generateYears();
  
//   // Generate days for the current month
//   const getDaysInMonth = (): (number | null)[] => {
//     const year = currentDate.getFullYear();
//     const month = currentDate.getMonth();
    
//     const firstDay = new Date(year, month, 1);
//     const lastDay = new Date(year, month + 1, 0);
//     const daysInMonth = lastDay.getDate();
//     const startDay = firstDay.getDay();
    
//     const days: (number | null)[] = [];
    
//     for (let i = 0; i < startDay; i++) {
//       days.push(null);
//     }
    
//     for (let i = 1; i <= daysInMonth; i++) {
//       days.push(i);
//     }
    
//     return days;
//   };
  
//   const days = getDaysInMonth();
  
//   const handlePrevMonth = () => {
//     setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
//   };
  
//   const handleNextMonth = () => {
//     setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
//   };
  
//   const handleDateSelect = (day: number | null) => {
//     if (day === null) return;

//     // Reset selection if both dates are already selected
//     if (startDate !== null && endDate !== null) {
//       setStartDate(day);
//       setEndDate(null);
//       return;
//     }

//     // First selection
//     if (startDate === null) {
//       setStartDate(day);
//       return;
//     }

//     // Second selection - set end date
//     setEndDate(day);
    
//     // Ensure dates are in correct order
//     if (day < startDate) {
//       setStartDate(day);
//       setEndDate(startDate);
//     }
//   };

//   const handleYearChange = (selectedYear: number) => {
//     setCurrentDate(new Date(selectedYear, currentDate.getMonth(), 1));
//     setShowYearDropdown(false);
//   };

//   // Helper functions for styling
//   const isStartDate = (day: number) => startDate === day;
//   const isEndDate = (day: number) => endDate === day;
//   const isInRange = (day: number) => {
//     if (startDate === null || endDate === null) return false;
//     const min = Math.min(startDate, endDate);
//     const max = Math.max(startDate, endDate);
//     return day > min && day < max;
//   };

//   // Reset selection when month changes
//   useEffect(() => {
//     setStartDate(null);
//     setEndDate(null);
//   }, [currentDate]);

//   // Get selected range as Date objects
//   const getSelectedRange = () => {
//     if (startDate === null) return null;
    
//     return {
//       start: new Date(currentDate.getFullYear(), currentDate.getMonth(), startDate),
//       end: endDate 
//         ? new Date(currentDate.getFullYear(), currentDate.getMonth(), endDate) 
//         : new Date(currentDate.getFullYear(), currentDate.getMonth(), startDate)
//     };
//   };

//   const handleContinue = () => {
//     const range = getSelectedRange();
//     if (range) {
//       console.log('Selected date range:', range);
//       // Here you can do whatever you need with the range object
//       // For example: pass it to a parent component, store in state, etc.
//     }
//   };

//   return (
//     <div className="flex flex-col items-center w-full max-w-[448px] min-h-[360px] gap-6">
//       {/* Calendar Container */}
//       <div
//         className="bg-white rounded-4xl px-6 py-2 w-full"
//         style={{ boxShadow: '0px 1px 3px 1px #00000026, 0px 1px 2px 0px #0000004D' }}
//       >
//         {/* Calendar Header */}
//         <div className="flex justify-between items-center w-full mb-2">
//           <div className="flex txt-14 items-center gap- font-medium text-[#626D6F]">
//             <span>{month}</span>
//             <div className="relative">
//               <span 
//                 className="flex items-end gap-2 text-[#626D6F] cursor-pointer p-1 rounded"
//                 onClick={() => setShowYearDropdown(!showYearDropdown)}
//               >
//                 {year}
//                 <IoMdArrowDropdown className={`text-[#626D6F] text-lg transition-transform ${showYearDropdown ? 'rotate-0' : ''}`} />
//               </span>
              
//               {showYearDropdown && (
//                 <div className="absolute top-full left-0 bg-white border border-gray-200 rounded-lg shadow-md z-10 max-h-52 overflow-auto w-20">
//                   {years.map((y) => (
//                     <div
//                       key={y}
//                       className={`px-3 py-2 cursor-pointer hover:bg-gray-100 ${y === year ? 'bg-blue-500 text-white hover:bg-blue-500' : ''}`}
//                       onClick={() => handleYearChange(y)}
//                     >
//                       {y}
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>
//           </div>
          
//           <div className='flex'>
//             <button 
//               className="flex items-center justify-center rounded-full w-12 h-12 hover:bg-gray-100 transition-colors"
//               onClick={handlePrevMonth}
//             >
//               <MdChevronLeft className="text-[#626D6F] text-2xl" />
//             </button>
//             <button 
//               className="flex items-center justify-center rounded-full w-12 h-12 hover:bg-gray-100 transition-colors"
//               onClick={handleNextMonth}
//             >
//               <MdChevronRight className="text-[#626D6F] text-2xl" />
//             </button>
//           </div>
//         </div>
        
//         {/* Weekday Headers */}
//         <div className="grid grid-cols-7 mb-4">
//           {weekdays.map((day, index) => (
//             <div key={index} className="text-center txt-14 text-[#25292A] font-medium">{day}</div>
//           ))}
//         </div>
        
//         {/* Calendar Days */}
//         <div className="grid grid-cols-7 gap-2">
//           {days.map((day, index) => (
//             <div 
//               key={index} 
//               className="aspect-square flex" // Container for perfect square
//               onClick={() => handleDateSelect(day)}
//             >
//               {day ? (
//                 <div 
//                   className={`w-full h-full rounded-full flex items-center justify-center txt-14 cursor-pointer transition-colors
//                     ${isStartDate(day) || isEndDate(day)
//                       ? 'bg-[#224674] text-white font-semibold' 
//                       : isInRange(day)
//                         ? 'bg-[#C8E4FC] text-[#224674]'
//                         : 'text-gray-800 hover:bg-gray-100'}`}
//                 >
//                   {day}
//                 </div>
//               ) : (
//                 <div className="w-full h-full"></div> // Empty cell
//               )}
//             </div>
//           ))}
//         </div>
//       </div>
      
//       {/* Continue Button */}
//       <button 
//         className="w-full py-3.5 bg-[#224674] !text-white rounded-full font-semibold transition-colors hover:bg-[#1a3559]"
//         onClick={handleContinue}
//       >
//         Continue
//       </button>
//     </div>
//   );
// };

// export default Calendar1;


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
            <button 
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
        <div className="grid grid-cols-7 gap-2">
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