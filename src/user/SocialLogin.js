import React, { Component } from 'react';
import {socialLogin, authenticate} from './../auth'
import FacebookLogin from 'react-facebook-login';
import {Link, Redirect} from 'react-router-dom'
class SocialLogin extends Component {
    constructor(props){
        super(props);
        this.state={
            redirectToHome: false
        }
    }
    responseFacebook = (response) => {
        const {email,name} = response;
        const password = response.userID;
        const imageUrl = response.picture.data.url;
        const user = {email,password,name,imageUrl};
        socialLogin(user)
        .then(data=>{
            if (!data.error){
                console.log("login success");
                authenticate(data,()=>{
                    this.setState({redirectToHome:true})
                })
                
            }
            else 
            {
                window.alert("Error login. Please try again....");
            }
        })

    }
    render() {
        const {redirectToHome} = this.state;
        if (redirectToHome) return <Redirect to='/'/>
        return (
            <FacebookLogin
            appId="2509195039119916" 
            fields="name,email,picture"
            callback={this.responseFacebook}
        />         
        );
    }
}

export default SocialLogin;