import "./index.css"
import { useState } from "react"
import { LineChart, Line, CartesianGrid, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts"
import CustomTooltipCadence from "./tooltipCadence"
import CustomTooltipWaste from "./tooltipWaste"
import CustomTooltipTrs from "./tooltipTrs"


function Analyse () {
    const [productions, setProductions] = useState([])
    const [prodDesignation, setProdDesignation] = useState({})

    function formatDatas (x) {
        try {
            /* On crée un objet avec les identifiants de la production */
            const newObject = {
                client: x.client,
                pi: x.pi,
                designation: x.designation,
                quantityTheorical: x.quantityTheorical,
            }
            setProdDesignation(newObject)

            /* On crée un objet avec toutes les productions /*/
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
                    cadenceTheorique_heure: x.quantityTheorical/7,
                    cadenceReelle_heure: (i.quantityProd-i.quantityWaste)/(i.prodTime/60),
                    commentaires: i.comments,
                    trs: ((i.quantityProd-i.quantityWaste)/(i.prodTime/60))/(x.quantityTheorical/7)*100,
                    trs_max: 100
                }
                formattedProd.push(newProdObject)
            }
    
            formattedProd.sort((a, b) => a.dateTime - b.dateTime)
            return setProductions(formattedProd)
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
            .then(res => formatDatas(res))
            .catch(error => alert( error ))
        
            form.reset()
    }

    const toPercent = (decimal) => `${(decimal).toFixed(1)}%`
    


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
                <h1 className="titleH1">Etape 2 : Analyse du produit {prodDesignation.pi} / {prodDesignation.client} / {prodDesignation.designation}</h1>
                <div className="rowGap15px">
                    <h2 className="titleH2">Taux de rebut</h2>
                    <div className="lineChart">
                        <ResponsiveContainer width="100%" height={400}>
                            <LineChart data={productions}>
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
                    <h2 className="titleH2">Cadence à l'heure (hors rebuts)</h2>
                    <div className="lineChart">
                        <ResponsiveContainer width="100%" height={400}>
                            <LineChart data={productions}>
                                <CartesianGrid stroke="#9ba9c6" strokeDasharray="3 3"/>
                                <YAxis />
                                <XAxis dataKey="date" tick={{fontSize: 15}} height={65} angle={-45} textAnchor="end" tickSize={12}/>
                                <Line type="monotone" dataKey="cadenceReelle_heure" stroke="#203864" strokeWidth={2}/>
                                <Line type="monotone" dataKey="cadenceTheorique_heure" stroke="#882e3d" strokeWidth={2}/>
                                <Tooltip content={<CustomTooltipCadence />} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>
                <div className="rowGap15px">
                    <h2 className="titleH2">TRS</h2>
                    <div className="lineChart">
                        <ResponsiveContainer width="100%" height={400}>
                            <LineChart data={productions}>
                                <CartesianGrid stroke="#9ba9c6" strokeDasharray="3 3"/>
                                <YAxis yAxisId="left" tickFormatter={toPercent} />
                                <YAxis yAxisId="right" orientation="right" style={{display: "none"}}/>
                                <XAxis dataKey="date" tick={{fontSize: 15}} height={65} angle={-45} textAnchor="end" tickSize={12}/>
                                <Line yAxisId="left" type="monotone" dataKey="trs" stroke="#203864" strokeWidth={2}/>
                                <Line yAxisId="left" type="monotone" dataKey="trs_max" stroke="#882e3d" strokeWidth={2}/>
                                <Line yAxisId="right" style={{display: "none"}} type="monotone" dataKey="cadenceReelle_heure" activeDot={0}/>
                                <Line yAxisId="right" style={{display: "none"}} type="monotone" dataKey="cadenceTheorique_heure" activeDot={0}/>
                                <Line yAxisId="right" style={{display: "none"}} type="monotone" dataKey="taux_de_rebut" activeDot={0}/>
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