import { UserRoles, UserWithData } from "../interfaces/User";
import { Nullable } from "../interfaces/HelperInterfaces";

export const isUserAdmin = (user: Nullable<UserWithData>) => {
  if (!user) return false;
  return user.role === UserRoles.ADMIN;
};

export const isUserStore = (user: Nullable<UserWithData>) => {
  if (!user) return false;
  return user.role === UserRoles.STORE;
};

export const isUserCanManageSession = (user: Nullable<UserWithData>) => {
  if (!user) return false;
  return user.role === UserRoles.ADMIN || user.role === UserRoles.STORE;
};

export const isUserDefault = (user: Nullable<UserWithData>) => {
  if (!user) return false;
  return user.role === UserRoles.DEFAULT;
};
