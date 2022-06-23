import React from 'react'
import { NavLink } from 'react-router-dom'
import Button from 'react-bootstrap/Button';

const SignOutLinks = () => {
    return (
        <div>
                <NavLink to='/Login'><Button variant="light mb-2 mt-3 my-md-0 px-5 px-md-2 ml-md-1 ml-lg-3 loginbtn">LOG IN</Button></NavLink>
        </div>
    )
}

export default SignOutLinks