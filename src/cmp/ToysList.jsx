import { ToysPreview } from "./ToysPreview.jsx"
import { Link } from "react-router-dom"
export function ToysList({ toys, onRemoveToy }) {

    return (
        <section className="toys-list-sec">
            {toys.map(toy => {
                return <div key={toy._id}>
                    <ToysPreview toy={toy} />
                    <button onClick={() => onRemoveToy(toy._id)}>X</button>
                    <button><Link to={`/toys/${toy._id}`}>Details</Link></button>
                </div>
            })}
        </section>
    )
}