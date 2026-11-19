export function ToysPreview({ toy }) {
    return (
        <section className="toy-preview">
            <h2>{toy.name}</h2>
            <div>Price: {toy.price}</div>
        </section>
    )
}