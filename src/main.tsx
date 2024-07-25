import React from 'react'
import ReactDOM from 'react-dom/client'

import './Pages/FilmPage/FilmPage.scss';
import './Pages/HomePage/HomePage.scss';
import { Navbar } from './components/Navbar';
import { FilmPage } from './Pages/FilmPage';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme({
  components: {
    MuiLink: {
      defaultProps: {
        color: '#fff',
      }
    },
   
  }
})


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <Navbar />
      <FilmPage/>
    </ThemeProvider>
  </React.StrictMode>
)
