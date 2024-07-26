import React from "react";
import ReactDOM from "react-dom/client";
import theme from "./theme";
import "./index.css";

import "./Pages/FilmPage/FilmPage.scss";
import { Navbar } from "./components/Navbar";
import { ThemeProvider } from "@mui/material/styles";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <Navbar />
    </ThemeProvider>
  </React.StrictMode>
);
