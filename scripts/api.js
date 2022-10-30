export async function registerUser(inputName, inputEmail, inputAvatar, inputPassword) {
    
    const data = {
        username: inputName,
        email: inputEmail,
        password: inputPassword,
        avatar: inputAvatar
    }

    const options = {
        method: 'POST',
        headers: {"Content-Type": 'application/json'},
        body: JSON.stringify(data)
    }

    const response = await fetch('http://localhost:3333/users/create', options);

    const responseJson = await response.json();
    return {responseJson};
}

export async function loginUser(inputEmail, inputPassword) {
    console.log('chegou aqui');
    const data = {
        email: inputEmail,
        password: inputPassword,
    }

    const options = {
        method: 'POST',
        headers: {"Content-Type": 'application/json'},
        body: JSON.stringify(data)
    }

    const response = await fetch('http://localhost:3333/login', options);

    const responseJson = await response.json();
    
    localStorage.setItem('token', JSON.stringify(responseJson.token));
    return {responseJson};
}

export async function getProfile() {
    const options = {
        method: 'GET',
        headers: {"Content-Type": 'application/json', 
        authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`},
    }

    const response = await fetch('http://localhost:3333/users/profile', options);

    const responseJson = await response.json();
    
    localStorage.setItem('profile', JSON.stringify(responseJson));
    return {responseJson};
}

export async function patchProfile(username, email, avatar) {
    const data = {
        username: username,
        email: email,
        avatar: avatar
    }

    const options = {
        method: 'PATCH',
        headers: {"Content-Type": 'application/json', 
        authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`},
        body: JSON.stringify(data)
    }

    const response = await fetch('http://localhost:3333/users/profile', options);

    const responseJson = await response.json();
    return {responseJson};
}

export async function deleteProfile() {

    const options = {
        method: 'DELETE',
        headers: {"Content-Type": 'application/json', 
        authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`},
    }

    const response = await fetch('http://localhost:3333/users/profile', options);

    const responseJson = await response.json();
    return {responseJson};
}

export async function createContentPost(title, content) {
    const data = {
        title: title,
        content: content
    }

    const options = {
        method: 'POST',
        headers: {"Content-Type": 'application/json', 
        authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`},
        body: JSON.stringify(data)
    }

    const response = await fetch('http://localhost:3333/posts/create', options);

    const responseJson = await response.json();
    return {responseJson};
}


export async function getPosts () {

    const options = {
        method: 'GET',
        headers: {"Content-Type": 'application/json', 
        authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`},
    }

    const response = await fetch('http://localhost:3333/posts', options);

    const responseJson = await response.json();
    return {responseJson}; 
}

export async function patchPost(postId, title, content) {
    const data = {
        title: title,
        content: content
    }

    const options = {
        method: 'PATCH',
        headers: {"Content-Type": 'application/json', 
        authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`},
        body: JSON.stringify(data)
    }

    const response = await fetch(`http://localhost:3333/posts/${postId}`, options);

    const responseJson = await response.json();
    return {responseJson};
}

export async function deletePost(postId) {
    const options = {
        method: 'DELETE',
        headers: {"Content-Type": 'application/json', 
        authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`},
    }

    const response = await fetch(`http://localhost:3333/posts/${postId}`, options);

    const responseJson = await response.json();
    return {responseJson};
}