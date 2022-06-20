import {
  collection,
  doc,
  getDocs,
  getFirestore,
  addDoc,
  updateDoc,
} from "firebase/firestore";
import { getDatabase, ref, set, onValue } from "firebase/database";
import { app } from "firebase";
import { Session } from "../interfaces/Session";
const db = getFirestore(app);
const database = getDatabase(app);

export const getData = async (collectionName: string) => {
  try {
    const querySnapshot = await getDocs(collection(db, collectionName));
    return querySnapshot;
  } catch (error) {
    alert(error);
  }
  return [];
};

export const postData = async <T>(collectionName: string, data: T) => {
  console.log(data);
  try {
    await addDoc(collection(db, collectionName), data);
  } catch (err) {
    alert(err);
  }
};

export const postArrayData = async <T>(collectionName: string, data: T[]) => {
  const arrayOfPromises: Promise<Session>[] = [];

  data.forEach((el) => {
    arrayOfPromises.push(addDoc(collection(db, collectionName), el) as any);
  });

  try {
    await Promise.all(arrayOfPromises);
  } catch (err) {
    alert(err);
  }
};

export const updateData = async <T>(
  collectionName: string,
  documentId: string,
  data: T
) => {
  console.log(data);

  try {
    await updateDoc(doc(db, collectionName, documentId), data);
  } catch (err) {
    alert(err);
  }
};

export const writeDatabseData = <T>(path: string, uid: string, data: T) => {
  const a = set(ref(database, path + uid), data)
    .then((res) => console.log(res))
    .catch((err) => console.log(err));

  return a;
};

export const getDatabaseData = (
  path: string,
  uid: string,
  onGet?: (data: any) => void
) => {
  const dataRef = ref(database, path + uid);
  onValue(dataRef, (snapshot) => {
    const data = snapshot.val();
    onGet?.(data);
  });
};
