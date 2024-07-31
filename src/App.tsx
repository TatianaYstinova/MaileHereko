import { Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import "./index.css";

import { Navbar } from "./components/Navbar";
import { FilmPage } from "./Pages/FilmPage";
import LoginPage from "./Pages/LoginPage/LoginPage";
import CatalogPage from "./Pages/CatalogPage/CatalogPage";

function App() {
  const location = useLocation();
  return (
    <>
      {location.pathname !== "/sing-in" && <Navbar />}
      <Routes>
        <Route path="#" element={2} />
        <Route path="sing-in" element={<LoginPage />} />
        <Route path="/movie/:id" element={<FilmPage />} />
        <Route path="catalog" element={<CatalogPage />} />
      </Routes>
    </>
  );
}

export default App;
