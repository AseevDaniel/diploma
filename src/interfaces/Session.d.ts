import { UserForSession, userUid } from "./User";

type sessionDate = string;
type sessionPhone = string;
type sessionAddress = string;

export interface Session {
  id: string;
  name: string;
  phone: sessionPhone;
  startDate: sessionDate;
  endDate: sessionDate;
  ownerUid: userUid;
  address: sessionAddress;
  isAvailable?: boolean;
  client?: UserForSession;
}

export interface SessionSchedue extends Session {
  startTime: sessionDate;
  endTime: sessionDate;
  duration: number;
}
