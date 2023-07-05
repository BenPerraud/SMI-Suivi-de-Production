import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Header from "../src/frontend/header/index"
import DailyProd from "../src/frontend/pages/DailyProd/index"
import Analyse from "../src/frontend/pages/Analyse/index"
import ProdMonitoring from './frontend/pages/AddProduction'
import ModifyOperator from './frontend/pages/ModifyOperator/modifyOperator'
import RedirectToToday from './frontend/pages/DailyProd/redirectToToday'
import Footer from "../src/frontend/footer/index"
import AddPi from './frontend/pages/AddPi/addPi'
import ModifyProd from './frontend/pages/ModifyProd/modifyProd'


const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
  <React.StrictMode>
    <Router>
      <Header />
      <Routes>
          <Route path='/' element={<RedirectToToday />} />
          <Route path='/date/:date' element={<DailyProd />} />
          <Route path='/date/:date/:pi/:_id' element={<ModifyProd />} />
          <Route path='/Analyse' element={<Analyse />} />
          <Route path='Ajouter-un-Pi' element={<AddPi />} />
          <Route path='/Ajouter-une-production' element={<ProdMonitoring />} />
          <Route path='/Suivi-de-production/:id' element={<ModifyOperator />} />
      </Routes>
      <Footer />
    </Router>
  </React.StrictMode>
)
