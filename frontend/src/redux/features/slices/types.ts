export type TUserAuthStore = {
    user: null | {
        result: TResultOfUserLogin,
        token: string;
    },
    error: string,
    loading: boolean,
    loginInProgress: boolean
}

type TResultOfUserLogin = {
    _id: string,
    name: string,
    email: string,
    password: string,
    createdAt: Date,
    updatedAt: Date

}