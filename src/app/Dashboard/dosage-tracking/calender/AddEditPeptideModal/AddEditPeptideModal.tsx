// // // AddEditPeptideModal.tsx
// // import React, { useState } from "react";
// // import dayjs, { Dayjs } from "dayjs";
// // import { DatePicker } from "antd";
// // import Image from "next/image";
// // import { RxCross2 } from "react-icons/rx";
// // import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
// // import { IoMdArrowDropdown } from "react-icons/io";
// // import PeptideDropdown from "../PeptideDropDown/PeptideDropDown";
// // import type { PeptideOption } from "../PeptideDropDown/PeptideDropDown";
// // // import type { CalendarEvent } from "@/app/Dashboard/dosage-tracking/calender/Calendar1/Calendar1";
// // import type { CalendarEvent } from "@/app/Dashboard/dosage-tracking/calender/page";

// // import "./AddEditPeptideModal.css"; // Assuming you have a CSS file for custom styles

// // interface AddEditPeptideModalProps {
// //   isModalOpen: boolean;
// //   setIsModalOpen: (isOpen: boolean) => void;
// //   editingEvent: CalendarEvent | null;
// //   selectedDate: string | null;
// //   setSelectedDate: (date: string | null) => void;
// //   selectedPeptide: PeptideOption | null;
// //   setSelectedPeptide: (peptide: PeptideOption | null) => void;
// //   dosage: string;
// //   setDosage: (dosage: string) => void;
// //   goal: string;
// //   setGoal: (goal: string) => void;
// //   handleSubmit: () => void;
// // }

// // const AddEditPeptideModal: React.FC<AddEditPeptideModalProps> = ({
// //   isModalOpen,
// //   setIsModalOpen,
// //   editingEvent,
// //   selectedDate,
// //   setSelectedDate,
// //   selectedPeptide,
// //   setSelectedPeptide,
// //   dosage,
// //   setDosage,
// //   goal,
// //   setGoal,
// //   handleSubmit,
// // }) => {
// //   const [pickerValue, setPickerValue] = useState<Dayjs>(dayjs());

// //   // Add this inside AddEditPeptideModal component
// // const today = dayjs().endOf('day');

// // // Disable future dates
// // // const disabledDate = (current: Dayjs) => {
// // //   return current > today;
// // // };
// // const disabledDate = (current: Dayjs) => {
// //   return current.isAfter(dayjs(), 'day');
// // };

// // // Disable next month button in picker
// // const isNextMonthDisabled = pickerValue.add(1, 'month').isAfter(today, 'month');

// //   // Compute years dynamically
// //   const years = Array.from(
// //     { length: 5 },
// //     (_, i) => pickerValue.year() - 4 + i
// //   );

// //   const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
// //     const newYear = parseInt(e.target.value);
// //     setPickerValue(pickerValue.year(newYear));
// //   };

// //   const handlePrevMonthPicker = () =>
// //     setPickerValue(pickerValue.subtract(1, "month"));

// //   const handleNextMonthPicker = () =>
// //     setPickerValue(pickerValue.add(1, "month"));

// //   const isFormValid =
// //     selectedDate &&
// //     selectedPeptide &&
// //     dosage.trim() !== "" &&
// //     goal.trim() !== "";

// //   if (!isModalOpen) return null;

// //   return (
// //     <div className="fixed inset-0 z-50 bg-black/20 flex items-center justify-center">
// //       <div className="bg-white rounded-[16px] p-6 w-[496px] max-sm:w-[300px] relative overflow-y-auto">
// //         <div className="flex items-center justify-between mb-6">
// //           <h2 className="txt-32 font-semibold text-[#25292A] mb-4">
// //             {editingEvent ? "Edit Peptide" : "Add Peptide"}
// //           </h2>
// //           <div
// //             className="bg-[#D8DFE0] rounded-full p-2 cursor-pointer"
// //             onClick={() => setIsModalOpen(false)}
// //           >
// //             <RxCross2 className="text-[#9EA9AA] font-extrabold" />
// //           </div>
// //         </div>

