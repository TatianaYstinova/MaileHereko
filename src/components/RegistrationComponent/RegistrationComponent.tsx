import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { registration, RegistrationData } from "../../entities/user";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  FormHelperText,
  Input,
  Modal,
  Typography,
} from "@mui/material";
import "./RegistrationComponent.scss";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import dayjs, { Dayjs } from "dayjs";
import { useState } from "react";

const schema = yup.object().shape({
  name: yup.string().required("Имя обязательно"),
  email: yup
    .string()
    .email("Неверный формат почты")
    .max(30, "Почта не должна превышать 30 символов")
    .required("Нужно заполнить поле почты"),
  phone: yup
    .string()
    .matches(/^\(\d{3}\)\d{7}$/, "Формат телефона: (999)9999999")
    .required("Нужно заполнить поле телефона"),
  address: yup.string().required("Нужно заполнить поле адреса"),
  birthDate: yup
    .string()
    .required("Нужно заполнить поле даты рождения")
    .matches(/^\d{4}-\d{2}-\d{2}$/, "Формат даты: YYYY-MM-DD"),
  password: yup
    .string()
    .min(8, "Пароль должен содержать не менее 8 символов")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]*$/,
      "Пароль должен содержать только латинские буквы (a-z, A-Z), цифру и специальные символы (@, $, !, %, *, ?, &)."
    )
    .required("Нужно заполнить поле пароля"),
});

export function RegistrationComponent() {
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RegistrationData>({
    resolver: yupResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      address: "",
      birthDate: "",
      phone: "",
    },
  });

  const [succesModalOpened, setSuccesModalOpened] = useState(false);
  const [registrationError, setRegistrationError] = useState(false);
  const [registrating, setRegistrating] = useState(false);

  const onSubmit: SubmitHandler<RegistrationData> = async (data) => {
    setRegistrationError(false);
    setRegistrating(true);

    try {
      await registration(data);

      setSuccesModalOpened(true);
    } catch (error) {
      console.error("Ошибка при регистрации:", error);
      setSuccesModalOpened(true);
      setRegistrationError(true);
    }

    setRegistrating(false);
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="registration-form-container"
      >
        <div className="form-control">
          <>
            <FormControl
              variant="standard"
              error={!!errors.name}
              className="input-field"
            >
              <Controller
                name="name"
                control={control}
                render={({ field }) => (
                  <>
                    <Input
                      {...field}
                      placeholder="Имя"
                      disabled={registrating}
                    />
                    <FormHelperText>{errors.name?.message}</FormHelperText>
                  </>
                )}
              />
            </FormControl>

            <FormControl
              variant="standard"
              error={!!errors.email}
              className="input-field"
            >
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <>
                    <Input
                      {...field}
                      placeholder="Почта"
                      disabled={registrating}
                    />
                    <FormHelperText>{errors.email?.message}</FormHelperText>
                    <FormHelperText>
                      Длина почты не больше 30 символов
                    </FormHelperText>
                  </>
                )}
              />
            </FormControl>
            <FormControl
              variant="standard"
              error={!!errors.password}
              className="input-field"
            >
              <Controller
                name="password"
                control={control}
                render={({ field }) => (
                  <>
                    <Input
                      {...field}
                      placeholder="Пароль"
                      disabled={registrating}
                    />
                    <FormHelperText>{errors.password?.message}</FormHelperText>
                    <FormHelperText>
                      Пароль должен содержать не менее 8 символов, включать
                      латинские буквы, цифры и специальный символ.
                    </FormHelperText>
                  </>
                )}
              />
            </FormControl>
            <FormControl
              variant="standard"
              error={!!errors.address}
              className="input-field"
            >
              <Controller
                name="address"
                control={control}
                render={({ field }) => (
                  <>
                    <Input
                      {...field}
                      placeholder="Адрес"
                      disabled={registrating}
                    />
                    <FormHelperText>{errors.address?.message}</FormHelperText>
                  </>
                )}
              />
            </FormControl>
            <FormControl
              sx={{ color: "white" }}
              variant="standard"
              error={!!errors.birthDate}
              className="input-field"
            >
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Controller
                  name="birthDate"
                  control={control}
                  render={({ field }) => {
                    const value = field.value ? dayjs(field.value) : null;
                    return (
                      <>
                        <DesktopDatePicker
                          sx={{ color: "white" }}
                          label="Дата рождения"
                          value={value}
                          onChange={(newValue: Dayjs | null) => {
                            if (newValue) {
                              field.onChange(newValue.format("YYYY-MM-DD"));
                            } else {
                              field.onChange("");
                            }
                          }}
                          disabled={registrating}
                        />
                        <FormHelperText>
                          {errors.birthDate?.message}
                        </FormHelperText>
                      </>
                    );
                  }}
                />
              </LocalizationProvider>
            </FormControl>
            <FormControl
              variant="standard"
              error={!!errors.phone}
              className="input-field"
            >
              <Controller
                name="phone"
                control={control}
                render={({ field }) => (
                  <>
                    <Input {...field} placeholder="Номер телефона" />
                    <FormHelperText>{errors.phone?.message}</FormHelperText>
                  </>
                )}
                disabled={registrating}
              />
            </FormControl>
            <Button
              type="submit"
              endIcon={
                registrating ? (
                  <CircularProgress size={15} color="warning" />
                ) : null
              }
            >
              Зарегистрироваться
            </Button>
          </>
        </div>
      </form>
      <Modal open={succesModalOpened}>
        <Box className="modal-content">
          <Typography className="modal-message">
            {registrationError
              ? "Ошибка регистрации, попробуйте ещё раз."
              : "Вы успешно зарегистрировались."}
          </Typography>
          <div className="modal-footer">
            {registrationError ? (
              <Button
                onClick={() => {
                  setSuccesModalOpened(false);
                }}
              >
                Ок
              </Button>
            ) : (
              <Button
                onClick={() => {
                  navigate("/sign-in");
                  setSuccesModalOpened(false);
                }}
              >
                Авторизоваться
              </Button>
            )}
          </div>
        </Box>
      </Modal>
    </>
  );
}
