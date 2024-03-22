import { Button } from "react-bootstrap";
import "./RegisterButton.scss";
import { Link } from "react-router-dom";

const RegisterButton = () => {
  return (
    <div className="register-button-component">
      <Button className="register-button" type="submit" variant="secondary">
        {" "}
        إنشاء حساب
      </Button>
      <div className="flexCenter">
        <a className="text-black"> لديك حساب ؟&nbsp;</a>
        <Link to={"/login"}>سجل الدخول</Link>
      </div>
    </div>
  );
};

export default RegisterButton;
