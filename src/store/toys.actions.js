
import { toysService } from "../services/toy.service";
import { SET_TOYS, ADD_TOY, DELETE_TOY, TOGGLE_STOCK, UPDATE_TOY, FILTER_BY } from "./reducers/toys.reducers";
import { store } from "./store.js";

export function loadToys(filterBy) {
    return toysService.query(filterBy)
        .then(toys => {
            store.dispatch({ type: SET_TOYS, toys })
        })
        .catch(err => {
            console.log('error:', err)
            throw err
        })
}

export function removeToy(toyId) {
    return toysService.remove(toyId)
        .then(() => {
            store.dispatch({ type: DELETE_TOY, toyId })
        })
        .catch(err => {
            console.log('error:', err)
            throw err
        })
}

export function saveToy(toy) {
    let isUpdate
    toy._id ? isUpdate = true : isUpdate = false

    return toysService.save(toy)
        .then(toy => {
            if (isUpdate) {
                store.dispatch({ type: UPDATE_TOY, toy })
            }
            else {
                store.dispatch({ type: ADD_TOY, toy })
            }
            return toy
        })
        .catch(err => {
            console.log('error:', err)
            throw err
        })
}

export function updateFilterBy(filterBy) {
    store.dispatch({ type: FILTER_BY, filterBy })

}

export function toggleStock(toyId) {
    store.dispatch({ type: TOGGLE_STOCK, toyId })

}
