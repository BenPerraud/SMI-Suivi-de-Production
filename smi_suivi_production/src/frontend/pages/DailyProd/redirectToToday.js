import { useNavigate } from "react-router-dom"
import { useEffect } from "react"
import dateOfTheDay from "../../components/dateOfTheDay"

function RedirectToToday () {
    const date = dateOfTheDay ()
    const form = date.split("-")
    const today = (new Date(form[0], form[1]-1, form[2], 0, 0, 0)).getTime()
    const navigate = useNavigate()

    useEffect (() => {
        navigate("/date/"+today)
    })
    
   
    return (
        <div></div>
    )
}

export default RedirectToToday