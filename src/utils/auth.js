import { checkResponse } from "./api";

const baseUrl = "http://localhost:3001";

function signUp({ email, password, name, avatar }) {
    return fetch(`${baseUrl}/signup`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, name, avatar }),
    }).then(checkResponse);
}

function signIn({ email, password }) {
    return fetch(`${baseUrl}/signin`, {
        method: "POST", 
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
    }).then(checkResponse);
}

function getUserInfo(token) {
    return fetch(`${baseUrl}/users/me`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    }).then(checkResponse);
}

export { signUp, signIn, getUserInfo };
