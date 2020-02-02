import React from 'react'
import {Route,Redirect} from 'react-router-dom'
import {isAuthenticate} from './../auth/index'


const PrivateRoute =({component:Component,...rests}) =>(
    <Route {...rests} render={props => isAuthenticate()?(
        <Component {...props}/>
    ):(
        <Redirect to={{pathname:"/signin", state:{from: props.location}}}/>
    )} ></Route>
)
export default PrivateRoute;