import {
    ADD_INVOICE_SUCCESS,
    ADD_INVOICE_FAIL,
    FETCH_INVOICES_SUCCESS,
    FETCH_INVOICES_FAIL,
    DELETE_INVOICE_SUCCESS,
    DELETE_INVOICE_FAIL,
} from './types'
import InvoicesService from '../services/invoices.service'

export const generateInvoice = (nrComanda) => (dispatch) => {
    return InvoicesService.generateInvoice(nrComanda).then((response) => {
        if (response.data.status === 200) {
            dispatch({
                type: ADD_INVOICE_SUCCESS,
                payload: { invoice: response.data.invoice },
            })

            return response.data
        } else {
            dispatch({
                type: ADD_INVOICE_FAIL,
            })

            return response.data
        }
    })
}

export const getAllInvoices = () => (dispatch) => {
    return InvoicesService.getAllInvoices().then((response) => {
        if (response.data.status === 200) {
            dispatch({
                type: FETCH_INVOICES_SUCCESS,
                payload: { invoices: response.data.invoices },
            })

            return response.data
        } else {
            dispatch({
                type: FETCH_INVOICES_FAIL,
            })

            return response.data
        }
    })
}

export const deleteInvoice = (invoiceNumber) => (dispatch) => {
    return InvoicesService.deleteInvoice(invoiceNumber).then((response) => {
        if (response.data.status === 200) {
            dispatch({
                type: DELETE_INVOICE_SUCCESS,
                payload: { invoiceNumber: invoiceNumber },
            })

            return response.data
        } else {
            dispatch({
                type: DELETE_INVOICE_FAIL,
            })

            return response.data
        }
    })
}
