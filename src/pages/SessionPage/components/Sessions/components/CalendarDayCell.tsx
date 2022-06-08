import React from "react";
import classNames from "classnames";
import { CalendarDay } from "../sessionsService";

interface CalendarDayCellProps {
  day: CalendarDay;
  setDate: (day: CalendarDay) => void;
  isWithAvailable?: boolean;
  isDisabled?: boolean;
}

const dayFormat = "D";

export const CalendarDayCell: React.FC<CalendarDayCellProps> = ({
  day,
  setDate,
  isWithAvailable,
  isDisabled,
}) => {
  const isUnavailable =
    !day.timeslots?.length && !day.disabled && isWithAvailable;

  const getDayClasses = () => {
    return classNames("calendar__day", {
      "calendar__day--active": day.active,
      "calendar__day--selected": day.selected,
      "calendar__day--disabled": day.disabled,
      "calendar__day--unavailable": isUnavailable,
      "calendar__day--pastDate": day.past,
      "calendar__day--allDisabled": isDisabled,
    });
  };

  const additionalText = (day: CalendarDay) => {
    if (day.disabled || !isWithAvailable || day.past) return;

    if (!day.timeslots?.length)
      return (
        <>
          {/*<div className="unavailableIcon">*/}
          {/*  <i className="icon icon-day-off-icon" />*/}
          {/*</div>*/}
          <p>Day off</p>
        </>
      );

    if (day.timeslots.every((timeslot) => !timeslot.isAvailable))
      return <p>No available</p>;
  };

  return (
    <div onClick={() => setDate(day)} className={getDayClasses()}>
      <span>{day.value.format(dayFormat)}</span>
      {additionalText(day)}
    </div>
  );
};
