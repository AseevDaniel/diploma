import { UserRoles, UsersAll, UserWithData } from "../interfaces/User";
import { getDatabaseData, writeDatabseData } from "./firebaseDataService";
import { SelectOption } from "../interfaces/Select";

const USER_PATH = "users/";
const DEFAULT_USERNAME = "Unknown";

export const writeUserData = async (user: UserWithData) => {
  return await writeDatabseData(USER_PATH, user.uid, user);
};

export const getUserData = (
  uid: string,
  onGet?: (data: UserWithData) => void
) => {
  return getDatabaseData(USER_PATH, uid, onGet);
};

export const getAllUsers = (onGet?: (data: UsersAll) => void) => {
  return getDatabaseData(USER_PATH, "", onGet);
};

export const getUsersForFilters = (onGet: (data: SelectOption[]) => void) => {
  const formatUsers = (data: UsersAll) => {
    const users = Object.values(data);
    const formattedUsers = users
      .filter(
        (user) => user.role === UserRoles.STORE || user.role === UserRoles.ADMIN
      )
      ?.map((user) => {
        return {
          label: user.name || DEFAULT_USERNAME,
          value: user.uid,
        };
      });
    onGet(formattedUsers || []);
  };
  getAllUsers(formatUsers);
};

type UserFilter = {
  [key in keyof Partial<UserWithData & { search: string }>]: string;
};

export const getUsersByFilters = (
  filters: UserFilter,
  onGet: (data: UserWithData[]) => void
) => {
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
    onGet(filteredUsers);
  };
  getAllUsers(onUsersLoad);
};
