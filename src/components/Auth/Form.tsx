import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { User } from "../../interfaces/User";
import { REG_EXP } from "../../constants/RegExps";

interface FormProps {
  handleClick: (user: User) => void;
  isRegister?: boolean;
}

const Form: React.FC<FormProps> = ({ handleClick, isRegister = false }) => {
  const {
    getValues,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<User>();

  const onSubmit = (data: User) => {
    handleClick(data);
  };
  useEffect(() => {
    console.log(errors);
  }, [errors]);

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <p>Email</p>
        <input
          type="email"
          {...register("email", {
            required: {
              value: true,
              message: "This field is required",
            },
            pattern: {
              value: REG_EXP.email,
              message: "invalid email address",
            },
          })}
        />
        <span>{errors.email?.message}</span>
        <br />

        <p>Password</p>
        <input
          type="password"
          {...register("password", {
            required: {
              value: true,
              message: "This field is required",
            },
            minLength: {
              value: 6,
              message: "Password must have at least 6 characters",
            },
          })}
        />
        <span>{errors.password?.message}</span>
        <br />

        {isRegister && (
          <>
            <p>Repeat Password</p>
            <input
              type="password"
              {...register("passwordRepeat", {
                validate: (value) =>
                  value === getValues("password") ||
                  "The passwords do not match",
              })}
            />
            <span>{errors.passwordRepeat?.message}</span>
          </>
        )}
        <br />
        <input type="submit" />
      </form>
    </div>
  );
};

export { Form };
