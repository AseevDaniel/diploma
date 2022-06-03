import {getData, postData} from "./firebaseDataService";
import {Session} from "../interfaces/Session";

const COLLECTION_NAME = 'sessions'


export const getSessions = async (): Promise<Session[]> => {
    const sessionsSnapshot = await getData(COLLECTION_NAME)
    const sessions: Session[] = []

    sessionsSnapshot.forEach( (el) => {
        sessions.push(el.data() as Session)
    })

    return sessions
}

export const createSession = (data: Session) => {
    return postData(COLLECTION_NAME, data)
}