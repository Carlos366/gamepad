import React from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { signOut } from "../Store/actions/AuthActions";
import Button from 'react-bootstrap/Button';

const SignInLinks = (props) => {
    return (
        <div>
               <a onClick={props.signOut}><Button variant="light mb-2 mt-3 my-md-0 px-5 px-md-2 ml-md-1 ml-lg-3 loginbtn">Log Out</Button></a>
                <NavLink to='/'><Button variant="light mb-2 mt-3 my-md-0 px-1 ml-2 loginbtn">{props.profile.initials}</Button></NavLink>
        </div>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        signOut: () => dispatch(signOut())
    }
}

export default connect(null, mapDispatchToProps)(SignInLinks)