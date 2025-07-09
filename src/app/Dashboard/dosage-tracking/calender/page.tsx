// "use client";

// import React, { useState, useRef, useEffect } from "react";
// import Image from "next/image";
// import { ConfigProvider, Calendar } from "antd";
// import type { Dayjs } from "dayjs";
// import dayjs from "dayjs";
// import updateLocale from "dayjs/plugin/updateLocale"; // ①
// import "dayjs/locale/en-gb"; // ②
// import enGB from "antd/locale/en_GB";
// import "@fontsource/inter"; // loads all weights
// import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
// import { IoMdArrowDropdown } from "react-icons/io";
// import { RxCross2 } from "react-icons/rx";
// import "antd/dist/reset.css";
// import { DatePicker } from "antd";
// import type { CalendarProps } from "antd";

// dayjs.locale("en-gb");

// // ① Install the plugin
// dayjs.extend(updateLocale);

// // ② Override the en-gb locale’s weekday labels
// dayjs.updateLocale("en-gb", {
//   weekStart: 0, // 👈 IMPORTANT: Monday as first day
//   // these two arrays control what Calendar shows in the header row:
//   weekdaysMin: ["MON", "TUE", "WED", "THUR", "FRI", "SAT", "SUN"],
//   weekdaysShort: ["MON", "TUE", "WED", "THUR", "FRI", "SAT", "SUN"],
//   // (if Calendar ever falls back to "short" you’ll still get your caps)
// });

// const CalendarPage: React.FC = () => {
//   const [currentDate, setCurrentDate] = useState<Dayjs>(
//     dayjs().locale("en-gb")
//   );

//   const onPanelChange: CalendarProps<Dayjs>["onPanelChange"] = (value) => {
//     setCurrentDate(value.locale("en-gb"));
//   };

//   const handlePrevMonth = () => {
//     setCurrentDate((prev) => prev.subtract(1, "month"));
//   };
//   const handleNextMonth = () => {
//     setCurrentDate((prev) => prev.add(1, "month"));
//   };

//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [selectedDate, setSelectedDate] = useState<string | null>(null);
//   const hiddenDateRef = useRef<HTMLInputElement>(null);

//   // New states for DatePicker header
//   const [pickerValue, setPickerValue] = useState<Dayjs>(dayjs());
//   const [years, setYears] = useState<number[]>([]);

//   // Initialize years for dropdown
//   useEffect(() => {
//     const currentYear = dayjs().year();
//     const yearsList = [];
//     for (let i = currentYear - 5; i <= currentYear + 0; i++) {
//       yearsList.push(i);
//     }
//     setYears(yearsList);
//   }, []);

//   // Handle year change
//   const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
//     const newYear = parseInt(e.target.value);
//     setPickerValue(pickerValue.year(newYear));
//   };

//   // Handle month navigation
//   const handlePrevMonthPicker = () => {
//     setPickerValue(pickerValue.subtract(1, "month"));
//   };

//   const handleNextMonthPicker = () => {
//     setPickerValue(pickerValue.add(1, "month"));
//   };

//   const headerRender: CalendarProps<Dayjs>["headerRender"] = () => (
//     <div className="flex justify-between items-center w-full bg-white">
//       <div className="flex items-center gap-2 py-6  w-full justify-between max-sm:flex-col">
//         {/* months */}
//         <div className="flex items-center gap-2">
//           <span className="font-extrabold txt-24 text-[#25292A] ">
//             {currentDate.format("MMM YYYY")}
//           </span>
//           <button
//             onClick={handlePrevMonth}
//             className="w-8 h-8 flex items-center justify-center rounded-full "
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
//             className="w-8 h-8 flex items-center justify-center rounded-full "
//           >
//             <Image
//               src="/Dashboard/dosage-tracking/arrow-right.svg"
//               alt="Next"
//               width={32}
//               height={32}
//             />
//           </button>
//         </div>

//         {/* buttons */}
//         <div className="flex gap-3 buttonD txt-16">
//           <button
//             onClick={handlePrevMonth}
//             className=" h-10 rounded-3xl px-6 py-2 flex items-center justify-center gap-2 bg-[#E9EDEE] !text-[#9EA9AA] font-semibold "
//           >
//             AI Feedback
//           </button>

