import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:5000"
})

export const signIn = (formData: any) => API.post("/api/users/signin", formData);
export const signUp = (formData: any) => API.post("/api/users/signup", formData);

