import React from "react";
import ReactDOM from "react-dom/client";
import theme from "./theme";
import "./index.css";



import { ThemeProvider } from '@mui/material/styles';
import App from './App';


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App/>
    </ThemeProvider>
  </React.StrictMode>
);
