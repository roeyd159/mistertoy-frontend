import { useState, useEffect } from "react";
import { dataLabels } from "../services/toy.service";
import { updateFilterBy } from "../store/toys.actions";

export function ToysFilter({ filterBy }) {
    const [filterByToEdit, setFilterByToEdit] = useState(filterBy)
    const [isDropOpen, setIsDropOpen] = useState(false)
    const labels = dataLabels


    useEffect(() => {
        let timeOutId
        timeOutId = setTimeout(() => {
            updateFilterBy(filterByToEdit)
        }, 500)

        return (() => clearTimeout(timeOutId))
    }, [filterByToEdit])

    function toggleDropDown() {
        setIsDropOpen(isDropOpen => !isDropOpen)

    }

    function handleChange({ target }) {
        const { value, name } = target
        let filterToReturn
        let converedValue

        if (name === 'name') {
            filterToReturn = { ...filterByToEdit, [name]: value }
        }
        if (name === 'inStock') {
            if (value === 'true') {
                converedValue = true
            }
            else if (value === 'false') {
                converedValue = false
            }
            else {
                converedValue = null
            }
            filterToReturn = { ...filterByToEdit, [name]: converedValue }
        }
        if (name === 'labels') {
            if (!target.checked) {
                filterToReturn = {
                    ...filterByToEdit,
                    labels:
                        [...filterByToEdit.labels.filter(label => value !== label)]
                }
            }
            else {
                filterToReturn = {
                    ...filterByToEdit,
                    labels:
                        [...filterByToEdit.labels, value]
                }
            }
        }
        if (name === 'sortBy') {
            filterToReturn = { ...filterByToEdit, sortBy: value }
        }

        setFilterByToEdit(filterToReturn)

    }

    return (
        <section className="filter-wrap">
            <label htmlFor="name">By name: </label>
            <input onChange={handleChange} type="text" name="name" value={filterByToEdit.name} id="name" />
            <label htmlFor="inStock">In Stock: </label>
            <select onChange={handleChange} value={filterByToEdit.inStock ?? ''} name="inStock" id="inStock">
                <option value="">All</option>
                <option value="true">In stock</option>
                <option value="false">Not in stock</option>
            </select>
            <div className="dropdown-wrapper">
                <button onClick={toggleDropDown}>Labels</button>
                {isDropOpen && <section className="labels-checkbox">
                    {labels.map(label => {
                        return <div className="label-div" key={label + 'i'}>
                            <label htmlFor={label}>{label}</label>
                            <input onChange={handleChange} key={label} type="checkbox"
                                name='labels'
                                id={label}
                                checked={filterByToEdit.labels.includes(label)}
                                value={label} />
                        </div>
                    })}
                    <button onClick={toggleDropDown}>X</button>
                </section>}
            </div>
            <select onChange={handleChange} value={filterByToEdit.sortBy} name="sortBy" id="sortBy">
                <option value="">All</option>
                <option value="name">Name</option>
                <option value="price">Price</option>
                <option value="createdAt">Date</option>
            </select>

        </section>
    )


}