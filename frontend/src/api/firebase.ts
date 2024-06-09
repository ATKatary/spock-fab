import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { DocumentReference, addDoc, collection, doc, getDoc, getFirestore, onSnapshot, setDoc } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCDC0BVwuxy_kb3aNuL4KrYUF-Ygcm8wss",
    authDomain: "fabhous-706fa.firebaseapp.com",
    projectId: "fabhous-706fa",
    storageBucket: "fabhous-706fa.appspot.com",
    messagingSenderId: "1079688628175",
    appId: "1:1079688628175:web:f25a2b4eeb3db5377734ba",
    measurementId: "G-3BHX70PVNH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const multiMediaStorage = getStorage(app);

export function watchDoc(
    id: string, 
    collectionId: string,
    
    onUpdate?: CallableFunction,
    args?: any,
) {
    const docRef = doc(db, collectionId, id);
    // console.log(`[firebase][watchDoc] >> watching ${collectionId} ${id}`);

    onSnapshot(docRef, (doc) => {
        // console.log("[firebase][watchDoc] (doc) >>", doc.data())
        if (onUpdate && args) onUpdate(doc, args);
        else if (onUpdate) onUpdate(doc);
    })
}

export function watchCollection(
    id: string,
    
    onUpdate?: CallableFunction,
    args?: any,
) {
    const collectionRef = collection(db, id);
    // console.log(`[firebase][watchCollection] >> watching ${id}`);

    onSnapshot(collectionRef, (snapshot) => {
        if (onUpdate && args) onUpdate(snapshot, args);
        else if (onUpdate) onUpdate(snapshot);
    })
}

export async function addToCollection<T>(collectionId: string, data: any): Promise<T | DocumentReference> {
    const collectionRef = collection(db, collectionId);
    // console.log(`[firebase][addToCollection] >> adding to  ${collectionId}....`);

    const docRef = await addDoc(collectionRef, data);
    if (docRef) {
        const data = (await getDoc(docRef)).data() as T
        return {
            ...data,
            id: docRef.id
        };
    }
    return docRef
}

export async function getOrCreate<T>(id: string, collectionId: string, defaultData?: T): Promise<T | null> {
    // console.log(`[firebase][getOrCreate] >> getting ${id} from ${collectionId}....`);

    const data = await getFromCollection<T>(id, collectionId, true);
    if (data) return data;
    if (!defaultData) return null;
    
    await saveToCollection(id, collectionId, defaultData, {});
    return defaultData;
}

export async function getFromCollection<T>(id: string, collectionId: string, createIfDoesNotExist?: boolean): Promise<T | null> {
    // console.log(`[firebase][getFromCollection] >> getting ${id} from ${collectionId}....`);

    const docRef = doc(db, collectionId, id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        return docSnap.data() as T;
    } else if (createIfDoesNotExist) {
        await saveToCollection(id, collectionId, {}, {});
    } return null;
}

export async function saveToCollection(id: string, collectionId: string, data: any, {...options}): Promise<boolean> {
    const docRef = doc(db, collectionId, id);
    try {
        await setDoc(docRef, data, {merge: true, ...options});
        return true;
    } catch (e) {
        console.error(e)
        return false;
    }
} 
