import { UsersAll, UserWithData } from "../interfaces/User";
import { getDatabaseData, writeDatabseData } from "./firebaseDataService";

const USER_PATH = "users/";

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
