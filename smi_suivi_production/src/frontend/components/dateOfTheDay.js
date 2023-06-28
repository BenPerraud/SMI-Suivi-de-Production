function dateOfTheDay () {
    const date= new Date()

    function dateMonth () {
        const month = date.getMonth()+1
        if (month < 10) {
            return String("0"+month)
        }else {
            return month
        }}
    
    function dateDay () {
        const day = date.getDate()
        if (day < 10) {
            return String("0"+day)
        }else {
            return day
        }}

    return [date.getFullYear(), dateMonth(), dateDay()].join("-")
}

export default dateOfTheDay