// //         <div className="flex flex-col gap-4 mb-6">
// //           <div className="flex flex-col gap-6">
// //             <div className="relative">
// //               <p>Date</p>
// //               <DatePicker
// //                 placement="topRight"
// //                 picker="date"
// //                 value={selectedDate ? dayjs(selectedDate) : null}
// //                 onChange={(date) =>
// //                   setSelectedDate(date?.format("YYYY-MM-DD") || null)
// //                 }
// //                 className="w-full h-auto 2xl:w-[448px] xl:h-[48px] !bg-[#F2F5F6] rounded-md px-3 py-2"
// //                 rootClassName="custom-datepicker-input"
// //                 suffixIcon={
// //                   <Image
// //                     src="/Dashboard/dosage-tracking/calendarIcon.svg"
// //                     alt="calendar"
// //                     width={24}
// //                     height={24}
// //                     className="cursor-pointer"
// //                   />
// //                 }
// //                 popupClassName="custom-datepicker-dropdown no-header-datepicker"
// //                 inputReadOnly
// //                 onPanelChange={(date) => setPickerValue(date)}
// //                   disabledDate={disabledDate} // Add this prop
// //                 panelRender={(panelNode) => (
// //                   <div className="custom-panel-container">
// //                     <div className="flex justify-between items-center px-6 py-3 text-[#626D6F] font-medium">
// //                       <div className="flex items-center gap-1 relative">
// //                         <span className="txt-16">
// //                           {pickerValue.format("MMMM")}
// //                         </span>
// //                         <div className="relative flex items-center">
// //                           <select
// //                             value={pickerValue.year()}
// //                             onChange={handleYearChange}
// //                             className="bg-transparent border-none txt-16 focus:outline-none focus:ring-0 appearance-none pr-6"
// //                           >
// //                             {years.map((year) => (
// //                               <option key={year} value={year}>
// //                                 {year}
// //                               </option>
// //                             ))}
// //                           </select>
// //                           <IoMdArrowDropdown
// //                             className="absolute right-0 pointer-events-none text-[#626D6F]"
// //                             size={16}
// //                           />
// //                         </div>
// //                       </div>
// //                       <div className="flex gap-2">
// //                         <button
// //                           onClick={handlePrevMonthPicker}
// //                           className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100"
// //                         >
// //                           <MdKeyboardArrowLeft size={24} />
// //                         </button>
// //                         {/* <button
// //                           onClick={handleNextMonthPicker}
// //                           className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100"
// //                         >
// //                           <MdKeyboardArrowRight size={24} />
// //                         </button> */}
// //                          <button
// //         onClick={isNextMonthDisabled ? undefined : handleNextMonthPicker}
// //         disabled={isNextMonthDisabled}
// //         className={`w-8 h-8 flex items-center justify-center rounded-full ${
// //           isNextMonthDisabled
// //             ? 'opacity-50 cursor-not-allowed'
// //             : 'hover:bg-gray-100'
// //         }`}
// //       >
// //         <MdKeyboardArrowRight
// //           size={24}
// //           className={isNextMonthDisabled ? 'text-gray-400' : ''}
// //         />
// //       </button>
// //                       </div>
// //                     </div>
// //                     {panelNode}
// //                   </div>
// //                 )}
// //               />
// //             </div>
// //           </div>

// //           <div className="relative">
// //             <p>Peptide</p>
// //             <PeptideDropdown
// //               selected={selectedPeptide}
// //               setSelected={setSelectedPeptide}
// //             />
// //           </div>

