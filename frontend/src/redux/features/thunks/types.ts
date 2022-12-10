import {NavigateFunction} from "react-router/dist/lib/hooks";

export type TLoginThunkPayload = {
    formValue: { email: string, password: string },
    navigate: NavigateFunction,
    toast: any
}

export type TRegisterThunkPayload = {
    formValue: { firstName: string, lastName: string, email: string, password: string },
    navigate: NavigateFunction,
    toast: any
}