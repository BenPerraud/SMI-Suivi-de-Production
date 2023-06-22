import "./index.css"
import CreateOperator from "./Operator/createOperator"
import ModifyDeleteOperator from "./Operator/modifyDeleteOperator"
import CreateProduction from "./Production/createProd"
import CreatePi from "./Production/createPi" 
import { useState } from "react"

function ProdMonitoring () {
    const [formState, setFormState] = useState(0)

    return (
        <div>
            <div className="operator">
                <CreatePi />
                <CreateProduction />
                <CreateOperator formState={formState} setFormState={setFormState}/>
                <ModifyDeleteOperator formState={formState} setFormState={setFormState}/>    
            </div>
        </div>
    )
}

export default ProdMonitoring