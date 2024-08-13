import '../../Pages/HomePage/HomePage.scss'
import Link from '@mui/material/Link';
import logo from '../../assets/logoImg/Frame 82.png'
import './Navbar.scss';

export const Navbar = () => {
  return (
    <div className='header-container'>
      <img className='logo' src={logo} alt='picture logo' />
      <div className='menu-navigation'>
        <Link sx={{color:'white' }} href="#" underline="hover">Фильмы</Link>
        <Link  sx={{color:'white'}}href="#" underline="hover">Каталог фильмов</Link>
        <Link sx={{ color:'white'}} href="sing-in" underline="hover">Вход/Регистрация</Link>
      </div>
    </div>

  )
}
export default Navbar


