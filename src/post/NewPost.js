import React, { Component } from 'react'
import { isAuthenticate } from '../auth/index'
import { create } from './apiPost'


class NewPost extends Component {
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
            open:false
        }
    }
    componentDidMount() {
        this.postData = new FormData();
        this.setState({ user: isAuthenticate().user });

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
            const userId = isAuthenticate().user._id;
            const token = isAuthenticate().token;
            console.log(this.postData);
            create(userId, token, this.postData)
                .then(data => {
                  
                    if (data.error) {
                        this.setState({
                            error: data.error
                        })
                    }
                    else {
                        console.log('New post has been create.-', data);
                        this.setState({loading:false, open: true})
                    }
                 
                })
        }
    }

    render() {
        const { error, loading, title, body,open} = this.state;
        return (
            <div className="container">
                <h2 className="mt-5 mb-5">Create a new post </h2>
                <div className="alert alert-primary" style={{ display: error ? "" : "none" }}>
                    {
                        error
                    }
                </div>
                <div className="alert alert-info" style={{ display: open ? "" : "none" }}>
                    New post has created.
                </div>
                {loading ? (
                    <h2>Loading ...</h2>
                ) : ("")}
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
                    <button onClick={this.clickSubmit} className="btn btn-raised btn-primary">Create Post </button>
                </form>

            </div>
        );
    }
}
export default NewPost;