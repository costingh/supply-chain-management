import {
    ADD_ORDERS_SUCCESS,
    ADD_ORDERS_FAIL,
    FETCH_ORDERS_SUCCESS,
    FETCH_ORDERS_FAIL,
    DELETE_ORDERS_SUCCESS,
    DELETE_ORDERS_FAIL,
} from '../actions/types'

const initialState = { orders: null }

export default function (state = initialState, action) {
    const { type, payload } = action

    switch (type) {
        case ADD_ORDERS_SUCCESS:
            return {
                ...state,
                orders: initialState.orders
                    ? {
                          orders: [...initialState.orders, payload.order],
                      }
                    : { orders: payload.order },
            }
        case ADD_ORDERS_FAIL:
            return {
                ...state,
            }
        case FETCH_ORDERS_SUCCESS:
            return {
                ...state,
                orders: payload.orders,
            }
        case FETCH_ORDERS_FAIL:
            return {
                ...state,
            }
        case DELETE_ORDERS_SUCCESS:
            return {
                ...state,
            }
        case DELETE_ORDERS_FAIL:
            return {
                ...state,
            }
        default:
            return state
    }
}
