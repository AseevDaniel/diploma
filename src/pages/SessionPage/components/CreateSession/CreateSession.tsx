import React, { useState } from "react";
import { SubmitHandler, useForm, Controller } from "react-hook-form";
import { Session } from "../../../../interfaces/Session";
import { createSession } from "../../../../services/sessionService";
import { Nullable } from "../../../../interfaces/HelperInterfaces";
import { Loader } from "../../../../components/Loader/Loader";
import { RequestStatuses } from "../../../../interfaces/RequestStatus";
import { useAuth } from "../../../../hooks/useAuth";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import { CustomDatePicker } from "../../../../components/CustomDatePicker";
import "./createSession.scss";

interface CreateSessionProps {
  onCreate: () => void;
}

export const CreateSession: React.FC<CreateSessionProps> = ({ onCreate }) => {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<Session>();
  const { id } = useAuth();
  const [reqStatus, setReqStatus] = useState<Nullable<RequestStatuses>>(null);

  const onStartDateChange = (date: Nullable<Date>) => {
    if (date) setValue("endDate", moment(date).add(1, "hour").format());
  };

  const onSubmit: SubmitHandler<Session> = async (data) => {
    setReqStatus(RequestStatuses.PENDING);
    console.log(data);
    try {
      await createSession({ ...data, isAvailable: true, ownerUid: id! });
      setReqStatus(RequestStatuses.SUCCESS);
      onCreate();
    } catch (err) {
      alert(err);
      setReqStatus(RequestStatuses.FAILED);
    }
  };

  return (
    <form className="createSessionForm" onSubmit={handleSubmit(onSubmit)}>
      {reqStatus === RequestStatuses.PENDING ? (
        <Loader />
      ) : (
        <>
          <div className="field">
            <p>name</p>
            <input {...register("name", { required: true })} />
            {errors.name && <span>This field is required</span>}
            <br />
          </div>

          <div className="field">
            <p>phone</p>
            <input
              defaultValue="0974911716"
              {...register("phone", { required: true })}
            />
            {errors.phone && <span>This field is required</span>}
          </div>

          <div className="field">
            <p>startDate</p>
            <CustomDatePicker
              name="startDate"
              control={control}
              onChange={onStartDateChange}
            />
            {errors.startDate && <span>This field is required</span>}
          </div>

          <div className="field">
            <p>endDate</p>
            <CustomDatePicker name="endDate" control={control} />
            {errors.endDate && <span>This field is required</span>}
          </div>

          <input className="submitButton" type="submit" />
        </>
      )}
    </form>
  );
};
