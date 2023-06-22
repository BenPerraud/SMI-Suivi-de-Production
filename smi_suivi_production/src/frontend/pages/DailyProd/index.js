import "./index.css"
import { useEffect, useState } from "react"
import CardsProduction from "./cardsProduction.js"


function DailyProd () {
    const [productions, setProductions] = useState([])
    

    /* Bloc sur les dates */
    const date= new Date()
    function dateMonth () {
        const month = date.getMonth()+1
        if (month < 10) {
            return String("0"+month)
        }else {
            return month
        }}
    
    function dateDay () {
        const day = date.getDate()
        if (day < 10) {
            return String("0"+day)
        }else {
            return day
        }}

    const today = [date.getFullYear(), dateMonth(), dateDay()].join("-") /*Pour afficher la valeur par défault*/

    function newDate () {
        const newDate = (document.getElementById("date").value).split("-")
        setChangeDate(new Date(newDate[0], newDate[1], newDate[2], 0, 0, 0))
    }
    
    const day = new Date (date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0)
    const [changeDate, setChangeDate] = useState(day)

    /* UseEffect du fetch */
    useEffect (() => {

        function prodFilteredByTime (y) {
            const x = []
            for (let i of y) {
                const productionOfTheDay = {productionOfTheDay: i.production.filter(data => data.date === changeDate.getTime())}
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
        
    }, [changeDate])

    return (
        <div className="dailyProdFlex">
            <h1 className="titleOperator">Production du jour : </h1>
            <form>
                <label>Date : <input onChange={() => newDate()} className="formElement widthDate" type="date" id="date" defaultValue={today} /></label>
            </form>
            {productions.map(production => <CardsProduction key={production._id} production={production}/>)}
        </div>
    )
}

export default DailyProd