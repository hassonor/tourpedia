import React, {useState, SyntheticEvent, useEffect} from 'react';
import {
    MDBCard,
    MDBCardBody,
    MDBInput,
    MDBCardFooter,
    MDBValidation,
    MDBBtn,
    MDBIcon,
    MDBValidationItem, MDBSpinner
} from "mdb-react-ui-kit";
import {Link, useNavigate} from "react-router-dom";
import {toast} from "react-toastify";

import {useAppDispatch, useAppSelector} from "../redux/hooks";
import {googleSignIn, login} from "../redux/features/thunks/authThunk";
import {GoogleLogin} from "@leecheuk/react-google-login";


const initialState = {
    email: "",
    password: ""
}


const Login = () => {
    const dispatch = useAppDispatch();
    const {loginInProgress, error} = useAppSelector((state) => ({...state.auth}));
    const [formValue, setFormValue] = useState(initialState);
    const {email, password} = formValue;
    const navigate = useNavigate();

    useEffect(() => {
        error && toast.error(error);
    }, [error]);
    const handleSubmit = (e: SyntheticEvent) => {
        e.preventDefault();
        if (email && password) {
            dispatch(login({formValue, navigate, toast}))
        }
    };
    const onInputChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setFormValue({...formValue, [e.target.name]: e.target.value});
    };

    const googleSuccess = (response: any) => {
        const email = response?.profileObj?.email;
        const name = response?.profileObj?.name;
        const token = response?.tokeId;
        const googleId = response?.googleId;
        const result = {email, name, token, googleId}
        dispatch(googleSignIn({result, navigate, toast}))
    }

    const googleFailure = (error: any) => {
        toast.error(error);
    }

    return (
        <div style={{margin: "auto", padding: "15px", maxWidth: "450px", alignContent: "center", marginTop: "200px"}}>
            <MDBCard alignment="center">
                <MDBIcon fas icon="user-circle" className="fa-2x" style={{padding: "15px"}}/>
                <h5>Sign In</h5>
                <MDBCardBody>
                    <MDBValidation onSubmit={handleSubmit} noValidate className="row g-3">
                        <MDBValidationItem className='col-md-12 pb-md-3' tooltip
                                           feedback='Please provide a valid email.'
                                           invalid>
                            <MDBInput
                                value={email}
                                onChange={onInputChange}
                                name="email"
                                id='validationCustom01'
                                label="Email"
                                type="email"
                                required

                            />
                        </MDBValidationItem>

                        <MDBValidationItem className='col-md-12 pb-md-3' tooltip
                                           feedback='Please provide a valid password.'
                                           invalid>
                            <MDBInput
                                label="Password"
                                type="password"
                                value={password}
                                name="password"
                                onChange={onInputChange}
                                required
                            />
                        </MDBValidationItem>
                        <div className="col-12">
                            <MDBBtn style={{width: "100%"}} className="mt-2">
                                {loginInProgress && (
                                    <MDBSpinner
                                        size="sm"
                                        role="status"
                                        tag="span"
                                        className="me-2"
                                    />
                                )}
                                Login
                            </MDBBtn>
                        </div>
                    </MDBValidation>
                    <br/>
                    <GoogleLogin clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID || ""}
                                 render={(renderProps) => (
                                     <MDBBtn style={{width: "100%"}} color="danger" onClick={(renderProps.onClick)}
                                             disabled={renderProps.disabled}>
                                         <MDBIcon className="me-2" fab icon="google"/> Sign In with Google
                                     </MDBBtn>
                                 )}
                                 onSuccess={googleSuccess}
                                 onFailure={googleFailure}
                                 cookiePolicy="single_host_origin"
                    />
                </MDBCardBody>
                <MDBCardFooter>
                    <Link to="/register">
                        <p>Don't have an Account? Sign Up</p>
                    </Link>
                </MDBCardFooter>
            </MDBCard>
        </div>
    )
}

export default Login;