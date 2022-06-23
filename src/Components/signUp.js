import React, { Component } from "react";
import {Link, Redirect} from "react-router-dom";
import {signUp} from "../Store/actions/AuthActions";
import { connect } from 'react-redux'
import Header from "./Header";

class SignUp extends Component {
    state = {
        email: '',
        password: '',
        firstName: '',
        lastName: '',
    }
    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.signUp(this.state)
    }
    render() {
        const { auth, authError } = this.props;
        if (auth.uid) return <Redirect to='/' />
    return (
        <div className="body">
            <Header/>
        <div className="login" >
            <div className="login-dark p-3">
                <div className="pt-3">
                    <h2 className="text-white ">Sign Up</h2>
                </div>
                <form onSubmit={this.handleSubmit} className="mt-5">
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" onChange={this.handleChange} className="form-control form-control-sm bg-light"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" onChange={this.handleChange} className="form-control form-control-sm bg-light"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="firstName">First Name</label>
                        <input type="text" id="firstName" onChange={this.handleChange} className="form-control form-control-sm bg-light"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="lastName">Last Name</label>
                        <input type="text" id="lastName" onChange={this.handleChange} className="form-control form-control-sm bg-light"/>
                    </div>
                    <div className="mt-5">
                        <button className="btn btn-sm btn-light col log">
                            Sign Up
                        </button>
                        <div >
                            { authError ? <p>{authError}</p> : null }
                        </div>
                    </div>
                    <div className="mt-5">
                        <p className="text-white text-center">
                            Already have an account?
                            <Link to="/login" className="text-white">Click here to log in</Link>
                        </p>
                    </div>
                </form>
            </div>
        </div></div>
 )};
}
const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth,
        authError: state.auth.authError
    }
}

const mapDispatchToProps = (dispatch)=> {
    return {
        signUp: (creds) => dispatch(signUp(creds))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp)