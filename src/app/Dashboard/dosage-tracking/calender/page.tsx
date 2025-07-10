 

// "use client";

// import React, { useState, useRef, useEffect } from "react";
// import Image from "next/image";
// import { ConfigProvider, Calendar } from "antd";
// import type { Dayjs } from "dayjs";
// import dayjs from "dayjs";
// import updateLocale from "dayjs/plugin/updateLocale";
// import "dayjs/locale/en-gb";
// import enGB from "antd/locale/en_GB";
// import "@fontsource/inter";
// import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
// import { IoMdArrowDropdown } from "react-icons/io";
// import { RxCross2 } from "react-icons/rx";
// import "antd/dist/reset.css";
// import { DatePicker } from "antd";
// import type { CalendarProps } from "antd";
// import PeptideDropdown from "./PeptideDropDown/PeptideDropDown";
// import type { PeptideOption } from "./PeptideDropDown/PeptideDropDown";

// dayjs.locale("en-gb");
// dayjs.extend(updateLocale);
// dayjs.updateLocale("en-gb", {
//   weekStart: 0,
//   weekdaysMin: ["MON", "TUE", "WED", "THUR", "FRI", "SAT", "SUN"],
//   weekdaysShort: ["MON", "TUE", "WED", "THUR", "FRI", "SAT", "SUN"],
// });

// // Define the event type
// interface CalendarEvent {
//   date: string;
//   peptide: PeptideOption | null;
//   dosage: string;
//   goal: string;
// }

// const CalendarPage: React.FC = () => {
//   const [currentDate, setCurrentDate] = useState<Dayjs>(dayjs().locale("en-gb"));
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [selectedDate, setSelectedDate] = useState<string | null>(null);
//   const [selectedPeptide, setSelectedPeptide] = useState<PeptideOption | null>(null);
//   const [dosage, setDosage] = useState<string>('');
//   const [goal, setGoal] = useState<string>('');
//   const [events, setEvents] = useState<CalendarEvent[]>([]);

//   const hiddenDateRef = useRef<HTMLInputElement>(null);
//   const [pickerValue, setPickerValue] = useState<Dayjs>(dayjs());
//   const [years, setYears] = useState<number[]>([]);

//   useEffect(() => {
//     const currentYear = dayjs().year();
//     const yearsList = [];
//     for (let i = currentYear - 5; i <= currentYear; i++) {
//       yearsList.push(i);
//     }
//     setYears(yearsList);
//   }, []);

//   const onPanelChange: CalendarProps<Dayjs>["onPanelChange"] = (value) => {
//     setCurrentDate(value.locale("en-gb"));
//   };

//   const handlePrevMonth = () => setCurrentDate((prev) => prev.subtract(1, "month"));
//   const handleNextMonth = () => setCurrentDate((prev) => prev.add(1, "month"));
//   const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
//     const newYear = parseInt(e.target.value);
//     setPickerValue(pickerValue.year(newYear));
//   };
//   const handlePrevMonthPicker = () => setPickerValue(pickerValue.subtract(1, "month"));
//   const handleNextMonthPicker = () => setPickerValue(pickerValue.add(1, "month"));

//   // Check if all form fields are filled
//   const isFormValid = selectedDate && selectedPeptide && dosage.trim() !== '' && goal.trim() !== '';

//   // Handle form submission
//   const handleAddEvent = () => {
//     if (!isFormValid) return;
    
//     const newEvent: CalendarEvent = {
//       date: selectedDate,
//       peptide: selectedPeptide,
//       dosage: dosage,
//       goal: goal
//     };
    
//     setEvents([...events, newEvent]);
    
//     // Reset form
//     setSelectedDate(null);
//     setSelectedPeptide(null);
//     setDosage('');
//     setGoal('');
//     setIsModalOpen(false);
//   };

//   // Render custom content in calendar cells
//   const dateCellRender = (value: Dayjs) => {
//     const dateStr = value.format('YYYY-MM-DD');
//     const dayEvents = events.filter(e => e.date === dateStr);
    
//     return (
//       <div 
//       // className="flex flex-col-reverse  gap-1 py-1"
//       // className="h-full w-full flex flex-col justify-end items-start gap-1 absolute bottom-0 left-0 p-1"
//       className="h-full w-full flex flex-col-reverse gap-1 items-start justify-start px-1 pb-2"
//       >
//         {dayEvents.map((event, idx) => (
//           <div 
//             key={idx} 
//             // className="bg-blue-50 rounded px-2 py-1 text-xs truncate"
//             className="inline-block w-fit bg-[#C8E4FC] rounded-full px-2 py-1 text-xs"
//             style={{ fontFamily: 'Afacad Flux, Afacad, Inter, sans-serif' }}
//           >
//             <div className="font-semibold text-[#224674]">{event.peptide?.name}</div>
//             {/* <div>{event.dosage}mcg</div> */}
//           </div>
//         ))}
//       </div>
//     );
//   };

//   const headerRender: CalendarProps<Dayjs>["headerRender"] = () => (
//     <div className="flex justify-between items-center w-full bg-white">
//       <div className="flex items-center gap-2 py-6 w-full justify-between max-sm:flex-col">
//         <div className="flex items-center gap-2">
//           <span className="font-extrabold txt-24 text-[#25292A]">
//             {currentDate.format("MMM YYYY")}
//           </span>
//           <button
//             onClick={handlePrevMonth}
//             className="w-8 h-8 flex items-center justify-center rounded-full"
//           >
//             <Image
//               src="/Dashboard/dosage-tracking/arrow-left.svg"
//               alt="Previous"
//               width={32}
//               height={32}
//             />
//           </button>
//           <button
//             onClick={handleNextMonth}
//             className="w-8 h-8 flex items-center justify-center rounded-full"
//           >
//             <Image
//               src="/Dashboard/dosage-tracking/arrow-right.svg"
//               alt="Next"
//               width={32}
//               height={32}
//             />
//           </button>
//         </div>
//         <div className="flex gap-3 buttonD txt-16">
//           <button
//             onClick={handlePrevMonth}
//             className="h-10 rounded-3xl px-6 py-2 flex items-center justify-center gap-2 bg-[#E9EDEE] !text-[#9EA9AA] font-semibold"
//           >
//             AI Feedback
//           </button>
//           <button
//             onClick={() => setIsModalOpen(true)}
//             className="h-10 rounded-3xl px-6 py-2 flex items-center justify-center gap-2 bg-[#224674] !text-white font-semibold"
//           >
//             Add Peptide Dose
//           </button>
//         </div>
//       </div>
//     </div>
//   );

//   return (
//     <div className="py-3 px-4 sm:px-6 md:px-8 lg:px-12 calendar-wrapper">
//       <ConfigProvider locale={enGB}>
//         <Calendar
//           value={currentDate}
//           onPanelChange={onPanelChange}
//           headerRender={headerRender}
//           dateCellRender={dateCellRender}
//         />
//       </ConfigProvider>

//       {isModalOpen && (
//         <div className="fixed inset-0 z-50 bg-black/20 flex items-center justify-center">
//           <div className="bg-white rounded-[16px] p-6 w-[496px] max-sm:w-[300px] relative overflow-y-auto">
//             <div className="flex items-center justify-between mb-6">
//               <h2 className="txt-32 font-semibold text-[#25292A] mb-4">
//                 Add Peptide
//               </h2>
//               <div
//                 className="bg-[#D8DFE0] rounded-full p-2 cursor-pointer"
//                 onClick={() => setIsModalOpen(false)}
//               >
//                 <RxCross2 className="text-[#9EA9AA] font-extrabold" />
//               </div>
//             </div>

//             <div className="flex flex-col gap-4 mb-6">
//               <div className="flex flex-col gap-6">
//                 <div className="relative">
//                   <p>Date</p>
//                   <DatePicker
//                     placement="topRight"
//                     picker="date"
//                     value={selectedDate ? dayjs(selectedDate) : null}
//                     onChange={(date) =>
//                       setSelectedDate(date?.format("YYYY-MM-DD") || null)
//                     }
//                     className="w-full h-auto 2xl:w-[448px] xl:h-[48px] !bg-[#F2F5F6] rounded-md px-3 py-2"
//                     rootClassName="custom-datepicker-input"
//                     suffixIcon={
//                       <Image
//                         src="/Dashboard/dosage-tracking/calendarIcon.svg"
//                         alt="calendar"
//                         width={24}
//                         height={24}
//                         className="cursor-pointer"
//                       />
//                     }
//                     popupClassName="custom-datepicker-dropdown no-header-datepicker"
//                     inputReadOnly
//                     onPanelChange={(date) => setPickerValue(date)}
//                     panelRender={(panelNode) => (
//                       <div className="custom-panel-container">
//                         <div className="flex justify-between items-center px-6 py-3 text-[#626D6F] font-medium">
//                           <div className="flex items-center gap-1 relative">
//                             <span className="txt-16">
//                               {pickerValue.format("MMMM")}
//                             </span>
//                             <div className="relative flex items-center">
//                               <select
//                                 value={pickerValue.year()}
//                                 onChange={handleYearChange}
//                                 className="bg-transparent border-none txt-16 focus:outline-none focus:ring-0 appearance-none pr-6"
//                               >
//                                 {years.map((year) => (
//                                   <option key={year} value={year}>
//                                     {year}
//                                   </option>
//                                 ))}
//                               </select>
//                               <IoMdArrowDropdown
//                                 className="absolute right-0 pointer-events-none text-[#626D6F]"
//                                 size={16}
//                               />
//                             </div>
//                           </div>
//                           <div className="flex gap-2">
//                             <button
//                               onClick={handlePrevMonthPicker}
//                               className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100"
//                             >
//                               <MdKeyboardArrowLeft size={24} />
//                             </button>
//                             <button
//                               onClick={handleNextMonthPicker}
//                               className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100"
//                             >
//                               <MdKeyboardArrowRight size={24} />
//                             </button>
//                           </div>
//                         </div>
//                         {panelNode}
//                       </div>
//                     )}
//                   />
//                 </div>
//               </div>

//               <div className="relative">
//                 <p>Peptide</p>
//                 <PeptideDropdown
//                   selected={selectedPeptide}
//                   setSelected={setSelectedPeptide}
//                 />
//               </div>

//               <div className="relative">
//                 <p>Dosage</p>
//                 <div className="relative">
//                   <input
//                     type="text"
//                     inputMode="numeric"
//                     pattern="[0-9]*"
//                     placeholder="Enter dosage you have taken"
//                     className="w-full h-auto 2xl:w-[448px] xl:h-[48px] bg-[#F2F5F6] border-none focus:outline-none focus:ring-0 focus:border-transparent font-medium placeholder:font-normal placeholder:text-[#8D9A9B] rounded-md px-4 py-2 pr-12"
//                     value={dosage}
//                     onChange={(e) => {
//                       const value = e.target.value;
//                       if (value === '' || /^\d+$/.test(value)) {
//                         setDosage(value);
//                       }
//                     }}
//                   />
//                   <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-[#8D9A9B]">
//                     mcg
//                   </span>
//                 </div>
//               </div>

//               <div className="relative">
//                 <p>Goal</p>
//                 <textarea
//                   placeholder="Write your primary goal"
//                   className="w-full 2xl:w-[448px] h-[100px] font-medium placeholder:font-normal bg-[#F2F5F6] border-none focus:outline-none focus:ring-0 focus:border-transparent placeholder:text-[#8D9A9B] rounded-md px-4 py-2 resize-none"
//                   value={goal}
//                   onChange={(e) => setGoal(e.target.value)}
//                 ></textarea>
//               </div>

