import { DocumentReference } from "firebase/firestore"
import { interfaceStateType, userType } from "./types"

export interface GenericClassInterface<T> {
    state: interfaceStateType

    obj: T | null
    id: string | null

    initialize(id: string | null): Promise<void> 

    get<T>(id: string, defaultData?: T): Promise<T | null>
    save(data: any): Promise<boolean>
}

export interface UserInterface extends GenericClassInterface<userType> {
}   

export interface AuthInterface {
    id: string | null
    user: UserInterface | null
    isAuthenticated: boolean | null

    logout(): Promise<boolean>
    needsPasswordChange(): Promise<any>
    updatePassword(password : string): Promise<any>
    login(email: string, password: string): Promise<any>
    sendResetPasswordEmail(email : string): Promise<any>
    initialize(name?: string): Promise<UserInterface | null>
}