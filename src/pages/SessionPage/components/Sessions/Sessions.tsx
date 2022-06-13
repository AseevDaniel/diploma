import React, { useEffect, useState } from "react";
import "./sessions.scss";
import {
  CalendarDay,
  generate,
  generateWithRemoteData,
} from "./sessionsService";
import moment, { Moment } from "moment";
import {
  CalendarDayCell,
  MonthSelect,
  TimeslotTags,
  WeekDays,
} from "./components";
import { Session } from "../../../../interfaces/Session";
import { CurrentSession } from "./components/CurrentSession";

interface SessionsProps {
  sessions: Session[];
  currentDate: Moment;
  setCurrentDate: (date: Moment) => void;
}

const isDisabled = false;
// const currentDate = moment();

export const Sessions: React.FC<SessionsProps> = ({
  sessions,
  currentDate,
  setCurrentDate,
}) => {
  const [currentCalendarDay, setCurrentCalendarDay] = useState<CalendarDay>();
  const [currentSession, setCurrentSession] = useState<Session>();
  const calendar = sessions.length
    ? generateWithRemoteData(currentDate, sessions)
    : generate(currentDate);

  const setDate = (day: CalendarDay) => {
    console.log(day);
    setCurrentCalendarDay(day);
    setCurrentDate(moment(day.value));
  };

  useEffect(() => {
    console.log(currentSession);
  }, [currentSession]);

  useEffect(() => {
    setCurrentSession(undefined);
  }, [currentDate]);

  return (
    <div className="timeslotSelector">
      <div className="calendar">
        <div className="calendar__monthSelect">
          <MonthSelect
            currentDate={currentDate}
            setCurrentDate={setCurrentDate}
            isDisabled={isDisabled}
          />
        </div>
        <div className="calendar__head calendar__grid">{<WeekDays />}</div>

        <div className="calendar__body calendar__grid">
          {calendar?.map((day, i) => {
            return (
              <CalendarDayCell
                isDisabled={isDisabled}
                isWithAvailable={true}
                key={i}
                day={day}
                setDate={setDate}
              />
            );
          })}
        </div>
      </div>

      <div className="slots">
        <TimeslotTags
          isDisabled={isDisabled}
          currentSession={currentSession}
          setCurrentSession={setCurrentSession}
          timeslots={currentCalendarDay?.timeslots}
          isOnlyFreeSlots={false}
          setIsOnlyFreeSlots={() => {}}
        />

        {currentSession && <CurrentSession session={currentSession} />}
      </div>
    </div>
  );
};
