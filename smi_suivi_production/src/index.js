import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Header from "../src/frontend/header/index"
import DailyProd from "../src/frontend/pages/DailyProd/index"
import Analyse from "../src/frontend/pages/Analyse/index"
import ProdMonitoring from "../src/frontend/pages/ProdMonitoring/index"
import ModifyOperator from './frontend/pages/ModifyOperator/modifyOperator';


const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
  <React.StrictMode>
    <Router>
      <Header />
      <Routes>
          <Route path='/' element={<DailyProd />} />
          <Route path='/Analyse' element={<Analyse />} />
          <Route path='/Suivi-de-production' element={<ProdMonitoring />} />
          <Route path='/Suivi-de-production/:id' element={<ModifyOperator />} />
      </Routes>
    </Router>
  </React.StrictMode>
)
