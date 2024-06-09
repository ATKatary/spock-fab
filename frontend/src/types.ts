/*** Notifications ***/
export type NotificationType = {notify: boolean, message: string};
export type NotificationContextType = {
    notification: NotificationType, 
    setNotification: CallableFunction
} | null;

/*** Loading ***/
export type loadingType = {
    load: boolean
    message: string
}

export type LoadingContextType = {
    loading: loadingType
    setLoading: CallableFunction
}

/*** Projects State Management ***/
export type spockProject = {
    cover: string
    title: string
    quote: string
    client: string 
}


/*** Login Types ***/
export type loginInfoType = {
    status: number
    message: string
    loggedIn: boolean
    
    email: string
    emailMessage: string
    
    password: string
    resetPass: boolean
    forgotPass: boolean
    passMessage: string
    passConfirm: string

    error?: boolean, 
    success?: boolean
};

/*** Utility Types ***/
export type stateType = {
    id: string 
    
    prevName?: string
    prevState?: stateType
} | undefined

export type navigationLinkType = {
    name: string 
    state: stateType
}

export type interfaceStateType = {
    update?: boolean
    edited?: boolean
    watching?: boolean 
    initialized?: boolean
}

/*** User Types ***/
export type userType = {
    email: string 
    role: "admin" | "tester"
    
    projects: string[]
}