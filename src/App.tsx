import { Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import { Navbar } from "./components/Navbar";
import { FilmPage } from "./Pages/FilmPage";
import LoginPage from "./Pages/LoginPage/LoginPage";
import { HomePage } from "./Pages/HomePage/HomePage";
import { RegistrationComponent } from "./components/RegistrationComponent/RegistrationComponent";
import { CataloguePage } from "./Pages/CataloguePage/CataloguePage";

function App() {
  const location = useLocation();

  const isLoginPage = location.pathname === "/sign-in";

  return (
    <>
       {!isLoginPage && <Navbar />}
      <Routes>
        <Route path="/sign-in" element={<LoginPage />} /> 
        <Route path="/registration" element={<RegistrationComponent />} />
        <Route path="/movie/:id" element={<FilmPage />} />
        <Route path="/" element={<HomePage />} />
        <Route  path="/catalogue" element ={<CataloguePage/>}/>
      </Routes>
    </>
  );
}

export default App;
