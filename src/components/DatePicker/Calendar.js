import React from "react";
import classes from "./Calendar.module.scss";

const Calendar = ({ monthDetails, isSelectedDay, onDateClick }) => {
  let days = monthDetails.map((day, index) => {
    return (
      <div
        className={
          `${classes.DayContainer} ` +
          (day.month !== 0 ? ` ${classes.Disabled}` : "") +
          (isCurrentDay(day) ? ` ${classes.Highlight}` : "") +
          (isSelectedDay(day) ? ` ${classes.HighlightGreen}` : "")
        }
        key={index}
      >
        <div className={classes.Day}>
          <span onClick={() => onDateClick(day)}>{day.date}</span>
        </div>
      </div>
    );
  });
  return (
    <div className={classes.Container}>
      <div className={classes.Head}>
        {["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"].map((d, i) => (
          <div key={i} className={classes.Name}>
            {d}
          </div>
        ))}
      </div>
      <div className={classes.Body}>{days}</div>
    </div>
  );
};

export default Calendar;

let oneDay = 60 * 60 * 24 * 1000;

let todayTimestamp =
  Date.now() -
  (Date.now() % oneDay) +
  new Date().getTimezoneOffset() * 1000 * 60;

const isCurrentDay = (day) => day.timestamp === todayTimestamp;
