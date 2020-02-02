import React, { Component } from 'react';
import {forgotPassword} from '../auth/'
class ForgotPassword extends Component {
    state = {
        email:'',
        message:'',
        error:''
      }
    handleChange = e=>{
        this.setState({
            email: e.target.value,
            message:"",
            error:""
        })
    }
    forgotPassword = (e)=>{
        e.preventDefault();
        forgotPassword(this.state.email)
        .then(data=>{
            if (!data.error){
                this.setState({message:data.message})
            }
            else{
                this.setState({error: data.error})
            }
        })
    }
    render() {
        const {message,error} = this.state;
        return (
            <>
                <div className ="container">
                    <h2 className="mt-5 mb-5">Reset password</h2>
                    {
                        message&&(
                            <h4 className="bg-success">{message}</h4>
                        )
                    }
                    {
                        error&&(
                            <h4 className="bg-warning">{error}</h4>
                        )
                    }
                    <form>
                        <div className="form-group mt-5">
                            <input
                                type="email"
                                className="form-control"
                                placeholder="Enter your email address"
                                name="email"
                                onChange={this.handleChange}
                                autoFocus
                                />
                        </div>
                        <button
                            onClick={this.forgotPassword}
                            className="btn btn-raised btn-primary"    
                        >
                            Send Password Rest Link
                        </button>

                    </form>

                </div>
            </>
        );
    }
}

export default ForgotPassword;