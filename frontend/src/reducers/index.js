import { combineReducers } from 'redux'
import auth from './auth'
import message from './message'
import suppliers from './suppliers'
import invoices from './invoices'
import employees from './employees'
import categories from './categories'

export default combineReducers({
    auth,
    message,
    suppliers,
    invoices,
    employees,
    categories,
})
