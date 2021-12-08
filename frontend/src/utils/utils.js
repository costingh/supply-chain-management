const isAuthenticated = () => {
    const user = localStorage.getItem('user')

    if (user && user.token) {
        return true
    } else {
        return false
    }
}

const logOut = () => {
    localStorage.removeItem('user')
}

export { isAuthenticated, logOut }
