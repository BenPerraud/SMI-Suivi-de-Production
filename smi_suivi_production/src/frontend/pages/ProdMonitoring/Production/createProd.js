import { useEffect, useState } from "react"
import "./createProd.css"

function CreateProduction () {
    const [operators, setOperators] = useState([])
    const completOperators = operators.map(operator => [operator.firstname, operator.name].join(" "))
    
    useEffect (() => {
        fetch("http://localhost:3000/api/operator")
            .then(res => res.json())
            .then(datas => setOperators(datas))
            .catch(error => alert("Erreur : " + error))
    }, [])

    /*Formatage de la date pour affichage par default */
    const date= new Date()

    function dateMonth () {
        const month = date.getMonth()+1
        if (month < 10) {
            return String("0"+month)
        }else {
            return month
        }}
    
    function dayMonth () {
        const day = date.getDate()
        if (day < 10) {
            return String("0"+day)
        }else {
            return day
        }}

    const today = [date.getFullYear(), dateMonth(), dayMonth()].join("-")


    /* Fonction appelée pour envoi du questionnaire */
    function postProduction (e) {
        e.preventDefault()

        const dateInput = (document.getElementById("date").value).split("-")
        console.log(dateInput)
        const date = Date.parse(new Date(dateInput[0], dateInput[1]-1, dateInput[2], 0, 0, 0))
        console.log(date)
        const ope0 = document.getElementById("operator0").value
        const ope1 = document.getElementById("operator1").value
        const ope2 = document.getElementById("operator2").value
        const operators = [ope0, ope1, ope2]
        const operator = operators.filter(Boolean)

        const h = Number(document.getElementById("heures").value)
        const m = Number(document.getElementById("minutes").value)
        const totTimeProd = (h*60 + m)
        
        const form = e.target
        const formData = new FormData(form)
        
        formData.append("date", date)
        formData.append("prodTime", totTimeProd)
        formData.append("operator", operator)

        for (let value of formData.values()) {
            if (value === "") {
                alert("Un des champs du questionnaire n'est pas rempli")
                break
            } else {
                fetch("http://localhost:3000/api/production",{method: 'POST', body: formData})
                    .then(res => res.json())
                    .then(res => alert(res))
                    .catch(error => alert("Erreur : " + error))
                form.reset()
                break
            }
            
        }

        
    }

    return (
        <div className="createOperator">
            <h1 className="titleOperator">Ajouter une nouvelle production</h1>
            <form name="createOperatorForm" method="post" encType="multipart/form-data" onSubmit={postProduction} className="formOperator">
                <label>PI : <input className="formElement widthPi" type="text" name="pi" /></label>
                <label>Client : <input className="formElement widthClient" type="text" name="client" /></label>
                <label>Désignation projet : <input className="formElement widthDesignation" type="text" name="designation" /></label>
                <label>Date : <input className="formElement widthDate" type="date" id="date" defaultValue={today} /></label>
                <label>Opérateur/trice #1 : 
                    <select className="formElement widthOperator" type="text" id="operator0">
                        <option value=""> -- Choisir un(e) opérateur/trice -- </option>
                        {completOperators.map(completOperator => <option key={completOperators.indexOf(completOperator)}>{completOperator}</option>)}
                    </select>
                </label>
                <label>Opérateur/trice #2 : 
                    <select className="formElement widthOperator" type="text" id="operator1">
                        <option value=""> -- Choisir un(e) opérateur/trice -- </option>
                        {completOperators.map(completOperator => <option key={completOperators.indexOf(completOperator)}>{completOperator}</option>)}
                    </select>
                </label>
                <label>Opérateur/trice #3 : 
                    <select className="formElement widthOperator" type="text" id="operator2">
                        <option value=""> -- Choisir un(e) opérateur/trice -- </option>
                        {completOperators.map(completOperator => <option key={completOperators.indexOf(completOperator)}>{completOperator}</option>)}
                    </select>
                </label>
                <label>Temps de production : <input className="formElement widthTimeProd" type="number" id="heures"/> heures et <input className="formElement widthTimeProd" type="number" id="minutes"/> minutes</label>
                <label>Quantité théorique : <input className="formElement widthProdTheo" type="text" name="quantityTheorical" /> pièces théoriques sur base 7 heures</label>
                <label>Quantité produite : <input className="formElement widthProdQuantity" type="text" name="quantityProd" /></label>
                <label>Quantité rebut : <input className="formElement widthProdWaste" type="text" name="quantityWaste" /></label>
                <label>Commentaires : <input id="formComments" className="formElement widthComments" type="text" name="comments" defaultValue="Pas de commentaires"/></label>
                <button className="btnCreateOperator" type="submit">Ajouter à la base de données</button>
            </form>
        </div>
    )
}

export default CreateProduction