//               <button 
//                 className={`txt-18 font-semibold leading-none text-center px-4 py-4 rounded-full w-full ${
//                   isFormValid 
//                     ? 'bg-[#224674] !text-white cursor-pointer' 
//                     : 'bg-[#D8DFE0] !text-[#8D9A9B] cursor-not-allowed'
//                 }`}
//                 disabled={!isFormValid}
//                 onClick={handleAddEvent}
//               >
//                 Add
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       <style jsx global>{`
//         /* Force Afacad Flux for Ant Design calendar popup */
//         .custom-datepicker-dropdown,
//         .custom-datepicker-dropdown * {
//           font-family: "Afacad Flux", "Afacad", "Roboto", sans-serif !important;
//         }

//         /* ===== START: Custom Weekday Headers - Guaranteed to Work ===== */
//         .custom-datepicker-dropdown .ant-picker-content th {
//           width: 28px !important;
//           height: 40px !important;
//           padding: 0 !important;
//           line-height: 40px !important;
//           text-align: center !important;
//           font-size: 0 !important; /* Hide original text */
//         }

//         /* Override for ≥768px */
//         @media (min-width: 768px) {
//           .custom-datepicker-dropdown .ant-picker-content th {
//             width: 48px !important;
//           }
//         }

//         .custom-datepicker-dropdown .ant-picker-content th::after {
//           content: attr(data-short);
//           display: block !important;
//           font-weight: 500 !important;
//           font-size: 16px !important;
//           position: absolute;
//           top: 0;
//           left: 0;
//           width: 100%;
//           height: 100%;
//           line-height: 40px;
//           color: #25292a !important;
//         }

//         /* Apply specific letters to each column */
//         .custom-datepicker-dropdown
//           .ant-picker-content
//           thead
//           tr
//           th:nth-child(1) {
//           --short: "S";
//         }
//         .custom-datepicker-dropdown
//           .ant-picker-content
//           thead
//           tr
//           th:nth-child(2) {
//           --short: "M";
//         }
//         .custom-datepicker-dropdown
//           .ant-picker-content
//           thead
//           tr
//           th:nth-child(3) {
//           --short: "T";
//         }
//         .custom-datepicker-dropdown
//           .ant-picker-content
//           thead
//           tr
//           th:nth-child(4) {
//           --short: "W";
//         }
//         .custom-datepicker-dropdown
//           .ant-picker-content
//           thead
//           tr
//           th:nth-child(5) {
//           --short: "T";
//         }
//         .custom-datepicker-dropdown
//           .ant-picker-content
//           thead
//           tr
//           th:nth-child(6) {
//           --short: "F";
//         }
//         .custom-datepicker-dropdown
//           .ant-picker-content
//           thead
//           tr
//           th:nth-child(7) {
//           --short: "S";
//         }

//         .custom-datepicker-dropdown .ant-picker-content th::after {
//           content: var(--short) !important;
//         }

//         .custom-datepicker-dropdown .ant-picker-content th {
//           position: relative;
//         }
//         /* ===== END: Custom Weekday Headers ===== */

//         /* Rest of your styles... */
//         .no-header-datepicker .ant-picker-header {
//           display: none !important;
//         }
//       `}</style>

//       <style jsx global>{`
//         /* This targets the actual input inside the DatePicker */
//         .custom-datepicker-input input::placeholder {
//           color: #8d9a9b !important;
//           font-family: "Afacad Flux", "Afacad", "Roboto", sans-serif !important;
//           font-weight: 400 !important;
//           font-size: 16px !important;
//           letter-spacing: 0.5px !important;
//           line-height: 100% !important;
//         }

//         .custom-datepicker-input input {
//           color: #25292a !important;
//           font-family: "Afacad Flux", "Afacad", "Roboto", sans-serif !important;
//           font-weight: 500 !important;
//           font-size: 16px !important;
//           letter-spacing: 0.5px !important;
//           line-height: 100% !important;
//         }

//         /* Force Afacad Flux for Ant Design calendar popup */
//         .custom-datepicker-dropdown,
//         .custom-datepicker-dropdown * {
//           font-family: "Afacad Flux", "Afacad", "Roboto", sans-serif !important;
//           font-weight: 500 !important;
//           font-size: 16px !important;
//         }

//         .no-header-datepicker .ant-picker-header {
//           display: none !important;
//         }

//         /* 1) Remove “today” default highlight entirely */
//         .custom-datepicker-dropdown
//           .ant-picker-cell-today
//           .ant-picker-cell-inner {
//           background: none !important;
//           color: inherit !important;
//         }

//         /* 2) Remove the light‑blue focus/focus‑range square */
//         .custom-datepicker-dropdown
//           .ant-picker-cell-selected
//           .ant-picker-cell-inner,
//         .custom-datepicker-dropdown
//           .ant-picker-cell-in-view:not(.ant-picker-cell-selected)
//           .ant-picker-cell-inner,
//         .custom-datepicker-dropdown
//           .ant-picker-cell-range-start
//           .ant-picker-cell-inner,
//         .custom-datepicker-dropdown
//           .ant-picker-cell-range-end
//           .ant-picker-cell-inner {
//           background: none !important;
//           color: inherit !important;
//         }

//         .custom-datepicker-dropdown
//           .ant-picker-cell-today
//           .ant-picker-cell-inner::before {
//           content: none !important;
//         }
//         .custom-datepicker-dropdown
//           .ant-picker-cell-today:not(.ant-picker-cell-selected)
//           .ant-picker-cell-inner {
//           position: relative;
//           border: 1px solid #224674 !important;
//           color: #224674 !important;
//           border-radius: 50% !important;
//           background: transparent !important;
//         }

//         /* 3) Only your selected date gets the circle */
//         .custom-datepicker-dropdown
//           .ant-picker-cell-selected
//           .ant-picker-cell-inner {
//           background-color: #224674 !important;
//           color: #ffffff !important;
//           border-radius: 50% !important;
//         }

//         /* 1) Outer popup wrapper */
//         .custom-datepicker-dropdown {
//           width: 260px !important;
//           height: 344px !important;
//           min-width: 260px !important;
//           min-height: 344px !important;
//           max-width: 360px !important;
//           max-height: 344px !important;
//           border-radius: 28px !important;
//           box-shadow: 0px 1px 3px 1px rgba(0, 0, 0, 0.15),
//             0px 1px 2px 0px rgba(0, 0, 0, 0.3) !important;
//           overflow: hidden !important;
//         }

//         /* Override for ≥768px */
//         @media (min-width: 768px) {
//           .custom-datepicker-dropdown {
//             width: 360px !important;
//             height: 344px !important;
//             min-width: 360px !important;
//             //   margin-top: -50px !important;
//           }
//         }

//         /* 2) Panel container and panel itself */
//         .custom-datepicker-dropdown .ant-picker-panel-container,
//         .custom-datepicker-dropdown .ant-picker-panel {
//           width: 100% !important;
//           height: 100% !important;
//         }

//         /* 3) Date panel (header + body) */
//         .custom-datepicker-dropdown .ant-picker-date-panel {
//           display: flex !important;
//           flex-direction: column !important;
//           width: 100% !important;
//           height: 100% !important;
//         }

//         /* 4) Header (month + year nav) */
//         .custom-datepicker-dropdown .ant-picker-header {
//           flex-shrink: 0;
//           width: 100%;
//           /* Optional: adjust padding if you want */
//           padding: 12px 16px !important;
//         }

//         /* 5) Body wrapper */
//         .custom-datepicker-dropdown .ant-picker-body {
//           flex: 1 !important;
//           display: flex !important;
//           flex-direction: column !important;
//           width: 100% !important;
//           height: 100% !important;
//           padding: 1px 12px !important;
//         }

//         /* 6) Content (the table) */
//         .custom-datepicker-dropdown .ant-picker-content {
//           flex: 1 !important;
//           width: 100% !important;
//           height: 100% !important;
//           table-layout: fixed !important;
//         }

//         /* 7) Each cell fill height */
//         .custom-datepicker-dropdown .ant-picker-cell {
//           height: 100% !important;
//           padding: 12px !important;
//         }

//         /* Hide out-of-month dates (only show current month dates) */
//         .custom-datepicker-dropdown
//           .ant-picker-cell:not(.ant-picker-cell-in-view) {
//           visibility: hidden !important;
//           pointer-events: none !important;
//         }

//         /* 8) Highlight today/selected */
//         .custom-datepicker-dropdown
//           .ant-picker-cell-today
//           .ant-picker-cell-inner,
//         .custom-datepicker-dropdown
//           .ant-picker-cell-selected
//           .ant-picker-cell-inner {
//           background-color: #224674 !important;
//           color: #fff !important;
//           border-radius: 50% !important;
//         }

//         /* 9) Remove footer (Today button + divider) */
//         .custom-datepicker-dropdown .ant-picker-footer {
//           display: none !important;
//         }
//       `}</style>

//       <style jsx global>{`  

//       .calendar-wrapper .ant-picker-cell:not(.ant-picker-cell-in-view) .ant-picker-cell-inner {
//     color: #25292A !important;
//     opacity: 1 !important;
//   }


//         /* Apply Inter font only to Calendar */
//         .calendar-wrapper .ant-picker-calendar {
//           font-family: "Inter", sans-serif !important;
//         }

//         /* Remove unwanted border-top and margins from calendar-date container */
//         .ant-picker-calendar.ant-picker-calendar-full
//           .ant-picker-calendar-date {
//           display: block;
//           width: auto;
//           height: auto;
//           margin: 0 !important;
//           padding: 4px 8px 0 !important;
//           border: none !important;
//           border-radius: 0;
//           transition: background 0.3s;
//         }

//         .ant-picker-calendar-date {
//           border-top: none !important;
//         }

//         .ant-picker-calendar .ant-picker-body {
//           border-radius: 0.375rem;
//           overflow: hidden;
//         }

//         .ant-picker-calendar .ant-picker-content thead th {
//           text-align: left !important;
//           padding: 12px 8px !important;
//           border: 1px solid #e9edee;
//           font-weight: 500 !important; /* Medium */
//           color: #626d6f;

//           font-size: 16px !important;
//           line-height: 16px !important; /* 100% line-height */
//           letter-spacing: 0 !important;
//         }

//         .ant-picker-calendar .ant-picker-cell {
//           text-align: left !important;
//           vertical-align: top !important;
//           padding: 0.5rem;

//           font-weight: 500;

//           font-size: 21px !important;
//           line-height: 21px !important; /* 100% line-height */
//           letter-spacing: 0 !important;

//           border: 1px solid #e9edee;
//         }

//         .ant-picker-calendar .ant-picker-cell-inner {
//           justify-content: flex-start !important;
//           padding: 0 !important;
//         }
//       `}</style>
//     </div>
//   );
// };

// export default CalendarPage;




// "use client";

// import React, { useState, useRef, useEffect } from "react";
// import Image from "next/image";
// import { ConfigProvider, Calendar } from "antd";
// import type { Dayjs } from "dayjs";
// import dayjs from "dayjs";
// import updateLocale from "dayjs/plugin/updateLocale";
// import "dayjs/locale/en-gb";
// import enGB from "antd/locale/en_GB";
// import "@fontsource/inter";
// import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
// import { IoMdArrowDropdown } from "react-icons/io";
// import { RxCross2 } from "react-icons/rx";
// import "antd/dist/reset.css";
// import { DatePicker } from "antd";
// import type { CalendarProps } from "antd";
// import PeptideDropdown from "./PeptideDropDown/PeptideDropDown";
// import type { PeptideOption } from "./PeptideDropDown/PeptideDropDown";

// dayjs.locale("en-gb");
// dayjs.extend(updateLocale);
// dayjs.updateLocale("en-gb", {
//   weekStart: 0,
//   weekdaysMin: ["MON", "TUE", "WED", "THUR", "FRI", "SAT", "SUN"],
//   weekdaysShort: ["MON", "TUE", "WED", "THUR", "FRI", "SAT", "SUN"],
// });

// // Define the event type
// interface CalendarEvent {
//   date: string;
//   peptide: PeptideOption | null;
//   dosage: string;
//   goal: string;
// }

// const CalendarPage: React.FC = () => {
//   const [currentDate, setCurrentDate] = useState<Dayjs>(dayjs().locale("en-gb"));
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [selectedDate, setSelectedDate] = useState<string | null>(null);
//   const [selectedPeptide, setSelectedPeptide] = useState<PeptideOption | null>(null);
//   const [dosage, setDosage] = useState<string>('');
//   const [goal, setGoal] = useState<string>('');
//   const [events, setEvents] = useState<CalendarEvent[]>([]);
//   const [popupDate, setPopupDate] = useState<string | null>(null);
//   const [popupPosition, setPopupPosition] = useState({ top: 0, left: 0 });

//   const hiddenDateRef = useRef<HTMLInputElement>(null);
//   const [pickerValue, setPickerValue] = useState<Dayjs>(dayjs());
//   const [years, setYears] = useState<number[]>([]);

//   useEffect(() => {
//     const currentYear = dayjs().year();
//     const yearsList = [];
//     for (let i = currentYear - 5; i <= currentYear; i++) {
//       yearsList.push(i);
//     }
//     setYears(yearsList);
//   }, []);

