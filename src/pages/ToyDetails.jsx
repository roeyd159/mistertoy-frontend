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
            <img src={toy.imgUrl} alt={toy.name} />
            <div> Price: {toy.price}</div>
            <div className="labels-details-wrap">
                Labels: {toy.labels.map(label => {
                    return <div key={label}>{label}</div>
                })}</div>
            <div className="instock-details">In Stock: {toy.inStock ? '✅' : '❌'}</div>
            <div>Since: {new Date(toy.createdAt).toLocaleDateString()}</div>
        </section>
    )
}