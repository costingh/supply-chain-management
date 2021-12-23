import {
    ADD_PRODUCTS_SUCCESS,
    ADD_PRODUCTS_FAIL,
    FETCH_PRODUCTS_SUCCESS,
    FETCH_PRODUCTS_FAIL,
    DELETE_PRODUCTS_SUCCESS,
    DELETE_PRODUCTS_FAIL,
    UPDATE_PRODUCTS_SUCCESS,
    UPDATE_PRODUCTS_FAIL,
} from './types'
import ProductsService from '../services/products.service'

export const addProduct =
    (
        nume_produs,
        descriere_produs,
        unitate_masura,
        stoc_initial,
        pret,
        categorie
    ) =>
    (dispatch) => {
        return ProductsService.addProduct(
            nume_produs,
            descriere_produs,
            unitate_masura,
            stoc_initial,
            pret,
            categorie
        ).then((response) => {
            if (response.data.status === 200) {
                dispatch({
                    type: ADD_PRODUCTS_SUCCESS,
                    payload: { product: response.data.product },
                })

                return response.data
            } else {
                dispatch({
                    type: ADD_PRODUCTS_FAIL,
                })

                return response.data
            }
        })
    }

export const getAllProducts = () => (dispatch) => {
    return ProductsService.getAllProducts().then((response) => {
        if (response.data.status === 200) {
            dispatch({
                type: FETCH_PRODUCTS_SUCCESS,
                payload: { products: response.data.products },
            })

            return response.data
        } else {
            dispatch({
                type: FETCH_PRODUCTS_FAIL,
            })

            return response.data
        }
    })
}

export const searchForProduct = (
    category,
    name,
    supplier,
    minPrice,
    maxPrice,
    order
) => {
    return ProductsService.searchForProduct(
        category,
        name,
        supplier,
        minPrice,
        maxPrice,
        order
    )
        .then((response) => {
            return response.data
        })
        .catch((err) => {
            return err
        })
}

export const deleteProduct = (productName) => (dispatch) => {
    return ProductsService.deleteProduct(productName).then((response) => {
        if (response.data.status === 200) {
            dispatch({
                type: DELETE_PRODUCTS_SUCCESS,
                payload: { productName: productName },
            })

            return response.data
        } else {
            dispatch({
                type: DELETE_PRODUCTS_FAIL,
            })

            return response.data
        }
    })
}

export const updateProduct =
    (
        identifier,
        nume_produs,
        descriere_produs,
        unitate_masura,
        stoc_initial,
        pret,
        categorie
    ) =>
    (dispatch) => {
        return ProductsService.updateProduct(
            identifier,
            nume_produs,
            descriere_produs,
            unitate_masura,
            stoc_initial,
            pret,
            categorie
        ).then((response) => {
            if (response.data.status === 200) {
                dispatch({
                    type: UPDATE_PRODUCTS_SUCCESS,
                    payload: { product: response.data.product },
                })

                return response.data
            } else {
                dispatch({
                    type: UPDATE_PRODUCTS_FAIL,
                })

                return response.data
            }
        })
    }
