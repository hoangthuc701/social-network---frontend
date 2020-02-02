import React, { Component } from 'react';
import { comment, uncomment } from './apiPost'
import { isAuthenticate } from '../auth/'
import { Link, Redirect } from 'react-router-dom'
import DefaultProfile from '../images/default-avatar.png'
class Comment extends Component {
        state = {
            text: "",
            error: "",
            redirectToLogin: false
        }
    handleChange = (event) => {
        this.setState({
            text: event.target.value,
            error: ""
        })
    }
    isValid = () => {
        const { text } = this.state;
        if (text.length === 0 || text.length > 150) {
            this.setState({
                error: "Comment should not be empty and less than 150 characters long."
            })
            return false;
        }
        return true;
    }
    addComment = (event) => {
        event.preventDefault();
        if (!isAuthenticate()) {
            this.setState({
                redirectToLogin: true
            })
            return false;
        }
        if (this.isValid()) {
            const userId = isAuthenticate().user._id;
            const token = isAuthenticate().token;
            const postId = this.props.postId;
            const commentdata = { text: this.state.text };
            comment(userId, token, postId, commentdata)
                .then(data => {
                    if (!data.error) {
                        this.setState({ text: "" });
                        this.props.updateComments(data.comments);
                    }
                    else console.log(data.error);
                })
        }
    }
    deleteComment = (comment) => {
        //console.log("Run");
        const userId = isAuthenticate().user._id;
        const token = isAuthenticate().token;
        const postId = this.props.postId;
        uncomment(userId, token, postId, comment)
            .then(data => {
                if (!data.error) {
                    this.props.updateComments(data.comments);
                }
                else console.log(data.error);
            })
    }
    deleteConfirmed = (comment) => {
        let answer = window.confirm("Are you want to delete your comment?");
        if (answer===true) {
            this.deleteComment(comment);
        }
    }
    renderComments = comments => {
        return (
            <>
                <h3 className="text-primary"> {comments.length} Components</h3>
                <hr />
                {
                    comments.map((comment, id) => {
                        return (
                            <div key={id}>
                                <Link to={`/user/${comment.postedBy._id}`}>
                                    <img
                                        style={{
                                            borderRadius: "50%",
                                            border: "1px solid black"
                                        }}
                                        className="float-left mr-2"
                                        height="30px"
                                        width="30px"
                                        onError={i => (i.target.src = `${DefaultProfile}`)}
                                        src={`${process.env.REACT_APP_API_URL}/user/photo/${comment.postedBy._id}`}
                                        alt={comment.postedBy.name}
                                    />
                                </Link>
                                <p className="lead">{comment.text}</p>
                                <span>
                                    {
                                        isAuthenticate() && isAuthenticate().user._id === comment.postedBy._id &&
                                        (
                                            <div className="d-inline-block ">
                                                <Link 
                                                    onClick={() => this.deleteConfirmed(comment) 
                                                    }
                                                    className="text float-right"
                                                >
                                                    Remove
                                                </Link>
                                            </div>
                                        )
                                    }
                                </span>
                            </div>

                        );
                    })
                }
            </>
        )
    }
    render() {
        const { comments } = this.props;
        const { text, error, redirectToLogin } = this.state;
        if (redirectToLogin) return <Redirect to={'/signin'}></Redirect>
        return (
            <>
                <form onSubmit={this.addComment}>
                    <div className="form-group">
                        <input type="text" className="form-control mb-2" onChange={this.handleChange} value={text}
                            placeholder="Leave a comment..." />
                        <button className="btn btn-raised btn-success">POST</button>
                    </div>
                </form>
                <div className="alert alert-danger" style={{ display: error ? "" : "none" }}>
                    {error}
                </div>
                {this.renderComments(comments)}
            </>
        );
    }
}

export default Comment;