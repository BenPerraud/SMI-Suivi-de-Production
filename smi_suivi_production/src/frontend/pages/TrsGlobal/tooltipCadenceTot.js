import numStr from "./../../components/numStr"

function CustomTooltipCadenceTot ({active, label, payload}) {
    if (active) {
        return (
            <div className="tooltip">
                <p className="tooltipElement bold" >{label}</p>
                <p className="tooltipElement">{`Cadence réelle : ${numStr((payload[0].value).toFixed(0), ".")} pcs/h`}</p>
                <p className="tooltipElement">{`Cadence théorique : ${numStr((payload[1].value).toFixed(0), ".")} pcs/h`}</p>
            </div>
        )
    }
    return null
}

export default CustomTooltipCadenceTot