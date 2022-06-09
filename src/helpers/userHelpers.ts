import { UsersAll, UserWithData } from "../interfaces/User";
import { getAllUsers } from "../services/userService";

type UserFilter = {
  [key in keyof Partial<UserWithData & { search: string }>]: string;
};

export const getUsersByFilters = (filters: UserFilter) => {
  const onUsersLoad = (data: UsersAll) => {
    const users = Object.values(data);
    console.log(users);

    const filteredUsers = users.filter((user) => {
      const filterKeys = Object.keys(filters);
      let res = filterKeys.length > 0 ? false : true;

      filterKeys.forEach((key) => {
        if (key === "search") {
          Object.values(user).forEach((field) => {
            if (field.includes(filters[key])) {
              res = true;
            }
          });

          if (res) return;
        }

        if (
          user[key as keyof UserWithData] ===
          (filters[key as keyof UserWithData] || "")
        ) {
          res = true;
          return;
        }
      });

      return res;
    });
    console.log(filteredUsers);
  };
  getAllUsers(onUsersLoad);
};