//   // Close popup when clicking outside
//   useEffect(() => {
//     if (!popupDate) return;

//     const handleClickOutside = (e: MouseEvent) => {
//       const popup = document.querySelector('.event-popup');
//       if (popup && !popup.contains(e.target as Node)) {
//         setPopupDate(null);
//       }
//     };

//     document.addEventListener('mousedown', handleClickOutside);
//     return () => {
//       document.removeEventListener('mousedown', handleClickOutside);
//     };
//   }, [popupDate]);

//   // Close popup when scrolling
//   useEffect(() => {
//     if (!popupDate) return;

//     const handleScroll = () => {
//       setPopupDate(null);
//     };

//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, [popupDate]);

//   const onPanelChange: CalendarProps<Dayjs>["onPanelChange"] = (value) => {
//     setCurrentDate(value.locale("en-gb"));
//   };

//   const handlePrevMonth = () => setCurrentDate((prev) => prev.subtract(1, "month"));
//   const handleNextMonth = () => setCurrentDate((prev) => prev.add(1, "month"));
//   const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
//     const newYear = parseInt(e.target.value);
//     setPickerValue(pickerValue.year(newYear));
//   };
//   const handlePrevMonthPicker = () => setPickerValue(pickerValue.subtract(1, "month"));
//   const handleNextMonthPicker = () => setPickerValue(pickerValue.add(1, "month"));

//   // Check if all form fields are filled
//   const isFormValid = selectedDate && selectedPeptide && dosage.trim() !== '' && goal.trim() !== '';

//   // Handle form submission
//   const handleAddEvent = () => {
//     if (!isFormValid) return;
    
//     const newEvent: CalendarEvent = {
//       date: selectedDate,
//       peptide: selectedPeptide,
//       dosage: dosage,
//       goal: goal
//     };
    
//     setEvents([...events, newEvent]);
    
//     // Reset form
//     setSelectedDate(null);
//     setSelectedPeptide(null);
//     setDosage('');
//     setGoal('');
//     setIsModalOpen(false);
//   };

//   // Handle opening event popup
//   const handleOpenPopup = (date: string, e: React.MouseEvent) => {
//     const cellElement = e.currentTarget.closest('.ant-picker-cell');
//     if (cellElement) {
//       const rect = cellElement.getBoundingClientRect();

//       const popupWidth = 280; // Fixed popup width
//     const popupHeight = 200; // Estimated popup height
    
//     // Calculate centered position
//     let left = rect.left + rect.width/2 - popupWidth/2;
//     let top = rect.bottom + 8;
    
//     // Adjust for screen edges
//     if (left < 10) left = 10;
//     if (left + popupWidth > window.innerWidth) {
//       left = window.innerWidth - popupWidth - 10;
//     }
    
//     // Adjust if near bottom of screen
//     if (top + popupHeight > window.innerHeight) {
//       top = rect.top - popupHeight - 8;
//     }

    

//       setPopupPosition({
//         top: rect.bottom + window.scrollY,
//         left: rect.left + window.scrollX
//       });
//       setPopupDate(date);
//     }
//   };

//   // Render custom content in calendar cells
//   const dateCellRender = (value: Dayjs) => {
//     const dateStr = value.format('YYYY-MM-DD');
//     const dayEvents = events.filter(e => e.date === dateStr);
//     const eventsToShow = dayEvents.slice(0, 2);
//     const extraEventsCount = dayEvents.length - eventsToShow.length;
    
//     return (
//       <div 
//         className="h-full w-full flex flex-col-reverse gap-1 items-start justify-start px-1 pb-2"
//         onClick={(e) => e.stopPropagation()}
//       >
//         {eventsToShow.map((event, idx) => (
//           <div 
//             key={idx} 
//             className="inline-block w-fit bg-[#C8E4FC] rounded-full px-2 py-1 text-xs"
//             style={{ fontFamily: 'Afacad Flux, Afacad, Inter, sans-serif' }}
//           >
//             <div className="font-semibold text-[#224674]">{event.peptide?.name}</div>
//           </div>
//         ))}
//         {extraEventsCount > 0 && (
//           <div 
//             className="inline-block w-fit bg-[#C8E4FC] rounded-full px-2 py-1 text-xs cursor-pointer"
//             style={{ fontFamily: 'Afacad Flux, Afacad, Inter, sans-serif' }}
//             onClick={(e) => handleOpenPopup(dateStr, e)}
//           >
//             +{extraEventsCount} more
//           </div>
//         )}
//       </div>
//     );
//   };

//   const headerRender: CalendarProps<Dayjs>["headerRender"] = () => (
//     <div className="flex justify-between items-center w-full bg-white">
//       <div className="flex items-center gap-2 py-6 w-full justify-between max-sm:flex-col">
//         <div className="flex items-center gap-2">
//           <span className="font-extrabold txt-24 text-[#25292A]">
//             {currentDate.format("MMM YYYY")}
//           </span>
//           <button
//             onClick={handlePrevMonth}
//             className="w-8 h-8 flex items-center justify-center rounded-full"
//           >
//             <Image
//               src="/Dashboard/dosage-tracking/arrow-left.svg"
//               alt="Previous"
//               width={32}
//               height={32}
//             />
//           </button>
//           <button
//             onClick={handleNextMonth}
//             className="w-8 h-8 flex items-center justify-center rounded-full"
//           >
//             <Image
//               src="/Dashboard/dosage-tracking/arrow-right.svg"
//               alt="Next"
//               width={32}
//               height={32}
//             />
//           </button>
//         </div>
//         <div className="flex gap-3 buttonD txt-16">
//           <button
//             onClick={handlePrevMonth}
//             className="h-10 rounded-3xl px-6 py-2 flex items-center justify-center gap-2 bg-[#E9EDEE] !text-[#9EA9AA] font-semibold"
//           >
//             AI Feedback
//           </button>
//           <button
//             onClick={() => setIsModalOpen(true)}
//             className="h-10 rounded-3xl px-6 py-2 flex items-center justify-center gap-2 bg-[#224674] !text-white font-semibold"
//           >
//             Add Peptide Dose
//           </button>
//         </div>
//       </div>
//     </div>
//   );

//   return (
//     <div className="py-3 px-4 sm:px-6 md:px-8 lg:px-12 calendar-wrapper relative">
//       <ConfigProvider locale={enGB}>
//         <Calendar
//           value={currentDate}
//           onPanelChange={onPanelChange}
//           headerRender={headerRender}
//           dateCellRender={dateCellRender}
//         />
//       </ConfigProvider>

//       {/* Event Details Popup */}
//       {/* {popupDate && (
//         <div 
//           className="event-popup absolute -mt-53 z-50 bg-white border border-gray-200 rounded-lg shadow-lg p-3 max-h-40 min-h-auto overflow-y-auto min-w-[280px]"
//           style={{
//             top: popupPosition.top,
//             left: popupPosition.left,
//           }}
//         >
//           <button 
//             className="absolute top-1 right-2 text-gray-500 hover:text-gray-700"
//             onClick={() => setPopupDate(null)}
//           >
//             <RxCross2 size={16} />
//           </button>
//           <div className="event-list pt-4">
//             {events.filter(e => e.date === popupDate).map((event, idx) => (
//               <div key={idx} className="event-item py-1 flex items-center">
//                 <div className="w-2 h-2 bg-[#224674] rounded-full mr-2"></div>
//                 <div className="font-medium text-[#25292A]">{event.peptide?.name}</div>
//               </div>
//             ))}
//           </div>
//         </div>
//       )} */}
// // 3. Update the popup JSX structure
// {popupDate && (
//   <div 
//     className="event-popup absolute z-50 bg-white border border-gray-200 rounded-lg shadow-lg p-3 min-w-[280px] max-h-60 overflow-y-auto"
//     style={{
//       top: popupPosition.top,
//       left: popupPosition.left,
//     }}
//   >
//     <div className="flex justify-between items-center mb-2">
//       <h3 className="text-center w-full font-semibold text-[#25292A]">
//         {dayjs(popupDate).format('MMM D, YYYY')}
//       </h3>
//       <button 
//         className="text-gray-500 hover:text-gray-700 ml-2"
//         onClick={() => setPopupDate(null)}
//       >
//         <RxCross2 size={16} />
//       </button>
//     </div>
    
//     <div className="event-list">
//       {events.filter(e => e.date === popupDate).map((event, idx) => (
//         <div key={idx} className="event-item py-2 flex items-center border-b border-gray-100 last:border-0">
//           <div className="w-2 h-2 bg-[#224674] rounded-full mr-3"></div>
//           <div className="flex-1">
//             <div className="font-medium text-[#25292A]">{event.peptide?.name}</div>
//             {/* <div className="text-sm text-gray-500">Dosage: {event.dosage}mcg</div> */}
//           </div>
//         </div>
//       ))}
//     </div>
//   </div>
// )}
//       {/* Add Peptide Modal */}
//       {isModalOpen && (
//         <div className="fixed inset-0 z-50 bg-black/20 flex items-center justify-center">
//           <div className="bg-white rounded-[16px] p-6 w-[496px] max-sm:w-[300px] relative overflow-y-auto">
//             <div className="flex items-center justify-between mb-6">
//               <h2 className="txt-32 font-semibold text-[#25292A] mb-4">
//                 Add Peptide
//               </h2>
//               <div
//                 className="bg-[#D8DFE0] rounded-full p-2 cursor-pointer"
//                 onClick={() => setIsModalOpen(false)}
//               >
//                 <RxCross2 className="text-[#9EA9AA] font-extrabold" />
//               </div>
//             </div>

//             <div className="flex flex-col gap-4 mb-6">
//               <div className="flex flex-col gap-6">
//                 <div className="relative">
//                   <p>Date</p>
//                   <DatePicker
//                     placement="topRight"
//                     picker="date"
//                     value={selectedDate ? dayjs(selectedDate) : null}
//                     onChange={(date) =>
//                       setSelectedDate(date?.format("YYYY-MM-DD") || null)
//                     }
//                     className="w-full h-auto 2xl:w-[448px] xl:h-[48px] !bg-[#F2F5F6] rounded-md px-3 py-2"
//                     rootClassName="custom-datepicker-input"
//                     suffixIcon={
//                       <Image
//                         src="/Dashboard/dosage-tracking/calendarIcon.svg"
//                         alt="calendar"
//                         width={24}
//                         height={24}
//                         className="cursor-pointer"
//                       />
//                     }
//                     popupClassName="custom-datepicker-dropdown no-header-datepicker"
//                     inputReadOnly
//                     onPanelChange={(date) => setPickerValue(date)}
//                     panelRender={(panelNode) => (
//                       <div className="custom-panel-container">
//                         <div className="flex justify-between items-center px-6 py-3 text-[#626D6F] font-medium">
//                           <div className="flex items-center gap-1 relative">
//                             <span className="txt-16">
//                               {pickerValue.format("MMMM")}
//                             </span>
//                             <div className="relative flex items-center">
//                               <select
//                                 value={pickerValue.year()}
//                                 onChange={handleYearChange}
//                                 className="bg-transparent border-none txt-16 focus:outline-none focus:ring-0 appearance-none pr-6"
//                               >
//                                 {years.map((year) => (
//                                   <option key={year} value={year}>
//                                     {year}
//                                   </option>
//                                 ))}
//                               </select>
//                               <IoMdArrowDropdown
//                                 className="absolute right-0 pointer-events-none text-[#626D6F]"
//                                 size={16}
//                               />
//                             </div>
//                           </div>
//                           <div className="flex gap-2">
//                             <button
//                               onClick={handlePrevMonthPicker}
//                               className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100"
//                             >
//                               <MdKeyboardArrowLeft size={24} />
//                             </button>
//                             <button
//                               onClick={handleNextMonthPicker}
//                               className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100"
//                             >
//                               <MdKeyboardArrowRight size={24} />
//                             </button>
//                           </div>
//                         </div>
//                         {panelNode}
//                       </div>
//                     )}
//                   />
//                 </div>
//               </div>

//               <div className="relative">
//                 <p>Peptide</p>
//                 <PeptideDropdown
//                   selected={selectedPeptide}
//                   setSelected={setSelectedPeptide}
//                 />
//               </div>

