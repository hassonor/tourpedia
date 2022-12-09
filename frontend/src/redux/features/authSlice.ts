import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {NavigateFunction} from "react-router/dist/lib/hooks";
import *  as api from "../api";

type loginPayload = {
    formValue: { email: string, password: string },
    navigate: NavigateFunction,
    toast: any
}

export const login = createAsyncThunk("auth/login",
    async (loginPayload: loginPayload, {rejectWithValue}) => {
        try {
            const {formValue, navigate, toast} = loginPayload;
            const response = await api.signIn(formValue);
            toast.success("Login Successfully");
            navigate("/");
            return response.data;
        } catch (err: any) {
            return rejectWithValue(err?.response?.data)
        }
    })

const initialState = {
    user: null,
    error: "",
    loading: false,
    loginInProgress: false
}

const authSlice = createSlice({
    name: 'authSlice',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(login.pending, (state, _action) => {
            state.loginInProgress = true
        });
        builder.addCase(login.fulfilled, (state, action) => {
            state.loginInProgress = false;
            localStorage.setItem("profile", JSON.stringify({...action.payload}));
            state.user = action.payload
        })
        builder.addCase(login.rejected, (state, action: any) => {
            state.loginInProgress = false;
            state.error = action.payload.message as string
        })
    }
})

export default authSlice.reducer;