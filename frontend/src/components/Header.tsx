import React, {useState} from 'react';
import {
    MDBNavbar,
    MDBContainer,
    MDBIcon,
    MDBNavbarNav,
    MDBNavbarItem,
    MDBNavbarLink,
    MDBNavbarToggler,
    MDBCollapse,
    MDBNavbarBrand
} from "mdb-react-ui-kit";
import {useAppDispatch, useAppSelector} from "../redux/hooks";
import {setLogout} from "../redux/features/slices/authSlice";

const Header = () => {
    const dispatch = useAppDispatch();
    const [show, setShow] = useState(false);
    const {user} = useAppSelector((state) => ({...state.auth}))

    const handleLogout = () => {
        dispatch(setLogout(user))
    }

    return <MDBNavbar fixed='top' expand="lg" style={{backgroundColor: "#F0E6EA"}}>
        <MDBContainer>
            <MDBNavbarBrand href="/" style={{color: "#606080", fontWeight: "600", fontSize: "22px"}}>
                Tourpedia
            </MDBNavbarBrand>
            <MDBNavbarToggler
                type="button"
                aria-expanded="false"
                aria-label="Toggle navigation"
                onClick={() => setShow(!show)}
                style={{color: "#606080"}}
            >
                <MDBIcon icon="bars" fas/>
            </MDBNavbarToggler>
            <MDBCollapse show={show} navbar>
                <MDBNavbarNav right fullWidth={false} className="mb-2 mb-lg-0">
                    {user?.result?._id && (
                        <h5 style={{marginRight: "60px", marginTop: "18px", color: "red"}}>Logged in
                            as: {user?.result?.name}</h5>
                    )}
                    <MDBNavbarItem>
                        <MDBNavbarLink href="/">
                            <p className="header-text">Home</p>
                        </MDBNavbarLink>
                    </MDBNavbarItem>
                    {user?.result?._id && (
                        <>
                            <MDBNavbarItem>
                                <MDBNavbarLink href="/addTour">
                                    <p className="header-text">Add Tour</p>
                                </MDBNavbarLink>
                            </MDBNavbarItem>
                            <MDBNavbarItem>
                                <MDBNavbarLink href="/dashboard">
                                    <p className="header-text">Dashboard</p>
                                </MDBNavbarLink>
                            </MDBNavbarItem>
                        </>
                    )}
                    {user?.result?._id ? (
                        <MDBNavbarItem>
                            <MDBNavbarLink href="/login">
                                <p className="header-text" onClick={handleLogout}>Logout</p>
                            </MDBNavbarLink>
                        </MDBNavbarItem>
                    ) : (<MDBNavbarItem>
                        <MDBNavbarLink href="/login">
                            <p className="header-text">Login</p>
                        </MDBNavbarLink>
                    </MDBNavbarItem>)}
                </MDBNavbarNav>
            </MDBCollapse>
        </MDBContainer>

    </MDBNavbar>
}

export default Header;