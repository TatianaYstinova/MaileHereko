import './LoginPage.scss';

import Logo from '../../assets/logoImg/Frame 82.png';
import Saly from '../../assets/Saly-11.png';



import { Typography} from '@mui/material';
import  {EmailAndPasswordComponent}  from '../../components/EmailAndPasswordComponent/index';



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
          <EmailAndPasswordComponent/>
        </div>
      </div>
    </Typography >
  )
}
export default LoginPage


