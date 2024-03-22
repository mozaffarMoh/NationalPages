import { useNavigate } from "react-router-dom";
import "./LoginRequired.scss";

const LoginRequired = ({ setShowLoginRequired }: any) => {
  const navigate = useNavigate();
  const handleLogin = () => {
    navigate("/login");
  };

  const handleBack = () => {
    setShowLoginRequired(false);
  };
  return (
    <div className="login-required flexCenterColumn">
      <p>سجل الدخول</p>
      <button className="login-button-req" onClick={handleLogin}>
        تسجيل الدخول
      </button>
      <button className="back-button" onClick={handleBack}>
        الرجوع
      </button>
    </div>
  );
};

export default LoginRequired;
