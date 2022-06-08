import React from "react";
import moment from "moment";
const WEEK_DAYS_IDS = [0, 1, 2, 3, 4, 5, 6];

const weekDayFormat = "ddd";

export const WeekDays: React.FC = () => {
  return (
    <>
      {WEEK_DAYS_IDS.map((day, i) => {
        return (
          <span key={i}>{moment().weekday(day).format(weekDayFormat)}</span>
        );
      })}
    </>
  );
};
