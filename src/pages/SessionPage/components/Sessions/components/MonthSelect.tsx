import React, { ReactElement } from "react";
import moment, { Moment } from "moment";

interface MonthSelectProps {
  currentDate: Moment;
  setCurrentDate: (date: Moment) => void;
  isDisabled?: boolean;
}

const selectMonthFormat = "MMMM YYYY";

export const MonthSelect: React.FC<MonthSelectProps> = ({
  currentDate,
  setCurrentDate,
  isDisabled,
}) => {
  const moveCurrentMonth = (evt: React.MouseEvent, moveTo: 1 | -1) => {
    const newMonthDate = currentDate.clone().subtract(moveTo, "month");
    setCurrentDate(newMonthDate);
  };

  const createArrowButton = (
    direction: "left" | "right" = "left"
  ): ReactElement => {
    const toRight = direction === "right";

    const isButtonDisabled =
      isDisabled || (currentDate.isSame(moment(), "month") && !toRight);

    return (
      <button
        onClick={(evt) => moveCurrentMonth(evt, toRight ? -1 : 1)}
        className="arrowButton"
        disabled={isButtonDisabled}
        type="button"
      >
        {toRight ? "Next" : "Prev"}
      </button>
    );
  };

  return (
    <>
      {createArrowButton("left")}
      <span>{moment(currentDate).format(selectMonthFormat)}</span>
      {createArrowButton("right")}
    </>
  );
};
