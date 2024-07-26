import './LoginPage.scss';

import Logo from '../../assets/logoImg/Frame 82.png';
import Saly from '../../assets/Saly-11.png';

import { useState } from 'react';


import EmailIcon from '@mui/icons-material/Email';
import KeyIcon from '@mui/icons-material/Key';
import IconButton from '@mui/material/IconButton/IconButton';



import Input from '@mui/material/Input/Input';
import InputAdornment from '@mui/material/InputAdornment/InputAdornment';
import { Visibility, VisibilityOff } from '@mui/icons-material';

import React from 'react';
import Button from '@mui/material/Button/Button';
import { createTheme, Icon, InputLabel, Typography, useTheme } from '@mui/material';

export const LoginPage = () => {

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show: any) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

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
          <Input
            id="input-with-icon-adornment"
            className='email-input'
            startAdornment={
              <>
                <Icon>
                  <EmailIcon />
                </Icon>
                <Typography variant="subtitle2">Email </Typography>
              </>
            }
          />
          <Input
            id="standard-adornment-password"
            className='password-input'
            type={showPassword ? 'text' : 'password'}
            startAdornment={
              <>
                <Icon>
                  <KeyIcon />
                </Icon>
                <Typography variant="subtitle2">Password </Typography>
              </>
            }
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
          <Button className='button-form-container' variant="contained">Sing in</Button>
        </div>
      </div>

    </Typography >

  )
}
export default LoginPage


