import Cookies from 'js-cookie'

const TonkenKey = 'loginToken'

export function getToken () {
    return Cookies.get(TonkenKey)
}
export function setToken (token) {
    return Cookies.set(TonkenKey,token)
}
export function removeToken () {
    return Cookies.remove(TonkenKey)
}
