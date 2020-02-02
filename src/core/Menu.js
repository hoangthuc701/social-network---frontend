import React from 'react'
import {Link, withRouter} from 'react-router-dom'
import {signout,isAuthenticate} from '../auth/index'
const isActive = (history,path) =>{
    console.log(history);
    if (history.location.pathname === path) return {color: "#ff9900"}
    return {color:"#ffffff"}
}



const Menu = ({history}) =>(
    <div>
        <ul className="nav nav-tabs bg-primary">
            <li className="nav-item">
                <Link className="nav-link" to="/" style={isActive(history,"/")} >Home</Link>
            </li>    
            <li className="nav-item">
                <Link className="nav-link" to="/users" style={isActive(history,"/users")} >Users</Link>
            </li>    


            {(!isAuthenticate())&&(
                <React.Fragment>
                     <li className="nav-item">
                        <Link className="nav-link" to="/signin" style={isActive(history,"/signin")}>Sign In</Link>
                    </li>    
      
       
                    <li className="nav-item">
                        <Link className="nav-link" to="/signup" style={isActive(history,"/signup")}>Sign Up</Link>
                    </li>    
                </React.Fragment>
            )}
        
           {(isAuthenticate())&&(
               <React.Fragment>

                <li className="nav-item">
                    
                        <Link  className="nav-link"  to={`/user/${isAuthenticate().user._id}`}
                                style={(isActive(history,`/user/${isAuthenticate().user._id}`))}
                        >
                            {`${isAuthenticate().user.name}'s profile`}
                        </Link>
                       
                </li>     
                <li className="nav-item">
                    
                        <Link  className="nav-link"  to={`/findpeople`}
                                style={(isActive(history,`/findpeople`))}
                        >
                            {`Find People`}
                        </Link>
                       
                </li>       
                
                <li className="nav-item">
                    <Link
                    to={{}}
                    className="nav-link"  
                    style={(isActive(history,"/signout"),{cursor:"pointer", color:"#fff"})} 
                    onClick={()=>signout(()=>history.push("/"))}
                    >Sign Out</Link>
                </li>    
               </React.Fragment>
           )}
        </ul>
    </div>
)
export default withRouter(Menu);