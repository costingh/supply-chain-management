import axios from 'axios'
import authHeader from './auth-header'

const API_URL = `${process.env.REACT_APP_BASE_URL}api/comenzi/`

const addOrder = (cod_furnizor, data_livrare, listaProduse) => {
    return axios.post(
        API_URL + 'add',
        {
            cod_furnizor,
            data_livrare,
            listaProduse,
        },
        { headers: authHeader() }
    )
}

const getAllOrders = () => {
    return axios.get(API_URL + 'all', { headers: authHeader() })
}

const getOrderByNumber = (number) => {
    return axios
        .get(API_URL + number, { headers: authHeader() })
        .then((resp) => {
            return resp.data
        })
        .catch((err) => {
            return err
        })
}

const deleteOrder = (comanda) => {
    return axios.delete(API_URL + `delete/${comanda}`, {
        headers: authHeader(),
    })
}

export default {
    addOrder,
    getAllOrders,
    deleteOrder,
    getOrderByNumber,
}
