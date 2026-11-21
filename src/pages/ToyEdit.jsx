import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { toysService } from "../services/toy.service"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus-service"
import { saveToy } from "../store/toys.actions"
import { useNavigate } from "react-router-dom"
import { dataLabels } from "../services/toy.service"
import { useConfirmTabClose } from "../Hooks/useConfirmTabClose.jsx"
export function ToyEdit() {

    const [toyToEdit, setToyToEdit] = useState(toysService.getEmptyToy())
    const { toyId } = useParams()
    const navigate = useNavigate()
    const setHasUnsavedChanges = useConfirmTabClose()

    useEffect(() => {
        if (toyId) {
            getToy()
        }
    }, [toyId])

    function getToy() {
        return toysService.get(toyId)
            .then(toy => {
                setToyToEdit(toy)
            })
            .catch(err => {
                console.log('error: ', err)
            })
    }


    function handleChange({ target }) {
        const { value, name } = target
        let toyToReturn
        setHasUnsavedChanges(true)
        if (name === 'price')
            toyToReturn = { ...toyToEdit, [name]: +value }

        else if (name === 'inStock') {
            toyToReturn = { ...toyToEdit, [name]: target.checked }
        }
        else if (name === 'labels') {
            if (!target.checked) {
                toyToReturn = {
                    ...toyToEdit,
                    labels:
                        [...toyToEdit.labels.filter(label => value !== label)]
                }

            }
            else {
                toyToReturn = {
                    ...toyToEdit,
                    labels:
                        [...toyToEdit.labels, value]
                }
            }
        }

        else {
            toyToReturn = { ...toyToEdit, [name]: value }
        }
        setToyToEdit(toyToReturn)
    }

    function onSubmit(ev) {
        ev.preventDefault()
        let isUpdate
        toyId ? isUpdate = true : isUpdate = false
        saveToy(toyToEdit)
            .then(() => {
                if (isUpdate) {
                    showSuccessMsg('Toy updated')
                }
                else {
                    showSuccessMsg('Toy Added')
                }
                setHasUnsavedChanges(false)
                navigate("/toys")

            })
            .catch(err => {
                console.log('error: ', err)
                showErrorMsg('Failed')
            })
    }

    return (
        <section className="toy-edit-wrap">
            <form onSubmit={onSubmit}>
                <label htmlFor="name">Name: </label>
                <input onChange={handleChange} type="text" name="name" id="name" value={toyToEdit.name} />
                <label htmlFor="price">Price:: </label>
                <input onChange={handleChange} type="number" name="price" id="price" value={toyToEdit.price} />
                <label htmlFor="inStock">In Stock: </label>
                <input onChange={handleChange} type="checkbox" checked={toyToEdit.inStock} name="inStock" id="inStock" />

                {dataLabels.map(label => {
                    return <section className="input-edit-wrap">
                        <label htmlFor="labels">{label}</label>
                        <input key={label} onChange={handleChange} type="checkbox"
                            checked={toyToEdit.labels.includes(label)}
                            value={label} name="labels" id={label} />
                    </section>
                })}
                <button>Save</button>
            </form >

        </section >
    )
}