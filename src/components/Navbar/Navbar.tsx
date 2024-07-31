import "../../Pages/HomePage/HomePage.scss";

import shooter from "../../assets/arrow-right.png";
import Link from "@mui/material/Link";
import logo from "../../assets/logoImg/logo.svg";
import "./Navbar.scss";

export const Navbar = () => {
  
  return (
    <div className="header-container">
      <img className="logo" src={logo} alt="picture logo" />
      <div className="menu-navigation">
        <Link sx={{ color: "white" }} href="#" underline="hover">
          Фильмы
        </Link>
        <Link sx={{ color: "white" }} href="catalog" underline="hover">
          Каталог фильмов
        </Link>
        <Link sx={{ color: "white" }} href="sing-in" underline="hover">
          Вход/Регистрация
          <img src={shooter} alt="shooter" />
        </Link>
      </div>
    </div>
  );
};
export default Navbar;
