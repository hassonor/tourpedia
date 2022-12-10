import React, {useEffect} from 'react';
import {ToastContainer} from "react-toastify";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import './App.css';
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Header from "./components/Header";
import {useAppDispatch} from "./redux/hooks";
import {setUser} from "./redux/features/slices/authSlice";


function App() {
    const dispatch = useAppDispatch();
    const user = JSON.parse(localStorage.getItem("profile") as string) || "";

    useEffect(() => {
        dispatch(setUser(user))
    }, [dispatch, user])

    return (
        <BrowserRouter>
            <div className="App">
                <Header/>
                <ToastContainer/>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/register" element={<Register/>}/>
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
