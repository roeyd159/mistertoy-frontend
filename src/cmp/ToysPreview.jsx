export function ToysPreview({ toy }) {
    return (
        <section className="toy-preview">
            <h2>{toy.name}</h2>
            <div>Price: {toy.price}</div>
            <img className="toy-img" src={toy.imgUrl} alt="toy" />
        </section>
    )
}