
import { combineReducers, createStore } from 'redux'

// import { userReducer } from './reducers/user.reducers.js'
import { toysReducer } from './reducers/toys.reducers.js'


const rootReducer = combineReducers({
    // userModule: userReducer,
    toyModule: toysReducer
})

export const store = createStore(rootReducer)