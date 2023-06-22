import "./index.css"
import { useEffect, useState } from "react"
import CardsProduction from "./cardsProduction.js"


function DailyProd () {
    const [productions, setProductions] = useState([])
    
    useEffect (() => {
        
        const dateDay = new Date(2023, 6, 21, 0, 0, 0)

        function prodFilteredByTime (y) {
            const x = []
            for (let i of y) {
                const productionOfTheDay = {productionOfTheDay: i.production.filter(data => data.date === dateDay.getTime())}
                const newI = Object.assign(i, productionOfTheDay)
                x.push(newI)
            }
            const prodFilteredbyTheDay = x.filter(data => data.productionOfTheDay.length > 0)
            return prodFilteredbyTheDay
        }

        fetch("http://localhost:3000/api/production")
            .then(res => res.json())
            .then(datas => setProductions(prodFilteredByTime(datas)))
            .catch( error => alert("Erreur : " + error))
        
    }, [])

    console.log(productions)

    return (
        <div className="dailyProdFlex">
            <h1 className="titleOperator">Production du jour : </h1>
            {productions.map(production => CardsProduction(production))}
        </div>
    )
}

export default DailyProd