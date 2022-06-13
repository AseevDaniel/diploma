import { userUid } from "./User";

type sessionDate = string;
type sessionPhone = string;
type sessionAddress = string;

export interface Session {
  name: string;
  phone: sessionPhone;
  startDate: sessionDate;
  endDate: sessionDate;
  ownerUid: userUid;
  address: sessionAddress;
  isAvailable?: boolean;
}

export interface SessionSchedue extends Session {
  startTime: sessionDate;
  endTime: sessionDate;
  duration: number;
}
