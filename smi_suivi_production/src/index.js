import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Header from "../src/frontend/header/index"
import DailyProd from "../src/frontend/pages/DailyProd/index"
import Analyse from "../src/frontend/pages/Analyse/index"
import ProdOpeMonitoring from "../src/frontend/pages/ProdMonitoring/index"
import ModifyOperator from './frontend/pages/ModifyOperator/modifyOperator'
import RedirectToToday from './frontend/pages/DailyProd/redirectToToday'
import Footer from "../src/frontend/footer/index"


const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
  <React.StrictMode>
    <Router>
      <Header />
      <Routes>
          <Route path='/' element={<RedirectToToday />} />
          <Route path='/date/:date' element={<DailyProd />} />
          <Route path='/Analyse' element={<Analyse />} />
          <Route path='/Suivi-de-production' element={<ProdOpeMonitoring />} />
          <Route path='/Suivi-de-production/:id' element={<ModifyOperator />} />
      </Routes>
      <Footer />
    </Router>
  </React.StrictMode>
)