// //           <div className="relative">
// //             <p>Dosage</p>
// //             <div className="relative">
// //               <input
// //                 type="text"
// //                 inputMode="numeric"
// //                 pattern="[0-9]*"
// //                 placeholder="Enter dosage you have taken"
// //                 className="w-full h-auto 2xl:w-[448px] xl:h-[48px] bg-[#F2F5F6] border-none focus:outline-none focus:ring-0 focus:border-transparent font-medium placeholder:font-normal placeholder:text-[#8D9A9B] rounded-md px-4 py-2 pr-12"
// //                 value={dosage}
// //                 onChange={(e) => {
// //                   const value = e.target.value;
// //                   if (value === "" || /^\d+$/.test(value)) {
// //                     setDosage(value);
// //                   }
// //                 }}
// //               />
// //               <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-[#8D9A9B]">
// //                 mcg
// //               </span>
// //             </div>
// //           </div>

// //           <div className="relative">
// //             <p>Goal</p>
// //             <textarea
// //               placeholder="Write your primary goal"
// //               className="w-full 2xl:w-[448px] h-[100px] font-medium placeholder:font-normal bg-[#F2F5F6] border-none focus:outline-none focus:ring-0 focus:border-transparent placeholder:text-[#8D9A9B] rounded-md px-4 py-2 resize-none"
// //               value={goal}
// //               onChange={(e) => setGoal(e.target.value)}
// //             ></textarea>
// //           </div>

// //           <button
// //             className={`txt-18 font-semibold leading-none text-center px-4 py-4 rounded-full w-full ${
// //               isFormValid
// //                 ? "bg-[#224674] !text-white cursor-pointer"
// //                 : "bg-[#D8DFE0] !text-[#8D9A9B] cursor-not-allowed"
// //             }`}
// //             disabled={!isFormValid}
// //             onClick={handleSubmit}
// //           >
// //             {editingEvent ? "Save" : "Add"}
// //           </button>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default AddEditPeptideModal;

// // AddEditPeptideModal.tsx
// import React, { useState, useEffect } from "react";
// import dayjs, { Dayjs } from "dayjs";
// import { DatePicker } from "antd";
// import Image from "next/image";
// import { RxCross2 } from "react-icons/rx";
// import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
// import { IoMdArrowDropdown } from "react-icons/io";
// import PeptideDropdown from "../PeptideDropDown/PeptideDropDown";
// import type { PeptideOption } from "../PeptideDropDown/PeptideDropDown";
// import type { CalendarEvent } from "@/app/Dashboard/dosage-tracking/calender/page";

// import "./AddEditPeptideModal.css";

// interface AddEditPeptideModalProps {
//   isModalOpen: boolean;
//   setIsModalOpen: (isOpen: boolean) => void;
//   editingEvent: CalendarEvent | null;
//   selectedDate: string | null;
//   setSelectedDate: (date: string | null) => void;
//   selectedPeptide: PeptideOption | null;
//   setSelectedPeptide: (peptide: PeptideOption | null) => void;
//   dosage: string;
//   setDosage: (dosage: string) => void;
//   goal: string;
//   setGoal: (goal: string) => void;
//   handleSubmit: () => void;
// }

// const AddEditPeptideModal: React.FC<AddEditPeptideModalProps> = ({
//   isModalOpen,
//   setIsModalOpen,
//   editingEvent,
//   selectedDate,
//   setSelectedDate,
//   selectedPeptide,
//   setSelectedPeptide,
//   dosage,
//   setDosage,
//   goal,
//   setGoal,
//   handleSubmit,
// }) => {
//   const [pickerValue, setPickerValue] = useState<Dayjs>(dayjs());
//   // sync header/month view with selectedDate (or today if none)
//   useEffect(() => {
//     if (selectedDate) {
//       setPickerValue(dayjs(selectedDate));
//     } else {
//       setPickerValue(dayjs());
//     }
//   }, [selectedDate]);

//   const [isCalendarOpen, setIsCalendarOpen] = useState(false);

//   // Fixed: Disable future dates
//   const disabledDate = (current: Dayjs) => {
//     return current.isAfter(dayjs().endOf("day"));
//   };

