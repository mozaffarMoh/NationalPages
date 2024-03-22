import "./LoginButton.scss";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const LoginButton = () => {
  return (
    <div className="login-button-component">
      <Button type="submit" className="login-button" variant="secondary">
        تسجيل الدخول
      </Button>
      <div className="flexCenter">
        <a className="text-black">ليس لديك حساب ؟&nbsp;</a>
        <Link to={"/register"}>أنشأ حساب</Link>
      </div>
    </div>
  );
};

export default LoginButton;
