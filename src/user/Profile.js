import React,{Component} from 'react'
import {isAuthenticate} from '../auth/index'
import {Redirect,Link} from 'react-router-dom'
import {read} from './apiUser'
import DeleteUser from './DeleteUser' 
import DefaultProfile from './../images/default-avatar.png'
import FollowButton from './FollowButton'
import ProfileTab from './ProfileTab'
import {listByUser} from '../post/apiPost'
class Profile extends Component{
    constructor(){
        super();
        this.state={
            user:{
                following:[],
                followers:[]
            },
            redirectToSignin:false,
            following:false,
            posts:[]
        }
    }
    //check follow
    checkfollow = user =>{
        const jwt = isAuthenticate();
        const match = user.followers.find(follower=>{
            return follower._id === jwt.user._id
        })
        return match;
    }
    clickFollowButton = callApi =>{
        const userId = isAuthenticate().user._id;
        const token = isAuthenticate().token;
        callApi(userId,token, this.state.user._id)
        .then(data=>{
            if (data.error){
                this.setState({
                    error:data.error
                })
            }
            else
            {
                this.setState({
                    user:data,
                    following: !this.state.following
                })
            }
        })

    }
    init = userId =>{
        read(userId, isAuthenticate().token)
        .then(data=>{
            if (!data.error){
                let following = this.checkfollow(data);
                this.setState({
                    user:data,
                    following
                })
                this.loadPost(data._id);
            }
            else{
                //console.log(data);
                this.setState({
                   redirectToSignin:true 
                });
            }

        })
        .catch(err=>console.log(err));
    }
    loadPost(userId){
        listByUser(userId)
        .then(data=>{
            if (!data.error)
            {
                this.setState({
                    posts:data
                })
              
            }
            else console.log(data.error);
        })
    }

    componentDidMount(){
        const userId = this.props.match.params.userId;
        this.init(userId);
    }
    componentWillReceiveProps(props){
        const userId = props.match.params.userId;
        this.init(userId);
    }
    render(){
        const {redirectToSignin,user, following} =  this.state;
        const photoUrl = this.state.user._id ? `http://localhost:8080/user/photo/${this.state.user._id}?${new Date().getTime()}`:DefaultProfile;
        if (redirectToSignin){
            return <Redirect to="/signin"></Redirect>
        }
        return(
           
            
            <div className="container">
                 <h2 className="mt-5 mb-5">Profile</h2>
                 <div className="row">
                    <div className="col-md-6">
                        <img className="card-img-top" src={photoUrl} alt={user.name}
                        onError={i => (i.target.src=`${DefaultProfile}` )}
                        style={{
                            width:"100%",
                            height:"15vw",
                            objectFit:"cover"
                        }}/>
                       
                    </div>
                    <div className="col-md-6 lead">
                  
                            <p> Hello {user.name}</p>
                            <p> Hello {user.email}</p>
                            <p>{`Join ${new Date(user.created).toDateString()}`}</p>
                      
                       {isAuthenticate()&&isAuthenticate().user._id===user._id?(
                            <div className="d-inline-block mt-5">
                                <Link to={`/post/create`} className="btn btn-raised btn-info mr-5">
                                    Create Post
                                </Link>
                                <Link to={`/user/edit/${user._id}`} className="btn btn-raised btn-success mr-5">
                                    Edit Profile
                                </Link>
                               <DeleteUser userId={user._id}/>
                            </div>
                       ):<FollowButton 
                       following={following} 
                       onButtonClick = {this.clickFollowButton}
                       /> }


                    </div>
                </div>
                <div className="row">
                    <div className="col md-12 mt-5">
                        <hr/>
                        <p className="lead">
                            {user.about}
                        </p>
                        <hr/>
                       
                       <ProfileTab followers={this.state.user.followers}
                                following ={this.state.user.following}
                                posts = {this.state.posts}
                       />

                    </div>
                </div>
            </div>
        );
    }
}

export default Profile;