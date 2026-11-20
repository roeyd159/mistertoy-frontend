import { storageService } from './async-storage.js'
import { utilService } from './utils-service.js'


export const dataLabels = ['On wheels', 'Box game', 'Art', 'Baby', 'Doll', 'Puzzle',
    'Outdoor', 'Battery Powered']

const toyNames = ['Barbie', 'Ken', 'Ted', 'Puffy', 'Kane', 'John', 'Rey', 'Skater', 'Jinx', 'Lego']

const TOYS_KEY = 'toysDB'
_createToys()

export const toysService = {
    query,
    get,
    remove,
    save,
    getEmptyToy,
    getDefaultFilter,
}
// For Debug (easy access from console):
window.cs = toysService

function query(filterBy = {}) {
    return storageService.query(TOYS_KEY)
        .then(toys => {
            if (filterBy.name) {
                toys = toys.filter(toy => {
                    return toy.name.toLowerCase().includes(filterBy.name.toLowerCase())
                })
            }
            if (filterBy.inStock === true) {
                toys = toys.filter(toy => toy.inStock)
            }
            else if (filterBy.inStock === false) {
                toys = toys.filter(toy => !toy.inStock)
            }
            if (filterBy.labels && filterBy.labels.length) {
                toys = toys.filter(toy => {
                    return filterBy.labels.some(label => toy.labels.includes(label))
                })
            }
            if (filterBy.sortBy === 'name') {
                toys = toys.sort((toy1, toy2) => {
                    return toy1.name.localeCompare(toy2.name)
                })
            }
            if (filterBy.sortBy === 'price') {
                toys = toys.sort((toy1, toy2) => toy1.price - toy2.price)
            }
            if (filterBy.sortBy === 'createdAt') {
                toys = toys.sort((toy1, toy2) => toy2.createdAt - toy1.createdAt)
            }
            return toys
        })
}

function get(toyId) {
    return storageService.get(TOYS_KEY, toyId)
}

function remove(toyId) {
    return storageService.remove(TOYS_KEY, toyId)
}

function save(toy) {
    if (toy._id) {
        return storageService.put(TOYS_KEY, toy)
    }
    else {
        toy.createdAt = Date.now()
        return storageService.post(TOYS_KEY, toy)
    }
}



function getDefaultFilter() {
    return {
        name: '',
        inStock: null,
        labels: [],
        sortBy: ''
    }
}

// function getFilterFromSearchParams(searchParams) {
//     const defaultFilter = getDefaultFilter()
//     const filterBy = {}
//     for (const field in defaultFilter) {
//         filterBy[field] = searchParams.get(field) || ''
//     }
//     return filterBy
// }


function _createToys() {
    let toys = utilService.loadFromStorage(TOYS_KEY)
    if (!toys || !toys.length) {
        toys = []
        for (let i = 0; i < 15; i++) {
            const name = toyNames[utilService.getRandomIntInclusive(0, toyNames.length - 1)]
            toys.push(_createToy(name, utilService.getRandomIntInclusive(100, 200)))
        }
        utilService.saveToStorage(TOYS_KEY, toys)
    }
}


function _createToy(name, price) {
    const toy = getEmptyToy(name, price)
    let labelsCopy = [...dataLabels]
    toy._id = utilService.makeId()
    for (let i = 0; i < 3; i++) {
        const randomIdx = utilService.getRandomIntInclusive(0, labelsCopy.length - 1)
        toy.labels.push(labelsCopy[randomIdx])
        labelsCopy.splice(randomIdx, 1)
    }
    toy.createdAt = Date.now() - utilService.getRandomIntInclusive(0, 1000 * 60 * 60 * 24)
    return toy
}

// function _setNextPrevTodoId(todo) {
//     return storageService.query(TOYS_KEY).then((todos) => {
//         const todoIdx = todos.findIndex((currTodo) => currTodo._id === todo._id)
//         const nextTodo = todos[todoIdx + 1] ? todos[todoIdx + 1] : todos[0]
//         const prevTodo = todos[todoIdx - 1] ? todos[todoIdx - 1] : todos[todos.length - 1]
//         todo.nextTodoId = nextTodo._id
//         todo.prevTodoId = prevTodo._id
//         return todo
//     })
// }

function getEmptyToy(name = '', price = 100) {
    return { name, price, inStock: true, labels: [], imgUrl: '' }
}





