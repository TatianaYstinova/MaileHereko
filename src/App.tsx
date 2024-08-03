import { Route, Routes, useLocation } from "react-router-dom";
import "./App.css";

import { Navbar } from "./components/Navbar";
import { FilmPage } from "./Pages/FilmPage";
import LoginPage from "./Pages/LoginPage/LoginPage";


function App() {
  const location = useLocation();
  return (
    <>
      {location.pathname !== "/sing-in" && <Navbar />}
      <Routes>
        <Route path="№" element={2} />
        <Route path="sing-in" element={<LoginPage />} />
        <Route path="/movie/:id" element={<FilmPage />} />
      </Routes>
    </>
  );
}

export default App;
