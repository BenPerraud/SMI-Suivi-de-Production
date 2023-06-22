import "./cardsOperator.css"
import DeleteOperator from "./deleteOperator"
import { NavLink } from "react-router-dom"

function CardsOperator (x, {formState, setFormState}) {
    const urlModify = ["/Suivi-de-production/", x._id].join("")
    return (
        <div key={x._id} className="cards">
            <div className="cardsOperator">
                <p className="cardsOperatorElement bold">Prénom : {x.firstname}</p>
                <p className="cardsOperatorElement">Nom : {x.name}</p>
                <p className="cardsOperatorElement">Contrat : {x.contract}</p>
            </div>
            <div className="btnOperatorFlex">
                <NavLink to={urlModify} className="navLinkModify">Modifier</NavLink>
                <button onClick={() => DeleteOperator(x, {formState, setFormState})} className="btnOperator red">Supprimer</button>
            </div>
        </div>
    )
}

export default CardsOperator