import {getData, postData} from "./firebaseDataService";
import {Session} from "../interfaces/session";

const COLLECTION_NAME = 'sessions'




export const getSessions = () => {
    return getData(COLLECTION_NAME)
}

export const createSession = (data: Session) => {
    return postData(COLLECTION_NAME, data)
}