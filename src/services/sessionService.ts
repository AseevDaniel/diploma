import { getData, postData } from "./firebaseDataService";
import { Session } from "../interfaces/Session";
import { convertDateToDefaultFormat } from "../helpers/dateHelpers";

const COLLECTION_NAME = "sessions";

export const getSessions = async (): Promise<Session[]> => {
  const sessionsSnapshot = await getData(COLLECTION_NAME);
  const sessions: Session[] = [];

  sessionsSnapshot.forEach((el) => {
    sessions.push(el.data() as Session);
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
