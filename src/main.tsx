import React from 'react'
import ReactDOM from 'react-dom/client'

import './index.css';
import Запрос from './Pages/FilmPage/AllFilms.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Запрос/>
  </React.StrictMode>,
)
