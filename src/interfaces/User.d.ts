type email = string;
type password = string;
type name = string;
type phone = string;
type address = string;
export type userUid = string;

export interface User {
  email: email;
  password: password;
  passwordRepeat?: password;
}

export interface UserWithData {
  email: email;
  uid: userUid;
  name?: name;
  phone?: phone;
  address?: address;
}
