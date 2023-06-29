import "./index.css"
import { useState } from "react"
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Legend, ResponsiveContainer, Tooltip } from "recharts"


function Analyse () {
    const [productions, setProductions] = useState([])
    const [formattedProd, setFormattedProd] = useState([])
   
    function formatDatas (x) {
        try {
            const formattedProd = []
            for (let i of x.production) {
                /* Bloc des dates */
                function dateMonth (x) {
                    const month = x+1
                    if (month < 10) {
                        return String("0"+month)
                    }else {
                        return month
                    }}
                
                function dateDay (x) {
                    const day = x
                    if (day < 10) {
                        return String("0"+day)
                    }else {
                        return day
                    }}

                const date = new Date(i.date)
                const dateProd = [dateDay(date.getDate()), dateMonth(date.getMonth()), date.getFullYear()-2000].join("/")
                
                const arrayOperator = i.operator[0].split(",")

                const newProdObject = {
                    date: dateProd,
                    dateTime: date,
                    qte_produite: i.quantityProd,
                    qte_rebut: i.quantityWaste,
                    qte_validée: i.quantityProd-i.quantityWaste,
                    taux_de_rebut: (i.quantityWaste/i.quantityProd)*100,
                    temps_production: i.prodTime,
                    opérateur: arrayOperator,
                    trsTheorique_min: i.quantityTheorical/420,
                    trs_min: (i.quantityProd-i.quantityWaste)/i.prodTime,
                    commentaires: i.comments
                }
                formattedProd.push(newProdObject)
            }

            formattedProd.sort((a, b) => a.dateTime - b.dateTime)
            return formattedProd
        } catch (err) {
            alert("Le PI renseigné n'existe pas")
            window.location.reload(false)
        }
    }

    function getPiForAnalyse (e) {
        e.preventDefault()
        const form = e.target
        const formData = new FormData(form)
        const piInput = formData.get("PI")

        fetch("http://localhost:3000/api/production/"+piInput)
            .then(res => res.json())
            .then(res => setProductions(res))
            .catch(error => alert( error ))

        fetch("http://localhost:3000/api/production/"+piInput)
            .then(res => res.json())
            .then(res => setFormattedProd(formatDatas(res)))
            .catch(error => alert( error ))
        
            form.reset()
    }
    

    const toPercent = (decimal) => `${(decimal).toFixed(1)}%`
    
    function CustomTooltipWaste ({active, label, payload}) {
        if (active) {
            return (
                <div className="tooltip">
                    <p className="tooltipElement bold" >{label}</p>
                    <p className="tooltipElement">{`Taux de rebut : ${(payload[0].value).toFixed(1)}%`}</p>
                    <p className="tooltipElement">Opérateur/trice :</p>
                    <ul className="tooltipList">
                        {(payload[1].value).map(ope => <li className="tooltipElementList" key={ope}>{ope}</li>)}
                    </ul>
                    <p className="tooltipElement">Commentaires :</p>
                    <ul className="tooltipList">
                        <li className="tooltipElementList">{payload[2].value}</li>
                    </ul>
                </div>
            )
        }
        return null
    }

    function CustomTooltipTrs ({active, label, payload}) {
        if (active) {
            return (
                <div className="tooltip">
                    <p className="tooltipElement bold" >{label}</p>
                    <p className="tooltipElement">{`TRS observé : ${(payload[0].value).toFixed(0)} pcs/min`}</p>
                    <p className="tooltipElement">{`TRS théorique : ${(payload[1].value).toFixed(0)} pcs/min`}</p>
                </div>
            )
        }
        return null
    }


    return (
        <div className="flexColumnGeneral">
            <div className="rowGap20px">
                <h1 className="titleH1">Etape 1 : renseigner le PI souhaité</h1>
                <form className="form" name="form" method="get" encType="multipart/form-data" onSubmit={getPiForAnalyse}>
                    <label>PI : <input className="formElement" type="text" name="PI"></input></label>
                    <button className="formBtn">Analyser</button>
                </form>
            </div>
            <div className={productions.length === 0 ? "closed" : "rowGap20px"}>
                <h1 className="titleH1">Etape 2 : Analyse du produit {productions.pi} / {productions.client} / {productions.designation}</h1>
                <div className="rowGap15px">
                    <h2 className="titleH2">Taux de rebut</h2>
                    <div className="lineChart">
                        <ResponsiveContainer width="100%" height={400}>
                            <LineChart data={formattedProd}>
                                <CartesianGrid stroke="#9ba9c6" strokeDasharray="3 3"/>
                                <YAxis tickFormatter={toPercent}/>
                                <XAxis dataKey="date" tick={{fontSize: 15}} height={65} angle={-45} textAnchor="end" tickSize={12}/>
                                <Line type="monotone" dataKey="taux_de_rebut" stroke="#203864" strokeWidth={2}/>
                                <Line style={{display: "none"}} type="monotone" dataKey="opérateur"/>
                                <Line style={{display: "none"}} type="monotone" dataKey="commentaires"/>
                                <Tooltip content={<CustomTooltipWaste />}/>
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>
                <div className="rowGap15px">
                    <h2 className="titleH2">TRS à la minute</h2>
                    <div className="lineChart">
                        <ResponsiveContainer width="100%" height={400}>
                            <LineChart data={formattedProd}>
                                <CartesianGrid stroke="#9ba9c6" strokeDasharray="3 3"/>
                                <YAxis />
                                <XAxis dataKey="date" tick={{fontSize: 15}} height={65} angle={-45} textAnchor="end" tickSize={12}/>
                                <Line type="monotone" dataKey="trs_min" stroke="#203864" strokeWidth={2}/>
                                <Line type="monotone" dataKey="trsTheorique_min" stroke="#882e3d" strokeWidth={2}/>
                                <Tooltip content={<CustomTooltipTrs />} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Analyse