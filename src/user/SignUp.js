import React, {Component} from 'react';
import {signup} from '../auth/index'
import {Link} from 'react-router-dom'
class SignUp extends Component{
    constructor()
    {
        super();
        this.state={
            password:"",
            email:"",
            name:"",
            error:"",
            open:false
        }
    }
    handleChange = name => (event)=>{
        this.setState({
            error:""
        })
        this.setState({
            [name]:event.target.value
        })
    }
    clickSubmit = event =>{
        event.preventDefault();
        const {email,password,name}= this.state;
        const user = {
            email,
            password,
            name
        };
        //console.log(user);
        signup(user)
        .then(data=>{
            if (data.error){
                this.setState({
                    error: data.error,
                    open:false
                })
            }
            else{
                this.setState({
                    password:"",
                    email:"",
                    error:"",
                    name:"",
                    open:true
                })
            }
        })
    }
    render(){
        const {error,open} = this.state;
        return(
            <div className="container">
                <h2 className="mt-5 mb-5">Sign Up</h2>
                <div className="alert alert-primary" style={{display:error?"":"none"}}>
                    {
                        error
                    }
                </div>
                <div className="alert alert-info" style={{display:open?"":"none"}}>
                    New account has created. Please <Link to='/signin'>Sign In</Link>
                </div>
                <form>
                
                    <div className="form-group">
                        <label className="text-muted">Email: </label>
                        <input onChange={this.handleChange("email")} type="email" className="form-control" value={this.state.email}></input>
                    </div>
                    <div className="form-group">
                        <label className="text-muted">Name: </label>
                        <input onChange={this.handleChange("name")} type="type" className="form-control" value={this.state.name}></input>
                    </div>
                    
                    <div className="form-group">
                        <label className="text-muted">Password </label>
                        <input onChange={this.handleChange("password")} type="password" className="form-control" value={this.state.password}></input>
                    </div>
                    <button onClick={this.clickSubmit} className="btn btn-raised btn-primary">Submit </button>
                </form>

            </div>
        );
    }
}
export default SignUp;