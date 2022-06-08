import moment from "moment";
import { DATE_FORMATS } from "../constants/date";

export const getDefaultDate = (isEnd = false) => {
  return moment()
    .add(isEnd ? 2 : 1, "hour")
    .format(DATE_FORMATS.DEFAULT_DATE_TIME);
};
