export const signup = user =>{
    
    return fetch(`${process.env.REACT_APP_API_URL}/signup`,{
        method:"POST",
        headers:{
            Accept: "application/json",
            "Content-Type":"application/json",
            'Access-Control-Allow-Origin':"'http://localhost:3000'"
        },
        body: JSON.stringify(user)
    }).then(respone=>{
        return respone.json();
    })
    .catch(err=> console.log(err));
}
export const signin = user=>{
    return fetch(`${process.env.REACT_APP_API_URL}/signin`,{
        method:"POST",
        headers:{
            Accepted: "application/json",
            'Content-Type':"application/json"
        },
        body:JSON.stringify(user)
    })
    .then(respond=>respond.json())
    .catch(err=>console.log(err));
}
export const  authenticate= (jwt,next)=>{
    if (typeof window !=="undefined"){
        localStorage.setItem("jwt",JSON.stringify(jwt))
        next();
    }
}
export const signout = (next)=>{
    if (typeof window !=='undefined'){
        localStorage.removeItem('jwt');
        next();
        return fetch(`${process.env.REACT_APP_API_URL}/signout`,{
            method:"GET"
        })
        .then(respone =>{
            return respone.json();
        })
        .catch(err=> console.log(err));
    }
}
export const isAuthenticate = () =>{
    if (typeof window == 'undefined') {
        return false;
    }
    if (localStorage.getItem('jwt')){
        return JSON.parse(localStorage.getItem('jwt'));
    } else return false;
}
export const forgotPassword = email =>{
    //console.log(email);
    return fetch(`${process.env.REACT_APP_API_URL}/forgot-password`,{
        method:"PUT",
        headers:{
            Accept:'application/json',
            'Content-Type':'application/json'
        },
        body: JSON.stringify({email})
    })
    .then(response=> response.json())
    .catch(err=>console.log(err));
}
export const resetPassword = resetInfo =>{
    return fetch(`${process.env.REACT_APP_API_URL}/reset-password`,{
        method:"PUT",
        headers:{
            Accept:'application/json',
            'Content-Type':'application/json'
        },
        body: JSON.stringify(resetInfo)
    })
    .then(response=> response.json())
    .catch(err=>console.log(err));
}
export const socialLogin = user=>{
    return fetch(`${process.env.REACT_APP_API_URL}/social-login`,{
        method:'POST',
        headers:{
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    })
    .then(response=> response.json())
    .catch(err=>console.log(err));
}