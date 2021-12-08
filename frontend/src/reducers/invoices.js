import {
    ADD_INVOICE_SUCCESS,
    ADD_INVOICE_FAIL,
    FETCH_INVOICES_SUCCESS,
    FETCH_INVOICES_FAIL,
    DELETE_INVOICE_SUCCESS,
    DELETE_INVOICE_FAIL,
} from '../actions/types'

const initialState = { invoices: null }

export default function (state = initialState, action) {
    const { type, payload } = action

    switch (type) {
        case ADD_INVOICE_SUCCESS:
            return {
                ...state,
                invoices: initialState.invoices
                    ? {
                          invoices: [...initialState.invoices, payload.invoice],
                      }
                    : { invoices: payload.invoice },
            }
        case ADD_INVOICE_FAIL:
            return {
                ...state,
            }
        case FETCH_INVOICES_SUCCESS:
            return {
                ...state,
                invoices: payload.invoices,
            }
        case FETCH_INVOICES_FAIL:
            return {
                ...state,
            }
        case DELETE_INVOICE_SUCCESS:
            return {
                ...state,
            }
        case DELETE_INVOICE_FAIL:
            return {
                ...state,
            }
        default:
            return state
    }
}