//               <div className="relative">
//                 <p>Dosage</p>
//                 <div className="relative">
//                   <input
//                     type="text"
//                     inputMode="numeric"
//                     pattern="[0-9]*"
//                     placeholder="Enter dosage you have taken"
//                     className="w-full h-auto 2xl:w-[448px] xl:h-[48px] bg-[#F2F5F6] border-none focus:outline-none focus:ring-0 focus:border-transparent font-medium placeholder:font-normal placeholder:text-[#8D9A9B] rounded-md px-4 py-2 pr-12"
//                     value={dosage}
//                     onChange={(e) => {
//                       const value = e.target.value;
//                       if (value === '' || /^\d+$/.test(value)) {
//                         setDosage(value);
//                       }
//                     }}
//                   />
//                   <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-[#8D9A9B]">
//                     mcg
//                   </span>
//                 </div>
//               </div>

//               <div className="relative">
//                 <p>Goal</p>
//                 <textarea
//                   placeholder="Write your primary goal"
//                   className="w-full 2xl:w-[448px] h-[100px] font-medium placeholder:font-normal bg-[#F2F5F6] border-none focus:outline-none focus:ring-0 focus:border-transparent placeholder:text-[#8D9A9B] rounded-md px-4 py-2 resize-none"
//                     value={goal}
//                     onChange={(e) => setGoal(e.target.value)}
//                 ></textarea>
//               </div>

//               <button 
//                 className={`txt-18 font-semibold leading-none text-center px-4 py-4 rounded-full w-full ${
//                   isFormValid 
//                     ? 'bg-[#224674] !text-white cursor-pointer' 
//                     : 'bg-[#D8DFE0] !text-[#8D9A9B] cursor-not-allowed'
//                 }`}
//                 disabled={!isFormValid}
//                 onClick={handleAddEvent}
//               >
//                 Add
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       <style jsx global>{`
//         /* Force Afacad Flux for Ant Design calendar popup */
//         .custom-datepicker-dropdown,
//         .custom-datepicker-dropdown * {
//           font-family: "Afacad Flux", "Afacad", "Roboto", sans-serif !important;
//         }

//         /* ===== START: Custom Weekday Headers - Guaranteed to Work ===== */
//         .custom-datepicker-dropdown .ant-picker-content th {
//           width: 28px !important;
//           height: 40px !important;
//           padding: 0 !important;
//           line-height: 40px !important;
//           text-align: center !important;
//           font-size: 0 !important; /* Hide original text */
//         }

//         /* Override for ≥768px */
//         @media (min-width: 768px) {
//           .custom-datepicker-dropdown .ant-picker-content th {
//             width: 48px !important;
//           }
//         }

//         .custom-datepicker-dropdown .ant-picker-content th::after {
//           content: attr(data-short);
//           display: block !important;
//           font-weight: 500 !important;
//           font-size: 16px !important;
//           position: absolute;
//           top: 0;
//           left: 0;
//           width: 100%;
//           height: 100%;
//           line-height: 40px;
//           color: #25292a !important;
//         }

//         /* Apply specific letters to each column */
//         .custom-datepicker-dropdown
//           .ant-picker-content
//           thead
//           tr
//           th:nth-child(1) {
//           --short: "S";
//         }
//         .custom-datepicker-dropdown
//           .ant-picker-content
//           thead
//           tr
//           th:nth-child(2) {
//           --short: "M";
//         }
//         .custom-datepicker-dropdown
//           .ant-picker-content
//           thead
//           tr
//           th:nth-child(3) {
//           --short: "T";
//         }
//         .custom-datepicker-dropdown
//           .ant-picker-content
//           thead
//           tr
//           th:nth-child(4) {
//           --short: "W";
//         }
//         .custom-datepicker-dropdown
//           .ant-picker-content
//           thead
//           tr
//           th:nth-child(5) {
//           --short: "T";
//         }
//         .custom-datepicker-dropdown
//           .ant-picker-content
//           thead
//           tr
//           th:nth-child(6) {
//           --short: "F";
//         }
//         .custom-datepicker-dropdown
//           .ant-picker-content
//           thead
//           tr
//           th:nth-child(7) {
//           --short: "S";
//         }

//         .custom-datepicker-dropdown .ant-picker-content th::after {
//           content: var(--short) !important;
//         }

//         .custom-datepicker-dropdown .ant-picker-content th {
//           position: relative;
//         }
//         /* ===== END: Custom Weekday Headers ===== */

//         /* Rest of your styles... */
//         .no-header-datepicker .ant-picker-header {
//           display: none !important;
//         }
//       `}</style>

//       <style jsx global>{`
//         /* This targets the actual input inside the DatePicker */
//         .custom-datepicker-input input::placeholder {
//           color: #8d9a9b !important;
//           font-family: "Afacad Flux", "Afacad", "Roboto", sans-serif !important;
//           font-weight: 400 !important;
//           font-size: 16px !important;
//           letter-spacing: 0.5px !important;
//           line-height: 100% !important;
//         }

//         .custom-datepicker-input input {
//           color: #25292a !important;
//           font-family: "Afacad Flux", "Afacad", "Roboto", sans-serif !important;
//           font-weight: 500 !important;
//           font-size: 16px !important;
//           letter-spacing: 0.5px !important;
//           line-height: 100% !important;
//         }

//         /* Force Afacad Flux for Ant Design calendar popup */
//         .custom-datepicker-dropdown,
//         .custom-datepicker-dropdown * {
//           font-family: "Afacad Flux", "Afacad", "Roboto", sans-serif !important;
//           font-weight: 500 !important;
//           font-size: 16px !important;
//         }

//         .no-header-datepicker .ant-picker-header {
//           display: none !important;
//         }

//         /* 1) Remove “today” default highlight entirely */
//         .custom-datepicker-dropdown
//           .ant-picker-cell-today
//           .ant-picker-cell-inner {
//           background: none !important;
//           color: inherit !important;
//         }

//         /* 2) Remove the light‑blue focus/focus‑range square */
//         .custom-datepicker-dropdown
//           .ant-picker-cell-selected
//           .ant-picker-cell-inner,
//         .custom-datepicker-dropdown
//           .ant-picker-cell-in-view:not(.ant-picker-cell-selected)
//           .ant-picker-cell-inner,
//         .custom-datepicker-dropdown
//           .ant-picker-cell-range-start
//           .ant-picker-cell-inner,
//         .custom-datepicker-dropdown
//           .ant-picker-cell-range-end
//           .ant-picker-cell-inner {
//           background: none !important;
//           color: inherit !important;
//         }

//         .custom-datepicker-dropdown
//           .ant-picker-cell-today
//           .ant-picker-cell-inner::before {
//           content: none !important;
//         }
//         .custom-datepicker-dropdown
//           .ant-picker-cell-today:not(.ant-picker-cell-selected)
//           .ant-picker-cell-inner {
//           position: relative;
//           border: 1px solid #224674 !important;
//           color: #224674 !important;
//           border-radius: 50% !important;
//           background: transparent !important;
//         }

//         /* 3) Only your selected date gets the circle */
//         .custom-datepicker-dropdown
//           .ant-picker-cell-selected
//           .ant-picker-cell-inner {
//           background-color: #224674 !important;
//           color: #ffffff !important;
//           border-radius: 50% !important;
//         }

//         /* 1) Outer popup wrapper */
//         .custom-datepicker-dropdown {
//           width: 260px !important;
//           height: 344px !important;
//           min-width: 260px !important;
//           min-height: 344px !important;
//           max-width: 360px !important;
//           max-height: 344px !important;
//           border-radius: 28px !important;
//           box-shadow: 0px 1px 3px 1px rgba(0, 0, 0, 0.15),
//             0px 1px 2px 0px rgba(0, 0, 0, 0.3) !important;
//           overflow: hidden !important;
//         }

//         /* Override for ≥768px */
//         @media (min-width: 768px) {
//           .custom-datepicker-dropdown {
//             width: 360px !important;
//             height: 344px !important;
//             min-width: 360px !important;
//             //   margin-top: -50px !important;
//           }
//         }

//         /* 2) Panel container and panel itself */
//         .custom-datepicker-dropdown .ant-picker-panel-container,
//         .custom-datepicker-dropdown .ant-picker-panel {
//           width: 100% !important;
//           height: 100% !important;
//         }

//         /* 3) Date panel (header + body) */
//         .custom-datepicker-dropdown .ant-picker-date-panel {
//           display: flex !important;
//           flex-direction: column !important;
//           width: 100% !important;
//           height: 100% !important;
//         }

//         /* 4) Header (month + year nav) */
//         .custom-datepicker-dropdown .ant-picker-header {
//           flex-shrink: 0;
//           width: 100%;
//           /* Optional: adjust padding if you want */
//           padding: 12px 16px !important;
//         }

//         /* 5) Body wrapper */
//         .custom-datepicker-dropdown .ant-picker-body {
//           flex: 1 !important;
//           display: flex !important;
//           flex-direction: column !important;
//           width: 100% !important;
//           height: 100% !important;
//           padding: 1px 12px !important;
//         }

//         /* 6) Content (the table) */
//         .custom-datepicker-dropdown .ant-picker-content {
//           flex: 1 !important;
//           width: 100% !important;
//           height: 100% !important;
//           table-layout: fixed !important;
//         }

//         /* 7) Each cell fill height */
//         .custom-datepicker-dropdown .ant-picker-cell {
//           height: 100% !important;
//           padding: 12px !important;
//         }

//         /* Hide out-of-month dates (only show current month dates) */
//         .custom-datepicker-dropdown
//           .ant-picker-cell:not(.ant-picker-cell-in-view) {
//           visibility: hidden !important;
//           pointer-events: none !important;
//         }

//         /* 8) Highlight today/selected */
//         .custom-datepicker-dropdown
//           .ant-picker-cell-today
//           .ant-picker-cell-inner,
//         .custom-datepicker-dropdown
//           .ant-picker-cell-selected
//           .ant-picker-cell-inner {
//           background-color: #224674 !important;
//           color: #fff !important;
//           border-radius: 50% !important;
//         }

//         /* 9) Remove footer (Today button + divider) */
//         .custom-datepicker-dropdown .ant-picker-footer {
//           display: none !important;
//         }
//       `}</style>

//       <style jsx global>{`  

//       .calendar-wrapper .ant-picker-cell:not(.ant-picker-cell-in-view) .ant-picker-cell-inner {
//     color: #25292A !important;
//     opacity: 1 !important;
//   }


//         /* Apply Inter font only to Calendar */
//         .calendar-wrapper .ant-picker-calendar {
//           font-family: "Inter", sans-serif !important;
//         }

//         /* Remove unwanted border-top and margins from calendar-date container */
//         .ant-picker-calendar.ant-picker-calendar-full
//           .ant-picker-calendar-date {
//           display: block;
//           width: auto;
//           height: auto;
//           margin: 0 !important;
//           padding: 4px 8px 0 !important;
//           border: none !important;
//           border-radius: 0;
//           transition: background 0.3s;
//         }

//         .ant-picker-calendar-date {
//           border-top: none !important;
//         }

//         .ant-picker-calendar .ant-picker-body {
//           border-radius: 0.375rem;
//           overflow: hidden;
//         }

//         .ant-picker-calendar .ant-picker-content thead th {
//           text-align: left !important;
//           padding: 12px 8px !important;
//           border: 1px solid #e9edee;
//           font-weight: 500 !important; /* Medium */
//           color: #626d6f;

//           font-size: 16px !important;
//           line-height: 16px !important; /* 100% line-height */
//           letter-spacing: 0 !important;
//         }

//         .ant-picker-calendar .ant-picker-cell {
//           text-align: left !important;
//           vertical-align: top !important;
//           padding: 0.5rem;

//           font-weight: 500;

//           font-size: 21px !important;
//           line-height: 21px !important; /* 100% line-height */
//           letter-spacing: 0 !important;

//           border: 1px solid #e9edee;
//         }

//         .ant-picker-calendar .ant-picker-cell-inner {
//           justify-content: flex-start !important;
//           padding: 0 !important;
//         }
//       `}</style>
//     </div>
//   );
// };

// export default CalendarPage;



// "use client";

