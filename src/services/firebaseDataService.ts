import {collection, getDocs, getFirestore} from "firebase/firestore";
import {app } from 'firebase'
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