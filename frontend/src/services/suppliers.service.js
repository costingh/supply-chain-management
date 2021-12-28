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

const updateSupplier = (
    id,
    nume_furnizor,
    strada,
    numar,
    oras,
    judet,
    nr_telefon
) => {
    return axios.post(
        API_URL + `update/${id}`,
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
const getAllSupplierNames = () => {
    return axios.get(API_URL + 'all-names', { headers: authHeader() })
}

const deleteSupplier = (supplierName) => {
    return axios.delete(API_URL + `delete/${supplierName}`, {
        headers: authHeader(),
    })
}

const getSupplierByName = (supplierName) => {
    return axios.get(API_URL + `get-supplier/${supplierName}`, {
        headers: authHeader(),
    })
}

export default {
    addSupplier,
    getAllSuppliers,
    deleteSupplier,
    getAllSupplierNames,
    getSupplierByName,
    updateSupplier,
}
