import {createAsyncThunk} from "@reduxjs/toolkit";
import * as api from "../../api";
import {TLoginThunkPayload, TRegisterThunkPayload} from "./types";


export const login = createAsyncThunk("auth/login",
    async (loginPayload: TLoginThunkPayload, {rejectWithValue}) => {
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

export const register = createAsyncThunk("auth/register",
    async (registerPayload: TRegisterThunkPayload, {rejectWithValue}) => {
        try {
            const {formValue, navigate, toast} = registerPayload;
            const response = await api.signUp(formValue);
            toast.success("Register Successfully");
            navigate("/");
            return response.data;
        } catch (err: any) {
            return rejectWithValue(err?.response?.data)
        }
    })