//   // Fixed: Calculate next month disable status
//   const isNextMonthDisabled = pickerValue
//     .add(1, "month")
//     .isAfter(dayjs().endOf("month"), "month");

//   // Compute years dynamically
//   const years = Array.from({ length: 5 }, (_, i) => pickerValue.year() - 4 + i);

//   const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
//     const newYear = parseInt(e.target.value);
//     setPickerValue(pickerValue.year(newYear));
//   };

//   const handlePrevMonthPicker = () => {
//     setPickerValue(pickerValue.subtract(1, "month"));
//   };

//   const handleNextMonthPicker = () => {
//     setPickerValue(pickerValue.add(1, "month"));
//   };

//   const isFormValid =
//     selectedDate &&
//     selectedPeptide &&
//     dosage.trim() !== "" &&
//     goal.trim() !== "";

//   if (!isModalOpen) return null;

//   return (
//     <div className="fixed inset-0 z-50 bg-black/20 flex items-center justify-center">
//       <div className="bg-white rounded-[16px] p-6 w-[496px] max-sm:w-[300px] relative overflow-y-auto">
//         <div className="flex items-center justify-between mb-6">
//           <h2 className="txt-32 font-semibold text-[#25292A] mb-4">
//             {editingEvent ? "Edit Peptide" : "Add Peptide"}
//           </h2>
//           <div
//             className="bg-[#D8DFE0] rounded-full p-2 cursor-pointer"
//             onClick={() => setIsModalOpen(false)}
//           >
//             <RxCross2 className="text-[#9EA9AA] font-extrabold" />
//           </div>
//         </div>

