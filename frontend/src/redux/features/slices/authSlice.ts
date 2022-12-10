import {createSlice} from "@reduxjs/toolkit";

import {googleSignIn, login, register} from "../thunks/authThunk";
import {TUserAuthStore} from "./types";


const initialState: TUserAuthStore = {
    user: null,
    error: "",
    loading: false,
    loginInProgress: false
}

const authSlice = createSlice({
    name: 'authSlice',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        },
        setLogout: (state, action) => {
            localStorage.clear();
            state.user = null;
        }

    },
    extraReducers: (builder) => {
        builder.addCase(login.pending, (state, _action) => {
            state.loginInProgress = true
        });
        builder.addCase(login.fulfilled, (state, action) => {
            state.loginInProgress = false;
            localStorage.setItem("profile", JSON.stringify({...action.payload}));
            state.error = ""
            state.user = action.payload
        })
        builder.addCase(login.rejected, (state, action: any) => {
            state.loginInProgress = false;
            state.error = action.payload.message as string
        })
        builder.addCase(register.pending, (state, _action) => {
            state.loginInProgress = true
        });
        builder.addCase(register.fulfilled, (state, action) => {
            state.loginInProgress = false;
            localStorage.setItem("profile", JSON.stringify({...action.payload}));
            state.user = action.payload
        })
        builder.addCase(register.rejected, (state, action: any) => {
            state.loginInProgress = false;
            state.error = action.payload.message as string
        })
        builder.addCase(googleSignIn.pending, (state, _action) => {
            state.loginInProgress = true
        });
        builder.addCase(googleSignIn.fulfilled, (state, action) => {
            state.loginInProgress = false;
            localStorage.setItem("profile", JSON.stringify({...action.payload}));
            state.user = action.payload
        })
        builder.addCase(googleSignIn.rejected, (state, action: any) => {
            state.loginInProgress = false;
            state.error = action.payload.message as string
        })
    }
})

export const {setUser, setLogout} = authSlice.actions;

export default authSlice.reducer;