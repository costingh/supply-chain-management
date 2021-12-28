import {
    ADD_SUPPLIER_SUCCESS,
    ADD_SUPPLIER_FAIL,
    UPDATE_SUPPLIER_SUCCESS,
    UPDATE_SUPPLIER_FAIL,
    FETCH_SUPPLIERS_SUCCESS,
    FETCH_SUPPLIERS_FAIL,
    DELETE_SUPPLIER_SUCCESS,
    DELETE_SUPPLIER_FAIL,
} from '../actions/types'

const initialState = { suppliers: null }

export default function (state = initialState, action) {
    const { type, payload } = action

    switch (type) {
        case ADD_SUPPLIER_SUCCESS:
            return {
                ...state,
                suppliers: initialState.suppliers
                    ? {
                          suppliers: [
                              ...initialState.suppliers,
                              payload.supplier,
                          ],
                      }
                    : { suppliers: payload.supplier },
            }
        case ADD_SUPPLIER_FAIL:
            return {
                ...state,
            }
        case UPDATE_SUPPLIER_SUCCESS:
            return {
                ...state,
                suppliers: state.suppliers.map((s) => {
                    if (s.cod_furnizor != payload.data.cod_furnizor) return s
                    else return payload.data
                }),
            }
        case UPDATE_SUPPLIER_FAIL:
            return {
                ...state,
            }
        case FETCH_SUPPLIERS_SUCCESS:
            return {
                ...state,
                suppliers: payload.suppliers,
            }
        case FETCH_SUPPLIERS_FAIL:
            return {
                ...state,
            }
        case DELETE_SUPPLIER_SUCCESS:
            return {
                ...state,
            }
        case DELETE_SUPPLIER_FAIL:
            return {
                ...state,
            }
        default:
            return state
    }
}
