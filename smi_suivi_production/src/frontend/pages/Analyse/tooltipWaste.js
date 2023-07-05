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

export default CustomTooltipWaste