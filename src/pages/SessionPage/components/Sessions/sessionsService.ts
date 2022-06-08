import moment, { Moment } from "moment";
import { Session } from "../../../../interfaces/Session";

export interface CalendarDay {
  value: Moment;
  active: boolean;
  disabled: boolean;
  selected: boolean;
  past: boolean;
  timeslots?: Session[];
}

export const generate = (now: Moment): CalendarDay[] => {
  const startDay = now.clone().startOf("month").startOf("week");
  const endDay = now.clone().endOf("month").endOf("week");

  const date = startDay.clone().subtract(1, "day");

  const calendar: CalendarDay[] = [];

  while (date.isBefore(endDay, "day")) {
    const value = date.add(1, "day").clone();
    const active = moment().isSame(value, "date");
    const disabled = !now.isSame(value, "month");
    const past = value.isBefore(moment(), "day");
    const selected = now.isSame(value, "day");
    calendar.push({
      value,
      active,
      disabled,
      past,
      selected,
    });
  }
  return calendar;
};

export const generateWithRemoteData = (
  now: Moment,
  timeslots: Session[]
): CalendarDay[] => {
  const plainCalendar = generate(now);

  return plainCalendar.map((day) => {
    return {
      ...day,
      timeslots: timeslots.filter((slot) =>
        moment(slot.startDate).isSame(moment(day.value), "date")
      ),
    };
  });
};
