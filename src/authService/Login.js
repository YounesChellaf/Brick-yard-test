// A helper authentification service providing general functions for scalable code
//
import axios from "axios"


// Login function with params : [ user data, callback function ] which save the token using the setToken() function
export function login( user,cb ) {
    axios.post(process.env.REACT_APP_BrickYard_API+"/auth/login", user)
        .then(
            res => {
               setToken(res.data.auth_token)
               cb()
            }
        );
}

// A middlware function to check if the user is is authenticated
export function isAuthenticated() {
    if (getToken()) return true
}

// SetToken function to save the token into the localStorage with and expiry date of 60min
export function setToken(value) {
    const now = new Date();
    // `item` is an object which contains the original value
    // as well as the time when it's supposed to expire
    const item = {
        value: value,
        expiry: now.getTime() + 3600000,
    }
    localStorage.setItem("token", JSON.stringify(item))
}

// GetToken function to check the token value validity each time the token is requested for an API call
export function getToken() {
    const itemStr = localStorage.getItem("token")
    // if the item doesn't exist, return null
    if (!itemStr) {
        return null
    }
    const item = JSON.parse(itemStr)
    const now = new Date()
    // compare the expiry time of the item with the current time
    if (now.getTime() > item.expiry) {
        // If the item is expired, delete the item from storage
        // and return null
        localStorage.removeItem("token");
        window.location.href = '/';
        return null
    }
    return item.value
}
