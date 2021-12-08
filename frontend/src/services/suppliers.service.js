import axios from 'axios'
import authHeader from './auth-header'

const API_URL = `${process.env.REACT_APP_BASE_URL}api/furnizori/`

const addSupplier = (nume_furnizor, strada, numar, oras, judet, nr_telefon) => {
    return axios.post(
        API_URL + 'add',
        {
            nume_furnizor,
            strada,
            numar,
            oras,
            judet,
            nr_telefon,
        },
        { headers: authHeader() }
    )
}

const getAllSuppliers = () => {
    return axios.get(API_URL + 'all', { headers: authHeader() })
}

const deleteSupplier = (supplierName) => {
    return axios.delete(API_URL + `delete/${supplierName}`, {
        headers: authHeader(),
    })
}

export default {
    addSupplier,
    getAllSuppliers,
    deleteSupplier,
}
