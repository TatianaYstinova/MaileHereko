
import '../../Pages/HomePage/HomePage.scss'

import shooter from '../../assets/arrow-right.png';
import { Link } from '@mui/material';
import logo from '../../assets/logoImg/Frame 82.png'



export function Navbar() {
  return (
    <div className='header-container'>
      <img className='logo' src={logo} alt='picture logo' />
      <div className='menu-navigation'>
        <Link className='link-menu-navigation' href="#" underline="hover">Movie</Link>
        <Link className='link-menu-navigation' href="#" underline="hover">Catalog</Link>
        <Link className='link-menu-navigation' href="#" underline="hover">Sign in <img src={shooter} alt='shooter' /></Link>
      </div>
    </div>

  )
}