// import React, { useState, useRef, useEffect } from "react";
// import Image from "next/image";
// import { ConfigProvider, Calendar } from "antd";
// import type { Dayjs } from "dayjs";
// import dayjs from "dayjs";
// import updateLocale from "dayjs/plugin/updateLocale";
// import "dayjs/locale/en-gb";
// import enGB from "antd/locale/en_GB";
// import "@fontsource/inter";
// import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
// import { IoMdArrowDropdown } from "react-icons/io";
// import { RxCross2 } from "react-icons/rx";
// import "antd/dist/reset.css";
// import { DatePicker } from "antd";
// import type { CalendarProps } from "antd";
// import PeptideDropdown from "./PeptideDropDown/PeptideDropDown";
// import type { PeptideOption } from "./PeptideDropDown/PeptideDropDown";

// dayjs.locale("en-gb");
// dayjs.extend(updateLocale);
// dayjs.updateLocale("en-gb", {
//   weekStart: 0,
//   weekdaysMin: ["MON", "TUE", "WED", "THUR", "FRI", "SAT", "SUN"],
//   weekdaysShort: ["MON", "TUE", "WED", "THUR", "FRI", "SAT", "SUN"],
// });

// // Define the event type
// interface CalendarEvent {
//   date: string;
//   peptide: PeptideOption | null;
//   dosage: string;
//   goal: string;
// }

// const CalendarPage: React.FC = () => {
//   const [currentDate, setCurrentDate] = useState<Dayjs>(dayjs().locale("en-gb"));
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [selectedDate, setSelectedDate] = useState<string | null>(null);
//   const [selectedPeptide, setSelectedPeptide] = useState<PeptideOption | null>(null);
//   const [dosage, setDosage] = useState<string>('');
//   const [goal, setGoal] = useState<string>('');
//   const [events, setEvents] = useState<CalendarEvent[]>([]);
//   const [popupDate, setPopupDate] = useState<string | null>(null);
//   const [popupPosition, setPopupPosition] = useState({ top: 0, left: 0 });
//   const popupRef = useRef<HTMLDivElement>(null);

//   const hiddenDateRef = useRef<HTMLInputElement>(null);
//   const [pickerValue, setPickerValue] = useState<Dayjs>(dayjs());
//   const [years, setYears] = useState<number[]>([]);

//   useEffect(() => {
//     const currentYear = dayjs().year();
//     const yearsList = [];
//     for (let i = currentYear - 5; i <= currentYear; i++) {
//       yearsList.push(i);
//     }
//     setYears(yearsList);
//   }, []);

//   // Close popup when clicking outside
//   useEffect(() => {
//     if (!popupDate) return;

//     const handleClickOutside = (e: MouseEvent) => {
//       const popup = document.querySelector('.event-popup');
//       if (popup && !popup.contains(e.target as Node)) {
//         setPopupDate(null);
//       }
//     };

//     document.addEventListener('mousedown', handleClickOutside);
//     return () => {
//       document.removeEventListener('mousedown', handleClickOutside);
//     };
//   }, [popupDate]);

//   // Close popup when scrolling or resizing
//   useEffect(() => {
//     if (!popupDate) return;

//     const handleScroll = () => setPopupDate(null);
//     const handleResize = () => setPopupDate(null);

//     window.addEventListener('scroll', handleScroll);
//     window.addEventListener('resize', handleResize);
    
//     return () => {
//       window.removeEventListener('scroll', handleScroll);
//       window.removeEventListener('resize', handleResize);
//     };
//   }, [popupDate]);

//   const onPanelChange: CalendarProps<Dayjs>["onPanelChange"] = (value) => {
//     setCurrentDate(value.locale("en-gb"));
//   };

//   const handlePrevMonth = () => setCurrentDate((prev) => prev.subtract(1, "month"));
//   const handleNextMonth = () => setCurrentDate((prev) => prev.add(1, "month"));
//   const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
//     const newYear = parseInt(e.target.value);
//     setPickerValue(pickerValue.year(newYear));
//   };
//   const handlePrevMonthPicker = () => setPickerValue(pickerValue.subtract(1, "month"));
//   const handleNextMonthPicker = () => setPickerValue(pickerValue.add(1, "month"));

//   // Check if all form fields are filled
//   const isFormValid = selectedDate && selectedPeptide && dosage.trim() !== '' && goal.trim() !== '';

//   // Handle form submission
//   const handleAddEvent = () => {
//     if (!isFormValid) return;
    
//     const newEvent: CalendarEvent = {
//       date: selectedDate,
//       peptide: selectedPeptide,
//       dosage: dosage,
//       goal: goal
//     };
    
//     setEvents([...events, newEvent]);
    
//     // Reset form
//     setSelectedDate(null);
//     setSelectedPeptide(null);
//     setDosage('');
//     setGoal('');
//     setIsModalOpen(false);
//   };

//   // Handle opening event popup with precise positioning
//   const handleOpenPopup = (date: string, e: React.MouseEvent) => {
//     const cellElement = e.currentTarget.closest('.ant-picker-cell');
//     if (cellElement) {
//       const rect = cellElement.getBoundingClientRect();
//       const popupWidth = 280; // Fixed popup width
//       const popupHeight = 200; // Estimated height
      
//       // Calculate centered position over cell
//       let left = rect.left + (rect.width / 2) - (popupWidth / 2);
//       let top = rect.bottom + 8;
      
//       // Adjust for screen edges
//       const buffer = 8;
//       if (left < buffer) left = buffer;
//       if (left + popupWidth > window.innerWidth - buffer) {
//         left = window.innerWidth - popupWidth - buffer;
//       }
      
//       // Flip above if near bottom
//       const spaceBelow = window.innerHeight - rect.bottom;
//       const spaceAbove = rect.top;
//       if (spaceBelow < popupHeight && spaceAbove > popupHeight) {
//         top = rect.top - popupHeight - 8;
//       } else if (spaceBelow < popupHeight) {
//         top = window.innerHeight - popupHeight - buffer;
//       }
      
//       setPopupPosition({
//         top: top + window.scrollY,
//         left: left + window.scrollX
//       });
//       setPopupDate(date);
//     }
//   };

//   // Render custom content in calendar cells
//   const dateCellRender = (value: Dayjs) => {
//     const dateStr = value.format('YYYY-MM-DD');
//     const dayEvents = events.filter(e => e.date === dateStr);
//     const eventsToShow = dayEvents.slice(0, 2);
//     const extraEventsCount = dayEvents.length - eventsToShow.length;
    
//     return (
//       <>
//       <div className="flex flex-col relative items-start justify-end h-full w-full py-2 gap-1">
//         <div 
//         className=" w-full flex flex-col-reverse gap-1 items-start justify-start px-1 "
//         onClick={(e) => e.stopPropagation()}
//       >
//         {eventsToShow.map((event, idx) => (
//           <div 
//             key={idx} 
//             className="inline-block w-fit bg-[#C8E4FC] rounded-full px-2 py-1 text-xs"
//             style={{ fontFamily: 'Afacad Flux, Afacad, Inter, sans-serif' }}
//           >
//             <div className="font-semibold text-[#224674]">{event.peptide?.name}</div>
//           </div>
//         ))}
//       </div>
//         {extraEventsCount > 0 && (
//           <span 
//             className="text-xs text-[#224674] font-medium ml-2 cursor-pointer"
//             onClick={(e) => handleOpenPopup(dateStr, e)}
//             style={{ fontFamily: 'Afacad Flux, Afacad, Inter, sans-serif' }}
//           >
//             +{extraEventsCount} more
//           </span>
//         )}
//       </div>
//         </>
//     );
//   };

//   const headerRender: CalendarProps<Dayjs>["headerRender"] = () => (
//     <div className="flex justify-between items-center w-full bg-white">
//       <div className="flex items-center gap-2 py-6 w-full justify-between max-sm:flex-col">
//         <div className="flex items-center gap-2">
//           <span className="font-extrabold txt-24 text-[#25292A]">
//             {currentDate.format("MMM YYYY")}
//           </span>
//           <button
//             onClick={handlePrevMonth}
//             className="w-8 h-8 flex items-center justify-center rounded-full"
//           >
//             <Image
//               src="/Dashboard/dosage-tracking/arrow-left.svg"
//               alt="Previous"
//               width={32}
//               height={32}
//             />
//           </button>
//           <button
//             onClick={handleNextMonth}
//             className="w-8 h-8 flex items-center justify-center rounded-full"
//           >
//             <Image
//               src="/Dashboard/dosage-tracking/arrow-right.svg"
//               alt="Next"
//               width={32}
//               height={32}
//             />
//           </button>
//         </div>
//         <div className="flex gap-3 buttonD txt-16">
//           <button
//             onClick={handlePrevMonth}
//             className="h-10 rounded-3xl px-6 py-2 flex items-center justify-center gap-2 bg-[#E9EDEE] !text-[#9EA9AA] font-semibold"
//           >
//             AI Feedback
//           </button>
//           <button
//             onClick={() => setIsModalOpen(true)}
//             className="h-10 rounded-3xl px-6 py-2 flex items-center justify-center gap-2 bg-[#224674] !text-white font-semibold"
//           >
//             Add Peptide Dose
//           </button>
//         </div>
//       </div>
//     </div>
//   );

//   return (
//     <div className="py-3 px-4 sm:px-6 md:px-8 lg:px-12 calendar-wrapper relative">
//       <ConfigProvider locale={enGB}>
//         <Calendar
//           value={currentDate}
//           onPanelChange={onPanelChange}
//           headerRender={headerRender}
//           dateCellRender={dateCellRender}
//         />
//       </ConfigProvider>

//       {/* Event Details Popup */}
//       {popupDate && (
//         <div 
//           ref={popupRef}
//           className="event-popup absolute z-50 bg-white border border-gray-200 -mt-58 rounded-lg shadow-lg p-3 min-w-[280px] max-h-60 overflow-y-auto"
//           style={{
//             top: popupPosition.top,
//             left: popupPosition.left,
//             maxWidth: 'calc(100vw - 16px)'
//           }}
//         >
//           <div className="flex justify-between items-center mb-2">
//             <h3 className="text-center w-full font-semibold text-[#25292A]">
//               {dayjs(popupDate).format('MMM D, YYYY')}
//             </h3>
//             <button 
//               className="text-gray-500 hover:text-gray-700 -mt-1 -mr-1"
//               onClick={() => setPopupDate(null)}
//             >
//               <RxCross2 size={16} />
//             </button>
//           </div>
          
//           <div className="event-list">
//             {events.filter(e => e.date === popupDate).map((event, idx) => (
//         <div key={idx} className="event-item py-2 flex items-center border-b border-gray-100 last:border-0">
//           <div className="w-2 h-2 bg-[#224674] rounded-full mr-3"></div>
//           <div className="flex-1">
//             <div className="font-medium text-[#25292A]">{event.peptide?.name}</div>
//             {/* <div className="text-sm text-gray-500">Dosage: {event.dosage}mcg</div> */}
//           </div>
//         </div>
//       ))}
//           </div>
//         </div>
//       )}

//       {/* Add Peptide Modal */}
//       {isModalOpen && (
//         <div className="fixed inset-0 z-50 bg-black/20 flex items-center justify-center">
//           <div className="bg-white rounded-[16px] p-6 w-[496px] max-sm:w-[300px] relative overflow-y-auto">
//             <div className="flex items-center justify-between mb-6">
//               <h2 className="txt-32 font-semibold text-[#25292A] mb-4">
//                 Add Peptide
//               </h2>
//               <div
//                 className="bg-[#D8DFE0] rounded-full p-2 cursor-pointer"
//                 onClick={() => setIsModalOpen(false)}
//               >
//                 <RxCross2 className="text-[#9EA9AA] font-extrabold" />
//               </div>
//             </div>

