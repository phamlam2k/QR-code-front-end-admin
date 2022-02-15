export function isLogin(){
    return !!localStorage.getItem("user")
}

export const bindParams = (str, params = {}) => {
    let result = str
    for (let key in params) {
        result = result.replace(new RegExp(`:${key}`, 'g'), params[key])
    }
    return result
}

export default function getRole(){
    return localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")).admin : null
} 