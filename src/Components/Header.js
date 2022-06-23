import React from "react";
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { RiGamepadLine } from 'react-icons/ri';
import Search from "./Search";
import {Link} from "react-router-dom";
import {connect} from "react-redux"
import SignInLinks from "./SignInLinks";
import SignOutLinks from "./SignOutLinks";

function Header(props) {
    const { auth, profile } = props;
    const links = auth.uid ? <SignInLinks profile={profile}/> : <SignOutLinks/>;
    return (
        <Navbar expand="lg" variant="dark" className="navb" fixed="top">
            <Link to={'/'}><Navbar.Brand><h1><RiGamepadLine/></h1><h1 className="logo">PAD</h1></Navbar.Brand></Link>
            <Navbar.Toggle aria-controls="basic-navbar-nav"/>
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <NavDropdown title="Games" id="basic-nav-dropdown">
                        <Link className="dropdown-item" to={'/PC'}>PC</Link>
                        <Link className="dropdown-item" to={'/PlayStation'}>PlayStation</Link>
                        <Link className="dropdown-item" to={'/Xbox'}>Xbox</Link>
                        <Link className="dropdown-item" to={'/Nintendo'}>Nintendo</Link>
                </NavDropdown>
                    <Link className="nav-link" to={'/Upcoming'}>Upcoming</Link>
                    <Link className="nav-link" to={'/Favorites'}>Favourites</Link>
                </Nav>
                <Search />
                {auth.isLoaded && links}
            </Navbar.Collapse>
        </Navbar>
    );
}
const mapStateToProps = (state) => {
    return{
        auth: state.firebase.auth,
        profile: state.firebase.profile
    }
}

export default connect(mapStateToProps)(Header);