//         <div className="flex flex-col gap-4 mb-6">
//           <div className="flex flex-col gap-6">
//             <div className="relative">
//               <p>Date</p>
//               {/* <DatePicker
//                 open={isCalendarOpen}
//                 onOpenChange={setIsCalendarOpen}
//                 placement="topRight"
//                 picker="date"
//                 //   value={pickerValue}
//                 value={selectedDate ? dayjs(selectedDate) : null} // shows nothing if null
//                 onChange={(date) => {
//                   if (date) {
//                     setSelectedDate(date.format("YYYY-MM-DD"));
//                     setPickerValue(date); // Update calendar view and selection
//                     setIsCalendarOpen(false); // Close on final selection
//                   } else {
//                     // user clicked “×” to clear
//                     setSelectedDate(null);
//                     // useEffect will fire and reset pickerValue → today
//                   }
//                 }}
//                 className="w-full h-auto 2xl:w-[448px]  min-h-[48px] !bg-[#F2F5F6] rounded-md px-3 py-2"
//                 rootClassName="custom-datepicker-input"
//                 suffixIcon={
//                   <Image
//                     src="/Dashboard/dosage-tracking/calendarIcon.svg"
//                     alt="calendar"
//                     width={24}
//                     height={24}
//                     className="cursor-pointer"
//                   />
//                 }
//                 popupClassName="custom-datepicker-dropdown no-header-datepicker"
//                 inputReadOnly
//                 disabledDate={disabledDate}
//                 panelRender={(panelNode) => (
//                   <div className="custom-panel-container">
//                     <div className="flex justify-between items-center px-6 py-3 text-[#626D6F] font-medium">
//                       <div className="flex items-center gap-1 relative">
//                         <span className="txt-16">
//                           {pickerValue.format("MMMM")}
//                         </span>
//                         <div className="relative flex items-center">
//                           <select
//                             value={pickerValue.year()}
//                             onChange={(e) =>
//                               setPickerValue(
//                                 pickerValue.year(Number(e.target.value))
//                               )
//                             }
//                             className="bg-transparent border-none txt-16 focus:outline-none focus:ring-0 appearance-none pr-6"
//                           >
//                             {years.map((year) => (
//                               <option key={year} value={year}>
//                                 {year}
//                               </option>
//                             ))}
//                           </select>
//                           <IoMdArrowDropdown
//                             className="absolute right-0 pointer-events-none text-[#626D6F]"
//                             size={16}
//                           />
//                         </div>
//                       </div>
//                       <div className="flex gap-2">
//                         <button
//                           onClick={(e) => {
//                             e.stopPropagation();
//                             setPickerValue(pickerValue.subtract(1, "month"));
//                           }}
//                           className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100"
//                         >
//                           <MdKeyboardArrowLeft size={24} />
//                         </button>
//                         <button
//                           onClick={(e) => {
//                             e.stopPropagation();
//                             if (!isNextMonthDisabled) {
//                               setPickerValue(pickerValue.add(1, "month"));
//                             }
//                           }}
//                           disabled={isNextMonthDisabled}
//                           className={`w-8 h-8 flex items-center justify-center rounded-full ${
//                             isNextMonthDisabled
//                               ? "opacity-50 cursor-not-allowed"
//                               : "hover:bg-gray-100"
//                           }`}
//                         >
//                           <MdKeyboardArrowRight
//                             size={24}
//                             className={
//                               isNextMonthDisabled ? "text-gray-400" : ""
//                             }
//                           />
//                         </button>
//                       </div>
//                     </div>
//                     {panelNode}
//                   </div>
//                 )}
//               /> */}
//               <DatePicker
//   open={isCalendarOpen}
//   onOpenChange={setIsCalendarOpen}
//   placement="topRight"
//   picker="date"
//   value={pickerValue}
//   onChange={(date) => {
//     if (date) {
//       setSelectedDate(date.format("YYYY-MM-DD"));
//       setPickerValue(date); // Update calendar view and selection
//       setIsCalendarOpen(false); // Close on final selection
//     }
//   }}
//   className="w-full h-auto 2xl:w-[448px] xl:h-[48px] !bg-[#F2F5F6] rounded-md px-3 py-2"
//   rootClassName="custom-datepicker-input"
//   suffixIcon={
//     <Image
//       src="/Dashboard/dosage-tracking/calendarIcon.svg"
//       alt="calendar"
//       width={24}
//       height={24}
//       className="cursor-pointer"
//     />
//   }
//   popupClassName="custom-datepicker-dropdown no-header-datepicker"
//   inputReadOnly
//   disabledDate={disabledDate}
//   panelRender={(panelNode) => (
//     <div className="custom-panel-container">
//       <div className="flex justify-between items-center px-6 py-3 text-[#626D6F] font-medium">
//         <div className="flex items-center gap-1 relative">
//           <span className="txt-16">{pickerValue.format("MMMM")}</span>
//           <div className="relative flex items-center">
//             <select
//               value={pickerValue.year()}
//               onChange={(e) =>
//                 setPickerValue(pickerValue.year(Number(e.target.value)))
//               }
//               className="bg-transparent border-none txt-16 focus:outline-none focus:ring-0 appearance-none pr-6"
//             >
//               {years.map((year) => (
//                 <option key={year} value={year}>
//                   {year}
//                 </option>
//               ))}
//             </select>
//             <IoMdArrowDropdown
//               className="absolute right-0 pointer-events-none text-[#626D6F]"
//               size={16}
//             />
//           </div>
//         </div>
//         <div className="flex gap-2">
//           <button
//             onClick={(e) => {
//               e.stopPropagation();
//               setPickerValue(pickerValue.subtract(1, "month"));
//             }}
//             className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100"
//           >
//             <MdKeyboardArrowLeft size={24} />
//           </button>
//           <button
//             onClick={(e) => {
//               e.stopPropagation();
//               if (!isNextMonthDisabled) {
//                 setPickerValue(pickerValue.add(1, "month"));
//               }
//             }}
//             disabled={isNextMonthDisabled}
//             className={`w-8 h-8 flex items-center justify-center rounded-full ${
//               isNextMonthDisabled
//                 ? "opacity-50 cursor-not-allowed"
//                 : "hover:bg-gray-100"
//             }`}
//           >
//             <MdKeyboardArrowRight
//               size={24}
//               className={isNextMonthDisabled ? "text-gray-400" : ""}
//             />
//           </button>
//         </div>
//       </div>
//       {panelNode}
//     </div>
//   )}
// />

