import React from 'react'
import ReactDOM from 'react-dom/client'

import './Pages/FilmPage/FilmPage.scss';
import './Pages/HomePage/HomePage.scss';
import { Navbar } from './components/Navbar';


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Navbar/>

  </React.StrictMode>
)
