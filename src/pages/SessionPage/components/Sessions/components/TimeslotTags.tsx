import React from "react";
import moment from "moment";
import classNames from "classnames";
import { Session } from "../../../../../interfaces/Session";
import "./timeslotsTags.scss";

interface TimeslotTagsProps {
  currentSession?: Session;
  setCurrentSession?: (timeslot: Session) => void;
  isOnlyFreeSlots: boolean;
  setIsOnlyFreeSlots: React.Dispatch<React.SetStateAction<boolean>>;
  timeslots?: Session[];
  isDisabled?: boolean;
  tagsPerTimeslot?: number;
}

const timeFormat = "H:mm";

export const TimeslotTags: React.FC<TimeslotTagsProps> = ({
  timeslots,
  currentSession,
  setCurrentSession,
  isDisabled,
}) => {
  console.log(timeslots);
  const filteredTimeslots = timeslots?.sort((a, b) =>
    moment(a.startDate).diff(moment(b.startDate))
  );

  const getTime = (timeslot: Session) => {
    const start = moment(timeslot.startDate).format(timeFormat);
    const end = moment(timeslot.endDate).format(timeFormat);

    return `${start} - ${end}`;
  };

  const getClassNames = (
    timeslot: Session,
    index: number,
    allLength?: number
  ) => {
    const isItemSelected = timeslot.startDate === currentSession?.startDate;
    const isItemDisabled = isDisabled;

    return classNames("timeslots__item", {
      "timeslots__item--disabled": isItemDisabled,
      "timeslots__item--selected": isItemSelected,
      "timeslots__item--unavailable": !timeslot.isAvailable,
    });
  };

  return (
    <div className="timeslotsWrapper">
      {filteredTimeslots?.length ? (
        <div className="timeslots">
          {filteredTimeslots?.map((timeslot, index) => {
            return (
              <div
                key={getTime(timeslot)}
                onClick={() => setCurrentSession?.(timeslot)}
                className={getClassNames(
                  timeslot,
                  index,
                  filteredTimeslots.length
                )}
              >
                <span>{getTime(timeslot)}</span>
              </div>
            );
          })}
        </div>
      ) : null}
    </div>
  );
};
