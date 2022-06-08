import { UserWithData } from "../interfaces/User";
import { getDatabaseData, writeDatabseData } from "./firebaseDataService";

const USER_PATH = "users/";

export const writeUserData = async (user: UserWithData) => {
  return await writeDatabseData(USER_PATH, user.uid, user);
};

export const getUserData = (uid: string, onGet?: (data: any) => void) => {
  return getDatabaseData(USER_PATH, uid, onGet);
};

export const getAllUsers = (uid: string, onGet?: (data: any) => void) => {
  return getDatabaseData(USER_PATH, "", onGet);
};
