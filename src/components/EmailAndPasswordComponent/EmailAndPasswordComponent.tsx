import FormControl from "@mui/material/FormControl";
import Icon from "@mui/material/Icon";
import Input from "@mui/material/Input";
import { useForm, Controller, SubmitHandler } from "react-hook-form";

import EmailIcon from "@mui/icons-material/Email";
import KeyIcon from "@mui/icons-material/Key";
import IconButton from "@mui/material/IconButton/IconButton";
import { VisibilityOff, Visibility } from "@mui/icons-material";
import { FormHelperText, InputAdornment } from "@mui/material";
import { useState } from "react";
import * as yup from "yup";
import "./EmailAndPasswordComponent.scss";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = yup.object().shape({
  email: yup
    .string()
    .email("Неверный формат почты")
    .required("Нужно заполнить поле почты"),
  password: yup
    .string()
    .min(6, "Пароль должен содержать не менее 6 символов")
    .max(10, "Пароль не должен превышать 10 символов")
    .required("Нужно заполнить поле пароля"),
});

interface FormInput {
  email: string;
  password: string;
}

export function EmailAndPasswordComponent() {
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show: any) => !show);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const onSubmit: SubmitHandler<FormInput> = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormControl variant="standard" error={!!errors.email}>
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <>
              <Input
                {...field}
                placeholder="Email"
                startAdornment={
                  <InputAdornment position="start">
                    <Icon>
                      <EmailIcon />
                    </Icon>
                  </InputAdornment>
                }
                className="email-input"
              />
              <FormHelperText>{errors.email?.message}</FormHelperText>
            </>
          )}
        />
      </FormControl>
      <FormControl variant="standard" error={!!errors.password}>
        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <>
              <Input
                {...field}
                placeholder="Password"
                type={showPassword ? "text" : "password"}
                startAdornment={
                  <InputAdornment position="start">
                    <Icon>
                      <KeyIcon />
                    </Icon>
                  </InputAdornment>
                }
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton onClick={handleClickShowPassword}>
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                className="password-input"
              />
              <FormHelperText>{errors.password?.message}</FormHelperText>
            </>
          )}
        />
      </FormControl>
      <div className="button-container-login">
        <button type="submit" className="button-inlet">
          Вход
        </button>
        <button className="button-check-in">Регистрация</button>
      </div>
    </form>
  );
}
