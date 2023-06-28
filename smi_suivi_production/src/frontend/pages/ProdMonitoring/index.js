import OpeMonitoring from "./Operator/opeMonitoring"
import ProdMonitoring from "./Production/prodMonitoring" 

function ProdOpeMonitoring () {

    return (
        <div className="flexColumnGeneral">
            <ProdMonitoring />
            <OpeMonitoring />    
        </div>
    )
}

export default ProdOpeMonitoring