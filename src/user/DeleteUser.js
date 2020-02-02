import React,{Component} from 'react'
import {isAuthenticate,signout} from '../auth/index'
import {removeUser} from './apiUser'
import {Redirect} from 'react-router-dom'

class DeleteUser extends Component{
    constructor(props){
        super(props);
        this.state = {
            redirect: false
        }
    }
    deleteAccount = ()=>{
        const token = isAuthenticate().token;
        const userId = this.props.userId;
        removeUser(userId,token)
        .then(data=>{
            if (data.error){
                console.log(data.error);
            }
            else
            {
                //signout
                signout(()=>{

                });
                //redirect
                this.setState({
                    redirect:true
                })
            }
        })
        .catch(err=>console.log(err));
    }
    deleleConfirm = () =>{
        const answer = window.confirm("Are you sure want to delete your account?");
        if (answer){
            this.deleteAccount();
        }
    }
    render(){
        const {redirect} = this.state;
        if (redirect) {
            return (<Redirect to="/"></Redirect>)
        }
        return(
            <button className="btn btn-raised btn-danger" onClick={this.deleleConfirm}>
                                    Delete Profile
                                </button>
        );
    }
} 
export default DeleteUser;