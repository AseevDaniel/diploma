import moment, { Moment } from "moment";
import { DATE_FORMATS } from "../constants/date";

export const convertDateToDefaultFormat = (
  date: Moment | string | Date,
  format = DATE_FORMATS.DEFAULT_DATE_TIME
) => {
  console.log(date);
  console.log(moment(date).format(format));
  return moment(date).format(format);
};
