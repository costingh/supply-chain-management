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

export default {
    totalSpentByMonth,
}
