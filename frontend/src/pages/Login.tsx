import React, {useState, SyntheticEvent} from 'react';
import {
    MDBCard,
    MDBCardBody,
    MDBInput,
    MDBCardFooter,
    MDBValidation,
    MDBBtn,
    MDBIcon,
    MDBValidationItem
} from "mdb-react-ui-kit";
import {Link} from "react-router-dom";

const initialState = {
    email: "",
    password: ""
}


const Login = () => {
    const [formValue, setFormValue] = useState(initialState);
    const {email, password} = formValue;
    const handleSubmit = (e: SyntheticEvent) => {
        e.preventDefault();
    };
    const onInputChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setFormValue({...formValue, [e.target.name]: e.target.value});
    };
    return (
        <div style={{margin: "auto", padding: "15px", maxWidth: "450px", alignContent: "center", marginTop: "120px"}}>
            <MDBCard alignment="center">
                <MDBIcon fas icon="user-circle" className="fa-2x"/>
                <h5>Sign In</h5>
                <MDBCardBody>
                    <MDBValidation onSubmit={handleSubmit} isValidated className="row g-3">
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
                    </MDBValidation>
                    <div className="col-12">
                        <MDBBtn style={{width: "100%"}} className="mt-2">
                            Login
                        </MDBBtn>
                    </div>
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