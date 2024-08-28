import "../../Pages/HomePage/HomePage.scss";

import Link from "@mui/material/Link";
import logo from "../../assets/logoImg/Frame 82.png";
import "./Navbar.scss";
import { useDispatch, useSelector } from "react-redux";
import { appActions } from "../../store";
import { isUathorizedSelector } from "../../store";

export const Navbar = () => {
  const dispatch = useDispatch();
  const isAuthorized = useSelector(isUathorizedSelector);

  const handleLogout = () => {
    dispatch(appActions.setIsAuthorized({ isAuthorized: false }));

    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
  };

  return (
    <div className="header-container">
      <img className="logo" src={logo} alt="picture logo" />
      <div className="menu-navigation">
        <Link sx={{ color: "white" }} href="/" underline="hover">
          Главная
        </Link>
        <Link sx={{ color: "white" }} href="/catalog" underline="hover">
          Каталог фильмов
        </Link>
        {isAuthorized ? (
          <Link
            sx={{ color: "white" }}
            href="/"
            underline="hover"
            onClick={handleLogout}
          >
            Выход
          </Link>
        ) : (
          <Link sx={{ color: "white" }} href="/sign-in" underline="hover">
            Вход
          </Link>
        )}
      </div>
    </div>
  );
};
export default Navbar;
