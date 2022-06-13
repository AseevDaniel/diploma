import moment, { Moment } from "moment";
import { DATE_FORMATS } from "../constants/date";

export const convertDateToDefaultFormat = (
  date: Moment | string | Date,
  format = DATE_FORMATS.DEFAULT_DATE_TIME
) => {
  return moment(date).format(format);
};