//           <button
//             onClick={() => setIsModalOpen(true)}
//             className="  h-10 rounded-3xl px-6 py-2 flex items-center justify-center gap-2 bg-[#224674] !text-white font-semibold "
//           >
//             Add Peptide Dose
//           </button>
//         </div>
//       </div>
//     </div>
//   );
//   return (
//     // <div className="py-3 px-12 calendar-wrapper">
//     <div className="py-3 px-4 sm:px-6 md:px-8 lg:px-12 calendar-wrapper">
//       <ConfigProvider locale={enGB}>
//         <Calendar
//           value={currentDate}
//           onPanelChange={onPanelChange}
//           headerRender={headerRender}
//         />
//       </ConfigProvider>

//       {isModalOpen && (
//         <div className="fixed inset-0 z-50 bg-black/20 flex items-center justify-center">
//           <div className="bg-white rounded-xl p-6 w-78 h-auto  lg:min-w-[496px] lg:min-h-[629px] relative ">

//             <div className=" flex items-center justify-between mb-6">

//             <h2 className="txt-32 font-semibold text-[#25292A] mb-4">
//               Add Peptide
//             </h2>
//                 <div className="bg-[#D8DFE0] rounded-full p-2"><RxCross2 className="text-[#9EA9AA] font-extrabold" /></div>
//             </div>

//             <div className="flex flex-col gap-4 mb-6">
//                 {/* Inputs */}
//             <div className="flex flex-col gap-6">
//               {/* Date input */}
//               <div className="relative ">
//                 <p>Date </p>
//                 <DatePicker
//                 // placement="bottomRight"
//                 placement="topRight"
//                   picker="date"
//                   value={selectedDate ? dayjs(selectedDate) : null}
//                   onChange={(date) =>
//                     setSelectedDate(date?.format("YYYY-MM-DD") || null)
//                   }
//                   className="w-full h-auto 2xl:w-[448px] xl:h-[48px] !bg-[#F2F5F6] !hover:bg-[#F2F5F6] !active:bg-[#F2F5F6] rounded-md px-3 py-2 "
//                   suffixIcon={
//                     <Image
//                       src="/Dashboard/dosage-tracking/calendarIcon.svg"
//                       alt="calendar"
//                       width={24}
//                       height={24}
//                       className="cursor-pointer"
//                     />
//                   }
//                   popupClassName="custom-datepicker-dropdown no-header-datepicker "
//                   inputReadOnly
//                 //   open={true}
//                   onPanelChange={(date) => setPickerValue(date)}
//                   pickerValue={pickerValue}
//                   panelRender={(panelNode) => (
//                     <div className="custom-panel-container ">
//                       {/* Custom header */}
//                       <div className="flex justify-between items-center px-6 py-3   text-[#626D6F] font-medium ">
//                         <div className="flex items-center gap-1 relative">
//                           {" "}
//                           {/* Added relative positioning */}
//                           <span className="txt-16">
//                             {pickerValue.format("MMMM")}
//                           </span>
//                           <div className="relative flex items-center">
//                             {" "}
//                             {/* Wrapper div */}
//                             <select
//                               value={pickerValue.year()}
//                               onChange={handleYearChange}
//                               className="bg-transparent border-none txt-16 focus:outline-none focus:ring-0 appearance-none pr-6" /* Added appearance-none and padding */
//                             >
//                               {years.map((year) => (
//                                 <option key={year} value={year}>
//                                   {year}
//                                 </option>
//                               ))}
//                             </select>
//                             <IoMdArrowDropdown
//                               className="absolute right-0 pointer-events-none text-[#626D6F]"
//                               size={16}
//                             />{" "}
//                             {/* Custom icon */}
//                           </div>
//                         </div>

//                         <div className="flex gap-2">
//                           <button
//                             onClick={handlePrevMonthPicker}
//                             className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100"
//                           >
//                             <MdKeyboardArrowLeft size={24} />
//                           </button>
//                           <button
//                             onClick={handleNextMonthPicker}
//                             className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100"
//                           >
//                             <MdKeyboardArrowRight size={24} />
//                           </button>
//                         </div>
//                       </div>

//                       {/* Original panel content */}
//                       {panelNode}
//                     </div>
//                   )}
//                 />
//               </div>
//             </div>

//             {/* Peptide input */}
//             <div className="relative">
//               <p>Peptide</p>
//               <input
//                 type="text"
//                 placeholder="Enter peptide name"
//                 className="w-full h-auto 2xl:w-[448px] xl:h-[48px]  bg-[#F2F5F6] !hover:bg-[#F2F5F6] !active:bg-[#F2F5F6] rounded-md px-4 py-2"
//               />
//             </div>

