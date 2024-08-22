import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { registration } from "../../entities/user";
import { useNavigate } from "react-router-dom";
import { FormControl, FormHelperText, Input } from "@mui/material";
import "./RegistrationComponent.scss";

interface RegistrationData {
  name: string;
  email: string;
  password: string;
}

const schema = yup.object().shape({
  name: yup.string().required("Имя обязательно"),
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

export function RegistrationComponent() {
  const navigation = useNavigate();

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
    },
  });

  const onSubmit: SubmitHandler<RegistrationData> = async (data) => {
    try {
      await registration(data);
      navigation("/"); // Переход на страницу
    } catch (error) {
      console.error("Ошибка при регистрации:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="form-control">
        <>
          <FormControl variant="standard" error={!!errors.name}>
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <>
                  <Input {...field} placeholder="Имя" className="input-field" />
                  <FormHelperText>{errors.name?.message}</FormHelperText>
                </>
              )}
            />
          </FormControl>

          <FormControl variant="standard" error={!!errors.email}>
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <>
                  <Input
                    {...field}
                    placeholder="Почта"
                    className="input-field"
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
                    placeholder="Пароль"
                    className="input-field"
                  />
                  <FormHelperText>{errors.password?.message}</FormHelperText>
                </>
              )}
            />
          </FormControl>
          <button type="submit">Зарегистрироваться</button>
        </>
      </div>
    </form>
  );
}
