import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:5000"
})

export const signIn = (formData: any) => API.post("/api/users/signin", formData);

