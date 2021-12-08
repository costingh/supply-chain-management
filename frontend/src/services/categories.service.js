import axios from 'axios'
import authHeader from './auth-header'

const API_URL = `${process.env.REACT_APP_BASE_URL}api/categorii/`

const addCategory = (nume_categorie, descriere_categorie) => {
    return axios.post(
        API_URL + 'add',
        {
            nume_categorie,
            descriere_categorie,
        },
        { headers: authHeader() }
    )
}

const getAllCategories = () => {
    return axios.get(API_URL + 'all', { headers: authHeader() })
}

const deleteCategory = (categoryName) => {
    return axios.delete(API_URL + `delete/${categoryName}`, {
        headers: authHeader(),
    })
}

const updateCategory = (identifier, nume_categorie, descriere_categorie) => {
    return axios.post(
        API_URL + `update/${identifier}`,
        {
            nume_categorie,
            descriere_categorie,
        },
        { headers: authHeader() }
    )
}

export default {
    addCategory,
    getAllCategories,
    deleteCategory,
    updateCategory,
}
