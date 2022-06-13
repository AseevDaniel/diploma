import React from "react";
import DatePicker, { ReactDatePickerProps } from "react-datepicker";
import moment from "moment";
import { Control, Controller } from "react-hook-form";
import { Session, sessionDate } from "../interfaces/Session";
import { DATE_FORMATS } from "../constants/date";
import { Nullable } from "../interfaces/HelperInterfaces";

type SessionDates = "startDate" | "endDate";

interface CustomDatePickerProps extends ReactDatePickerProps {
  name: SessionDates;
  control: Control<any>;
  onChangeData?: (value: Nullable<Date>) => void;
  defaultValue?: string;
}

const TIME_INTERVAL = 15;

export const CustomDatePicker: React.FC<CustomDatePickerProps> = ({
  name,
  control,
  onChangeData,
  defaultValue = moment(),
  ...otherProps
}) => {
  return (
    <Controller
      name={name}
      defaultValue={defaultValue}
      control={control}
      render={({ field }) => (
        <DatePicker
          dateFormat={DATE_FORMATS.DATE_PICKER_DATE_TIME}
          showTimeSelect
          timeFormat={DATE_FORMATS.DEFAULT_TIME}
          timeIntervals={TIME_INTERVAL}
          {...otherProps}
          selected={
            new Date(
              field.value ||
                moment(defaultValue).format(DATE_FORMATS.DEFAULT_DATE_TIME)
            )
          }
          onChange={(date) => {
            field.onChange(date);
            onChangeData?.(date);
          }}
        />
      )}
    />
  );
};
