import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import "./Pages/FilmPage/FilmPage.scss";
import "./Pages/HomePage/HomePage.scss";

import App from "./App";
import { Navbar } from "./components/Navbar";
import LoginPage from "./Pages/LoginPage/LoginPage";
import { FilmPage } from "./Pages/FilmPage";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <App />
            </>
          }
        />
        <Route path="sing-in" element={<LoginPage />} />
        <Route path="/movie/:id" element={<FilmPage />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