//             <div className="flex flex-col gap-4 mb-6">
//               <div className="flex flex-col gap-6">
//                 <div className="relative">
//                   <p>Date</p>
//                   <DatePicker
//                     placement="topRight"
//                     picker="date"
//                     value={selectedDate ? dayjs(selectedDate) : null}
//                     onChange={(date) =>
//                       setSelectedDate(date?.format("YYYY-MM-DD") || null)
//                     }
//                     className="w-full h-auto 2xl:w-[448px] xl:h-[48px] !bg-[#F2F5F6] rounded-md px-3 py-2"
//                     rootClassName="custom-datepicker-input"
//                     suffixIcon={
//                       <Image
//                         src="/Dashboard/dosage-tracking/calendarIcon.svg"
//                         alt="calendar"
//                         width={24}
//                         height={24}
//                         className="cursor-pointer"
//                       />
//                     }
//                     popupClassName="custom-datepicker-dropdown no-header-datepicker"
//                     inputReadOnly
//                     onPanelChange={(date) => setPickerValue(date)}
//                     panelRender={(panelNode) => (
//                       <div className="custom-panel-container">
//                         <div className="flex justify-between items-center px-6 py-3 text-[#626D6F] font-medium">
//                           <div className="flex items-center gap-1 relative">
//                             <span className="txt-16">
//                               {pickerValue.format("MMMM")}
//                             </span>
//                             <div className="relative flex items-center">
//                               <select
//                                 value={pickerValue.year()}
//                                 onChange={handleYearChange}
//                                 className="bg-transparent border-none txt-16 focus:outline-none focus:ring-0 appearance-none pr-6"
//                               >
//                                 {years.map((year) => (
//                                   <option key={year} value={year}>
//                                     {year}
//                                   </option>
//                                 ))}
//                               </select>
//                               <IoMdArrowDropdown
//                                 className="absolute right-0 pointer-events-none text-[#626D6F]"
//                                 size={16}
//                               />
//                             </div>
//                           </div>
//                           <div className="flex gap-2">
//                             <button
//                               onClick={handlePrevMonthPicker}
//                               className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100"
//                             >
//                               <MdKeyboardArrowLeft size={24} />
//                             </button>
//                             <button
//                               onClick={handleNextMonthPicker}
//                               className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100"
//                             >
//                               <MdKeyboardArrowRight size={24} />
//                             </button>
//                           </div>
//                         </div>
//                         {panelNode}
//                       </div>
//                     )}
//                   />
//                 </div>
//               </div>

//               <div className="relative">
//                 <p>Peptide</p>
//                 <PeptideDropdown
//                   selected={selectedPeptide}
//                   setSelected={setSelectedPeptide}
//                 />
//               </div>

//               <div className="relative">
//                 <p>Dosage</p>
//                 <div className="relative">
//                   <input
//                     type="text"
//                     inputMode="numeric"
//                     pattern="[0-9]*"
//                     placeholder="Enter dosage you have taken"
//                     className="w-full h-auto 2xl:w-[448px] xl:h-[48px] bg-[#F2F5F6] border-none focus:outline-none focus:ring-0 focus:border-transparent font-medium placeholder:font-normal placeholder:text-[#8D9A9B] rounded-md px-4 py-2 pr-12"
//                     value={dosage}
//                     onChange={(e) => {
//                       const value = e.target.value;
//                       if (value === '' || /^\d+$/.test(value)) {
//                         setDosage(value);
//                       }
//                     }}
//                   />
//                   <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-[#8D9A9B]">
//                     mcg
//                   </span>
//                 </div>
//               </div>

//               <div className="relative">
//                 <p>Goal</p>
//                 <textarea
//                   placeholder="Write your primary goal"
//                   className="w-full 2xl:w-[448px] h-[100px] font-medium placeholder:font-normal bg-[#F2F5F6] border-none focus:outline-none focus:ring-0 focus:border-transparent placeholder:text-[#8D9A9B] rounded-md px-4 py-2 resize-none"
//                     value={goal}
//                     onChange={(e) => setGoal(e.target.value)}
//                 ></textarea>
//               </div>

//               <button 
//                 className={`txt-18 font-semibold leading-none text-center px-4 py-4 rounded-full w-full ${
//                   isFormValid 
//                     ? 'bg-[#224674] !text-white cursor-pointer' 
//                     : 'bg-[#D8DFE0] !text-[#8D9A9B] cursor-not-allowed'
//                 }`}
//                 disabled={!isFormValid}
//                 onClick={handleAddEvent}
//               >
//                 Add
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       <style jsx global>{`
//         /* Force Afacad Flux for Ant Design calendar popup */
//         .custom-datepicker-dropdown,
//         .custom-datepicker-dropdown * {
//           font-family: "Afacad Flux", "Afacad", "Roboto", sans-serif !important;
//         }

//         /* ===== START: Custom Weekday Headers - Guaranteed to Work ===== */
//         .custom-datepicker-dropdown .ant-picker-content th {
//           width: 28px !important;
//           height: 40px !important;
//           padding: 0 !important;
//           line-height: 40px !important;
//           text-align: center !important;
//           font-size: 0 !important; /* Hide original text */
//         }

//         /* Override for ≥768px */
//         @media (min-width: 768px) {
//           .custom-datepicker-dropdown .ant-picker-content th {
//             width: 48px !important;
//           }
//         }

//         .custom-datepicker-dropdown .ant-picker-content th::after {
//           content: attr(data-short);
//           display: block !important;
//           font-weight: 500 !important;
//           font-size: 16px !important;
//           position: absolute;
//           top: 0;
//           left: 0;
//           width: 100%;
//           height: 100%;
//           line-height: 40px;
//           color: #25292a !important;
//         }

//         /* Apply specific letters to each column */
//         .custom-datepicker-dropdown
//           .ant-picker-content
//           thead
//           tr
//           th:nth-child(1) {
//           --short: "S";
//         }
//         .custom-datepicker-dropdown
//           .ant-picker-content
//           thead
//           tr
//           th:nth-child(2) {
//           --short: "M";
//         }
//         .custom-datepicker-dropdown
//           .ant-picker-content
//           thead
//           tr
//           th:nth-child(3) {
//           --short: "T";
//         }
//         .custom-datepicker-dropdown
//           .ant-picker-content
//           thead
//           tr
//           th:nth-child(4) {
//           --short: "W";
//         }
//         .custom-datepicker-dropdown
//           .ant-picker-content
//           thead
//           tr
//           th:nth-child(5) {
//           --short: "T";
//         }
//         .custom-datepicker-dropdown
//           .ant-picker-content
//           thead
//           tr
//           th:nth-child(6) {
//           --short: "F";
//         }
//         .custom-datepicker-dropdown
//           .ant-picker-content
//           thead
//           tr
//           th:nth-child(7) {
//           --short: "S";
//         }

//         .custom-datepicker-dropdown .ant-picker-content th::after {
//           content: var(--short) !important;
//         }

//         .custom-datepicker-dropdown .ant-picker-content th {
//           position: relative;
//         }
//         /* ===== END: Custom Weekday Headers ===== */

//         /* Rest of your styles... */
//         .no-header-datepicker .ant-picker-header {
//           display: none !important;
//         }
//       `}</style>

//       <style jsx global>{`
//         /* This targets the actual input inside the DatePicker */
//         .custom-datepicker-input input::placeholder {
//           color: #8d9a9b !important;
//           font-family: "Afacad Flux", "Afacad", "Roboto", sans-serif !important;
//           font-weight: 400 !important;
//           font-size: 16px !important;
//           letter-spacing: 0.5px !important;
//           line-height: 100% !important;
//         }

//         .custom-datepicker-input input {
//           color: #25292a !important;
//           font-family: "Afacad Flux", "Afacad", "Roboto", sans-serif !important;
//           font-weight: 500 !important;
//           font-size: 16px !important;
//           letter-spacing: 0.5px !important;
//           line-height: 100% !important;
//         }

//         /* Force Afacad Flux for Ant Design calendar popup */
//         .custom-datepicker-dropdown,
//         .custom-datepicker-dropdown * {
//           font-family: "Afacad Flux", "Afacad", "Roboto", sans-serif !important;
//           font-weight: 500 !important;
//           font-size: 16px !important;
//         }

//         .no-header-datepicker .ant-picker-header {
//           display: none !important;
//         }

//         /* 1) Remove “today” default highlight entirely */
//         .custom-datepicker-dropdown
//           .ant-picker-cell-today
//           .ant-picker-cell-inner {
//           background: none !important;
//           color: inherit !important;
//         }

//         /* 2) Remove the light‑blue focus/focus‑range square */
//         .custom-datepicker-dropdown
//           .ant-picker-cell-selected
//           .ant-picker-cell-inner,
//         .custom-datepicker-dropdown
//           .ant-picker-cell-in-view:not(.ant-picker-cell-selected)
//           .ant-picker-cell-inner,
//         .custom-datepicker-dropdown
//           .ant-picker-cell-range-start
//           .ant-picker-cell-inner,
//         .custom-datepicker-dropdown
//           .ant-picker-cell-range-end
//           .ant-picker-cell-inner {
//           background: none !important;
//           color: inherit !important;
//         }

//         .custom-datepicker-dropdown
//           .ant-picker-cell-today
//           .ant-picker-cell-inner::before {
//           content: none !important;
//         }
//         .custom-datepicker-dropdown
//           .ant-picker-cell-today:not(.ant-picker-cell-selected)
//           .ant-picker-cell-inner {
//           position: relative;
//           border: 1px solid #224674 !important;
//           color: #224674 !important;
//           border-radius: 50% !important;
//           background: transparent !important;
//         }

//         /* 3) Only your selected date gets the circle */
//         .custom-datepicker-dropdown
//           .ant-picker-cell-selected
//           .ant-picker-cell-inner {
//           background-color: #224674 !important;
//           color: #ffffff !important;
//           border-radius: 50% !important;
//         }

//         /* 1) Outer popup wrapper */
//         .custom-datepicker-dropdown {
//           width: 260px !important;
//           height: 344px !important;
//           min-width: 260px !important;
//           min-height: 344px !important;
//           max-width: 360px !important;
//           max-height: 344px !important;
//           border-radius: 28px !important;
//           box-shadow: 0px 1px 3px 1px rgba(0, 0, 0, 0.15),
//             0px 1px 2px 0px rgba(0, 0, 0, 0.3) !important;
//           overflow: hidden !important;
//         }

//         /* Override for ≥768px */
//         @media (min-width: 768px) {
//           .custom-datepicker-dropdown {
//             width: 360px !important;
//             height: 344px !important;
//             min-width: 360px !important;
//           }
//         }

//         /* 2) Panel container and panel itself */
//         .custom-datepicker-dropdown .ant-picker-panel-container,
//         .custom-datepicker-dropdown .ant-picker-panel {
//           width: 100% !important;
//           height: 100% !important;
//         }

//         /* 3) Date panel (header + body) */
//         .custom-datepicker-dropdown .ant-picker-date-panel {
//           display: flex !important;
//           flex-direction: column !important;
//           width: 100% !important;
//           height: 100% !important;
//         }

//         /* 4) Header (month + year nav) */
//         .custom-datepicker-dropdown .ant-picker-header {
//           flex-shrink: 0;
//           width: 100%;
//           padding: 12px 16px !important;
//         }

//         /* 5) Body wrapper */
//         .custom-datepicker-dropdown .ant-picker-body {
//           flex: 1 !important;
//           display: flex !important;
//           flex-direction: column !important;
//           width: 100% !important;
//           height: 100% !important;
//           padding: 1px 12px !important;
//         }

//         /* 6) Content (the table) */
//         .custom-datepicker-dropdown .ant-picker-content {
//           flex: 1 !important;
//           width: 100% !important;
//           height: 100% !important;
//           table-layout: fixed !important;
//         }

//         /* 7) Each cell fill height */
//         .custom-datepicker-dropdown .ant-picker-cell {
//           height: 100% !important;
//           padding: 12px !important;
//         }

//         /* Hide out-of-month dates */
//         .custom-datepicker-dropdown
//           .ant-picker-cell:not(.ant-picker-cell-in-view) {
//           visibility: hidden !important;
//           pointer-events: none !important;
//         }

//         /* 8) Highlight today/selected */
//         .custom-datepicker-dropdown
//           .ant-picker-cell-today
//           .ant-picker-cell-inner,
//         .custom-datepicker-dropdown
//           .ant-picker-cell-selected
//           .ant-picker-cell-inner {
//           background-color: #224674 !important;
//           color: #fff !important;
//           border-radius: 50% !important;
//         }

//         /* 9) Remove footer */
//         .custom-datepicker-dropdown .ant-picker-footer {
//           display: none !important;
//         }
//       `}</style>

//       <style jsx global>{`  
//       .calendar-wrapper .ant-picker-cell:not(.ant-picker-cell-in-view) .ant-picker-cell-inner {
//     color: #25292A !important;
//     opacity: 1 !important;
//   }

//         /* Apply Inter font only to Calendar */
//         .calendar-wrapper .ant-picker-calendar {
//           font-family: "Inter", sans-serif !important;
//         }

//         /* Remove unwanted border-top and margins */
//         .ant-picker-calendar.ant-picker-calendar-full
//           .ant-picker-calendar-date {
//           display: block;
//           width: auto;
//           height: auto;
//           margin: 0 !important;
//           padding: 4px 8px 0 !important;
//           border: none !important;
//           border-radius: 0;
//           transition: background 0.3s;
//         }

