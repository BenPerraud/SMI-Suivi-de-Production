import { NavLink, useLocation } from "react-router-dom"
import smi_logo from "../data/images/SMI_logo.jpg"
import "./index.css"

function Header () {
    const date= new Date()
    const today = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0)
    const todayURL = "/date/"+today.getTime()
    const currentLocation = useLocation()
    return (
        <div className="navBar">
            <NavLink to="/"><img src={smi_logo} alt="Logo de SMI"></img></NavLink>
            <div className="navBar_link">
                <NavLink to={todayURL} className={currentLocation.pathname === todayURL ? "navBar_link_element_current" : "navBar_link_element" }>Production de la veille</NavLink>
                <NavLink to="/Analyse" className={currentLocation.pathname === "/Analyse" ? "navBar_link_element_current" : "navBar_link_element" }>Analyse</NavLink>
                <NavLink to="/Ajouter-un-Pi" className={currentLocation.pathname === "/Ajouter-un-Pi" ? "navBar_link_element_current" : "navBar_link_element" }>Ajouter un Pi</NavLink>
                <NavLink to="/Ajouter-une-production" className={currentLocation.pathname === "/Ajouter-une-production" ? "navBar_link_element_current" : "navBar_link_element" }>Ajouter une production</NavLink> 
            </div>
        </div>
    )
}

export default Header