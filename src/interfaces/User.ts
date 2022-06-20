import { Session } from "./Session";

type email = string;
type password = string;
type name = string;
type phone = string;
type address = string;
export type userUid = string;

export enum UserRoles {
  ADMIN = "admin",
  STORE = "store",
  DEFAULT = "default",
}
export type UserRole = "admin" | "store" | "default";

export interface User {
  email: email;
  password: password;
  passwordRepeat?: password;
}

export interface UserWithData {
  email: email;
  uid: userUid;
  role: UserRole;
  name?: name;
  phone?: phone;
  address?: address;
  sessionsCreated?: Session[];
  sessionsAccepted?: Session[];
}

export interface UserForSession {
  name: name;
  phone: phone;
  id?: string;
}

export interface UsersAll {
  [key: string]: UserWithData;
}
