import { useNavigate } from "react-router-dom";
import "./PageNotFound.scss";

const PageNotFound = () => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/");
  };
  return (
    <div className="page-not-found flexCenterColumn">
      <h2>عذرا هذا الرابط غير موجود</h2>
      <button onClick={handleNavigate}>العودة الى الصفحة الرئيسية</button>
    </div>
  );
};

export default PageNotFound;