//         .ant-picker-calendar-date {
//           border-top: none !important;
//         }

//         .ant-picker-calendar .ant-picker-body {
//           border-radius: 0.375rem;
//           overflow: hidden;
//         }

//         .ant-picker-calendar .ant-picker-content thead th {
//           text-align: left !important;
//           padding: 12px 8px !important;
//           border: 1px solid #e9edee;
//           font-weight: 500 !important;
//           color: #626d6f;
//           font-size: 16px !important;
//           line-height: 16px !important;
//           letter-spacing: 0 !important;
//         }

//         .ant-picker-calendar .ant-picker-cell {
//           text-align: left !important;
//           vertical-align: top !important;
//           padding: 0.5rem;
//           font-weight: 500;
//           font-size: 21px !important;
//           line-height: 21px !important;
//           border: 1px solid #e9edee;
//         }

//         .ant-picker-calendar .ant-picker-cell-inner {
//           justify-content: flex-start !important;
//           padding: 0 !important;
//         }
//       `}</style>
//     </div>
//   );
// };

// export default CalendarPage;

"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { ConfigProvider, Calendar } from "antd";
import type { Dayjs } from "dayjs";
import dayjs from "dayjs";
import updateLocale from "dayjs/plugin/updateLocale";
import "dayjs/locale/en-gb";
import enGB from "antd/locale/en_GB";
import "@fontsource/inter";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { IoMdArrowDropdown } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import "antd/dist/reset.css";
import { DatePicker } from "antd";
import type { CalendarProps } from "antd";
import PeptideDropdown from "./PeptideDropDown/PeptideDropDown";
import type { PeptideOption } from "./PeptideDropDown/PeptideDropDown";

dayjs.locale("en-gb");
dayjs.extend(updateLocale);
dayjs.updateLocale("en-gb", {
  weekStart: 0,
  weekdaysMin: ["MON", "TUE", "WED", "THUR", "FRI", "SAT", "SUN"],
  weekdaysShort: ["MON", "TUE", "WED", "THUR", "FRI", "SAT", "SUN"],
});

// Define the event type
interface CalendarEvent {
  date: string;
  peptide: PeptideOption | null;
  dosage: string;
  goal: string;
}

