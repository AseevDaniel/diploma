import {
  getData,
  postArrayData,
  postData,
  updateData,
} from "./firebaseDataService";
import { Session, SessionSchedue } from "../interfaces/Session";
import { convertDateToDefaultFormat } from "../helpers/dateHelpers";
import { getArrayOfSessions } from "../helpers/sessionHelper";
import moment from "moment";

const COLLECTION_NAME = "sessions";

export const getSessions = async (): Promise<Session[]> => {
  const sessionsSnapshot = await getData(COLLECTION_NAME);
  const sessions: Session[] = [];

  sessionsSnapshot.forEach((el) => {
    sessions.push({ ...el.data(), id: el.id } as Session);
  });

  return sessions;
};

export const createSession = (data: Session) => {
  return postData(COLLECTION_NAME, {
    ...data,
    startDate: convertDateToDefaultFormat(data.startDate),
    endDate: convertDateToDefaultFormat(data.endDate),
  });
};

export const createArraySession = (dataArray: SessionSchedue) => {
  return postArrayData(COLLECTION_NAME, getArrayOfSessions(dataArray));
};

export const updateSession = (sessionId: string, data: Session) => {
  return updateData(COLLECTION_NAME, sessionId, data);
};

export const getSessionsByOwners = async (
  ownerUids: string[]
): Promise<Session[]> => {
  const sessions = await getSessions();
  if (!ownerUids.length) return sessions;

  const filteredSessions = sessions.filter(
    (session) => session.ownerUid && ownerUids.includes(session.ownerUid)
  );

  return filteredSessions;
};

export const getSessionsByOwnersAndDay = async (
  ownerUids: string[],
  day = moment()
): Promise<Session[]> => {
  const sessions = await getSessionsByOwners(ownerUids);

  const filteredSessions = sessions.filter((session) =>
    moment(session.startDate).isSame(day, "day")
  );

  return filteredSessions;
};
