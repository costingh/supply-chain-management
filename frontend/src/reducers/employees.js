import {
    FETCH_EMPLOYEES_SUCCESS,
    FETCH_EMPLOYEES_FAIL,
    FETCH_PROFILE_SUCCESS,
    FETCH_PROFILE_FAIL,
    UPDATE_PROFILE_SUCCESS,
    UPDATE_PROFILE_FAIL,
    UPDATE_SALARY_SUCCESS,
    UPDATE_SALARY_FAIL,
} from '../actions/types'

const initialState = { employees: null, profile: null }

export default function (state = initialState, action) {
    const { type, payload } = action

    switch (type) {
        case FETCH_EMPLOYEES_SUCCESS:
            return {
                ...state,
                employees: payload.employees,
            }
        case FETCH_EMPLOYEES_FAIL:
            return {
                ...state,
            }
        case FETCH_PROFILE_SUCCESS:
            return {
                ...state,
                profile: payload.profile,
            }
        case FETCH_PROFILE_FAIL:
            return {
                ...state,
            }
        case UPDATE_PROFILE_SUCCESS:
            return {
                ...state,
                profile: payload.profile,
            }
        case UPDATE_PROFILE_FAIL:
            return {
                ...state,
            }
        case UPDATE_SALARY_SUCCESS:
            return {
                ...state,
                employees: state.employees.map((emp) => {
                    if (emp.email !== payload.email) return emp
                    else
                        return {
                            CNP: emp.CNP,
                            administrator: emp.administrator,
                            data_nastere: emp.data_nastere,
                            email: emp.email,
                            id_angajat: emp.id_angajat,
                            id_departament: emp.id_departament,
                            judet: emp.judet,
                            numar: emp.numar,
                            numar_telefon: emp.numar_telefon,
                            nume: emp.nume,
                            oras: emp.oras,
                            parola: emp.parola,
                            prenume: emp.prenume,
                            salariu: payload.salary,
                            sex: emp.sex,
                            strada: emp.strada,
                        }
                }),
            }
        case UPDATE_SALARY_FAIL:
            return {
                ...state,
            }
        default:
            return state
    }
}
