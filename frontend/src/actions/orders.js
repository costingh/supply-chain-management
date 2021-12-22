import {
    ADD_ORDERS_SUCCESS,
    ADD_ORDERS_FAIL,
    FETCH_ORDERS_SUCCESS,
    FETCH_ORDERS_FAIL,
    DELETE_ORDERS_SUCCESS,
    DELETE_ORDERS_FAIL,
} from './types'
import OrdersService from '../services/orders.service'

export const addOrder =
    (cod_furnizor, data_livrare, listaProduse) => (dispatch) => {
        return OrdersService.addOrder(
            cod_furnizor,
            data_livrare,
            listaProduse
        ).then((response) => {
            if (response.data.status === 200) {
                dispatch({
                    type: ADD_ORDERS_SUCCESS,
                    payload: { order: response.data.order },
                })

                return response.data
            } else {
                dispatch({
                    type: ADD_ORDERS_FAIL,
                })

                return response.data
            }
        })
    }

export const getAllOrders = () => (dispatch) => {
    return OrdersService.getAllOrders().then((response) => {
        if (response.data.status === 200) {
            dispatch({
                type: FETCH_ORDERS_SUCCESS,
                payload: { orders: response.data.orders },
            })

            return response.data
        } else {
            dispatch({
                type: FETCH_ORDERS_FAIL,
            })

            return response.data
        }
    })
}

export const deleteOrder = (nr_comanda) => (dispatch) => {
    return OrdersService.deleteOrder(nr_comanda).then((response) => {
        if (response.data.status === 200) {
            dispatch({
                type: DELETE_ORDERS_SUCCESS,
                payload: { nr_comanda: nr_comanda },
            })

            return response.data
        } else {
            dispatch({
                type: DELETE_ORDERS_FAIL,
            })

            return response.data
        }
    })
}
