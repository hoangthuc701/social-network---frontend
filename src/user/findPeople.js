import React, { Component } from 'react'
import { findPeople } from './apiUser'
import { Link } from 'react-router-dom'
import DefaultProfile from '../images/default-avatar.png'
import { isAuthenticate } from './../auth/index'

class User extends Component {
    constructor() {
        super();
        this.state = {
            users: []
        }
    }

    componentDidMount() {
        const userId = isAuthenticate().user._id;
        const token = isAuthenticate().token;
        findPeople(userId, token).then(data => {
            if (!data.error)
                this.setState({
                    users: data || []
                });
        })
            .catch(err => console.log(err));
    }
    renderUser = users => {
        return (
            <>
                <div className="row">
                    {users.map((user, id) => (
                        <div className="card col-md-4" key={id}>
                            <img className="card-img-top" src={`http://localhost:8080/user/photo/${user._id}`}
                                onError={i => (i.target.src = `${DefaultProfile}`)} alt={user.name}
                                style={{
                                    width: "100%",
                                    height: "15vw",
                                    objectFit: "cover"
                                }} />
                            <div className="card-body">
                                <h5 className="card-title"> {user.name}   </h5>
                                <p className="card-text">
                                    {user.email}
                                </p>

                                <Link to={`user/${user._id}`} style={{ color: "#fff" }} className="btn btn-primary btn-raised">
                                    View Profile
                            </Link>

                                <button className="btn btn-raised float-right btn-infor">
                                    Follow
                        </button>
                            </div>
                        </div>
                    ))
                    }
                </div>
            </>
        );
    }
    render() {
        const { users } = this.state;
        return (
            <div className="container">
                <div className="mb-5 mt-5">Users</div>
                {this.renderUser(users)}
            </div>

        );
    }
}
export default User;