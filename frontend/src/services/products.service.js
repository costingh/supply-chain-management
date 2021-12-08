import axios from 'axios'
import authHeader from './auth-header'

const API_URL = `${process.env.REACT_APP_BASE_URL}api/produse/`

const addProduct = (
    nume_produs,
    descriere_produs,
    unitate_masura,
    stoc_initial,
    pret,
    categorie
) => {
    return axios.post(
        API_URL + 'add',
        {
            nume_produs,
            descriere_produs,
            unitate_masura,
            stoc_initial,
            pret,
            categorie,
        },
        { headers: authHeader() }
    )
}

const getAllProducts = () => {
    return axios.get(API_URL + 'all', { headers: authHeader() })
}

const deleteProduct = (productName) => {
    return axios.delete(API_URL + `delete/${productName}`, {
        headers: authHeader(),
    })
}

const updateProduct = (
    identifier,
    nume_produs,
    descriere_produs,
    unitate_masura,
    stoc_initial,
    pret,
    categorie
) => {
    return axios.post(
        API_URL + `update/${identifier}`,
        {
            identifier,
            nume_produs,
            descriere_produs,
            unitate_masura,
            stoc_initial,
            pret,
            categorie,
        },
        { headers: authHeader() }
    )
}

export default {
    addProduct,
    getAllProducts,
    deleteProduct,
    updateProduct,
}
