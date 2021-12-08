import {
    ADD_SUPPLIER_SUCCESS,
    ADD_SUPPLIER_FAIL,
    FETCH_SUPPLIERS_SUCCESS,
    FETCH_SUPPLIERS_FAIL,
    DELETE_SUPPLIER_SUCCESS,
    DELETE_SUPPLIER_FAIL,
} from './types'
import SuppliersService from '../services/suppliers.service'

export const addSupplier =
    (nume_furnizor, strada, numar, oras, judet, nr_telefon) => (dispatch) => {
        return SuppliersService.addSupplier(
            nume_furnizor,
            strada,
            numar,
            oras,
            judet,
            nr_telefon
        ).then((response) => {
            if (response.data.status === 200) {
                dispatch({
                    type: ADD_SUPPLIER_SUCCESS,
                    payload: { supplier: response.data.supplier },
                })

                return response.data
            } else {
                dispatch({
                    type: ADD_SUPPLIER_FAIL,
                })

                return response.data
            }
        })
    }

export const getAllSuppliers = () => (dispatch) => {
    return SuppliersService.getAllSuppliers().then((response) => {
        if (response.data.status === 200) {
            dispatch({
                type: FETCH_SUPPLIERS_SUCCESS,
                payload: { suppliers: response.data.suppliers },
            })

            return response.data
        } else {
            dispatch({
                type: FETCH_SUPPLIERS_FAIL,
            })

            return response.data
        }
    })
}

export const deleteSupplier = (supplierName) => (dispatch) => {
    return SuppliersService.deleteSupplier(supplierName).then((response) => {
        if (response.data.status === 200) {
            dispatch({
                type: DELETE_SUPPLIER_SUCCESS,
                payload: { supplierName: supplierName },
            })

            return response.data
        } else {
            dispatch({
                type: DELETE_SUPPLIER_FAIL,
            })

            return response.data
        }
    })
}
