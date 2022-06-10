import React, { useContext, useEffect, useState } from "react";
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
import { getUserData } from "../../../../services/userService";
import { UserWithData } from "../../../../interfaces/User";
import { AuthContext } from "../../../../App";

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
  const user = useContext(AuthContext);
  const [reqStatus, setReqStatus] = useState<Nullable<RequestStatuses>>(null);

  const onStartDateChange = (date: Nullable<Date>) => {
    if (date) setValue("endDate", moment(date).add(1, "hour").format());
  };

  const onSubmit: SubmitHandler<Session> = async (data) => {
    setReqStatus(RequestStatuses.PENDING);
    console.log(data);
    try {
      await createSession({ ...data, isAvailable: true, ownerUid: user?.uid! });
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
            <p>Start of session</p>
            <CustomDatePicker
              name="startDate"
              control={control}
              onChange={onStartDateChange}
            />
            {errors.startDate && <span>This field is required</span>}
          </div>

          <div className="field">
            <p>End os session</p>
            <CustomDatePicker name="endDate" control={control} />
            {errors.endDate && <span>This field is required</span>}
          </div>

          <input className="submitButton" type="submit" />
        </>
      )}
    </form>
  );
};
