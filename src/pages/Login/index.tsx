import { useForm, SubmitHandler } from "react-hook-form";
import Button from "../../components/Button";
import Input from "../../components/Input";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { Container, LoginContainer, Column, Spacing, Title } from "./styles";
import { defaultValues, IFormLogin } from "./types";

const mockCredentials: IFormLogin = {
  email: "test@test.com",
  password: "123456",
};

const schema = yup
  .object({
    email: yup.string().email("E-mail inválido").required("Campo obrigatório"),
    password: yup
      .string()
      .min(6, "No minimo 6 caracteres")
      .required("Campo obrigatório"),
  })
  .required();

const Login = () => {
  const {
    control,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm<IFormLogin>({
    resolver: yupResolver(schema),
    mode: "onChange",
    defaultValues,
    reValidateMode: "onChange",
  });

  const onSubmit: SubmitHandler<IFormLogin> = (data) => {
    if (
      data.email === mockCredentials.email &&
      data.password === mockCredentials.password
    ) {
      alert("Credenciais válidas");
    } else {
      alert("E-mail ou senha inválidos");
    }
  };

  return (
    <Container>
      <LoginContainer>
        <Column>
          <Title>Login</Title>
          <Spacing />
          <form onSubmit={handleSubmit(onSubmit)}>
            <Input
              name="email"
              placeholder="Email"
              control={control}
              errorMessage={errors?.email?.message}
            />
            <Spacing />
            <Input
              name="password"
              type="password"
              placeholder="Senha"
              control={control}
              errorMessage={errors?.password?.message}
            />
            <Spacing />
            <Button title="Entrar" type="submit" disabled={isValid} />
          </form>
        </Column>
      </LoginContainer>
    </Container>
  );
};

export default Login;