//             </div>
//           </div>

//           <div className="relative">
//             <p>Peptide</p>
//             <PeptideDropdown
//               selected={selectedPeptide}
//               setSelected={setSelectedPeptide}
//             />
//           </div>

//           <div className="relative">
//             <p>Dosage</p>
//             <div className="relative">
//               <input
//                 type="text"
//                 inputMode="numeric"
//                 pattern="[0-9]*"
//                 placeholder="Enter dosage you have taken"
//                 className="w-full h-auto 2xl:w-[448px] xl:h-[48px] bg-[#F2F5F6] border-none focus:outline-none focus:ring-0 focus:border-transparent font-medium placeholder:font-normal placeholder:text-[#8D9A9B] rounded-md px-4 py-2 pr-12"
//                 value={dosage}
//                 onChange={(e) => {
//                   const value = e.target.value;
//                   if (value === "" || /^\d+$/.test(value)) {
//                     setDosage(value);
//                   }
//                 }}
//               />
//               <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-[#8D9A9B]">
//                 mcg
//               </span>
//             </div>
//           </div>

//           <div className="relative">
//             <p>Goal</p>
//             <textarea
//               placeholder="Write your primary goal"
//               className="w-full 2xl:w-[448px] h-[100px] font-medium placeholder:font-normal bg-[#F2F5F6] border-none focus:outline-none focus:ring-0 focus:border-transparent placeholder:text-[#8D9A9B] rounded-md px-4 py-2 resize-none"
//               value={goal}
//               onChange={(e) => setGoal(e.target.value)}
//             ></textarea>
//           </div>

//           <button
//             className={`txt-18 font-semibold leading-none text-center px-4 py-4 rounded-full w-full ${
//               isFormValid
//                 ? "bg-[#224674] !text-white cursor-pointer"
//                 : "bg-[#D8DFE0] !text-[#8D9A9B] cursor-not-allowed"
//             }`}
//             disabled={!isFormValid}
//             onClick={handleSubmit}
//           >
//             {editingEvent ? "Save" : "Add"}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AddEditPeptideModal;

// AddEditPeptideModal.tsx
import React, { useState, useEffect, useRef } from "react";
import dayjs, { Dayjs } from "dayjs";
import { DatePicker } from "antd";
import Image from "next/image";
import { RxCross2 } from "react-icons/rx";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { IoMdArrowDropdown } from "react-icons/io";
import PeptideDropdown from "../PeptideDropDown/PeptideDropDown";
import type { PeptideOption } from "../PeptideDropDown/PeptideDropDown";
import type { CalendarEvent } from "@/app/Dashboard/dosage-tracking/calender/page";

import "./AddEditPeptideModal.css";

interface AddEditPeptideModalProps {
  isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
  editingEvent: CalendarEvent | null;
  selectedDate: string | null;
  setSelectedDate: (date: string | null) => void;
  selectedPeptide: PeptideOption | null;
  setSelectedPeptide: (peptide: PeptideOption | null) => void;
  dosage: string;
  setDosage: (dosage: string) => void;
  goal: string;
  setGoal: (goal: string) => void;
  handleSubmit: () => void;
}

