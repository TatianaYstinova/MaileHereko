
import '../../Pages/HomePage/HomePage.scss'

import shooter from '../../assets/arrow-right.png';
import Link from '@mui/material/Link';
import logo from '../../assets/logoImg/Frame 82.png'
import './Navbar.scss';



export const Navbar = () => {
  return (
    <div className='header-container'>
      <img className='logo' src={logo} alt='picture logo' />
      <div className='menu-navigation'>
        <Link href="#" className='custom-link' underline="hover">Movie</Link>
        <Link href="#" className='custom-link' underline="hover">Catalog</Link>
        <Link href="#" className='custom-link' underline="hover">Sign in <img src={shooter} alt='shooter' /></Link>

      </div>
    </div>

  )
}
export default Navbar


