import {
    ADD_CATEGORIES_SUCCESS,
    ADD_CATEGORIES_FAIL,
    FETCH_CATEGORIES_SUCCESS,
    FETCH_CATEGORIES_FAIL,
    DELETE_CATEGORIES_SUCCESS,
    DELETE_CATEGORIES_FAIL,
    UPDATE_CATEGORY_SUCCESS,
    UPDATE_CATEGORY_FAIL,
} from './types'
import CategoriesService from '../services/categories.service'

export const addCategory =
    (nume_categorie, descriere_categorie) => (dispatch) => {
        return CategoriesService.addCategory(
            nume_categorie,
            descriere_categorie
        ).then((response) => {
            if (response.data.status === 200) {
                dispatch({
                    type: ADD_CATEGORIES_SUCCESS,
                    payload: { category: response.data.category },
                })

                return response.data
            } else {
                dispatch({
                    type: ADD_CATEGORIES_FAIL,
                })

                return response.data
            }
        })
    }

export const getAllCategories = () => (dispatch) => {
    return CategoriesService.getAllCategories().then((response) => {
        if (response.data.status === 200) {
            dispatch({
                type: FETCH_CATEGORIES_SUCCESS,
                payload: { categories: response.data.categories },
            })

            return response.data
        } else {
            dispatch({
                type: FETCH_CATEGORIES_FAIL,
            })

            return response.data
        }
    })
}

export const deleteCategory = (categoryName) => (dispatch) => {
    return CategoriesService.deleteCategory(categoryName).then((response) => {
        if (response.data.status === 200) {
            dispatch({
                type: DELETE_CATEGORIES_SUCCESS,
                payload: { categoryName: categoryName },
            })

            return response.data
        } else {
            dispatch({
                type: DELETE_CATEGORIES_FAIL,
            })

            return response.data
        }
    })
}

export const updateCategory =
    (identifier, nume_categorie, descriere_categorie) => (dispatch) => {
        return CategoriesService.updateCategory(
            identifier,
            nume_categorie,
            descriere_categorie
        ).then((response) => {
            if (response.data.status === 200) {
                dispatch({
                    type: UPDATE_CATEGORY_SUCCESS,
                    payload: { category: response.data.category },
                })

                return response.data
            } else {
                dispatch({
                    type: UPDATE_CATEGORY_FAIL,
                })

                return response.data
            }
        })
    }
