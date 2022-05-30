import {collection, getDocs, getFirestore, addDoc} from "firebase/firestore";
import { app } from 'firebase'
const db = getFirestore(app)

export const getData = async (collectionName: string) => {
    try {
        const querySnapshot = await getDocs(collection(db, collectionName));
        return querySnapshot;
    }
    catch(error) {
        alert(error)
    }
    return []
}

export const postData = async <T>(collectionName: string, data: T) => {
    try {
        await addDoc(collection(db, collectionName), data);
    }
    catch (err){
        alert(err)
    }

}