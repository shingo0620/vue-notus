import request from './index'

export function login ({email, password, rememberMe}) {
    return request.post('/login', {
        email,
        password,
        rememberMe
    })
}