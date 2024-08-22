
import '../../Pages/HomePage/HomePage.scss'

import shooter from '../../assets/arrow-right.png';
import Link from '@mui/material/Link';
import logo from '../../assets/logoImg/Frame 82.png'
import './Navbar.scss';
import { useEffect, useState } from 'react';



export const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      setIsLoggedIn(true);
    }
  }, []);
  const handleLogout = () => {
    localStorage.removeItem("user");
    setIsLoggedIn(false);
  };
  return (
    <div className='header-container'>
      <img className='logo' src={logo} alt='picture logo' />
      <div className='menu-navigation'>
        <Link sx={{color:'white' }} href="#" underline="hover">Фильмы</Link>
        <Link  sx={{color:'white'}}href="#" underline="hover">Каталог фильмов</Link>
        <Link sx={{ color:'white'}} href="sing-in" underline="hover">Вход/Регистрация<img src={shooter} alt='shooter' /></Link>
        <Link sx={{ color:'white'}} href="sing-in" underline="hover" onClick={handleLogout}>Выход</Link>

      </div>
    </div>

  )
}
export default Navbar


