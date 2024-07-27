
import FormControl from "@mui/material/FormControl";
import Icon from "@mui/material/Icon";
import Input from "@mui/material/Input";

import EmailIcon from '@mui/icons-material/Email';
import KeyIcon from '@mui/icons-material/Key';
import IconButton from '@mui/material/IconButton/IconButton';
import { VisibilityOff, Visibility } from "@mui/icons-material";
import { InputAdornment } from "@mui/material";
import { useState } from "react";
import './LoginPage.scss';

export function EmailAndPasswordComponent() {
  const [showPassword, setShowPassword] = useState(false);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleClickShowPassword = () => setShowPassword((show: any) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
    <>
      <FormControl variant="standard" >
        <Input placeholder="Email"
          id="input-with-icon-adornment"
          className='email-input'
          startAdornment={<>
            <Icon>
              <EmailIcon />
            </Icon>
          </>} />
      </FormControl><FormControl variant="standard">
        <Input placeholder="Password"
          id="standard-adornment-password"
          className='password-input'
          type={showPassword ? 'text' : 'password'}
          startAdornment={<>
            <Icon>
              <KeyIcon />
            </Icon>

          </>}
          endAdornment={<InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>} />
      </FormControl></>
  )
}