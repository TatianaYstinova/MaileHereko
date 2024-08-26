import FormControl from "@mui/material/FormControl";
import Icon from "@mui/material/Icon";
import Input from "@mui/material/Input";
import { useForm, Controller } from "react-hook-form";

import EmailIcon from "@mui/icons-material/Email";
import KeyIcon from "@mui/icons-material/Key";
import IconButton from "@mui/material/IconButton/IconButton";
import { VisibilityOff, Visibility } from "@mui/icons-material";
import { Button, FormHelperText, InputAdornment } from "@mui/material";
import { useEffect, useState } from "react";
import * as yup from "yup";
import "./EmailAndPasswordComponent.scss";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router";
import { authorize } from "../../entities/user";
import { AuthorisationData } from "../../entities/user/api";
import { appActions } from "../../store";
import { useDispatch } from "react-redux";

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

export function EmailAndPasswordComponent() {
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show: any) => !show);
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthorisationData>({
    resolver: yupResolver(schema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const dispatch = useDispatch();

  const onSubmit = async (data: AuthorisationData) => {
    try {
      const { accessToken, refreshToken } = await authorize({
        email: data.email,
        password: data.password,
      });

      localStorage.setItem("accessToken", JSON.stringify(accessToken));
      localStorage.setItem("refreshToken", JSON.stringify(refreshToken));

      dispatch(appActions.setIsAuthorized({ isAuthorized: true }));
      navigate("/");
    } catch (error) {
      alert("Произошла ошибка. Пожалуйста, попробуйте позже.");
    }
  };

  const goToRegistration = () => {
    navigate("/registration");
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
        <Button type="submit" className="button-inlet">
          Вход
        </Button>
        <Button
          type="button"
          className="button-check-in"
          onClick={goToRegistration}
        >
          Регистрация
        </Button>
      </div>
    </form>
  );
}
