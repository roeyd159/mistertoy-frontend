import { useParams } from "react-router-dom"
import { toysService } from "../services/toy.service"
import { useState, useEffect } from "react"
import { showErrorMsg } from "../services/event-bus-service"

export function ToyDetails() {
    const [toy, setToy] = useState(null)
    const { toyId } = useParams()

    useEffect(() => {
        if (toyId) loadToy()
    }, [toyId])

    function loadToy() {
        toysService.get(toyId)
            .then(toy => {
                setToy(toy)
            })
            .catch(err => {
                console.log(err)
                showErrorMsg('Cant find toy')
            })
    }

    if (!toy) return <h1>Loading...</h1>
    return (
        <section className="toy-details-wrap">
            <h2>{toy.name}</h2>
            <div>{toy.price}</div>
            <div>Labels: {toy.labels.map(label => {
                return <div key={label}>{label}</div>

            })}</div>
        </section>
    )
}