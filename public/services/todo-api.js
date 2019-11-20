const URL = '/api';

async function fetchWithError(url, options) {
    const response = await fetch(url, options);
    const data = await response.json();

    if (response.ok) {
        return data;
    }
    else {
        throw data.error;
    }
}

const token = localStorage.getItem('TOKEN');
if (!token && !(location.pathname === '/' || location.pathname === 'index.html')) {
    const searchParams = new URLSearchParams();
    searchParams.set('redirect', location.pathname);
    location = `/?${searchParams.toString()}`;
}

export function signUp(user) {
    const url = `${URL}/auth/signup`;
    return fetchWithError(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    });
}

export function signIn(creds) {
    const url = `${URL}/auth/signin`;
    return fetchWithError(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(creds)
    });
}

export function getTodos() {  
    const url = `${URL}/todos`;
    return fetchWithError(url);
}

export function addTodo(todo) {  
    const url = `${URL}/todos`;

    return fetchWithError(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(todo)
    });
}

export function updateTodo(todo) {  
    const url = `${URL}/todos/${todo.id}`;

    return fetchWithError(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(todo)
    });
}

export function removeTodo(id) {  
    const url = `${URL}/todos/${id}`;

    return fetchWithError(url, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
    });
}