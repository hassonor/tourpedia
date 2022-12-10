import {createAsyncThunk} from "@reduxjs/toolkit";
import * as api from "../../api";
import {TLoginThunkPayload, TRegisterThunkPayload, TSignInWithGoogle} from "./types";


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


export const googleSignIn = createAsyncThunk("auth/googleSignIn",
    async (registerPayload: TSignInWithGoogle, {rejectWithValue}) => {
        try {
            const {result, navigate, toast} = registerPayload;
            const response = await api.signInWithGoogle(result);
            toast.success("Google Sign-in Successfully");
            navigate("/");
            return response.data;
        } catch (err: any) {
            return rejectWithValue(err?.response?.data)
        }
    })