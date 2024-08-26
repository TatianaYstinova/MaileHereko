import "../../Pages/HomePage/HomePage.scss";

import Link from "@mui/material/Link";
import logo from "../../assets/logoImg/Frame 82.png";
import "./Navbar.scss";
import { useDispatch } from "react-redux";
import { appActions } from "../../store";

export const Navbar = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(appActions.setIsAuthorized({ isAuthorized: false }));
  };
  return (
    <div className="header-container">
      <img className="logo" src={logo} alt="picture logo" />
      <div className="menu-navigation">
        <Link sx={{ color: "white" }} href="/" underline="hover">
          Главная
        </Link>
        <Link sx={{ color: "white" }} href="/catalogue" underline="hover">
          Каталог фильмов
        </Link>
        <Link sx={{ color: "white" }} href="/sign-in" underline="hover">
          Вход
        </Link>
        <Link sx={{ color: "white" }} href="/sign-in"
          underline="hover"
          onClick={handleLogout}
        >
          Выход
        </Link>
      </div>
    </div>
  );
};
export default Navbar;
