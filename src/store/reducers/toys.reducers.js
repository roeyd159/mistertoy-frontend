// import { toysService } from "../../services/toy.service.js";


export const SET_TOYS = 'SET_TOYS'
export const IS_LOADING = 'IS_LOADING'
export const DELETE_TOY = 'DELETE_TOY'
export const ADD_TOY = 'ADD_TOY'
export const UPDATE_TOY = 'UPDATE_TOY'
export const TOGGLE_STOCK = 'TOGGLE_STOCK'

const initialState = {
    toys: [],
    isLoading: false
}

export function toysReducer(state = initialState, cmd) {
    switch (cmd.type) {
        case 'SET_TOYS':
            return { ...state, toys: cmd.toys }

        case 'ADD_TOY':
            return {
                ...state,
                toys: [...state.toys, cmd.toy]
            }

        case 'UPDATE_TOY':
            return {
                ...state,
                toys: state.toys.map(toy => {
                    if (cmd.toy._id === toy._id) {
                        return cmd.toy
                    }
                    else {
                        return toy
                    }
                })
            }

        case 'DELETE_TOY':
            return {
                ...state,
                toys: state.toys.filter(toy => toy._id !== cmd.toyId)
            }

        case 'TOGGLE_STOCK':
            return {
                ...state,
                toys: state.toys.map(toy => {
                    if (toy._id === cmd.toyId) {
                        let toyToToggle = { ...toy }
                        toyToToggle.inStock = !toy.inStock
                        return toyToToggle
                    }
                    else {
                        return toy
                    }
                })
            }


        case 'IS_LOADING':
            return { ...state, isLoading: cmd.isLoading }

        default: return state
    }
}

