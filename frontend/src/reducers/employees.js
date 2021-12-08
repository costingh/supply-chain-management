import {
    FETCH_EMPLOYEES_SUCCESS,
    FETCH_EMPLOYEES_FAIL,
    FETCH_PROFILE_SUCCESS,
    FETCH_PROFILE_FAIL,
    UPDATE_PROFILE_SUCCESS,
    UPDATE_PROFILE_FAIL,
} from '../actions/types'

const initialState = { employees: null, profile: null }

export default function (state = initialState, action) {
    const { type, payload } = action

    switch (type) {
        case FETCH_EMPLOYEES_SUCCESS:
            return {
                ...state,
                employees: payload.employees,
            }
        case FETCH_EMPLOYEES_FAIL:
            return {
                ...state,
            }
        case FETCH_PROFILE_SUCCESS:
            return {
                ...state,
                profile: payload.profile,
            }
        case FETCH_PROFILE_FAIL:
            return {
                ...state,
            }
        case UPDATE_PROFILE_SUCCESS:
            return {
                ...state,
                profile: payload.profile,
            }
        case UPDATE_PROFILE_FAIL:
            return {
                ...state,
            }
        default:
            return state
    }
}
