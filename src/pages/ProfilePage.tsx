import React, { useContext, useState } from "react";
import { writeUserData } from "../services/userService";
import { Loader } from "../components/Loader/Loader";
import { useForm } from "react-hook-form";
import { User, UserRoles, UserWithData } from "../interfaces/User";
import { Modal } from "../components/Modal/Modal";
import { Form } from "../components/Auth/Form";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { AuthContext } from "../App";
import { getSessionsByOwnersAndDay } from "../services/sessionService";
import { Session } from "../interfaces/Session";
import { TimeslotTags } from "./SessionPage/components/Sessions/components";
import { CurrentSession } from "./SessionPage/components/Sessions/components/CurrentSession/CurrentSession";
import moment from "moment";
import { getSessionsForToday } from "../helpers/sessionHelper";
import { REG_EXP } from "../constants/RegExps";

interface ProfilePageProps {}

export const ProfilePage: React.FC<ProfilePageProps> = ({}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserWithData>();
  const user = useContext(AuthContext);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isUserDataLoading, setIsUserDataLoading] = useState<boolean>(false);
  const [isCreatingLoading, setCreatingLoading] = useState<boolean>(false);
  const [isSessionsForTodayShown, setIsSessionsForTodayShown] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentSession, setCurrentSession] = useState<Session>();

  const isAdmin = user?.role === UserRoles.ADMIN;
  const isStore = user?.role === UserRoles.STORE;

  const currentSessions = isStore
    ? user?.sessionsCreated?.filter((session) => !session.isAvailable)
    : user?.sessionsAccepted;

  console.log(user);

  const onSubmit = async (data: UserWithData) => {
    try {
      if (user?.email && user.uid) {
        setIsUserDataLoading(true);
        await writeUserData({ ...user, ...data });
        setIsUserDataLoading(false);
        setIsEditing(false);
      }
    } catch (err) {
      alert(err);
    }
  };

  const onNewStoreCreate = (data: User) => {
    const auth = getAuth();
    setCreatingLoading(true);
    createUserWithEmailAndPassword(auth, data.email, data.password)
      .then(({ user }) => {
        console.log(user);

        writeUserData({
          email: user.email!,
          uid: user.uid,
          role: "store",
        });

        alert("New store successfully created");
      })
      .catch(console.error)
      .finally(() => {
        setIsCreateModalOpen(false);
        setCreatingLoading(false);
      });
  };

  const getCurrentDataDisplay = () => {
    if (!user) return <></>;

    return isEditing ? (
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="field">
          <p>Name:</p>
          <input {...register("name")} defaultValue={user.name} />
        </div>
        <div className="field">
          <p>Phone:</p>
          <input
            {...register("phone", {
              pattern: {
                value: REG_EXP.phone,
                message: "Invalid phone number",
              },
            })}
            defaultValue={user.phone}
          />
          <span>{errors.phone?.message}</span>
        </div>
        <div className="field">
          <p>Address:</p>
          <input {...register("address")} defaultValue={user.address} />
        </div>
        <input className="submitButton" type="submit" />
      </form>
    ) : (
      <div className="profileInfo">
        <p>Email: {user.email}</p>
        <p>Name: {user.name}</p>
        <p>Phone: {user.phone}</p>
        <p>Address: {user.address}</p>
        <p>Role: {user.role}</p>
      </div>
    );
  };

  return (
    <>
      <button onClick={() => setIsEditing(!isEditing)}>
        {isEditing ? "Cancel editing" : "Change info"}
      </button>

      {isUserDataLoading ? <Loader /> : getCurrentDataDisplay()}

      {isAdmin && (
        <>
          <button onClick={() => setIsCreateModalOpen(true)}>
            Create new store
          </button>
          {isCreateModalOpen && (
            <Modal
              isLoading={isCreatingLoading}
              onClose={() => setIsCreateModalOpen(false)}
            >
              <Form handleClick={onNewStoreCreate} />
            </Modal>
          )}
        </>
      )}

      <button
        onClick={() => setIsSessionsForTodayShown(!isSessionsForTodayShown)}
      >
        {isSessionsForTodayShown ? "Hide sessions" : "Show Sessions for today"}
      </button>

      {isSessionsForTodayShown && (
        <>
          {getSessionsForToday(currentSessions)?.length > 0 ? (
            <>
              <div className="userSessions">
                Sessions for today:
                <TimeslotTags
                  timeslots={getSessionsForToday(currentSessions)}
                  isOnlyFreeSlots={false}
                  currentSession={currentSession}
                  setCurrentSession={setCurrentSession}
                  setIsOnlyFreeSlots={() => {}}
                />
              </div>

              {currentSession && (
                <CurrentSession isWithoutBooking session={currentSession} />
              )}
            </>
          ) : (
            <>You have not sessions for today</>
          )}
        </>
      )}
    </>
  );
};
