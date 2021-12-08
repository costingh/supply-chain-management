import {
    ADD_PRODUCTS_SUCCESS,
    ADD_PRODUCTS_FAIL,
    FETCH_PRODUCTS_SUCCESS,
    FETCH_PRODUCTS_FAIL,
    DELETE_PRODUCTS_SUCCESS,
    DELETE_PRODUCTS_FAIL,
    UPDATE_PRODUCTS_SUCCESS,
    UPDATE_PRODUCTS_FAIL,
} from '../actions/types'

const initialState = { products: null }

export default function (state = initialState, action) {
    const { type, payload } = action

    switch (type) {
        case ADD_PRODUCTS_SUCCESS:
            return {
                ...state,
                products: state.products
                    ? [...state.products, payload.product]
                    : payload.product,
            }
        case ADD_PRODUCTS_FAIL:
            return {
                ...state,
            }
        case FETCH_PRODUCTS_SUCCESS:
            return {
                ...state,
                products: payload.products,
            }
        case FETCH_PRODUCTS_FAIL:
            return {
                ...state,
            }
        case DELETE_PRODUCTS_SUCCESS:
            return {
                ...state,
                products: state.products.filter(
                    (prod) => prod.nume_produs !== payload.productName
                ),
            }
        case DELETE_PRODUCTS_FAIL:
            return {
                ...state,
            }
        case UPDATE_PRODUCTS_SUCCESS:
            return {
                ...state,
                products: state.products.map((prod) => {
                    if (prod.nume_categorie !== payload.product[0].identifier)
                        return prod
                    else
                        return {
                            nume_categorie: payload.product[0].nume_categorie,
                            descriere_produs:
                                payload.product[0].descriere_produs,
                            unitate_masura: payload.product[0].unitate_masura,
                            stoc_initial: payload.product[0].stoc_initial,
                            pret: payload.product[0].pret,
                            categorie: payload.product[0].categorie,
                        }
                }),
            }
        case UPDATE_PRODUCTS_FAIL:
            return {
                ...state,
            }
        default:
            return state
    }
}
