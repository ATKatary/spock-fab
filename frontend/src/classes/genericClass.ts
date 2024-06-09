import { interfaceStateType} from "../types";
import { GenericClassInterface } from "../interfaces";
import { getFromCollection, getOrCreate, saveToCollection } from "../api/firebase";

export abstract class GenericClass<T> implements GenericClassInterface<T> {
    state: interfaceStateType
    setState: (newState: any) => any

    id: string | null
    setId: (id: string) => any

    obj: T | null
    setObj: (obj: T) => any

    collectionId: string = "gyms"

    constructor(id: string | null) {
        this.state = {}
        this.setState = (state) => {}

        this.id = id
        this.setId = (id) => {}

        this.obj = null
        this.setObj = (obj) => {}
    }

    async initialize(id: string | null) {
        if (this.state.initialized) return;
        this.setState({initialized: true});
        console.log(`[genericClass<T>][initialize] >> initializing ${id} from ${this.collectionId}...`)
        if (!id) {
            // const ref = await addToCollection<T>(this.collectionId, {});
            // if (ref instanceof DocumentReference) id = ref.id
            // else 
            return;
        }

        const obj = await this.get<T>(id)
        if (obj) {
            console.log(`[genericClass<T>][initialize] (obj) >>`, obj)
            this.setObj(obj)
        }
    }

    async get<T>(id: string, defaultGym?: T): Promise<T | null> {
        if (!id) return null;

        if (defaultGym) return await getOrCreate<T>(id, this.collectionId, defaultGym);
        return await getFromCollection<T>(id, this.collectionId);
    }

    async save(data: any): Promise<boolean> {
        if (!this.id) return false;
        return await saveToCollection(this.id, this.collectionId, data, {});
    }
}