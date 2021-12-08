import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    SET_MESSAGE,
} from './types'

import AuthService from '../services/auth.service'

export const register =
    (
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
    ) =>
    (dispatch) => {
        return AuthService.register(
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
        ).then((response) => {
            if (response.data.status === 200) {
                dispatch({
                    type: REGISTER_SUCCESS,
                })

                dispatch({
                    type: SET_MESSAGE,
                    payload: response.data.message,
                })

                return response.data
            } else {
                dispatch({
                    type: REGISTER_FAIL,
                })

                dispatch({
                    type: SET_MESSAGE,
                    payload: response.data.message,
                })

                return response.data
            }
        })
    }

export const login = (email, password) => (dispatch) => {
    return AuthService.login(email, password).then((data) => {
        if (data.status === 200) {
            dispatch({
                type: LOGIN_SUCCESS,
                payload: { user: data.user },
            })

            dispatch({
                type: SET_MESSAGE,
                payload: data.message,
            })

            return data
        } else {
            dispatch({
                type: LOGIN_FAIL,
            })

            dispatch({
                type: SET_MESSAGE,
                payload: data.message,
            })

            return data
        }
    })
}

export const logout = () => (dispatch) => {
    AuthService.logout()

    dispatch({
        type: LOGOUT,
    })
}