const CalendarPage: React.FC = () => {
  const [currentDate, setCurrentDate] = useState<Dayjs>(dayjs().locale("en-gb"));
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedPeptide, setSelectedPeptide] = useState<PeptideOption | null>(null);
  const [dosage, setDosage] = useState<string>('');
  const [goal, setGoal] = useState<string>('');
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [popupDate, setPopupDate] = useState<string | null>(null);
  const popupRef = useRef<HTMLDivElement>(null);
  const calendarRef = useRef<HTMLDivElement>(null); // New ref for calendar container

  const hiddenDateRef = useRef<HTMLInputElement>(null);
  const [pickerValue, setPickerValue] = useState<Dayjs>(dayjs());
  const [years, setYears] = useState<number[]>([]);

  useEffect(() => {
    const currentYear = dayjs().year();
    const yearsList = [];
    for (let i = currentYear - 5; i <= currentYear; i++) {
      yearsList.push(i);
    }
    setYears(yearsList);
  }, []);

  // Close popup when clicking outside
  useEffect(() => {
    if (!popupDate) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(e.target as Node)) {
        setPopupDate(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [popupDate]);

  const onPanelChange: CalendarProps<Dayjs>["onPanelChange"] = (value) => {
    setCurrentDate(value.locale("en-gb"));
  };

  const handlePrevMonth = () => setCurrentDate((prev) => prev.subtract(1, "month"));
  const handleNextMonth = () => setCurrentDate((prev) => prev.add(1, "month"));
  const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newYear = parseInt(e.target.value);
    setPickerValue(pickerValue.year(newYear));
  };
  const handlePrevMonthPicker = () => setPickerValue(pickerValue.subtract(1, "month"));
  const handleNextMonthPicker = () => setPickerValue(pickerValue.add(1, "month"));

  // Check if all form fields are filled
  const isFormValid = selectedDate && selectedPeptide && dosage.trim() !== '' && goal.trim() !== '';

  // Handle form submission
  const handleAddEvent = () => {
    if (!isFormValid) return;
    
    const newEvent: CalendarEvent = {
      date: selectedDate,
      peptide: selectedPeptide,
      dosage: dosage,
      goal: goal
    };
    
    setEvents([...events, newEvent]);
    
    // Reset form
    setSelectedDate(null);
    setSelectedPeptide(null);
    setDosage('');
    setGoal('');
    setIsModalOpen(false);
  };

  // NEW: Responsive popup positioning logic
  const handleOpenPopup = (date: string, e: React.MouseEvent) => {
    if (!calendarRef.current) return;
    
    const cellElement = e.currentTarget.closest('.ant-picker-cell');
    if (cellElement) {
      const calendarRect = calendarRef.current.getBoundingClientRect();
      const cellRect = cellElement.getBoundingClientRect();
      
      // Calculate position relative to calendar container
      const relativeTop = cellRect.top - calendarRect.top;
      const relativeLeft = cellRect.left - calendarRect.left;
      
      setPopupDate(date);
      
      // Use a small timeout to ensure popup is rendered before positioning
      setTimeout(() => {
        if (popupRef.current) {
          const popupWidth = popupRef.current.offsetWidth;
          const popupHeight = popupRef.current.offsetHeight;
          
          // Position below the cell
          let topPosition = relativeTop + cellRect.height + 8;
          let leftPosition = relativeLeft + (cellRect.width / 2) - (popupWidth / 2);
          
          // Adjust for container boundaries
          if (leftPosition < 0) leftPosition = 8;
          if (leftPosition + popupWidth > calendarRect.width) {
            leftPosition = calendarRect.width - popupWidth - 8;
          }
          
          // Flip above if near bottom
          if (topPosition + popupHeight > calendarRect.height) {
            topPosition = relativeTop - popupHeight - 8;
          }
          
          // Apply position
          popupRef.current.style.top = `${topPosition}px`;
          popupRef.current.style.left = `${leftPosition}px`;
        }
      }, 10);
    }
  };

  // Render custom content in calendar cells
  const dateCellRender = (value: Dayjs) => {
    const dateStr = value.format('YYYY-MM-DD');
    const dayEvents = events.filter(e => e.date === dateStr);
    const eventsToShow = dayEvents.slice(0, 2);
    const extraEventsCount = dayEvents.length - eventsToShow.length;
    
    return (
      <div className="flex flex-col relative items-start justify-end h-full w-full py-2 gap-1">
        <div 
          className="w-full flex flex-col-reverse gap-1 items-start justify-start px-1"
          onClick={(e) => e.stopPropagation()}
        >
          {eventsToShow.map((event, idx) => (
            <div 
              key={idx} 
              className="inline-block w-fit bg-[#C8E4FC] rounded-full px-2 py-1 text-xs"
              style={{ fontFamily: 'Afacad Flux, Afacad, Inter, sans-serif' }}
            >
              <div className="font-semibold text-[#224674]">{event.peptide?.name}</div>
            </div>
          ))}
        </div>
        {extraEventsCount > 0 && (
          <span 
            className="text-xs text-[#224674] font-medium cursor-pointer"
            style={{ fontFamily: 'Afacad Flux, Afacad, Inter, sans-serif' }}
            onClick={(e) => handleOpenPopup(dateStr, e)}
          >
            +{extraEventsCount} more
          </span>
        )}
      </div>
    );
  };

  const headerRender: CalendarProps<Dayjs>["headerRender"] = () => (
    <div className="flex justify-between items-center w-full bg-white">
      <div className="flex items-center gap-2 py-6 w-full justify-between max-sm:flex-col">
        <div className="flex items-center gap-2">
          <span className="font-extrabold txt-24 text-[#25292A]">
            {currentDate.format("MMM YYYY")}
          </span>
          <button
            onClick={handlePrevMonth}
            className="w-8 h-8 flex items-center justify-center rounded-full"
          >
            <Image
              src="/Dashboard/dosage-tracking/arrow-left.svg"
              alt="Previous"
              width={32}
              height={32}
            />
          </button>
          <button
            onClick={handleNextMonth}
            className="w-8 h-8 flex items-center justify-center rounded-full"
          >
            <Image
              src="/Dashboard/dosage-tracking/arrow-right.svg"
              alt="Next"
              width={32}
              height={32}
            />
          </button>
        </div>
        <div className="flex gap-3 buttonD txt-16">
          <button
            onClick={handlePrevMonth}
            className="h-10 rounded-3xl px-6 py-2 flex items-center justify-center gap-2 bg-[#E9EDEE] !text-[#9EA9AA] font-semibold"
          >
            AI Feedback
          </button>
          <button
            onClick={() => setIsModalOpen(true)}
            className="h-10 rounded-3xl px-6 py-2 flex items-center justify-center gap-2 bg-[#224674] !text-white font-semibold"
          >
            Add Peptide Dose
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div 
      className="py-3 px-4 sm:px-6 md:px-8 lg:px-12 calendar-wrapper relative"
      ref={calendarRef} // Added ref for positioning
    >
      <ConfigProvider locale={enGB}>
        <Calendar
          value={currentDate}
          onPanelChange={onPanelChange}
          headerRender={headerRender}
          dateCellRender={dateCellRender}
        />
      </ConfigProvider>

      {/* Event Details Popup - POSITIONED RELATIVE TO CALENDAR */}
      {popupDate && (
        <div 
          ref={popupRef}
          className="event-popup absolute z-50 bg-white border border-gray-200 rounded-lg shadow-lg p-3 min-w-[280px] max-h-60 overflow-y-auto"
          style={{
            // Position will be set dynamically in handleOpenPopup
            maxWidth: 'calc(100% - 32px)'
          }}
        >
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-center w-full font-semibold text-[#25292A]">
              {dayjs(popupDate).format('MMM D, YYYY')}
            </h3>
            <button 
              className="text-gray-500 hover:text-gray-700"
              onClick={() => setPopupDate(null)}
            >
              <RxCross2 size={16} />
            </button>
          </div>
          
          <div className="event-list flex flex-col-reverse">
            {events.filter(e => e.date === popupDate).map((event, idx) => (
              <div key={idx} className="event-item py-2 flex items-center border-b border-gray-100 last:border-0">
                <div className="w-2 h-2 bg-[#224674] rounded-full mr-3"></div>
                <div className="flex-1">
                  <div className="font-medium text-[#224674] bg-[#C8E4FC] rounded-full px-2 py-1 w-fit">{event.peptide?.name}</div>
                  {/* <div className="text-xs text-gray-500">Dosage: {event.dosage}mcg</div> */}
                  {/* <div className="text-xs text-gray-500">Goal: {event.goal}</div> */}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Add Peptide Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/20 flex items-center justify-center">
          <div className="bg-white rounded-[16px] p-6 w-[496px] max-sm:w-[300px] relative overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="txt-32 font-semibold text-[#25292A] mb-4">
                Add Peptide
              </h2>
              <div
                className="bg-[#D8DFE0] rounded-full p-2 cursor-pointer"
                onClick={() => setIsModalOpen(false)}
              >
                <RxCross2 className="text-[#9EA9AA] font-extrabold" />
              </div>
            </div>

            <div className="flex flex-col gap-4 mb-6">
              <div className="flex flex-col gap-6">
                <div className="relative">
                  <p>Date</p>
                  <DatePicker
                    placement="topRight"
                    picker="date"
                    value={selectedDate ? dayjs(selectedDate) : null}
                    onChange={(date) =>
                      setSelectedDate(date?.format("YYYY-MM-DD") || null)
                    }
                    className="w-full h-auto 2xl:w-[448px] xl:h-[48px] !bg-[#F2F5F6] rounded-md px-3 py-2"
                    rootClassName="custom-datepicker-input"
                    suffixIcon={
                      <Image
                        src="/Dashboard/dosage-tracking/calendarIcon.svg"
                        alt="calendar"
                        width={24}
                        height={24}
                        className="cursor-pointer"
                      />
                    }
                    popupClassName="custom-datepicker-dropdown no-header-datepicker"
                    inputReadOnly
                    onPanelChange={(date) => setPickerValue(date)}
                    panelRender={(panelNode) => (
                      <div className="custom-panel-container">
                        <div className="flex justify-between items-center px-6 py-3 text-[#626D6F] font-medium">
                          <div className="flex items-center gap-1 relative">
                            <span className="txt-16">
                              {pickerValue.format("MMMM")}
                            </span>
                            <div className="relative flex items-center">
                              <select
                                value={pickerValue.year()}
                                onChange={handleYearChange}
                                className="bg-transparent border-none txt-16 focus:outline-none focus:ring-0 appearance-none pr-6"
                              >
                                {years.map((year) => (
                                  <option key={year} value={year}>
                                    {year}
                                  </option>
                                ))}
                              </select>
                              <IoMdArrowDropdown
                                className="absolute right-0 pointer-events-none text-[#626D6F]"
                                size={16}
                              />
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <button
                              onClick={handlePrevMonthPicker}
                              className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100"
                            >
                              <MdKeyboardArrowLeft size={24} />
                            </button>
                            <button
                              onClick={handleNextMonthPicker}
                              className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100"
                            >
                              <MdKeyboardArrowRight size={24} />
                            </button>
                          </div>
                        </div>
                        {panelNode}
                      </div>
                    )}
                  />
                </div>
              </div>

              <div className="relative">
                <p>Peptide</p>
                <PeptideDropdown
                  selected={selectedPeptide}
                  setSelected={setSelectedPeptide}
                />
              </div>

              <div className="relative">
                <p>Dosage</p>
                <div className="relative">
                  <input
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    placeholder="Enter dosage you have taken"
                    className="w-full h-auto 2xl:w-[448px] xl:h-[48px] bg-[#F2F5F6] border-none focus:outline-none focus:ring-0 focus:border-transparent font-medium placeholder:font-normal placeholder:text-[#8D9A9B] rounded-md px-4 py-2 pr-12"
                    value={dosage}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (value === '' || /^\d+$/.test(value)) {
                        setDosage(value);
                      }
                    }}
                  />
                  <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-[#8D9A9B]">
                    mcg
                  </span>
                </div>
              </div>

              <div className="relative">
                <p>Goal</p>
                <textarea
                  placeholder="Write your primary goal"
                  className="w-full 2xl:w-[448px] h-[100px] font-medium placeholder:font-normal bg-[#F2F5F6] border-none focus:outline-none focus:ring-0 focus:border-transparent placeholder:text-[#8D9A9B] rounded-md px-4 py-2 resize-none"
                    value={goal}
                    onChange={(e) => setGoal(e.target.value)}
                ></textarea>
              </div>

              <button 
                className={`txt-18 font-semibold leading-none text-center px-4 py-4 rounded-full w-full ${
                  isFormValid 
                    ? 'bg-[#224674] !text-white cursor-pointer' 
                    : 'bg-[#D8DFE0] !text-[#8D9A9B] cursor-not-allowed'
                }`}
                disabled={!isFormValid}
                onClick={handleAddEvent}
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Global Styles */}
      <style jsx global>{`
        /* Force Afacad Flux for Ant Design calendar popup */
        .custom-datepicker-dropdown,
        .custom-datepicker-dropdown * {
          font-family: "Afacad Flux", "Afacad", "Roboto", sans-serif !important;
        }

        /* ===== START: Custom Weekday Headers - Guaranteed to Work ===== */
        .custom-datepicker-dropdown .ant-picker-content th {
          width: 28px !important;
          height: 40px !important;
          padding: 0 !important;
          line-height: 40px !important;
          text-align: center !important;
          font-size: 0 !important; /* Hide original text */
        }

        /* Override for ≥768px */
        @media (min-width: 768px) {
          .custom-datepicker-dropdown .ant-picker-content th {
            width: 48px !important;
          }
        }

        .custom-datepicker-dropdown .ant-picker-content th::after {
          content: attr(data-short);
          display: block !important;
          font-weight: 500 !important;
          font-size: 16px !important;
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          line-height: 40px;
          color: #25292a !important;
        }

        /* Apply specific letters to each column */
        .custom-datepicker-dropdown
          .ant-picker-content
          thead
          tr
          th:nth-child(1) {
          --short: "S";
        }
        .custom-datepicker-dropdown
          .ant-picker-content
          thead
          tr
          th:nth-child(2) {
          --short: "M";
        }
        .custom-datepicker-dropdown
          .ant-picker-content
          thead
          tr
          th:nth-child(3) {
          --short: "T";
        }
        .custom-datepicker-dropdown
          .ant-picker-content
          thead
          tr
          th:nth-child(4) {
          --short: "W";
        }
        .custom-datepicker-dropdown
          .ant-picker-content
          thead
          tr
          th:nth-child(5) {
          --short: "T";
        }
        .custom-datepicker-dropdown
          .ant-picker-content
          thead
          tr
          th:nth-child(6) {
          --short: "F";
        }
        .custom-datepicker-dropdown
          .ant-picker-content
          thead
          tr
          th:nth-child(7) {
          --short: "S";
        }

        .custom-datepicker-dropdown .ant-picker-content th::after {
          content: var(--short) !important;
        }

        .custom-datepicker-dropdown .ant-picker-content th {
          position: relative;
        }
        /* ===== END: Custom Weekday Headers ===== */

        /* Rest of your styles... */
        .no-header-datepicker .ant-picker-header {
          display: none !important;
        }
      `}</style>

      <style jsx global>{`
        /* This targets the actual input inside the DatePicker */
        .custom-datepicker-input input::placeholder {
          color: #8d9a9b !important;
          font-family: "Afacad Flux", "Afacad", "Roboto", sans-serif !important;
          font-weight: 400 !important;
          font-size: 16px !important;
          letter-spacing: 0.5px !important;
          line-height: 100% !important;
        }

        .custom-datepicker-input input {
          color: #25292a !important;
          font-family: "Afacad Flux", "Afacad", "Roboto", sans-serif !important;
          font-weight: 500 !important;
          font-size: 16px !important;
          letter-spacing: 0.5px !important;
          line-height: 100% !important;
        }

        /* Force Afacad Flux for Ant Design calendar popup */
        .custom-datepicker-dropdown,
        .custom-datepicker-dropdown * {
          font-family: "Afacad Flux", "Afacad", "Roboto", sans-serif !important;
          font-weight: 500 !important;
          font-size: 16px !important;
        }

        .no-header-datepicker .ant-picker-header {
          display: none !important;
        }

        /* 1) Remove “today” default highlight entirely */
        .custom-datepicker-dropdown
          .ant-picker-cell-today
          .ant-picker-cell-inner {
          background: none !important;
          color: inherit !important;
        }

        /* 2) Remove the light‑blue focus/focus‑range square */
        .custom-datepicker-dropdown
          .ant-picker-cell-selected
          .ant-picker-cell-inner,
        .custom-datepicker-dropdown
          .ant-picker-cell-in-view:not(.ant-picker-cell-selected)
          .ant-picker-cell-inner,
        .custom-datepicker-dropdown
          .ant-picker-cell-range-start
          .ant-picker-cell-inner,
        .custom-datepicker-dropdown
          .ant-picker-cell-range-end
          .ant-picker-cell-inner {
          background: none !important;
          color: inherit !important;
        }

        .custom-datepicker-dropdown
          .ant-picker-cell-today
          .ant-picker-cell-inner::before {
          content: none !important;
        }
        .custom-datepicker-dropdown
          .ant-picker-cell-today:not(.ant-picker-cell-selected)
          .ant-picker-cell-inner {
          position: relative;
          border: 1px solid #224674 !important;
          color: #224674 !important;
          border-radius: 50% !important;
          background: transparent !important;
        }

        /* 3) Only your selected date gets the circle */
        .custom-datepicker-dropdown
          .ant-picker-cell-selected
          .ant-picker-cell-inner {
          background-color: #224674 !important;
          color: #ffffff !important;
          border-radius: 50% !important;
        }

        /* 1) Outer popup wrapper */
        .custom-datepicker-dropdown {
          width: 260px !important;
          height: 344px !important;
          min-width: 260px !important;
          min-height: 344px !important;
          max-width: 360px !important;
          max-height: 344px !important;
          border-radius: 28px !important;
          box-shadow: 0px 1px 3px 1px rgba(0, 0, 0, 0.15),
            0px 1px 2px 0px rgba(0, 0, 0, 0.3) !important;
          overflow: hidden !important;
        }

        /* Override for ≥768px */
        @media (min-width: 768px) {
          .custom-datepicker-dropdown {
            width: 360px !important;
            height: 344px !important;
            min-width: 360px !important;
          }
        }

        /* 2) Panel container and panel itself */
        .custom-datepicker-dropdown .ant-picker-panel-container,
        .custom-datepicker-dropdown .ant-picker-panel {
          width: 100% !important;
          height: 100% !important;
        }

        /* 3) Date panel (header + body) */
        .custom-datepicker-dropdown .ant-picker-date-panel {
          display: flex !important;
          flex-direction: column !important;
          width: 100% !important;
          height: 100% !important;
        }

        /* 4) Header (month + year nav) */
        .custom-datepicker-dropdown .ant-picker-header {
          flex-shrink: 0;
          width: 100%;
          padding: 12px 16px !important;
        }

        /* 5) Body wrapper */
        .custom-datepicker-dropdown .ant-picker-body {
          flex: 1 !important;
          display: flex !important;
          flex-direction: column !important;
          width: 100% !important;
          height: 100% !important;
          padding: 1px 12px !important;
        }

        /* 6) Content (the table) */
        .custom-datepicker-dropdown .ant-picker-content {
          flex: 1 !important;
          width: 100% !important;
          height: 100% !important;
          table-layout: fixed !important;
        }

        /* 7) Each cell fill height */
        .custom-datepicker-dropdown .ant-picker-cell {
          height: 100% !important;
          padding: 12px !important;
        }

        /* Hide out-of-month dates */
        .custom-datepicker-dropdown
          .ant-picker-cell:not(.ant-picker-cell-in-view) {
          visibility: hidden !important;
          pointer-events: none !important;
        }

        /* 8) Highlight today/selected */
        .custom-datepicker-dropdown
          .ant-picker-cell-today
          .ant-picker-cell-inner,
        .custom-datepicker-dropdown
          .ant-picker-cell-selected
          .ant-picker-cell-inner {
          background-color: #224674 !important;
          color: #fff !important;
          border-radius: 50% !important;
        }

        /* 9) Remove footer */
        .custom-datepicker-dropdown .ant-picker-footer {
          display: none !important;
        }
      `}</style>

      <style jsx global>{`  
        .calendar-wrapper .ant-picker-cell:not(.ant-picker-cell-in-view) .ant-picker-cell-inner {
          color: #25292A !important;
          opacity: 1 !important;
        }

        /* Apply Inter font only to Calendar */
        .calendar-wrapper .ant-picker-calendar {
          font-family: "Inter", sans-serif !important;
        }

        /* Remove unwanted border-top and margins */
        .ant-picker-calendar.ant-picker-calendar-full
          .ant-picker-calendar-date {
          display: block;
          width: auto;
          height: auto;
          margin: 0 !important;
          padding: 4px 8px 0 !important;
          border: none !important;
          border-radius: 0;
          transition: background 0.3s;
        }

        .ant-picker-calendar-date {
          border-top: none !important;
        }

        .ant-picker-calendar .ant-picker-body {
          border-radius: 0.375rem;
          overflow: hidden;
        }

        .ant-picker-calendar .ant-picker-content thead th {
          text-align: left !important;
          padding: 12px 8px !important;
          border: 1px solid #e9edee;
          font-weight: 500 !important;
          color: #626d6f;
          font-size: 16px !important;
          line-height: 16px !important;
          letter-spacing: 0 !important;
        }

        .ant-picker-calendar .ant-picker-cell {
          text-align: left !important;
          vertical-align: top !important;
          padding: 0.5rem;
          font-weight: 500;
          font-size: 21px !important;
          line-height: 21px !important;
          border: 1px solid #e9edee;
        }

        .ant-picker-calendar .ant-picker-cell-inner {
          justify-content: flex-start !important;
          padding: 0 !important;
        }

        /* Popup styles */
        .event-popup {
          transition: transform 0.2s ease-out;
          box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1);
          border: 1px solid #e2e8f0;
        }
        
        @media (max-width: 640px) {
          .event-popup {
            min-width: 240px !important;
            max-width: 90vw !important;
          }
        }
      `}</style>
    </div>
  );
};

export default CalendarPage;