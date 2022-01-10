import axios from 'axios'
import authHeader from './auth-header'

const API_URL = `${process.env.REACT_APP_BASE_URL}api/facturi/`

const generateInvoice = (nrComanda) => {
    return axios.post(
        API_URL + 'add',
        {
            nrComanda,
        },
        { headers: authHeader() }
    )
}

const getAllInvoices = () => {
    return axios.get(API_URL + 'all', { headers: authHeader() })
}

const getAnInvoice = (number) => {
    return axios
        .get(API_URL + `factura/${number}`, { headers: authHeader() })
        .then((resp) => {
            return resp.data
        })
        .catch((err) => {
            return err
        })
}

const deleteInvoice = (invoiceNumber) => {
    return axios.delete(API_URL + `delete/${invoiceNumber}`, {
        headers: authHeader(),
    })
}

export default {
    generateInvoice,
    getAllInvoices,
    deleteInvoice,
    getAnInvoice,
}
