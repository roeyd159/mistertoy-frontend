import { useSelector } from "react-redux";
import { ToysList } from "../cmp/ToysList.jsx";
import { useEffect } from "react";
import { loadToys, removeToy } from "../store/toys.actions.js";
import { showSuccessMsg, showErrorMsg } from "../services/event-bus-service.js";

export function ToysIndex() {

    const toys = useSelector(storeState => storeState.toyModule.toys)

    useEffect(() => {
        loadToys()
    }, [])

    function onRemoveToy(toyId) {
        removeToy(toyId)
            .then(() => {
                showSuccessMsg('Toy ' + toyId + ' Removed')
            })
            .catch(err => {
                showErrorMsg('Cant Remove toy')
            })
    }

    return (
        <section className="index-layout">
            <h2>TOYS INDEX</h2>
            <ToysList toys={toys} onRemoveToy={onRemoveToy}  />
        </section>
    )
}