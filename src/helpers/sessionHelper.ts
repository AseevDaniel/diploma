import moment from "moment";
import { DATE_FORMATS } from "../constants/date";
import { Session, SessionSchedue } from "../interfaces/Session";

export const getDefaultDate = (isEnd = false) => {
  return moment()
    .add(isEnd ? 2 : 1, "hour")
    .format(DATE_FORMATS.DEFAULT_DATE_TIME);
};

export const getArrayOfSessions = (sessionValue: SessionSchedue): Session[] => {
  console.log(sessionValue);
  let sessions: Session[] = [];
  const { startTime, endTime, duration, ...otherSession } = sessionValue;

  const startDateValue = moment(sessionValue.startDate).format(
    DATE_FORMATS.DEFAULT_DATE
  );

  const startTimeMinutes = getTimeInMinutes(startTime);
  const endTimeMinutes = getTimeInMinutes(endTime);

  const workMinutesPerDay = endTimeMinutes - startTimeMinutes;
  const sessionsPerDay = workMinutesPerDay / duration;

  const daysCount =
    moment(sessionValue.endDate).diff(moment(sessionValue.startDate), "days") +
    1;

  for (let i = 0; i < daysCount; i++) {
    for (let d = 0; d < sessionsPerDay; d++) {
      sessions.push({
        ...otherSession,
        startDate:
          moment(startDateValue)
            .add(i, "day")
            .format(DATE_FORMATS.DEFAULT_DATE) +
          "T" +
          getMinutesInTime(startTimeMinutes + duration * d),
        endDate:
          moment(startDateValue)
            .add(i, "day")
            .format(DATE_FORMATS.DEFAULT_DATE) +
          "T" +
          getMinutesInTime(startTimeMinutes + duration * (d + 1)),
      });
    }
  }

  return sessions;
};

export const getSessionsForToday = (sessions?: Session[]) => {
  if (!sessions) return [];

  return sessions?.filter((session) =>
    moment(session.startDate).isSame(moment(), "day")
  );
};

export const getTimeInMinutes = (time: string) => {
  const hours = Number(time.slice(0, 2));
  const minutes = Number(time.slice(3, 5));

  return hours * 60 + minutes;
};

export const getMinutesInTime = (minutesValue: number): string => {
  let hours = Math.round(minutesValue / 60);
  let minutes = minutesValue % 60;

  let separator = String(minutes).length < 2 ? ":0" : ":";

  return hours + separator + minutes;
};
