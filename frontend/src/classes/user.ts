import * as React from "react";
import { useCustomState } from "../utils";
import { UserInterface } from "../interfaces";
import { GenericClass } from "./genericClass";
import { watchCollection } from "../api/firebase";
import { interfaceStateType, userType } from "../types";
import { DocumentData, QuerySnapshot, getDoc } from "firebase/firestore";

export class User extends GenericClass<userType> implements UserInterface {
    collectionId = "users"

    constructor(uid: string, user: userType) {
        super(uid);
        this.obj = user;
    }
}