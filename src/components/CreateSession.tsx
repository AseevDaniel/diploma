import React, {useState} from "react";
import {SubmitHandler, useForm} from "react-hook-form";
import {Session} from "../interfaces/session";
import {createSession} from "../services/sessionService";
import {Nullable} from "../interfaces/helperInterfaces";
import {RequestStatuses} from "../interfaces/requestStatus";
import {Loader} from "./Loader/Loader";

interface CreateSessionProps {

}

export const CreateSession: React.FC<CreateSessionProps> = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<Session>();

    const [reqStatus, setReqStatus] = useState<Nullable<RequestStatuses>>(null)

    const onSubmit: SubmitHandler<Session> = async (data) => {

        setReqStatus(RequestStatuses.PENDING)
        console.log(data);
        try {
            await createSession(data)
            setReqStatus(RequestStatuses.SUCCESS)
        }
        catch (err){
            alert(err)
            setReqStatus(RequestStatuses.FAILED)
        }
    }


    return (

        <form onSubmit={handleSubmit(onSubmit)}>
            {reqStatus === RequestStatuses.PENDING ? <Loader/> :
            <>
                <p>name</p>
                <input {...register("name", { required: true })} />
                {errors.name && <span>This field is required</span>}
                <br/>

                <p>phone</p>
                <input defaultValue="0974911716" {...register("phone", { required: true })} />
                {errors.phone && <span>This field is required</span>}
                <br/>

                <p>startDate</p>
                <input defaultValue="2022-06-13T12:30:00" {...register("startDate", { required: true })} />
                {errors.startDate && <span>This field is required</span>}
                <br/>

                <p>endDate</p>
                <input defaultValue="2022-06-13T13:00:00" {...register("endDate", { required: true })} />

                {errors.endDate && <span>This field is required</span>}
                <br/>
                <input type="submit" /></>

            }


        </form>
    );
}