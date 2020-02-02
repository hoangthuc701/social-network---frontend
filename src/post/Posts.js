import React, { Component } from 'react'
import { getlist } from './apiPost'
import { Link } from 'react-router-dom'
import DefaultProfile from '../images/default-avatar.png'
import { isAuthenticate } from '../auth/index'
class Posts extends Component {
    constructor() {
        super();
        this.state = {
            posts: [],
            page:1
        }
    }

    loadPosts= page =>{
        const token = isAuthenticate().token;
        getlist(token,page).then(data => {
            if (!data.error)
                this.setState({
                    posts: data
                })
        })
        .catch(err => console.log(err));
    }
    componentDidMount() {
        this.loadPosts(this.state.page);
    }
    loadMore = number =>{
        this.setState({page: this.state.page+number})
        this.loadPosts(this.state.page+number);
    }
    loadLess = number =>{
        this.setState({page: this.state.page-number})
        this.loadPosts(this.state.page-number);
    }
    renderPost = posts => {
        return (
            <>
                <div className="row">
                    {posts.map((post, id) => {
                        const posterId = post.postedBy ? post.postedBy._id : "";
                        const posterName = post.postedBy ? post.postedBy.name : "Unknown";
                        return (
                            <div className="card col-md-4" key={id}>
                                <img className="card-img-top" src={`${process.env.REACT_APP_API_URL}/post/photo/${post._id}`}
                                    onError={i => (i.target.src = `${DefaultProfile}`)} alt={post.title}
                                    style={{
                                        width: "100%",
                                        height: "15vw",
                                        objectFit: "cover"
                                    }} />
                                <div className="card-body">
                                    <h5 className="card-title"> {post.title}   </h5>
                                    <p className="card-text">
                                        {post.body.substring(0,100)}
                                    </p>
                                    <br />
                                    <p className="">
                                        Posted by {' '}
                                        {
                                            (posterId !== "") ? <Link
                                                to={`/user/${posterId}`} style={{ color: "red" }}>
                                               {posterName}
                                            </Link>:<p >{posterName}</p>
                                        }
                                        {' '}
                                        on
                                        {' '}
                                        {new Date(post.created).toDateString()}
                                    </p>

                                    <Link className="btn btn-primary btn-raised"
                                        to={`/post/${post._id}`} style={{ color: "#fff" }}>
                                        Read more
                                    </Link>

                                </div>
                            </div>

                        )
                    })
                    }
                </div>
            </>
        );
    }
    render() {
        const { posts,page } = this.state;
        return (
            <div className="container">
                <div className="mb-5 mt-5">
                    {!posts.length?"No more posts!":"Recent Posts"}
                </div>
                {this.renderPost(posts)}
                {page>1?(
                    <button className="btn btn-raised btn-warning mr-5 mt-5 mb-5"
                            onClick={()=> this.loadLess(1)}
                    >
                        Previous ({page-1})
                    </button>
                ):("")}
                {posts.length ? (
                    <button
                        className="btn btn-raised btn-success mt-5 mb-5"
                        onClick={() => this.loadMore(1)}
                    >
                        Next ({page + 1})
                    </button>
                ) : (
                    ""
                )}
            </div>
        );
    }
}
export default Posts;