//             {/* Dosage input */}
//             <div className="relative">
//               <p>Dosage</p>
//               <input
//                 type="text"
//                 placeholder="Enter dosage amount"
//                 className="w-full h-auto 2xl:w-[448px] xl:h-[48px]  bg-[#F2F5F6] !hover:bg-[#F2F5F6] !active:bg-[#F2F5F6] rounded-md px-4 py-2"
//               />
//             </div>

//             {/* Notes input */}
//             <div className="relative">
//               <p>Notes</p>
//               <textarea
//                 placeholder="Add any additional notes"
//                 className="w-full 2xl:w-[448px]  h-[100px]  bg-[#F2F5F6] !hover:bg-[#F2F5F6] !active:bg-[#F2F5F6] rounded-md px-4 py-2 resize-none"
//               ></textarea>
//             </div>

//             <button className="text-[18px] font-semibold leading-none text-center   bg-[#224674] !text-white px-4 py-2 rounded-2xl">
//             Add
//             </button>

//             </div>
//           </div>
//         </div>
//       )}

//         <style jsx global>{`
//         /* Force Afacad Flux for Ant Design calendar popup */
//         .custom-datepicker-dropdown,
//         .custom-datepicker-dropdown * {
//             font-family: "Afacad Flux", "Afacad", "Roboto", sans-serif !important;
//         }

//         /* ===== START: Custom Weekday Headers - Guaranteed to Work ===== */
//         .custom-datepicker-dropdown .ant-picker-content th {
//             width: 28px !important;
//             height: 40px !important;
//             padding: 0 !important;
//             line-height: 40px !important;
//             text-align: center !important;
//             font-size: 0 !important; /* Hide original text */
//         }

//         /* Override for ≥768px */
//         @media (min-width: 768px) {
//         .custom-datepicker-dropdown .ant-picker-content th {
//             width: 48px !important;
//         }
//         }

//         .custom-datepicker-dropdown .ant-picker-content th::after {
//             content: attr(data-short);
//             display: block !important;
//             font-weight: 500 !important;
//             font-size: 16px !important;
//             position: absolute;
//             top: 0;
//             left: 0;
//             width: 100%;
//             height: 100%;
//             line-height: 40px;
//             color: #25292A !important;
//         }

//         /* Apply specific letters to each column */
//         .custom-datepicker-dropdown .ant-picker-content thead tr th:nth-child(1) { --short: "S"; }
//         .custom-datepicker-dropdown .ant-picker-content thead tr th:nth-child(2) { --short: "M"; }
//         .custom-datepicker-dropdown .ant-picker-content thead tr th:nth-child(3) { --short: "T"; }
//         .custom-datepicker-dropdown .ant-picker-content thead tr th:nth-child(4) { --short: "W"; }
//         .custom-datepicker-dropdown .ant-picker-content thead tr th:nth-child(5) { --short: "T"; }
//         .custom-datepicker-dropdown .ant-picker-content thead tr th:nth-child(6) { --short: "F"; }
//         .custom-datepicker-dropdown .ant-picker-content thead tr th:nth-child(7) { --short: "S"; }

//         .custom-datepicker-dropdown .ant-picker-content th::after {
//             content: var(--short) !important;
//         }

//         .custom-datepicker-dropdown .ant-picker-content th {
//             position: relative;
//         }
//         /* ===== END: Custom Weekday Headers ===== */

//         /* Rest of your styles... */
//         .no-header-datepicker .ant-picker-header {
//             display: none !important;
//         }

//         `}</style>

//       <style jsx global>{`
//         /* Force Afacad Flux for Ant Design calendar popup */
//         .custom-datepicker-dropdown,
//         .custom-datepicker-dropdown * {
//             font-family: "Afacad Flux", "Afacad", "Roboto", sans-serif !important;
//             font-weight: 500 !important;
//             font-size: 16px !important;
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
//         .custom-datepicker-dropdown   {
//             width: 360px !important;
//                 height: 344px !important;
//                 min-width: 360px !important;
//                 //   margin-top: -50px !important;

//         }
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
//         .custom-datepicker-dropdown .ant-picker-cell:not(.ant-picker-cell-in-view) {
//         visibility: hidden !important;
//         pointer-events: none !important;
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
// import type { PeptideOption } from "./PeptideDropDown/PeptideDropDown"; // optional, but improves clarity

