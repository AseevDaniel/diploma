import React, { useEffect, useState } from "react";
import { getAllUsers } from "../../../services/userService";
import { UsersAll } from "../../../interfaces/User";

interface FiltersProps {}

export const Filters: React.FC<FiltersProps> = ({}) => {
  const [users, setUsers] = useState<UsersAll>();

  useEffect(() => {
    console.log(users);
    for (let usersKey in users) {
      console.log(usersKey, users[usersKey]);
    }
  }, [users]);

  useEffect(() => {
    getAllUsers(setUsers);
  }, []);
  return <div></div>;
};
