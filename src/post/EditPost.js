import React, { Component } from 'react';
import { isAuthenticate } from '../auth/index'
import { getsinglepost, update } from './apiPost'
import DefaultProfile from '../images/default-avatar.png'

class EditPost extends Component {
    constructor() {
        super();
        this.state = {
            title: '',
            body: '',
            photo: '',
            error: '',
            user: {},
            fileSize: 0,
            loading: false,
            open: false,
            id: ''
        }
    }
    initPost = () => {
        const postId = this.props.match.params.postId;
        getsinglepost(postId)
            .then(data => {
                if (!data.error) {
                    this.setState({
                        title: data.title,
                        body: data.body,
                        photo: data.photo,
                        id: data._id
                    })
                }
                else {
                    console.log(data.error);
                }
                console.log(data);
            })

    }
    componentDidMount() {
        this.postData = new FormData();
        this.setState({ user: isAuthenticate().user });
        this.initPost();

    }
    isValid = () => {
        const { fileSize, title, body } = this.state;
        if (fileSize > 100000) {
            this.setState({
                error: "File size should be less than 100kb "
            });
            return false;
        }
        if (title.length === 0 || body.length === 0) {
            this.setState({
                error: "All fields are required."
            });
            return false;
        }

        return true;
    }
    handleChange = name => (event) => {
        const value = name === 'photo' ? event.target.files[0] : event.target.value;
        const fileSize = name === 'photo' ? event.target.files[0].size : 0;
        this.postData.set(name, value);
        this.setState({
            [name]: value,
            fileSize,
            error: ""
        })

    }
    clickSubmit = event => {
        this.setState({
            loading: true
        })
        event.preventDefault();
        if (this.isValid()) {
            const postId = this.props.match.params.postId;
            const token = isAuthenticate().token;

            update(postId, token, this.postData)
                .then(data => {


                    if (data.error) {
                        this.setState({
                            error: data.error
                        })
                    }
                    else {
                        console.log('Post has been updated.-', data);
                        this.setState({ loading: false, open: true })
                    }

                })
        }
    }

    render() {
        const { error, loading, title, body, open, id } = this.state;
        return (
            <div className="container">
                <h2 className="mt-5 mb-5">Update post </h2>
                <div className="alert alert-primary" style={{ display: error ? "" : "none" }}>
                    {
                        error
                    }
                </div>
                <div className="alert alert-info" style={{ display: open ? "" : "none" }}>
                    Post has been updated.
                </div>
                {loading ? (
                    <h2>Loading ...</h2>
                ) : ("")}

                <img className="card-img-top" src={`${process.env.REACT_APP_API_URL}/post/photo/${id}`}
                    onError={i => (i.target.src = `${DefaultProfile}`)} alt={title}
                    style={{
                        width: "50%",
                        height: "50%",
                        objectFit: "cover",
                    }} />
                <form>
                    <div className="form-group">
                        <label className="text-muted">Photo Profile </label>
                        <br />
                        <input onChange={this.handleChange("photo")} type="file" accept="image/*"></input>
                    </div>

                    <div className="form-group">
                        <label className="text-muted">Title: </label>
                        <input onChange={this.handleChange("title")} type="type" className="form-control" value={title}></input>
                    </div>
                    <div className="form-group">
                        <label className="text-muted">Body: </label>
                        <textarea onChange={this.handleChange("body")} type="type" className="form-control" value={body}></textarea>
                    </div>
                    <button onClick={this.clickSubmit} className="btn btn-raised btn-primary">UPDATE POST</button>
                </form>

            </div>
        );
    }
}

export default EditPost;