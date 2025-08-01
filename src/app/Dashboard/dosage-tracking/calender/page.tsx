// 15/7/14
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
// import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import "antd/dist/reset.css";
// import { DatePicker } from "antd";
import type { CalendarProps } from "antd";
// import PeptideDropdown from "./PeptideDropDown/PeptideDropDown";
import type { PeptideOption } from "./PeptideDropDown/PeptideDropDown";
import Calendar1 from "./AiFeedbackCalendar/AiFeedbackCalendar";
import AddEditPeptideModal from "./AddEditPeptideModal/AddEditPeptideModal";
import { PiDotsThreeOutline, PiDotsThreeOutlineLight } from "react-icons/pi";

import "./calenderStyle.css";
import { FaCircleCheck, FaSyringe } from "react-icons/fa6";

dayjs.locale("en-gb");
dayjs.extend(updateLocale);
dayjs.updateLocale("en-gb", {
  weekStart: 0,
  weekdaysMin: ["MON", "TUE", "WED", "THUR", "FRI", "SAT", "SUN"],
  weekdaysShort: ["MON", "TUE", "WED", "THUR", "FRI", "SAT", "SUN"],
});

// Define the event type
export interface CalendarEvent {
  date: string;
  peptide: PeptideOption | null;
  dosage: string;
  goal: string;
  id: string; // Added unique ID for each event
  isFDAApproved: boolean; // Added FDA status
  dateValue: string; // Added date value
}

// Type for events grouped by date
type EventsByDate = Record<string, CalendarEvent[]>;

