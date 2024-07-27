import './LoginPage.scss';

import Logo from '../../assets/logoImg/Frame 82.png';
import Saly from '../../assets/Saly-11.png';


import Button from '@mui/material/Button/Button';
import { Typography} from '@mui/material';
import  {EmailAndPasswordComponent}  from '../../components/LoginPage/index';



export const LoginPage = () => {

  return (
    <Typography>
      <div className='logo-container'>
        <img src={Logo} alt='picture logo' />
      </div>

      <div className='info-container-login-page'>

        <div className='picture-Saly'>
          <img src={Saly} alt='picture Saly' />
        </div >
        <div className='form-container'>
          <div className='header-form-container'>Sing In</div>
          <EmailAndPasswordComponent/>
          <Button className='button-form-container' variant="contained" sx={{top:26,width: 486,height: 56}}>Sing in</Button>
        </div>
      </div>
    </Typography >
  )
}
export default LoginPage