// dayjs.locale("en-gb");
// dayjs.extend(updateLocale);
// dayjs.updateLocale("en-gb", {
//   weekStart: 0,
//   weekdaysMin: ["MON", "TUE", "WED", "THUR", "FRI", "SAT", "SUN"],
//   weekdaysShort: ["MON", "TUE", "WED", "THUR", "FRI", "SAT", "SUN"],
// });

// const CalendarPage: React.FC = () => {
//   const [currentDate, setCurrentDate] = useState<Dayjs>(
//     dayjs().locale("en-gb")
//   );
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [selectedDate, setSelectedDate] = useState<string | null>(null);
//   //   const [selectedPeptide, setSelectedPeptide] = useState(null);
//   const [selectedPeptide, setSelectedPeptide] = useState<PeptideOption | null>(
//     null
//   );

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

//   const handlePrevMonth = () =>
//     setCurrentDate((prev) => prev.subtract(1, "month"));
//   const handleNextMonth = () => setCurrentDate((prev) => prev.add(1, "month"));
//   const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
//     const newYear = parseInt(e.target.value);
//     setPickerValue(pickerValue.year(newYear));
//   };
//   const handlePrevMonthPicker = () =>
//     setPickerValue(pickerValue.subtract(1, "month"));
//   const handleNextMonthPicker = () =>
//     setPickerValue(pickerValue.add(1, "month"));

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
//         />
//       </ConfigProvider>

//       {isModalOpen && (
//         <div className="fixed inset-0 z-50 bg-black/20 flex items-center justify-center">
//           {/* <div className="bg-white rounded-[16px] p-6 w-[496px] h-[921px] relative overflow-y-auto"> */}
//           <div className="bg-white rounded-[16px] p-6 w-[496px] max-sm:w-[300px]  relative overflow-y-auto">
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
//                     onKeyPress={(e) => {
//                       if (!/[0-9]/.test(e.key)) {
//                         e.preventDefault();
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
//                 ></textarea>
//               </div>

//               <button className="txt-18 font-semibold leading-none text-center bg-[#224674] !text-white px-4 py-4 rounded-full">
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

  // Render custom content in calendar cells
  const dateCellRender = (value: Dayjs) => {
    const dateStr = value.format('YYYY-MM-DD');
    const dayEvents = events.filter(e => e.date === dateStr);
    
    return (
      <div className="flex flex-col gap-1 py-1">
        {dayEvents.map((event, idx) => (
          <div 
            key={idx} 
            className="bg-blue-50 rounded px-2 py-1 text-xs truncate"
          >
            <div className="font-medium">{event.peptide?.name}</div>
            <div>{event.dosage}mcg</div>
          </div>
        ))}
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
    <div className="py-3 px-4 sm:px-6 md:px-8 lg:px-12 calendar-wrapper">
      <ConfigProvider locale={enGB}>
        <Calendar
          value={currentDate}
          onPanelChange={onPanelChange}
          headerRender={headerRender}
          dateCellRender={dateCellRender}
        />
      </ConfigProvider>

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
            //   margin-top: -50px !important;
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
          /* Optional: adjust padding if you want */
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

        /* Hide out-of-month dates (only show current month dates) */
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

        /* 9) Remove footer (Today button + divider) */
        .custom-datepicker-dropdown .ant-picker-footer {
          display: none !important;
        }
      `}</style>

      <style jsx global>{`
        /* Apply Inter font only to Calendar */
        .calendar-wrapper .ant-picker-calendar {
          font-family: "Inter", sans-serif !important;
        }

        /* Remove unwanted border-top and margins from calendar-date container */
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
          font-weight: 500 !important; /* Medium */
          color: #626d6f;

          font-size: 16px !important;
          line-height: 16px !important; /* 100% line-height */
          letter-spacing: 0 !important;
        }

        .ant-picker-calendar .ant-picker-cell {
          text-align: left !important;
          vertical-align: top !important;
          padding: 0.5rem;

          font-weight: 500;

          font-size: 21px !important;
          line-height: 21px !important; /* 100% line-height */
          letter-spacing: 0 !important;

          border: 1px solid #e9edee;
        }

        .ant-picker-calendar .ant-picker-cell-inner {
          justify-content: flex-start !important;
          padding: 0 !important;
        }
      `}</style>
    </div>
  );
};

export default CalendarPage;