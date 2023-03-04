import { useState } from "react";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";

function Calendar() {
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const [selectedDate, setSelectedDate] = useState(new Date());
  const navigate = useNavigate();

  // function to get the days in a month
  function getDaysInMonth(month, year) {
    return new Date(year, month + 1, 0).getDate();
  }

  // function to get the first day of the month
  function getFirstDayOfMonth(month, year) {
    return new Date(year, month, 1).getDay();
  }

  // function to handle clicking on a date
  function handleDateClick(date) {
    setSelectedDate(date);
  }

  // get the number of days and the first day of the month
  const numDays = getDaysInMonth(
    selectedDate.getMonth(),
    selectedDate.getFullYear()
  );
  const firstDay = getFirstDayOfMonth(
    selectedDate.getMonth(),
    selectedDate.getFullYear()
  );

  // create an array with all the days in the month
  const daysArray = Array.from({ length: numDays }, (_, i) => i + 1);

  return (
    <>
      <div>
        <Navbar />
      </div>
      <div className=" flex flex-col items-center w-screen pt-16 min-h-screen  bg-blue-900 overflow-hidden">
        <div className=" flex justify-between">
          <div className="p-4 text-start">
            <h1 className="text-xl font-bold">
              {selectedDate.toLocaleString("default", {
                month: "long",
                year: "numeric",
              })}
            </h1>
          </div>
          <div className="pt-4 text-end">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="icon icon-tabler icon-tabler-chevron-left"
              width={24}
              height={24}
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <polyline points="15 6 9 12 15 18" />
            </svg>
          </div>
          <div className=" pt-4 text-end">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="icon icon-tabler ml-3 icon-tabler-chevron-right"
              width={24}
              height={24}
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <polyline points="9 6 15 12 9 18" />
            </svg>
          </div>
        </div>
        <div className="grid grid-cols-7 gap-2 xl:pl-10 pl-14 p-4 w-[450px] h-[300px]">
          {days.map((day) => (
            <div
              key={day}
              className="text-sm font-bold text-gray-500 uppercase"
            >
              {day}
            </div>
          ))}
          {Array.from({ length: firstDay }, (_, i) => (
            <div key={i} className="text-sm text-gray-400">
              -
            </div>
          ))}
          {daysArray.map((day) => (
            <div
              key={day}
              className={`text-sm font-bold cursor-pointer ${
                selectedDate.getDate() === day ? "bg-blue-500 text-white" : ""
              }`}
              onClick={() =>
                handleDateClick(
                  new Date(
                    selectedDate.getFullYear(),
                    selectedDate.getMonth(),
                    day
                  )
                )
              }
            >
              {day}
            </div>
          ))}
        </div>
        <div className="flex flex-col pt-10">
          <div className=" flex-row grid grid-cols-2">
            <div>
              <h1>HARI INI</h1>
            </div>
            <div>
              <h1>28 Februari 2023</h1>
            </div>
          </div>
        </div>
        <div className="divider"></div>
        <div className="  flex-row justify-center grid grid-cols-2 gap-5 pr-5 pb-10 pt-10 pl-10 overflow-hidden">
          <button
            className="btn btn-secondary w-[500px] max-w-lg"
            onClick={() => navigate("/Meet")}
          >
            Matematika Wajib
          </button>
          <button
            className="btn btn-secondary w-[500px] max-w-lg"
            onClick={() => navigate("/Meet")}
          >
            Matematika Peminatan
          </button>
          <button
            className="btn btn-secondary w-[500px] max-w-lg"
            onClick={() => navigate("/Meet")}
          >
            Algoritma Pemrograman
          </button>
          <button
            className="btn btn-secondary w-[500px] max-w-lg"
            onClick={() => navigate("/Meet")}
          >
            Perakitan Komputer
          </button>
        </div>
      </div>
    </>
  );
}

export default Calendar;
