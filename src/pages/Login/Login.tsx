import "./Login.scss";
import React from "react";
import helloImage from "../../assets/images/Login/login.svg";
import { endPoint } from "../../api/endPoints";
import { useForm } from "react-hook-form";
import usePost from "../../api/usePost";
import { Loading, MessageAlert } from "../../components";
import {
  LoginButton,
  PasswordInput,
  UsernameInput,
} from "../../components/login-singup";

const Login = () => {
  const [name, setName] = React.useState("");
  const [code, setCode]: any = React.useState("");
  const [, handleLogin, loading, success, errorMessage]: any = usePost(
    {
      name: name,
      code: code,
    },
    endPoint.login
  );
  const {
    register,
    handleSubmit,
    formState: { errors },
  }: any = useForm();

  /* Empty the fields when success */
  React.useEffect(() => {
    setName("");
    setCode("");
  }, [success]);

  return (
    <div className="login flexCenter">
      {loading && <Loading />}

      {success && (
        <MessageAlert message="تم تسجيل الدخول بنجاح" type="success" />
      )}

      {errorMessage && <MessageAlert message={errorMessage} type="error" />}

      <div className="login-form-background col-6 flexCenter">
        <form className="login-form" onSubmit={handleSubmit(handleLogin)}>
          <div className="title flexCenter">
            <p>تسجيل الدخول</p>
          </div>
          <UsernameInput name={name} setName={setName} register={register} />
          {errors.username && (
            <div className="error-message">{errors.username.message}</div>
          )}
          <PasswordInput code={code} setCode={setCode} register={register} />
          {errors.password && (
            <div className="error-message">{errors.password.message}</div>
          )}
          <LoginButton />
        </form>
      </div>
      <div className="login-hello col-6 flexCenter">
        <img src={helloImage} alt="" />
      </div>
    </div>
  );
};

export default Login;
