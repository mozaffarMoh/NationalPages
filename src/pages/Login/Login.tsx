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
    trigger,
    formState: { errors },
  }: any = useForm();

  /* Empty the fields when success */
  React.useEffect(() => {
    setName("");
    setCode("");
  }, [success]);

  const [isStartEnterKey, setStartEnterKey] = React.useState(false);

  /* Focus and blur inputs to trigger validation errors */
  const focusAndBlur = () => {
    return Object.keys(errors).forEach((errorKey) => {
      const element = document.getElementsByName(errorKey)[0];
      if (element) {
        element.blur();
        element.focus();
      }
    });
  };

  /* check login validation after enter key */
  const handleEnterKey = async (e: any) => {
    if (e.key === "Enter") {
      await trigger("email");
      await trigger("password");
      focusAndBlur();
      setStartEnterKey(true);
    }
  };

  /* Start login after enter key for first enter press */
  React.useEffect(() => {
    if (isStartEnterKey) {
      handleSubmit(handleLogin)();
      focusAndBlur();
    }
  }, [isStartEnterKey]);

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
          <UsernameInput
            name={name}
            setName={setName}
            register={register}
            handleEnterKey={handleEnterKey}
          />
          {errors.username && (
            <div className="error-message">{errors.username.message}</div>
          )}
          <PasswordInput
            code={code}
            setCode={setCode}
            register={register}
            handleEnterKey={handleEnterKey}
          />
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
