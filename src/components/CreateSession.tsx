import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Session } from "../interfaces/Session";
import { createSession } from "../services/sessionService";
import { Nullable } from "../interfaces/HelperInterfaces";
import { Loader } from "./Loader/Loader";
import { RequestStatuses } from "../interfaces/RequestStatus";
import { getDefaultDate } from "../helpers/sessionHelper";
import { useAuth } from "../hooks/useAuth";

interface CreateSessionProps {
  onCreate: () => void;
}

export const CreateSession: React.FC<CreateSessionProps> = ({ onCreate }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Session>();
  const { id } = useAuth();
  const [reqStatus, setReqStatus] = useState<Nullable<RequestStatuses>>(null);

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
    <form onSubmit={handleSubmit(onSubmit)}>
      {reqStatus === RequestStatuses.PENDING ? (
        <Loader />
      ) : (
        <>
          <p>name</p>
          <input {...register("name", { required: true })} />
          {errors.name && <span>This field is required</span>}
          <br />

          <p>phone</p>
          <input
            defaultValue="0974911716"
            {...register("phone", { required: true })}
          />
          {errors.phone && <span>This field is required</span>}
          <br />

          <p>startDate</p>
          <input
            defaultValue={getDefaultDate()}
            {...register("startDate", { required: true })}
          />
          {errors.startDate && <span>This field is required</span>}
          <br />

          <p>endDate</p>
          <input
            defaultValue={getDefaultDate(true)}
            {...register("endDate", { required: true })}
          />

          {errors.endDate && <span>This field is required</span>}
          <br />
          <input type="submit" />
        </>
      )}
    </form>
  );
};
