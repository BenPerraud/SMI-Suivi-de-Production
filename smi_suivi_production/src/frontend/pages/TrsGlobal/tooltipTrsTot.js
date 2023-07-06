function CustomTooltipTrsTot ({active, label, payload}) {
    if (active) {
        return (
            <div className="tooltip">
                <p className="tooltipElement bold" >{label}</p>
                <p className="tooltipElement">{`TRS : ${(payload[0].value).toFixed(1)}%`}</p>
            </div>
        )
    }
    return null
}

export default CustomTooltipTrsTot