import {
    ADD_CATEGORIES_SUCCESS,
    ADD_CATEGORIES_FAIL,
    FETCH_CATEGORIES_SUCCESS,
    FETCH_CATEGORIES_FAIL,
    DELETE_CATEGORIES_SUCCESS,
    DELETE_CATEGORIES_FAIL,
    UPDATE_CATEGORY_SUCCESS,
    UPDATE_CATEGORY_FAIL,
} from '../actions/types'

const initialState = { categories: null }

export default function (state = initialState, action) {
    const { type, payload } = action

    switch (type) {
        case ADD_CATEGORIES_SUCCESS:
            return {
                ...state,
                categories: state.categories
                    ? [...state.categories, payload.category]
                    : payload.category,
            }
        case ADD_CATEGORIES_FAIL:
            return {
                ...state,
            }
        case FETCH_CATEGORIES_SUCCESS:
            return {
                ...state,
                categories: payload.categories,
            }
        case FETCH_CATEGORIES_FAIL:
            return {
                ...state,
            }
        case DELETE_CATEGORIES_SUCCESS:
            return {
                ...state,
                categories: state.categories.filter(
                    (cat) => cat.nume_categorie !== payload.categoryName
                ),
            }
        case DELETE_CATEGORIES_FAIL:
            return {
                ...state,
            }
        case UPDATE_CATEGORY_SUCCESS:
            return {
                ...state,
                categories: state.categories.map((cat) => {
                    if (cat.nume_categorie !== payload.category[0].identifier)
                        return cat
                    else
                        return {
                            nume_categorie: payload.category[0].nume_categorie,
                            descriere_categorie:
                                payload.category[0].descriere_categorie,
                        }
                }),
            }
        case UPDATE_CATEGORY_FAIL:
            return {
                ...state,
            }
        default:
            return state
    }
}
