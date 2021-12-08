import axios from 'axios'

const API_URL = `${process.env.REACT_APP_BASE_URL}api/auth/`

const register = (
    firstname,
    lastname,
    email,
    password,
    passwordConfirm,
    phoneNumber,
    ssn,
    street,
    houseNumber,
    county,
    city,
    sex,
    birthDate
) => {
    return axios.post(API_URL + 'signup', {
        firstname,
        lastname,
        email,
        password,
        passwordConfirm,
        phoneNumber,
        ssn,
        street,
        houseNumber,
        county,
        city,
        sex,
        birthDate,
    })
}

const login = (email, password) => {
    return axios
        .post(API_URL + 'signin', {
            email,
            password,
        })
        .then((response) => {
            if (response.data.token) {
                const user = {
                    ...response.data.user,
                    token: response.data.token,
                }
                localStorage.setItem('user', JSON.stringify(user))
            }

            return response.data
        })
}

const logout = () => {
    localStorage.removeItem('user')
}

export default {
    register,
    login,
    logout,
}
