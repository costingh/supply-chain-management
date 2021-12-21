import axios from 'axios'
import authHeader from './auth-header'

const API_URL = `${process.env.REACT_APP_BASE_URL}api/angajati/`

const getAllEmployees = () => {
    return axios.get(API_URL + 'all', { headers: authHeader() })
}
const getProfile = (email) => {
    return axios.get(API_URL + `profil/${email}`, { headers: authHeader() })
}
const updateProfile = (
    identifier,
    firstname,
    lastname,
    email,
    phoneNumber,
    ssn,
    street,
    houseNumber,
    county,
    city,
    sex,
    birthDate
) => {
    return axios.post(
        API_URL + `profil/update/${identifier}`,
        {
            firstname,
            lastname,
            email,
            phoneNumber,
            ssn,
            street,
            houseNumber,
            county,
            city,
            sex,
            birthDate,
        },
        { headers: authHeader() }
    )
}
const updateSalary = (email, salary) => {
    return axios.post(
        API_URL + `profil/update-salary/${email}`,
        {
            email,
            salary,
        },
        { headers: authHeader() }
    )
}

export default {
    getAllEmployees,
    getProfile,
    updateProfile,
    updateSalary,
}
