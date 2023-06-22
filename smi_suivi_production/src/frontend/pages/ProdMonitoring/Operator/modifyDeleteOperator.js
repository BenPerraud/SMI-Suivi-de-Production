import "./modifyDeleteOperator.css"
import { useEffect, useState } from "react"
import CardsOperator from "./cardsOperator"

function ModifyDeleteOperator ({formState, setFormState}) {
    const [operators, setOperators] = useState([])
    
    useEffect (() => {
        fetch("http://localhost:3000/api/operator")
            .then(res => res.json())
            .then(datas => setOperators(datas))
            .catch(error => alert("Erreur : " + error))
    }, [formState])

    return (
        <div className="modifyOperator">
            <h1 className="titleOperator">Modifier ou supprimer un(e) opérateur/trice</h1>
            <div className="cardsOperatorFlex">{operators.map(operator => CardsOperator(operator, {formState, setFormState}))}</div>
        </div>
    )
}

export default ModifyDeleteOperator