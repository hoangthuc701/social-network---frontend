import React, { Component } from 'react';
import { getsinglepost, remove, like, unlike } from './apiPost'
import { Link } from 'react-router-dom'
import DefaultProfile from '../images/default-avatar.png'
import { isAuthenticate } from '../auth/index'
import { Redirect } from 'react-router-dom'
import Comment from './Comment'
class SinglePost extends Component {
    constructor(props) {
        super(props);
        this.state = {
            post: {
                likes: []
            },
            loading: false,
            remove: false,
            like: false,
            likes: 0,
            redirectToSignIn:false,
            comments:[]
        }
    }
    checkLike = (likes) => {
        const userId = isAuthenticate()&&isAuthenticate().user._id;
        let match = likes.indexOf(userId) !== -1;
        return match;
    }
    componentDidMount() {
        const postId = this.props.match.params.postId;
        this.setState({ loading: true });

        getsinglepost(postId)
            .then(data => {
                if (!data.error) {
                    this.setState({
                        post: data,
                        likes: data.likes.length,
                        like: this.checkLike(data.likes),
                        comments:data.comments,
                    })
                }
                else console.log(data.error);
                this.setState({ loading: false });
            })
    }
    deletePost = () => {
        const token = isAuthenticate().token;
        const postId = this.props.match.params.postId;
        if (window.confirm("Do you want to delete this post?")) {
            remove(postId, token)
                .then(data => {
                    if (!data.error) {
                        this.setState({ remove: true })
                    }
                    else {
                        console.log(data.error);
                    }
                })
        }
    }
    likeToggle = () => {
        if (!isAuthenticate()){
            this.setState({redirectToSignIn:true})
            return false;
        }
        let callApi = !this.state.like ? like : unlike;
        const token = isAuthenticate().token;
        const userId = isAuthenticate().user._id;
        const postId = this.state.post._id;
        callApi(userId, token, postId)
            .then(data => {
                if (!data.error) {
                    this.setState({
                        like: !this.state.like,
                        likes: data.likes.length
                    })

                }
            })
    }
    renderPost = post => {
        const posterId = post.postedBy ? post.postedBy._id : "";
        const posterName = post.postedBy ? post.postedBy.name : "Unknown";
        const { likes } = this.state;

        return (
            <>

                <div className="row">
                    <img className="card-img-top" src={`${process.env.REACT_APP_API_URL}/post/photo/${post._id}`}
                        onError={i => (i.target.src = `${DefaultProfile}`)} alt={post.title}
                        style={{
                            width: "100%",
                            height: "200px",
                            objectFit: "cover",
                        }} />


                    <div className="card-body">

                        {likes ?
                            (
                                <h3 onClick={this.likeToggle}>
                                    <i className="fa fa-thumbs-up text-success bg-dark" style={{
                                        padding:"10px", borderRadius:"50%"
                                    }}/>{likes} {' '}
                                    Like
                                </h3>
                            )
                            :
                            (
                                <h3 onClick={this.likeToggle}>
                                <i className="fa fa-thumbs-up  bg-dark" style={{
                                    padding:"10px", borderRadius:"50%",color:"white"
                                }}/> {likes} {' '}
                                Like
                                 </h3>
                            )
                        }

                        <p className="card-text">
                            {post.body}
                        </p>
                        <br />
                        <p className="">
                            Posted by {' '}
                            {
                                (posterId !== "") ? <Link
                                    to={`/user/${posterId}`} style={{ color: "red" }}>
                                    {posterName}
                                </Link> : <p >{posterName}</p>
                            }
                            {' '}
                            on
                                    {' '}
                            {new Date(post.created).toDateString()}
                        </p>


                   

                    {
                        isAuthenticate() && isAuthenticate().user._id === posterId &&
                        (
                            <div className="d-inline-block ">


                                <Link className="btn btn-raised btn-primary btn-sm mr-5"
                                    to={`/post/edit/${post._id}`}
                                >
                                    Update
                                    </Link>

                                <button onClick={this.deletePost} className="btn btn-raised btn-warning btn-sm">
                                    Delete
                                </button>
                            </div>
                        )
                    }
                     </div>


                </div>


            </>
        );
    }
    updateComments = comments =>{
        this.setState({comments:comments})
    }
    render() {
        const { post, loading, remove, redirectToSignIn,comments } = this.state;
        const tmp= [...comments];
        if (remove) return <Redirect to={`/`}></Redirect>
        if (redirectToSignIn) return <Redirect to={'/signin'}></Redirect>
        return (
            (loading === false ? (<>
                <h2>{post.title}</h2>
                {this.renderPost(post)}
                <Comment postId={post._id} comments={tmp.reverse()} updateComments={this.updateComments}/>

            </>) : <h2 className="text-center">Loading...</h2>)

        );
    }
}

export default SinglePost;