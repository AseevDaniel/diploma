import React from "react";
import DatePicker from "react-datepicker";
import moment from "moment";
import { Control, Controller } from "react-hook-form";
import { Session, sessionDate } from "../interfaces/Session";
import { DATE_FORMATS } from "../constants/date";
import { Nullable } from "../interfaces/HelperInterfaces";

type SessionDates = "startDate" | "endDate";

interface CustomDatePickerProps {
  name: SessionDates;
  control: Control<Session>;
  onChange?: (value: Nullable<Date>) => void;
}

const TIME_INTERVAL = 15;

export const CustomDatePicker: React.FC<CustomDatePickerProps> = ({
  name,
  control,
  onChange,
}) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <DatePicker
          selected={new Date(field.value || moment().format())}
          onChange={(date) => {
            field.onChange(date);
            onChange?.(date);
          }}
          dateFormat={DATE_FORMATS.DATE_PICKER_DATE_TIME}
          showTimeSelect
          timeFormat={DATE_FORMATS.DEFAULT_TIME}
          timeIntervals={TIME_INTERVAL}
        />
      )}
    />
  );
};
