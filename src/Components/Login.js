import React, {Component} from "react";
import {connect} from "react-redux";
import {signIn} from "../Store/actions/AuthActions";
import Header from "./Header";
import {Link, Redirect} from "react-router-dom";

class Login extends Component {
    state = {
        email: '',
        password: ''
    }
    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        this.props.signIn(this.state)
    }
    render() {
        const { authError, auth } = this.props;
        if (auth.uid) return <Redirect to='/' />
        return (
        <div className="body">
        <Header/>
        <div className="login" >

                <div className="login-dark p-3">
                    <div className="pt-3">
                        <h2 className="text-white ">Log In</h2>
                    </div>
                    <form onSubmit={this.handleSubmit} className="mt-5">
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input type="email" id="email"  onChange={this.handleChange} className="form-control form-control-sm bg-light"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input type="password" id="password" className="form-control form-control-sm bg-light" onChange={this.handleChange}/>
                        </div>
                        <div className="mt-5">
                            <button className="btn btn-sm btn-light col log">
                                Log in
                            </button>
                            <div>{authError ? <p>{authError}</p> : null}</div>
                            <div className="mt-5">
                                <p className="text-white text-center">
                                    Don't have an account?
                                    <Link to="/signUp" className="text-white">Click here to register</Link>
                                </p>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )}
}
const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth,
        authError: state.auth.authError
    }
}
const mapDispatchToProps = (dispatch) =>{
    return {
        signIn: (creds) => dispatch(signIn(creds))
    }
}

export default connect(mapStateToProps,mapDispatchToProps) (Login);