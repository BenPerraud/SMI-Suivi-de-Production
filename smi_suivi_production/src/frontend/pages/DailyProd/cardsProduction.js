import "./cardsProduction.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronUp } from '@fortawesome/free-solid-svg-icons'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'
import { useState } from "react"

function CardsProduction ({production}) {
    const [isOpen, setIsOpen] = useState(false)

    function convertToHours (x) {
        const hours = Math.floor(x/60)
        const reste = (x-hours*60)
        const result = [hours, "h", reste, "min"].join(" ")
        return result
    }

    function arrayOperators (x) {
        const operators = x[0].split(",")
        return operators
    }

    function handleChange () {
        setIsOpen(!isOpen)
    }

    const chevron = (isOpen ? <FontAwesomeIcon onClick={() => handleChange()} className="chevron" icon={faChevronDown} /> : <FontAwesomeIcon onClick={() => handleChange()} className="chevron" icon={faChevronUp} />)
    
    
    return (
        <div key={production._id} className="cardsProdFlex">
            <div className="cardsProdDetails">
                <div className="cardsProdFlexDesi underline">{production.client} / {production.designation}</div>
                {chevron}
            </div>
            <div className="cardsProdFlexProd">
                <div className="cardsProdFlexProdElement">Qte produite : {production.productionOfTheDay[0].quantityProd.toLocaleString()} pcs</div>
                <div className="cardsProdFlexProdElement">Qte rebut : {production.productionOfTheDay[0].quantityWaste.toLocaleString()} pcs ({((production.productionOfTheDay[0].quantityWaste/production.productionOfTheDay[0].quantityProd)*100).toFixed(1)}%)</div>
                <div className="cardsProdFlexProdElement validProd">Qte validée : {(production.productionOfTheDay[0].quantityProd-production.productionOfTheDay[0].quantityWaste).toLocaleString()} pcs</div>
                <div className="cardsProdFlexProdElementTheo">(Qte théorique : {production.productionOfTheDay[0].quantityTheorical.toLocaleString()} pcs)</div>
            </div>
            <div className={isOpen ? "cardsProdFlexDetails"  : "closed"}>
                <div className="cardsProdFlexDesi">Détails de la production :</div>
                <div className="cardsDetailsElement">- Temps de production : {convertToHours(production.productionOfTheDay[0].prodTime)} (prod/h : {Math.trunc((production.productionOfTheDay[0].quantityProd/(production.production[0].prodTime/60))).toLocaleString()} pcs)</div>
                <div>
                    <div className="cardsDetailsElement">- Opérateur/trice :</div>
                    {(arrayOperators(production.productionOfTheDay[0].operator)).map(operator => <div className="cardsProdFlexProdElementTheo padding" key={operator}>{operator}</div>)}
                </div>
                <div className="cardsDetailsElement">- Commentaires : {production.productionOfTheDay[0].comments}</div>
            </div>
        </div>
    )
}

export default CardsProduction