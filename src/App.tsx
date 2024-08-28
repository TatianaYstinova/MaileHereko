import { Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import { Navbar } from "./components/Navbar";
import { FilmPage } from "./Pages/FilmPage";
import LoginPage from "./Pages/LoginPage/LoginPage";
import { HomePage } from "./Pages/HomePage/HomePage";
import { RegistrationComponent } from "./components/RegistrationComponent/RegistrationComponent";
import { CatalogPage } from "./Pages/CatalogPage/CataloguePage";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { appActions } from "./store";
import { FilmByGenre } from "./components/FilmByGenre";

function App() {
  const location = useLocation();

  const isLoginPage = location.pathname === "/sign-in";

  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    dispatch(appActions.setIsAuthorized({ isAuthorized: !!token }));
  }, []);

  return (
    <>
      {!isLoginPage && <Navbar />}
      <Routes>
        <Route path="/sign-in" element={<LoginPage />} />
        <Route path="/registration" element={<RegistrationComponent />} />
        <Route path="/movie/:id" element={<FilmPage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/catalog" element={<CatalogPage />} />
        <Route path="/film-by-genre" element={<FilmByGenre />} />
      </Routes>
    </>
  );
}

export default App;
