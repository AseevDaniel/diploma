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

interface ProfilePageProps {}

export const ProfilePage: React.FC<ProfilePageProps> = ({}) => {
  const { register, handleSubmit } = useForm<UserWithData>();
  const user = useContext(AuthContext);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isUserDataLoading, setIsUserDataLoading] = useState<boolean>(false);
  const [isCreatingLoading, setCreatingLoading] = useState<boolean>(false);
  const [sessions, setSessions] = useState<Session[]>([]);
  const [isEditing, setIsEditing] = useState(false);

  const isAdmin = user?.role === UserRoles.ADMIN;

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

  const getSessions = async () => {
    try {
      if (user?.uid && user.uid) {
        setIsUserDataLoading(true);
        const sessionsByuser = await getSessionsByOwnersAndDay([user.uid]);
        setSessions(sessionsByuser);
        setIsUserDataLoading(false);
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
          <input {...register("phone")} defaultValue={user.phone} />
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

      <button onClick={getSessions}>Get Sessions for today</button>

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

      <div className="userSessions">
        <TimeslotTags
          timeslots={sessions}
          isOnlyFreeSlots={false}
          setIsOnlyFreeSlots={() => {}}
        />
      </div>
    </>
  );
};
