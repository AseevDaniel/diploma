import React, { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { getUserData, writeUserData } from "../services/userService";
import { User } from "../interfaces/User";
import { Loader } from "../components/Loader/Loader";

interface ProfilePageProps {}

export const ProfilePage: React.FC<ProfilePageProps> = ({}) => {
  const { id, email } = useAuth();
  const [userData, setUserData] = useState<User>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onGet = (data: any) => {
    setUserData(data);
  };

  const setData = async () => {
    if (email && id) {
      const a = await writeUserData({
        email,
        uid: id,
        name: "danya",
        phone: "0974911716",
      });
      console.log(a);
    }
  };

  const getValue = async () => {
    console.log(id);
    if (id) {
      setIsLoading(true);
      const a = await getUserData(id, onGet);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getValue();
  }, []);

  return (
    <>
      <button onClick={setData}>click</button>

      {userData &&
        !isLoading &&
        Object.keys(userData).map((el, index) => {
          return (
            <p key={el + index}>
              {el}: {userData[el as keyof User]}
            </p>
          );
        })}
      {isLoading && <Loader />}
    </>
  );
};
