import axios from 'axios'
import authHeader from './auth-header'

const API_URL = `${process.env.REACT_APP_BASE_URL}api/`

const getPublicContent = () => {
    return axios.get(API_URL + 'all')
}

const getUserBoard = () => {
    return axios.get(API_URL + 'employee/dashboard', { headers: authHeader() })
}

const getAdminBoard = () => {
    return axios.get(API_URL + 'admin/dashboard', { headers: authHeader() })
}

export default {
    getPublicContent,
    getUserBoard,
    getAdminBoard,
}
