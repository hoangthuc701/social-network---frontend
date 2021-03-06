import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import DefaultProfile from './../images/default-avatar.png';
class ProfileTab extends Component {

    render() {
        const { following, followers, posts } = this.props;
        return (

            <div>
                <div className="row">
                    <div className="col-md-4">
                        <h3 className="text-primary"> Follwers</h3>

                        {followers.map((person, index) => (
                            <div key={index}>

                                <div>
                                    <Link to={`/user/${person._id}`}>
                                        <img className="float-left mr-2"
                                            style={{ borderRadius: "50%", border: "1px solid black" }}
                                            height="30px"
                                            width="30px"
                                            src={`http://localhost:8080/user/photo/${person._id}`}
                                            alt={person.name}
                                            onError={i => (i.target.src = `${DefaultProfile}`)}
                                        />
                                        <div>
                                            <p className="lead">{person.name}</p>
                                        </div>
                                    </Link>
                                </div>

                            </div>
                        )
                        )}
                    </div>
                    <div className="col-md-4">
                        <h3 className="text-primary"> Following</h3>

                        {following.map((person, index) => (
                            <div key={index}>

                                <div>
                                    <Link to={`/user/${person._id}`}>
                                        <img className="float-left mr-2"
                                            style={{ borderRadius: "50%", border: "1px solid black" }}
                                            height="30px"
                                            width="30px"
                                            src={`http://localhost:8080/user/photo/${person._id}`}
                                            alt={person.name}
                                            onError={i => (i.target.src = `${DefaultProfile}`)}
                                        />
                                        <div>
                                            <p className="lead">{person.name}</p>
                                        </div>
                                    </Link>
                                </div>

                            </div>
                        )
                        )}
                    </div>
                    <div className="col-md-4">
                        <h3 className="text-primary"> Posts</h3>
                        {posts.map((post, id) => {
                            return (
                                <div key={id}>
                                    <Link to={`/post/${post._id}`}>
                                       
                                        <div>
                                            <p className="lead">{post.title}</p>
                                        </div>
                                    </Link>
                                </div>
                            )
                        })
                        }
                    </div>
                </div>

            </div>

        );
    }
}
export default ProfileTab;