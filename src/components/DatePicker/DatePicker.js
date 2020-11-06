import React, { useState, useRef } from "react";
import classes from "./DatePicker.module.scss";
import Calendar from "./Calendar";

const DatePicker = (props) => {
  const date = new Date();
  const inputRef = useRef(null);
  const [show, setShow] = useState(false);
  const [day, setDay] = useState(todayTimestamp);
  const [month, setMonth] = useState(date.getMonth());
  const [year, setYear] = useState(date.getFullYear());
  const [monthDetail, setMonthDetail] = useState(getMonthDetails(month, year));

  const isSelectedDay = (selectedDay) => {
    return selectedDay.timestamp === day;
  };

  const setDate = (dateData) => {
    let selectedDay = new Date(
      dateData.year,
      dateData.month - 1,
      dateData.date
    ).getTime();

    setDay(selectedDay);

    if (props.onChange) {
      props.onChange(selectedDay);
    }
  };

  const updateDateFromInput = () => {
    let dateValue = inputRef.current.value;
    let dateData = getDateFromDateString(dateValue);
    if (dateData !== null) {
      setDate(dateData);
      setYear(dateData.year);
      setMonth(dateData.month - 1);
      setMonthDetail(getMonthDetails(dateData.year, dateData.month - 1));
    }
  };

  const setDateToInput = (timestamp) => {
    let dateString = getDateStringFromTimestamp(timestamp);
    inputRef.current.value = dateString;
  };

  const onDateClick = (day) => {
    setDay(day.timestamp);
    setDateToInput(day.timestamp);
    if (props.onChange) {
      props.onChange(day.timestamp);
    }
  };

  const setCurrentYear = (offset) => {
    let y = year + offset;
    let m = month;
    setYear(y);
    setMonthDetail(getMonthDetails(y, m));
  };

  const setCurrentMonth = (offset) => {
    let y = year;
    let m = month + offset;
    if (m === -1) {
      m = 11;
      y--;
    } else if (m === 12) {
      m = 0;
      y++;
    }
    setYear(y);
    setMonth(m);
    setMonthDetail(getMonthDetails(y, m));
  };

  return (
    <div className={classes.DatePicker}>
      <div className={classes.DatePickerInput} onClick={() => setShow(!show)}>
        <input type="date" ref={inputRef} onChange={updateDateFromInput} />
      </div>
      {show ? (
        <div className={classes.DatePickerContainer}>
          <div className={classes.DatePickerHead}>
            <div className={classes.Button}>
              <div className={classes.Inner} onClick={() => setCurrentYear(-1)}>
                <span className={classes.LeftArrows}></span>
              </div>
            </div>
            <div className={classes.Button}>
              <div
                className={classes.Inner}
                onClick={() => setCurrentMonth(-1)}
              >
                <span className={classes.LeftArrow}></span>
              </div>
            </div>
            <div className={classes.HContainer}>
              <div className={classes.Year}>{year}</div>
              <div className={classes.Month}>{getMonthStr(month)}</div>
            </div>
            <div className={classes.Button}>
              <div className={classes.Inner} onClick={() => setCurrentMonth(1)}>
                <span className={classes.RightArrow}></span>
              </div>
            </div>
            <div className={classes.Button}>
              <div className={classes.Inner} onClick={() => setCurrentYear(1)}>
                <span className={classes.RightArrows}></span>
              </div>
            </div>
          </div>
          <div className={classes.DatePickerBody}>
            <Calendar
              monthDetails={monthDetail}
              isSelectedDay={isSelectedDay}
              onDateClick={onDateClick}
            />
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default DatePicker;

let oneDay = 60 * 60 * 60 * 24 * 1000;

let todayTimestamp = Date.now();
//   Date.now() -
//   (Date.now() % oneDay) +
//   new Date().getTimezoneOffset() * 1000 * 60;

const daysMap = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const monthMap = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

//Date Picker API
const getNumberOfDays = (year, month) => {
  return 40 - new Date(year, month, 40).getDate();
};

const getDayDetails = (args) => {
  let date = args.index - args.firstDay;
  let day = args.index % 7;
  let prevMonth = args.month - 1;
  let prevYear = args.year;
  if (prevMonth < 0) {
    prevMonth = 11;
    prevYear--;
  }
  let prevMonthNumberOfDays = getNumberOfDays(prevYear, prevMonth);
  let _date =
    (date < 0 ? prevMonthNumberOfDays + date : date % args.numberOfDays) + 1;
  let month = date < 0 ? -1 : date >= args.numberOfDays ? 1 : 0;
  let timestamp = new Date(args.year, args.month, _date).getTime();
  return {
    date: _date,
    day,
    month,
    timestamp,
    dayString: daysMap[day],
  };
};

const getMonthDetails = (year, month) => {
  let firstDay = new Date(year, month).getDay();
  let numberOfDays = getNumberOfDays(year, month);
  let monthArray = [];
  let rows = 6;
  let currentDay = null;
  let index = 0;
  let cols = 7;

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      currentDay = getDayDetails({
        index,
        numberOfDays,
        firstDay,
        year,
        month,
      });
      monthArray.push(currentDay);
      index++;
    }
  }
  return monthArray;
};

const getDateFromDateString = (dateValue) => {
  let dateData = dateValue.split("-").map((d) => parseInt(d, 10));
  if (dateData.length < 3) return null;
  let year = dateData[0];
  let month = dateData[1];
  let date = dateData[2];
  return { year, month, date };
};

const getMonthStr = (month) =>
  monthMap[Math.max(Math.min(11, month), 0)] || "Month";

const getDateStringFromTimestamp = (timestamp) => {
  let dateObject = new Date(timestamp);
  let month = dateObject.getMonth() + 1;
  let date = dateObject.getDate();
  return (
    dateObject.getFullYear() +
    "-" +
    (month < 10 ? "0" + month : month) +
    "-" +
    (date < 10 ? "0" + date : date)
  );
};
