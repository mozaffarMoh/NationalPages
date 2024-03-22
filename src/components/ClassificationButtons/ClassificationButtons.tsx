import { Button } from "react-bootstrap";
import "./ClassificationButtons.scss";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const ClassificationButtons = () => {
  const navigate = useNavigate();

  /* Handle question bank */
  const handleQuestionBank = () => {
    Cookies.set("isSpecialityUUID", "true");
    Cookies.set("isExamUUID", "");
    Cookies.set("isSubjectUUID", "");
    navigate("/quiz-page");
  };
  return (
    <div className="classificationButtons flexEvenly">
      <Link to={"/dawrat-selection"}>
        <Button className="dawrat-button" variant="secondary">
          الدورات
        </Button>
      </Link>
      <button className="questions-button" onClick={handleQuestionBank}>
        بنك الأسئلة
      </button>
    </div>
  );
};

export default ClassificationButtons;
