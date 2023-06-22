import "./cardsProduction.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronUp } from '@fortawesome/free-solid-svg-icons'

function CardsProduction (x) {
    return (
        <div key={x._id} className="cardsProdFlex">
            <div className="cardsProdDetails">
                <div className="cardsProdFlexDesi">{x.client} / {x.designation}</div>
                <button><FontAwesomeIcon icon={faChevronUp} /></button>
            </div>
            <div className="cardsProdFlexProd">
                <div className="cardsProdFlexProdElement">Qte produite : {x.productionOfTheDay[0].quantityProd.toLocaleString()} pcs</div>
                <div className="cardsProdFlexProdElement">Qte rebut : {x.productionOfTheDay[0].quantityWaste.toLocaleString()} pcs ({((x.productionOfTheDay[0].quantityWaste/x.productionOfTheDay[0].quantityProd)*100).toFixed(1)}%)</div>
                <div className="cardsProdFlexProdElement validProd">Qte validée : {(x.productionOfTheDay[0].quantityProd-x.productionOfTheDay[0].quantityWaste).toLocaleString()} pcs</div>
                <div className="cardsProdFlexProdElementTheo">(Qte théorique : {x.productionOfTheDay[0].quantityTheorical.toLocaleString()} pcs)</div>
            </div>
            
            <div></div>
        </div>
    )
}

export default CardsProduction