import { NavLink, useLocation } from "react-router-dom"
import smi_logo from "../data/images/SMI_logo.jpg"
import "./index.css"

function Header () {
    const currentLocation = useLocation()
    return (
        <div className="navBar">
            <img src={smi_logo} alt="Logo de SMI"></img>
            <div className="navBar_link">
                <NavLink to="/" className={currentLocation.pathname === "/" ? "navBar_link_element_current" : "navBar_link_element" }>Production du jour</NavLink>
                <NavLink to="/Analyse" className={currentLocation.pathname === "/Analyse" ? "navBar_link_element_current" : "navBar_link_element" }>Analyse</NavLink>
                <NavLink to="/Suivi-de-production" className={currentLocation.pathname === "/Suivi-de-production" ? "navBar_link_element_current" : "navBar_link_element" }>Suivi de production</NavLink> 
            </div>
        </div>
    )
}

export default Header