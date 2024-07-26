import React from "react";
import ReactDOM from "react-dom/client";
import theme from "./theme";
import "./index.css";

import './Pages/FilmPage/FilmPage.scss';
import './Pages/HomePage/HomePage.scss';

import { ThemeProvider, createTheme } from '@mui/material/styles';
import App from './App';

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
      <App/>
    </ThemeProvider>
  </React.StrictMode>
);
