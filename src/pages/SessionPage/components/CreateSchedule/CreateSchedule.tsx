import React, { ChangeEvent, useContext, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Session, SessionSchedue } from "../../../../interfaces/Session";
import { AuthContext } from "../../../../App";
import { Nullable } from "../../../../interfaces/HelperInterfaces";
import { RequestStatuses } from "../../../../interfaces/RequestStatus";
import moment from "moment";
import {
  createArraySession,
  createSession,
} from "../../../../services/sessionService";
import { Loader } from "../../../../components/Loader/Loader";
import { CustomDatePicker } from "../../../../components/CustomDatePicker";
import { DATE_FORMATS } from "../../../../constants/date";
import {
  getArrayOfSessions,
  getMinutesInTime,
  getTimeInMinutes,
} from "../../../../helpers/sessionHelper";
import { writeUserData } from "../../../../services/userService";

interface CreateScheduleProps {
  onCreate: () => void;
}

export const CreateSchedule: React.FC<CreateScheduleProps> = ({ onCreate }) => {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
  } = useForm<SessionSchedue>();
  const user = useContext(AuthContext);
  const [reqStatus, setReqStatus] = useState<Nullable<RequestStatuses>>(null);

  const onStartDateChange = (date: Nullable<Date>) => {
    if (date) setValue("endDate", moment(date).add(1, "day").format());
  };

  const onEndDateChange = (date: Nullable<Date>) => {
    const start = moment(getValues("startDate"));

    if (!(moment(date).isAfter(start) || moment(date).isSame(start, "day")))
      setValue("startDate", moment(date).subtract(1, "day").format());
  };

  const onStartTimeChange = (event: ChangeEvent<HTMLInputElement>) => {
    const start = event.target.value;
    const end = getValues("endTime");

    if (getTimeInMinutes(start) >= getTimeInMinutes(end)) {
      setValue("endTime", getMinutesInTime(getTimeInMinutes(start) + 60));
    }
  };

  const oneEndTimeChange = (event: ChangeEvent<HTMLInputElement>) => {
    const end = event.target.value;
    const start = getValues("startTime");

    if (getTimeInMinutes(start) >= getTimeInMinutes(end)) {
      setValue("startTime", getMinutesInTime(getTimeInMinutes(end) - 60));
    }
  };

  const onSubmit: SubmitHandler<SessionSchedue> = async (data) => {
    if (user) {
      setReqStatus(RequestStatuses.PENDING);
      try {
        const sessionSchedule = {
          ...data,
          isAvailable: true,
          ownerUid: user?.uid!,
        };
        const arrayOfSessions = getArrayOfSessions(sessionSchedule);

        await createArraySession(arrayOfSessions);
        await writeUserData({
          ...user,
          sessionsCreated: [
            ...(user?.sessionsCreated || []),
            ...arrayOfSessions,
          ],
        });
        setReqStatus(RequestStatuses.SUCCESS);
        onCreate();
      } catch (err) {
        alert(err);
        setReqStatus(RequestStatuses.FAILED);
      }
    }
  };

  return (
    <form className="createSessionForm" onSubmit={handleSubmit(onSubmit)}>
      {reqStatus === RequestStatuses.PENDING ? (
        <Loader />
      ) : (
        <>
          <div className="field">
            <p>Name</p>
            <input
              defaultValue={user?.name}
              {...register("name", { required: true })}
            />
            {errors.name && <span>This field is required</span>}
            <br />
          </div>

          <div className="field">
            <p>Phone</p>
            <input
              defaultValue={user?.phone}
              {...register("phone", { required: true })}
            />
            {errors.phone && <span>This field is required</span>}
          </div>

          <div className="field">
            <p>Adress</p>
            <input
              defaultValue={user?.address}
              {...register("address", { required: true })}
            />
            {errors.address && <span>This field is required</span>}
          </div>

          <div className="field">
            <p>Start of working day</p>
            <input
              type="time"
              defaultValue={"10:00"}
              {...register("startTime", { required: true })}
              onChange={onStartTimeChange}
            />
            {errors.startTime && <span>This field is required</span>}
          </div>

          <div className="field">
            <p>End of working day</p>
            <input
              type="time"
              defaultValue={"18:00"}
              {...register("endTime", { required: true })}
              onChange={oneEndTimeChange}
            />
            {errors.endTime && <span>This field is required</span>}
          </div>

          <div className="field">
            <p>Session duration (minutes)</p>
            <input
              type="number"
              defaultValue={60}
              {...register("duration", {
                required: {
                  value: true,
                  message: "This field is required",
                },
                min: {
                  value: 30,
                  message: "Min value - 30 minutes",
                },
                max: {
                  value: 180,
                  message: "Max value - 180 minutes",
                },
              })}
            />
            <span>{errors.duration?.message}</span>
          </div>

          <div className="field">
            <p>Start Date</p>
            <CustomDatePicker
              defaultValue={moment()}
              dateFormat={DATE_FORMATS.DATE_FOR_SCHEDULE}
              onChange={() => {}}
              showTimeSelect={false}
              name="startDate"
              control={control}
              onChangeData={onStartDateChange}
            />
            {errors.endDate && <span>This field is required</span>}
          </div>
          <div className="field">
            <p>End Date</p>
            <CustomDatePicker
              defaultValue={moment().add(1, "day")}
              dateFormat={DATE_FORMATS.DATE_FOR_SCHEDULE}
              onChange={() => {}}
              showTimeSelect={false}
              name="endDate"
              control={control}
              onChangeData={onEndDateChange}
            />
            {errors.endDate && <span>This field is required</span>}
          </div>

          <input className="submitButton" type="submit" />
        </>
      )}
    </form>
  );
};
