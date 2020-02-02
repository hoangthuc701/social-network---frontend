import React, { Component } from 'react'
import { Redirect, Link } from 'react-router-dom'
import { signin, authenticate } from '../auth'
import SocialLogin from './SocialLogin'
class SignIn extends Component {
    constructor() {
        super();
        this.state = {
            password: "",
            email: "",
            error: "",
            redirctToReferer: false
        }
    }
    handleChange = name => event => {
        this.setState({
            [name]: event.target.value
        });
    }
    handleSubmit = event => {
        event.preventDefault();
        const { email, password } = this.state;
        const user = { email, password }
        signin(user)
            .then(data => {
                if (data.error) {
                    this.setState({
                        error: data.error
                    });
                    console.log(this.state.error);
                }
                else {
                    //authenticate
                    authenticate(data, () => {
                        this.setState({
                            redirctToReferer: true
                        })
                    });
                    //redirct

                }
            })
    }
   
    render() {
        const { error, email, password, redirctToReferer } = this.state;
        if (redirctToReferer) {
            return <Redirect to="/"></Redirect>
        }
        return (
            <div className="container mt-5 mb-5">
                <h2>Sign In</h2>
                <div className="alert alert-danger" style={{ display: error ? "" : "none" }}>
                    {
                        error
                    }
                </div>
                <form>
                    <div className="form-group">
                        <label className="text-muted">Email</label>
                        <input className="form-control" type="email" onChange={this.handleChange("email")} value={email}></input>
                    </div>
                    <div className="form-group">
                        <label className="text-muted">Password</label>
                        <input className="form-control" type="password" onChange={this.handleChange("password")} value={password}></input>
                    </div>
                    <button className="btn btn-primary btn-raised" onClick={this.handleSubmit}> Sign In</button>
                </form>

                <SocialLogin/>
                <p>
                    Or
                        <Link to='/forgot-password' className="text-danger">
                        {" "} Forgot Password
                        </Link>
                </p>
            </div>
        );
    }
}
export default SignIn;