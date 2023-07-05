function CustomTooltipTrs ({active, label, payload}) {
    if (active) {
        return (
            <div className="tooltip">
                <p className="tooltipElement bold" >{label}</p>
                <p className="tooltipElement">{`TRS observé : ${(payload[0].value).toFixed(1)}%`}</p>
                <p className="tooltipElement">{`Cadence réelle : ${((payload[2].value).toFixed(0)).toLocaleString()} pcs/h (théo.: ${(payload[3].value).toFixed(0)} pcs/h)`}</p>
                <p className="tooltipElement">{`Taux de rebut : ${(payload[4].value).toFixed(1)}%`}</p>
            </div>
        )
    }
    return null
}

export default CustomTooltipTrs