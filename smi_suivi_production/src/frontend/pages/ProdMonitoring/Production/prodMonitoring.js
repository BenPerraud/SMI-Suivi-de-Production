import { useState } from "react"
import CreateProduction from "./createProduction"
import AddProduction from "./addProduction"

function ProdMonitoring () {
    const [production, setProduction] = useState([])
    const [count, setCount] = useState(0)
        
    function getOneProduction (e) {
        e.preventDefault()
        const form = e.target
        const formData = new FormData(form)
        const pi = formData.get("pi")

        fetch("http://localhost:3000/api/production/"+pi)
            .then(res => res.json())
            .then(datas => setProduction(datas))
            .catch(error => alert("Erreur : " + error))

        form.reset()
        setCount(count+1)
    }

    return (
        <div className="rowGap50px">
            <div className="rowGap20px">
                <h1 className="titleH1">Etape 1 : rechercher le PI</h1>
                <form className="form" name="createOperatorForm" onSubmit={getOneProduction}>
                    <label>Indiquer le PI : <input className="formElement" type="text" name="pi" id="pi" /></label>
                    <button className="formBtn" type="submit">Rechercher</button>
                </form>
            </div>
            <div className={count === 0 ? "closed" : "open"}>
                {production === null ? <CreateProduction /> : <AddProduction pi={production.pi} client={production.client} designation={production.designation} setCount={setCount} />}
            </div>
        </div>
    )
}

export default ProdMonitoring