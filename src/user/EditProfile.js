import React,{Component} from 'react'
import {isAuthenticate} from '../auth/index'
import {read, update,updateUser} from './apiUser'
import {Link, Redirect} from 'react-router-dom'
import DefaultProfile from '../images/default-avatar.png'


class EditProfile extends Component{
    constructor(){
        super();
        this.state={
            id:"",
            password:"",
            email:"",
            name:"",
            error:"",
            redirectToProfile:false,
            loading:false,
            fileSize:0,
            about:""
        }
    }
    init = userId =>{
        read(userId, isAuthenticate().token)
        .then(data=>{
            console.log(data);
            if (!data.error){
                this.setState({
                    id:data._id,
                    password:data.password,
                    email:data.email,
                    name:data.name,
                    about:data.about
                })
            }
            else{
                updateUser(data,()=>{
                     //console.log(data);
                    this.setState({
                        redirectToProfile:true 
                    });
                })
               
            }

        })
        .catch(err=>console.log(err));
    }
    componentDidMount(){
        this.userData = new FormData();
        const userId = this.props.match.params.userId;
        this.init(userId);
    }
    isValid  =()=>{
        const {email,name,fileSize} = this.state;
        if (fileSize >100000)
        {
            this.setState({
                error:"File size should be less than 100kb "
            });
            return false;
        }
        if (name.length ===0)
        {
            this.setState({
                error:"Name is required."
            });
            return false;
        }
        var re = /\S+@\S+\.\S+/;
        if (!re.test(email))
        {
            this.setState({
                error:"Email is required."
            });
            return false;
        }
        return true;
    }
    handleChange = name => (event)=>{
        const value = name === 'photo'? event.target.files[0]:event.target.value;
        const fileSize = name === 'photo'? event.target.files[0].size:0;
        this.userData.set(name,value);
        this.setState({
            [name]:value,
            fileSize,
            error:""
        })
    }
    clickSubmit = event =>{
        this.setState({
            loading:true
        })
        event.preventDefault();
        if (this.isValid()){
             //console.log(this.userData);
            const userId = this.props.match.params.userId;
            const token = isAuthenticate().token;
            update(userId, token,this.userData)
            .then(data=>{
                if (data.error){
                    this.setState({
                        error: data.error,
                        open:false
                    })
                }
                else{
                    this.setState({
                        redirectToProfile:true 
                })
                }
            })
        }
    }
   
    render(){
        const {error,open, redirectToProfile,id,loading} = this.state;
        if (redirectToProfile)
        {
            return (<Redirect to={`/user/${id}`}></Redirect>);
        }
        const photoUrl = id ? `http://localhost:8080/user/photo/${id}?${new Date().getTime()}`:DefaultProfile;
        return(
            <div className="container">
                <h2 className="mt-5 mb-5">Edit Profile </h2>
                <div className="alert alert-primary" style={{display:error?"":"none"}}>
                    {
                        error
                    }
                </div>
                <div className="alert alert-info" style={{display:open?"":"none"}}>
                    New account has created. Please <Link to='/signin'>Sign In</Link>
                </div> 
                {loading?(
                    <h2>Loading ...</h2>
                ):("")}
                <form>
                <div className="form-group">
                        <label className="text-muted">Photo Profile </label>
                        <br/>
                        <input onChange={this.handleChange("photo")} type="file" accept="image/*"></input>
                    </div>
                    <img style={{height:"200px", width:"auto"}}
                    className="img-thumbnail" src={photoUrl} alt={this.state.name}/>
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
                    <div className="form-group">
                        <label className="text-muted">About: </label>
                        <textarea onChange={this.handleChange("about")} type="type" className="form-control" value={this.state.about}></textarea>
                    </div>
                    <button onClick={this.clickSubmit} className="btn btn-raised btn-primary">Update </button>
                </form>

            </div>
        );
    }
}
export default EditProfile;