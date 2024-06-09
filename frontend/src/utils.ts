import * as React from "react";
import { API, REGEX } from "./constants";

const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

export function nullify(obj: any) {
    return JSON.parse(JSON.stringify(obj))
}

export function useCustomState<T>(initialState: any): [T, CallableFunction] {
    const [state, setState] = React.useState(initialState);
    const setCustomSate = (newState: any) => {
        setState((prevState: any) => ({...prevState, ...newState}))
    };
    
    return [state, setCustomSate];
}

export async function post(url: RequestInfo | URL, body: any, headers: HeadersInit, other?: any) {
    return await fetch(url, {
        method: API.POST,
        headers: {
            // 'Content-Type': API.APPLICATION_JSON,
            ...headers
        },
        credentials: 'same-origin',
        body: body,
        ...other
    })
}

export async function get(url: string, args: Object, headers: HeadersInit) {
    url += "?";
    for (const [arg, value] of Object.entries(args)) {
        url += `${arg}=${value}&`
    }

    return await fetch(url, {
        method: API.GET,
        headers: {
            'Content-Type': API.APPLICATION_JSON,
            ...headers
        },
    })
}

export function validateEmail(email: string | undefined): boolean {
    if (email === undefined) return false;
    return email.toLowerCase().match(REGEX.EMAIL) !== null;
}

export function validatePassword(password: string | undefined): boolean {
    if (password === undefined) return false;
    return password.length >= 6;
}

export function sleep(time: number) {
    return new Promise((resolve) => setTimeout(resolve, time));
}

export function validateUrl(url: string) {
    return /^https?:\/\/([\w-]+\.)+\w{2,}(\/.+)?$/.test(url);
}

export function addToLocalStorage(key: string, value: string) {
    try {
        localStorage.setItem(key, value);
    } catch (error) {
        clearLocalStorage();
        localStorage.setItem(key, value);
    }
}

export function clearLocalStorage() {
    const permanent = ["sybSchedule", "nowPlaying", "currentLocationId"];
    const n = localStorage.length;

    for (let i = 0; i < n; i++) {
        const key = localStorage.key(i);
        if (!key) continue;
        if (permanent.includes(key)) continue;
        localStorage.removeItem(key);
    }
}

/**
 * Wraps functions to collapse / un-collapse on resizing of window 
 * 
 * @param callback function expected to be run
 * @param setCollapse hook to handle changing collapse state 
 * @param width of the current window
 * @param orientation portrait or landscape
 * @returns a callback to first execute the callback then un-=-collapse
 */
export function dynamicResizeCallbackWrapper(callback: CallableFunction, setCollapse: CallableFunction, width?: number, orientation?: string) {
    return (args: any) => {
        callback(args);
        if (!resize(width, orientation)) setCollapse(true)
    }
}

/***
 * Checks if website should be dynamically resized to width > widthBreakpoint
 * @returns true if width > widthBreakpoint and orientation is landscape else false
 */
export function resize(width: number | undefined, orientation: string | undefined): boolean {
    if (width && orientation) return width > 1000 && (isMobile? orientation.includes("landscape") : true);
    return false;
}