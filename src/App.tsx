import { Route, Routes, useLocation, Navigate } from "react-router-dom";
import "./App.css";
import { Navbar } from "./components/Navbar";
import { FilmPage } from "./Pages/FilmPage";
import LoginPage from "./Pages/LoginPage/LoginPage";
import { HomePage } from "./Pages/HomePage/HomePage";


function App() {
  const location = useLocation();
  return (
    <>
      {location.pathname !== "/sing-in" && <Navbar />}
      <Routes>
        <Route path="sing-in" element={<LoginPage />} />
        <Route path="movie/:id" element={<FilmPage />} />
        <Route path="home" element={<HomePage />} />
        <Route path="/" element={<Navigate replace to="home" />} />
      </Routes>
    </>
  );
}

export default App;