const AddEditPeptideModal: React.FC<AddEditPeptideModalProps> = ({
  isModalOpen,
  setIsModalOpen,
  editingEvent,
  selectedDate,
  setSelectedDate,
  selectedPeptide,
  setSelectedPeptide,
  dosage,
  setDosage,
  goal,
  setGoal,
  handleSubmit,
}) => {
  const [pickerValue, setPickerValue] = useState<Dayjs>(dayjs());
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const calendarRef = useRef<HTMLDivElement>(null);

  // Sync header/month view with selectedDate
  useEffect(() => {
    if (selectedDate) {
      setPickerValue(dayjs(selectedDate));
    } else {
      setPickerValue(dayjs());
    }
  }, [selectedDate]);

  // Disable future dates
  const disabledDate = (current: Dayjs) => {
    return current.isAfter(dayjs().endOf("day"));
  };

  // Calculate next month disable status
  const isNextMonthDisabled = pickerValue
    .add(1, "month")
    .isAfter(dayjs().endOf("month"), "month");

  // Compute years dynamically
  const years = Array.from({ length: 5 }, (_, i) => pickerValue.year() - 4 + i);

  const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newYear = parseInt(e.target.value);
    setPickerValue(pickerValue.year(newYear));
  };

  const handlePrevMonthPicker = () => {
    setPickerValue(pickerValue.subtract(1, "month"));
  };

  const handleNextMonthPicker = () => {
    setPickerValue(pickerValue.add(1, "month"));
  };

  // Calculate weeks in current month
  //   const getWeeksInMonth = () => {
  //     const start = pickerValue.startOf('month');
  //     const end = pickerValue.endOf('month');
  //     return Math.ceil(end.diff(start, 'days') / 7) +
  //            (start.day() === 0 ? 0 : 1);
  //   };
  const getWeeksInMonth = () => {
    const firstDay = pickerValue.startOf("month");
    const lastDay = pickerValue.endOf("month");

    // Get starting weekday (0=Sunday, 6=Saturday)
    const firstDayOfWeek = firstDay.day();

    // Get total days in month
    const daysInMonth = lastDay.date();

    // Calculate visible days from previous month
    const daysFromPrevMonth = firstDayOfWeek;

    // Total cells needed in calendar
    const totalCells = daysInMonth + daysFromPrevMonth;

    // Return number of weeks (rows)
    return Math.ceil(totalCells / 7);
  };

  // Update calendar height based on weeks
  const updateCalendarHeight = () => {
    if (!calendarRef.current) return;

    const weeks = getWeeksInMonth();
    const baseHeight = 344; // Base height for 5 weeks
    const rowHeight = 50; // Approx height per week row

    // Calculate new height
    const newHeight =
      weeks > 5 ? baseHeight + (weeks - 5) * rowHeight : baseHeight;

    // Apply to calendar popup
    calendarRef.current.style.height = `${newHeight}px`;
    calendarRef.current.style.minHeight = `${newHeight}px`;
  };

  // Update height when month changes or calendar opens
  useEffect(() => {
    if (isCalendarOpen) {
      // Small delay to allow DOM update
      setTimeout(updateCalendarHeight, 10);
    }
  }, [pickerValue, isCalendarOpen]);

  const isFormValid =
    selectedDate &&
    selectedPeptide &&
    dosage.trim() !== "" &&
    goal.trim() !== "";

  if (!isModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/20 flex items-center justify-center">
      <div className="bg-white rounded-[16px] p-6 w-[496px] max-sm:w-[300px] relative overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="txt-32 font-semibold text-[#25292A] mb-4">
            {editingEvent ? "Edit Peptide" : "Add Peptide"}
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
              {/* <DatePicker
                open={isCalendarOpen}
                onOpenChange={(open) => {
                  setIsCalendarOpen(open);
                  if (open) setTimeout(updateCalendarHeight, 50);
                }}
                placement="topRight"
                picker="date"
                value={pickerValue}
                onChange={(date) => {
                  if (date) {
                    setSelectedDate(date.format("YYYY-MM-DD"));
                    setPickerValue(date);
                    setIsCalendarOpen(false);
                  } else {
                    setSelectedDate(null); // input will be cleared
                  }
                }}
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
                disabledDate={disabledDate}
                panelRender={(panelNode) => (
                  <div className="custom-panel-container" ref={calendarRef}>
                    <div className="flex justify-between items-center px-6 py-3 text-[#626D6F] font-medium">
                      <div className="flex items-center gap-1 relative">
                        <span className="txt-16">
                          {pickerValue.format("MMMM")}
                        </span>
                        <div className="relative flex items-center">
                          <select
                            value={pickerValue.year()}
                            onChange={(e) =>
                              setPickerValue(
                                pickerValue.year(Number(e.target.value))
                              )
                            }
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
                          onClick={(e) => {
                            e.stopPropagation();
                            setPickerValue(pickerValue.subtract(1, "month"));
                          }}
                          className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100"
                        >
                          <MdKeyboardArrowLeft size={24} />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            if (!isNextMonthDisabled) {
                              setPickerValue(pickerValue.add(1, "month"));
                            }
                          }}
                          disabled={isNextMonthDisabled}
                          className={`w-8 h-8 flex items-center justify-center rounded-full ${
                            isNextMonthDisabled
                              ? "opacity-50 cursor-not-allowed"
                              : "hover:bg-gray-100"
                          }`}
                        >
                          <MdKeyboardArrowRight
                            size={24}
                            className={
                              isNextMonthDisabled ? "text-gray-400" : ""
                            }
                          />
                        </button>
                      </div>
                    </div>
                    {panelNode}
                  </div>
                )}
              /> */}
              <DatePicker
  allowClear
  open={isCalendarOpen}
  onOpenChange={(open) => {
    setIsCalendarOpen(open);
    if (open) setTimeout(updateCalendarHeight, 50);
  }}
  placement="topRight"
  picker="date"

  // 🚩 Use pickerValue so the panel (grid + header) always follows your state
  value={pickerValue}

  // 🚩 But only show text in input when you actually have a selectedDate
  format={(val) =>
    val && selectedDate ? val.format("YYYY-MM-DD") : ""
  }

  onChange={(date) => {
    if (date) {
      // user picked something
      setSelectedDate(date.format("YYYY-MM-DD"));
      setPickerValue(date);
      setIsCalendarOpen(false);
    } else {
      // user cleared
      setSelectedDate(null);
      setPickerValue(dayjs());  // reset panel back to today
    }
  }}

  defaultPickerValue={dayjs()}    // on very first open, show current month
  inputReadOnly
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
  disabledDate={disabledDate}

  panelRender={(panelNode) => (
    <div className="custom-panel-container" ref={calendarRef}>
      {/* your custom header */}
      <div className="flex justify-between items-center px-6 py-3 text-[#626D6F] font-medium">
        <div className="flex items-center gap-1 relative">
          <span className="txt-16">{pickerValue.format("MMMM")}</span>
          <div className="relative flex items-center">
            <select
              value={pickerValue.year()}
              onChange={(e) =>
                setPickerValue(pickerValue.year(Number(e.target.value)))
              }
              className="bg-transparent border-none txt-16 focus:outline-none focus:ring-0 appearance-none pr-6"
            >
              {years.map((y) => (
                <option key={y} value={y}>{y}</option>
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
            onClick={(e) => {
              e.stopPropagation();
              setPickerValue(pickerValue.subtract(1, "month"));
            }}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100"
          >
            <MdKeyboardArrowLeft size={24} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              if (!isNextMonthDisabled)
                setPickerValue(pickerValue.add(1, "month"));
            }}
            disabled={isNextMonthDisabled}
            className={`w-8 h-8 flex items-center justify-center rounded-full ${
              isNextMonthDisabled
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-gray-100"
            }`}
          >
            <MdKeyboardArrowRight
              size={24}
              className={isNextMonthDisabled ? "text-gray-400" : ""}
            />
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
                  if (value === "" || /^\d+$/.test(value)) {
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
                ? "bg-[#224674] !text-white cursor-pointer"
                : "bg-[#D8DFE0] !text-[#8D9A9B] cursor-not-allowed"
            }`}
            disabled={!isFormValid}
            onClick={handleSubmit}
          >
            {editingEvent ? "Save" : "Add"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddEditPeptideModal;
