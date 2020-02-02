
export const create = (userId, token, post) => {
    return fetch(`${process.env.REACT_APP_API_URL}/post/new/${userId}`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        },
        body: post
    })
        .then(respone => { return respone.json() })
        .catch(err => console.log(err));
}
export const getlist = (token, page) => {
    return fetch(`${process.env.REACT_APP_API_URL}/post/all/?page=${page}`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        }
    })
        .then(responese => responese.json())
        .catch(err => console.log(err));
}
export const getsinglepost = (postId) => {
    return fetch(`${process.env.REACT_APP_API_URL}/post/${postId}`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        }
    })
        .then(responese => responese.json())
        .catch(err => console.log(err));
}

export const listByUser = (userId) => {
    return fetch(`${process.env.REACT_APP_API_URL}/posts/by/${userId}`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        }
    })
        .then(responese => responese.json())
        .catch(err => console.log(err));
}
export const remove = (postId, token) => {
    return fetch(`${process.env.REACT_APP_API_URL}/post/${postId}`, {
        method: "DELETE",
        headers: {
            Accept: "application/json",
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        }
    })
        .then(respone => {
            return respone.json();
        })
        .catch(err => console.log(err));
}
export const update = (postId, token, post) => {
    return fetch(`${process.env.REACT_APP_API_URL}/post/${postId}`, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        },
        body: post
    })
        .then(respone => {
            return respone.json();
        })
        .catch(err => console.log(err));

}

export const like = (userId, token, postId) => {
    return fetch(`${process.env.REACT_APP_API_URL}/post/like`, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            "Content-Type":'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({userId,postId})
    })
        .then(respone => {
            return respone.json();
        })
        .catch(err => console.log(err));
}
export const unlike = (userId, token, postId) => {
    return fetch(`${process.env.REACT_APP_API_URL}/post/unlike`, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            "Content-Type":'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({userId,postId})
    })
        .then(respone => {
            return respone.json();
        })
        .catch(err => console.log(err));
}
export const comment = (userId,token,postId,comment)=>{
    return fetch(`${process.env.REACT_APP_API_URL}/post/comment`, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            "Content-Type":'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({userId,postId, comment})
    })
        .then(respone => {
            return respone.json();
        })
        .catch(err => console.log(err));
}
export const uncomment = (userId,token,postId,comment)=>{
    return fetch(`${process.env.REACT_APP_API_URL}/post/uncomment`, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            "Content-Type":'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({userId,postId, comment})
    })
        .then(respone => {
            return respone.json();
        })
        .catch(err => console.log(err));
}