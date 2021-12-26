import axios from 'axios'
import authHeader from './auth-header'

const API_URL = `${process.env.REACT_APP_BASE_URL}api/statistici/`

// display total amount of money spent in the last x = numberOfMonths months
const totalSpentByMonth = (numberOfMonths) => {
    return axios
        .get(API_URL + 'total-spent/' + numberOfMonths, {
            headers: authHeader(),
        })
        .then((resp) => {
            return resp.data
        })
        .catch((err) => {
            return err
        })
}

const numberOfInvoices = () => {
    return axios
        .get(API_URL + 'numar-facturi', {
            headers: authHeader(),
        })
        .then((resp) => {
            return resp.data
        })
        .catch((err) => {
            return err
        })
}

const numberOfOrders = () => {
    return axios
        .get(API_URL + 'numar-comenzi', {
            headers: authHeader(),
        })
        .then((resp) => {
            return resp.data
        })
        .catch((err) => {
            return err
        })
}

const numberOfSuppliers = () => {
    return axios
        .get(API_URL + 'numar-furnizori', {
            headers: authHeader(),
        })
        .then((resp) => {
            return resp.data
        })
        .catch((err) => {
            return err
        })
}

const numberOfEmployees = () => {
    return axios
        .get(API_URL + 'numar-angajati', {
            headers: authHeader(),
        })
        .then((resp) => {
            return resp.data
        })
        .catch((err) => {
            return err
        })
}

const suppliersWIthNoProductsBought = () => {
    return axios
        .get(API_URL + 'furnizori', {
            headers: authHeader(),
        })
        .then((resp) => {
            return resp.data
        })
        .catch((err) => {
            return err
        })
}
const mostSupplierInACity = () => {
    return axios
        .get(API_URL + 'oras-furnizori', {
            headers: authHeader(),
        })
        .then((resp) => {
            return resp.data
        })
        .catch((err) => {
            return err
        })
}
const suppliersByCity = () => {
    return axios
        .get(API_URL + 'furnizori-pe-orase', {
            headers: authHeader(),
        })
        .then((resp) => {
            return resp.data
        })
        .catch((err) => {
            return err
        })
}

export default {
    totalSpentByMonth,
    numberOfOrders,
    numberOfInvoices,
    numberOfSuppliers,
    numberOfEmployees,
    suppliersWIthNoProductsBought,
    mostSupplierInACity,
    suppliersByCity,
}
