import React from 'react'
import {Route, Switch} from 'react-router-dom'
import Home from './core/Home'
import SingUp from './user/SignUp'
import SignIn from './user/SignIn'
import Menu from './core/Menu'
import Profile from './user/Profile'
import Users from './user/Users'
import EditProfile from './user/EditProfile'
import PrivateRoute from './auth/PrivateRoute'
import FindPeople from './user/findPeople'
import NewPost from './post/NewPost';
import SinglePost from './post/SinglePost'
import EditPost from './post/EditPost'
import ForgotPassword from './user/ForgotPassword'
import ResetPassword from './user/ResetPassword'
const MainRouter = () => 
(
    <div className="container">
        <Menu/>
        <Switch>
            <Route exact path="/" component={Home} ></Route>
            <Route exact path="/users" component={Users}></Route>
            <Route exact path='/signup' component={SingUp}></Route>
            <Route exact path="/signin" component={SignIn}></Route>
            <Route exact path="/forgot-password" component={ForgotPassword}></Route>
            <Route exact path="/reset-password/:resetPasswordToken" component={ResetPassword}></Route>
            <PrivateRoute exact path="/post/create" component={NewPost}></PrivateRoute>
            <Route exact path="/post/:postId" component={SinglePost}></Route>
            <PrivateRoute exact path="/user/:userId" component={Profile}></PrivateRoute>
            <PrivateRoute exact path="/user/edit/:userId" component={EditProfile}></PrivateRoute>
            <PrivateRoute exact path="/post/edit/:postId" component={EditPost}></PrivateRoute>
            <PrivateRoute exact path="/findpeople" component={FindPeople}></PrivateRoute>
        </Switch>
    </div>
)
export default MainRouter;
