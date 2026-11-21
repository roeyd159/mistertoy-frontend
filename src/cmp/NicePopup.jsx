import { useEffect } from "react"

export function NicePopup({ heading, children, footing, togglePopUp }) {

    useEffect(() => {
        document.body.addEventListener('keydown', handleKeyDown)
        return (() => {
            document.body.removeEventListener('keydown', handleKeyDown)
        })
    }, [])

    function handleKeyDown(ev) {
        if (ev.key === 'Escape') {
            ev.preventDefault()
            togglePopUp()
        }
    }

    return (
        <section className="popup-wrap">
            <header>{heading}</header>
            <main>{children}</main>
            <footer>{footing}</footer>
        </section>
    )
}