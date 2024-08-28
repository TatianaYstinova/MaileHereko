import "../../Pages/HomePage/HomePage.scss";

import logo from "../../assets/logoImg/Frame 82.png";
import "./Navbar.scss";
import { useDispatch, useSelector } from "react-redux";
import { appActions } from "../../store";
import { isUathorizedSelector } from "../../store";
import { Link } from "react-router-dom";

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
        <Link style={{ color: "white" }} to="/">
          Главная
        </Link>
        <Link style={{ color: "white" }} to="/catalog">
          Каталог фильмов
        </Link>
        {isAuthorized ? (
          <Link style={{ color: "white" }} to="/" onClick={handleLogout}>
            Выход
          </Link>
        ) : (
          <Link style={{ color: "white" }} to="/sign-in">
            Вход
          </Link>
        )}
      </div>
    </div>
  );
};
export default Navbar;
