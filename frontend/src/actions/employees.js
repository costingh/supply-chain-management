import {
    FETCH_EMPLOYEES_SUCCESS,
    FETCH_EMPLOYEES_FAIL,
    FETCH_PROFILE_SUCCESS,
    FETCH_PROFILE_FAIL,
    UPDATE_PROFILE_SUCCESS,
    UPDATE_PROFILE_FAIL,
} from './types'
import EmployeesService from '../services/employees.service'

export const getAllEmployees = () => (dispatch) => {
    return EmployeesService.getAllEmployees().then((response) => {
        if (response.data.status === 200) {
            dispatch({
                type: FETCH_EMPLOYEES_SUCCESS,
                payload: { employees: response.data.employees },
            })

            return response.data
        } else {
            dispatch({
                type: FETCH_EMPLOYEES_FAIL,
            })

            return response.data
        }
    })
}

export const getProfile = (email) => (dispatch) => {
    return EmployeesService.getProfile(email).then((response) => {
        if (response.data.status === 200) {
            dispatch({
                type: FETCH_PROFILE_SUCCESS,
                payload: { profile: response.data.profile },
            })

            return response.data
        } else {
            dispatch({
                type: FETCH_PROFILE_FAIL,
            })

            return response.data
        }
    })
}

export const updateProfile =
    (
        identifier,
        firstname,
        lastname,
        email,
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
        return EmployeesService.updateProfile(
            identifier,
            firstname,
            lastname,
            email,
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
                    type: UPDATE_PROFILE_SUCCESS,
                    payload: { profile: response.data.profile },
                })

                return response.data
            } else {
                dispatch({
                    type: UPDATE_PROFILE_FAIL,
                })

                return response.data
            }
        })
    }
