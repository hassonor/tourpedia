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
import {register} from "../redux/features/thunks/authThunk";


const initialState = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: ""
}


const Register = () => {
    const dispatch = useAppDispatch();
    const {loginInProgress, error} = useAppSelector((state) => ({...state.auth}));
    const [formValue, setFormValue] = useState(initialState);
    const {email, password, firstName, lastName, confirmPassword} = formValue;
    const navigate = useNavigate();

    useEffect(() => {
        error && toast.error(error);
    }, [error]);
    const handleSubmit = (e: SyntheticEvent) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            return toast.error("password should match");
        }
        if (email && password && firstName && lastName && confirmPassword) {
            dispatch(register({formValue, navigate, toast}))
        }
    };
    const onInputChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setFormValue({...formValue, [e.target.name]: e.target.value});
    };
    return (
        <div style={{margin: "auto", padding: "15px", maxWidth: "450px", alignContent: "center", marginTop: "200px"}}>
            <MDBCard alignment="center">
                <MDBIcon fas icon="user-circle" className="fa-2x" style={{padding: "15px"}}/>
                <h5>Sign In</h5>
                <MDBCardBody>
                    <MDBValidation onSubmit={handleSubmit} noValidate className="row g-3">
                        <MDBValidationItem className='col-md-6 pb-md-4' tooltip
                                           feedback='Please provide first name.'
                                           invalid>
                            <MDBInput
                                value={firstName}
                                onChange={onInputChange}
                                name="firstName"
                                id='validationCustom03'
                                label="First Name"
                                type="text"
                                required

                            />
                        </MDBValidationItem>
                        <MDBValidationItem className='col-md-6 pb-md-4' tooltip
                                           feedback='Please provide last name.'
                                           invalid>
                            <MDBInput
                                value={lastName}
                                onChange={onInputChange}
                                name="lastName"
                                id='validationCustom04'
                                label="Last Name"
                                type="text"
                                required

                            />
                        </MDBValidationItem>
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
                        <MDBValidationItem className='col-md-12 pb-md-3' tooltip
                                           feedback='Please provide confirm password.'
                                           invalid>
                            <MDBInput
                                label="Password Confirm"
                                type="password"
                                value={confirmPassword}
                                name="confirmPassword"
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
                                Register
                            </MDBBtn>
                        </div>
                    </MDBValidation>
                </MDBCardBody>
                <MDBCardFooter>
                    <Link to="/login">
                        <p>Already has an account? Sign In</p>
                    </Link>
                </MDBCardFooter>
            </MDBCard>
        </div>
    )
}

export default Register;