const CalendarPage: React.FC = () => {
  // Add FDA status helper function here (top of component body)
  const getFDAStatus = (tag: string): boolean => tag === "FDA";

  const [currentDate, setCurrentDate] = useState<Dayjs>(
    dayjs().locale("en-gb")
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedPeptide, setSelectedPeptide] = useState<PeptideOption | null>(
    null
  );
  const [dosage, setDosage] = useState<string>("");
  const [goal, setGoal] = useState<string>("");
  const [eventsByDate, setEventsByDate] = useState<EventsByDate>({});
  const popupRef = useRef<HTMLDivElement>(null);
  const calendarRef = useRef<HTMLDivElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);

  const hiddenDateRef = useRef<HTMLInputElement>(null);
  const [isAIModalOpen, setIsAIModalOpen] = useState(false);

  // Drawer state
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [drawerDate, setDrawerDate] = useState<string | null>(null);

  // Edit and delete state
  const [editingEvent, setEditingEvent] = useState<CalendarEvent | null>(null);
  const [deletingEvent, setDeletingEvent] = useState<CalendarEvent | null>(
    null
  );

  // Add this inside CalendarPage component
  const today = dayjs().endOf("day");

  // Disable future dates in calendar
  const disabledDate = (current: Dayjs) => {
    return current > today;
  };

  // Disable next month button when next month is in the future
  const isNextMonthDisabled = currentDate
    .add(1, "month")
    .isAfter(today, "month");

  // Dropdown visibility per card
  const [dropdownVisible, setDropdownVisible] = useState<
    Record<string, boolean>
  >({});

  // Add this right after your state declarations
  useEffect(() => {
    console.log(
      "Current eventsByDate state:",
      JSON.parse(JSON.stringify(eventsByDate))
    );
  }, [eventsByDate]);

  // Close popup when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(e.target as Node)) {
        // Handle popup close if needed
      }

      if (
        isDrawerOpen &&
        drawerRef.current &&
        !drawerRef.current.contains(e.target as Node)
      ) {
        setIsDrawerOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDrawerOpen]);

  const onPanelChange: CalendarProps<Dayjs>["onPanelChange"] = (value) => {
    setCurrentDate(value.locale("en-gb"));
  };

  const handlePrevMonth = () =>
    setCurrentDate((prev) => prev.subtract(1, "month"));
  const handleNextMonth = () => setCurrentDate((prev) => prev.add(1, "month"));

  // Handle form submission with events grouped by date
  const handleAddEvent = () => {
    if (!selectedDate || !selectedPeptide || !dosage.trim() || !goal.trim())
      return;

    // const getFDAStatus = (tag: string): boolean => tag === "FDA";

    const newEvent: CalendarEvent = {
      date: selectedDate,
      peptide: selectedPeptide,
      dosage,
      goal,
      id: Date.now().toString(),
      // isFDAApproved: false,
      isFDAApproved: selectedPeptide
        ? getFDAStatus(selectedPeptide.tag)
        : false,

      dateValue: dayjs(selectedDate).format("YYYY-MM-DD"),
    };

    setEventsByDate((prev) => {
      const existingEvents = prev[selectedDate] || [];
      return {
        ...prev,
        [selectedDate]: [...existingEvents, newEvent],
      };
    });

    // Reset form fields
    setSelectedPeptide(null);
    setDosage("");
    setGoal("");
    setIsModalOpen(false);
  };

  // Handle event update
  const handleUpdateEvent = () => {
    if (
      !editingEvent ||
      !selectedDate ||
      !selectedPeptide ||
      !dosage.trim() ||
      !goal.trim()
    )
      return;

    setEventsByDate((prev) => {
      // Create a copy of the current state
      const newState = { ...prev };

      // Remove the event from its current date
      const oldDate = editingEvent.date;
      if (newState[oldDate]) {
        const updatedOldEvents = newState[oldDate].filter(
          (e) => e.id !== editingEvent.id
        );
        if (updatedOldEvents.length === 0) {
          delete newState[oldDate];
        } else {
          newState[oldDate] = updatedOldEvents;
        }
      }

      // Add the updated event to the new date
      const newDate = selectedDate;
      const updatedEvent = {
        ...editingEvent,
        date: newDate,
        peptide: selectedPeptide,
        dosage,
        goal,
        isFDAApproved: selectedPeptide
          ? getFDAStatus(selectedPeptide.tag)
          : false,
      };
      const newEvents = newState[newDate]
        ? [...newState[newDate], updatedEvent]
        : [updatedEvent];
      newState[newDate] = newEvents;

      return newState;
    });

    // Reset states
    setEditingEvent(null);
    setSelectedPeptide(null);
    setDosage("");
    setGoal("");
    setIsModalOpen(false);
  };

  // Handle event deletion
  const handleDeleteEvent = () => {
    if (!deletingEvent) return;

    setEventsByDate((prev) => {
      const dateEvents = [...(prev[deletingEvent.date] || [])];
      const updatedEvents = dateEvents.filter((e) => e.id !== deletingEvent.id);

      // If no events left for this date, remove the date key
      if (updatedEvents.length === 0) {
        const newState = { ...prev };
        delete newState[deletingEvent.date];
        return newState;
      }

      return {
        ...prev,
        [deletingEvent.date]: updatedEvents,
      };
    });

    setDeletingEvent(null);
    setIsDrawerOpen(false);
  };

  // Open drawer for a specific date
  const openDrawer = (date: string) => {
    setDrawerDate(date);
    setIsDrawerOpen(true);
    setDropdownVisible({}); // Reset all dropdowns when opening
  };

  // Toggle dropdown for a specific card
  const toggleDropdown = (id: string) => {
    setDropdownVisible((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // Setup form for editing an event
  const setupEditForm = (event: CalendarEvent) => {
    setEditingEvent(event);
    setSelectedDate(event.date);
    setSelectedPeptide(event.peptide);
    setDosage(event.dosage);
    setGoal(event.goal);
    setIsModalOpen(true);
    setIsDrawerOpen(false);
  };

  // Setup delete confirmation
  const setupDeleteConfirmation = (event: CalendarEvent) => {
    setDeletingEvent(event);
    setIsDrawerOpen(false);
  };

  // Check if any events exist
  const hasEvents = () => {
    return Object.values(eventsByDate).some((events) => events.length > 0);
  };

  // Render custom content in calendar cells using eventsByDate
  const dateCellRender = (value: Dayjs) => {
    const dateStr = value.format("YYYY-MM-DD");
    const dayEvents = eventsByDate[dateStr] || [];
    const eventsToShow = dayEvents.slice(0, 2);
    const extraEventsCount = dayEvents.length - eventsToShow.length;

    return (
      <div
        className="flex flex-col relative items-start justify-end h-full w-full py-2 gap-1"
        onClick={() => dayEvents.length > 0 && openDrawer(dateStr)}
      >
        <div className="w-full flex flex-col-reverse gap-1 items-start justify-start px-1">
          {eventsToShow.map((event, idx) => (
            <div
              key={idx}
              className="inline-block w-fit bg-[#C8E4FC] rounded-full px-2 py-1 text-xs"
              style={{ fontFamily: "Afacad Flux, Afacad, Inter, sans-serif" }}
            >
              <div className="font-semibold text-[#224674]">
                {event.peptide?.name}
              </div>
            </div>
          ))}
        </div>
        {extraEventsCount > 0 && (
          <span
            className="text-xs text-[#224674] font-medium cursor-pointer"
            style={{ fontFamily: "Afacad Flux, Afacad, Inter, sans-serif" }}
            onClick={(e) => {
              e.stopPropagation();
              openDrawer(dateStr);
            }}
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
            onClick={isNextMonthDisabled ? undefined : handleNextMonth}
            disabled={isNextMonthDisabled}
            className={`w-8 h-8 flex items-center justify-center rounded-full ${
              isNextMonthDisabled ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            <Image
              src={
                isNextMonthDisabled
                  ? "/Dashboard/dosage-tracking/arrow-right.svg"
                  : "/Dashboard/dosage-tracking/arrow-right.svg"
              }
              alt="Next"
              width={32}
              height={32}
            />
          </button>
        </div>
        <div className="flex gap-3 buttonD txt-16">
          <button
            onClick={() => setIsAIModalOpen(true)}
            disabled={!hasEvents()} // Updated to use hasEvents check
            className={`h-10 rounded-3xl px-6 py-2 flex items-center justify-center gap-2 font-semibold transition 
              ${
                !hasEvents()
                  ? "bg-[#D8DFE0] !text-[#9EA9AA] cursor-not-allowed"
                  : "bg-[#E9EDEE] !text-[#224674] hover:bg-[#d0d9db] cursor-pointer"
              }`}
          >
            AI Feedback
          </button>

          <button
            onClick={() => {
              setEditingEvent(null);
              setIsModalOpen(true);
            }}
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
      ref={calendarRef}
    >
      <ConfigProvider locale={enGB}>
        <Calendar
          value={currentDate}
          onPanelChange={onPanelChange}
          headerRender={headerRender}
          cellRender={dateCellRender}
          disabledDate={disabledDate} // Add this prop
        />
      </ConfigProvider>

      {/* Drawer for date details */}
      {isDrawerOpen && (
        <div
          className="fixed inset-0 z-50 flex justify-end"
          style={{ backgroundColor: "rgba(0,0,0,0.3)" }}
        >
          <div
            ref={drawerRef}
            className="h-full w-[390px] max-sm:w-full bg-white shadow-lg overflow-y-auto"
          >
            {/* Drawer header */}
            <div className="flex justify-between items-center p-4  ">
              <h2 className="text-xl font-semibold">
                {drawerDate ? dayjs(drawerDate).format("MMM D, YYYY") : ""}
              </h2>
              <div
                className="bg-[#D8DFE0] rounded-full p-2 cursor-pointer mb-4"
                onClick={() => setIsDrawerOpen(false)}
              >
                <RxCross2 className="text-[#9EA9AA] !font-extrabold w-6 h-6" />
              </div>
            </div>

            {/* Peptide cards */}
            <div className="p-4">
              {drawerDate &&
                eventsByDate[drawerDate]?.map((event) => (
                  <div
                    key={event.id}
                    className="mb-4 border bg-[#F2F5F6] rounded-lg p-4 relative"
                  >
                    <div className="flex flex-wrap justify-between items-start gap-2">
                      {/* Content container */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h3 className="txt-20 font-semibold break-words">
                            {event.peptide?.name}
                          </h3>
                          {/* Three-dot menu */}
                          <div className="relative self-start">
                            <button
                              className="w-8 h-8 flex items-center justify-center bg-white rounded-full"
                              onClick={() => toggleDropdown(event.id)}
                            >
                              <PiDotsThreeOutline size={16} />
                            </button>

                            {/* Dropdown menu */}
                            {dropdownVisible[event.id] && (
                              <div className="absolute right-0 mt-1 w-32 bg-white rounded-md shadow-lg py-1 z-10">
                                <button
                                  className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                                  onClick={() => setupEditForm(event)}
                                >
                                  <Image
                                    src="/Dashboard/dosage-tracking/editRightDrawer.svg"
                                    alt="Edit Icon"
                                    width={24}
                                    height={24}
                                    className="inline mr-2"
                                  />
                                  <span className="txt-18 font-medium">
                                    Edit
                                  </span>
                                </button>
                                <button
                                  className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 text-red-500"
                                  onClick={() => setupDeleteConfirmation(event)}
                                >
                                  <Image
                                    src="/Dashboard/dosage-tracking/deleteRightDrawer.svg"
                                    alt="Edit Icon"
                                    width={24}
                                    height={24}
                                    className="inline mr-2"
                                  />
                                  <span className="txt-18 font-medium">
                                    Delete
                                  </span>
                                </button>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* FDA Status and Date Value */}
                        <div className="flex gap-3 mt-2 items-center">
                          <div className="flex items-center  gap-1">
                            <FaSyringe className=" text-[#224674]" />{" "}
                            <span className="text-[#51595A] txt-14 font-medium">
                              {/* dosage: */}
                              {event.dosage} mcg
                            </span>
                          </div>
                          <div className="flex items-center gap-1">
                            {/* <span className="txt-14 font-medium text-[#5A6B73]"> */}
                            <FaCircleCheck className=" text-[#224674]" />
                            {/* </span> */}
                            <span
                              // className={`txt-14 font-medium ${
                              //   event.isFDAApproved
                              //     ? "text-[#16A34A]" // Green for approved
                              //     : "text-[#EF4444]" // Red for not approved
                              // }`}
                              className="txt-14 font-medium text-[#51595A]"
                            >
                              {event.isFDAApproved ? "FDA" : "Not FDA"}
                            </span>
                          </div>

                          <div className="flex items-center gap-1">
                            <Image
                              src="/Dashboard/dosage-tracking/calendarRightDrawer.svg"
                              alt="Calendar Icon"
                              width={16}
                              height={16}
                              className="text-[#224674]"
                            />
                            <span className="text-sm font-medium text-[#51595A]">
                              {dayjs(event.dateValue).format("MMM D, YYYY")}
                            </span>
                          </div>
                        </div>

                        {/* Dosage and Goal */}
                        <div className="mt-2">
                          {/* <p className="text-gray-600 break-words">
                      Dosage: {event.dosage} mcg
                    </p> */}
                          <p className="text-[#25292A] txt-18 break-words mt-1">
                            {event.goal}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

              {drawerDate &&
                (!eventsByDate[drawerDate] ||
                  eventsByDate[drawerDate].length === 0) && (
                  <div className="text-center py-8 text-gray-500">
                    No peptide data for this date
                  </div>
                )}
            </div>
          </div>
        </div>
      )}

      {/* Delete confirmation modal */}
      {deletingEvent && (
        <div className="fixed inset-0 z-50 bg-black/20 flex items-center justify-center">
          <div className="bg-white flex flex-col justify-between rounded-lg p-6 w-[496px] max-sm:w-[300px] h-[211px] relative">
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="txt-32 font-semibold mb-4">Delete Peptide</h3>
                <div
                  className="bg-[#D8DFE0] rounded-full p-2 cursor-pointer mb-4"
                  onClick={() => setDeletingEvent(null)}
                >
                  <RxCross2 className="text-[#9EA9AA] !font-extrabold w-6 h-6" />
                </div>
              </div>
              <p className="mb-6 txt-18 font-normal text-[#25292A]">
                Are you sure you want to delete this peptide?
              </p>
            </div>
            <div className="flex justify-end gap-3">
              <button
                className="px-4 py-2 "
                onClick={() => setDeletingEvent(null)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-[#224674] !text-white w-[138px] max-md:w-auto h-12 max-md:h-auto rounded-full"
                onClick={handleDeleteEvent}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add/Edit Peptide Modal */}
      <AddEditPeptideModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        editingEvent={editingEvent}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        selectedPeptide={selectedPeptide}
        setSelectedPeptide={setSelectedPeptide}
        dosage={dosage}
        setDosage={setDosage}
        goal={goal}
        setGoal={setGoal}
        handleSubmit={editingEvent ? handleUpdateEvent : handleAddEvent}
      />

      {/* AI Feedback Modal */}
      {isAIModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/20 flex items-center justify-center">
          <div className="bg-white rounded-[16px] p-6 w-[496px] max-sm:w-[300px] h-[555px] max-h-auto relative">
            <div className="flex flex-col items-center justify-between mb-6">
              <div className="flex items-center justify-between w-full">
                <h2 className="txt-32 font-semibold text-[#25292A]">
                  Select a Date
                </h2>
                <div
                  className="bg-[#D8DFE0] rounded-full p-2 cursor-pointer mb-4"
                  onClick={() => setIsAIModalOpen(false)}
                >
                  <RxCross2 className="text-[#9EA9AA] !font-extrabold w-6 h-6" />
                </div>
              </div>
              <Calendar1 />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CalendarPage;
