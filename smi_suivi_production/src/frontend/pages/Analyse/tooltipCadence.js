function CustomTooltipCadence ({active, label, payload}) {
    if (active) {
        return (
            <div className="tooltip">
                <p className="tooltipElement bold" >{label}</p>
                <p className="tooltipElement">{`Cadence réelle : ${(payload[0].value).toFixed(0)} pcs/h`}</p>
                <p className="tooltipElement">{`Cadence théorique : ${(payload[1].value).toFixed(0)} pcs/h`}</p>
            </div>
        )
    }
    return null
}

export default CustomTooltipCadence