import "./Result.scss";
import cupIcon from "../../assets/images/QuizResult/cup.svg";
import { Button } from "react-bootstrap";
import { useLocation } from "react-router-dom";

const Result = ({ showCheckAnswers, data }: any) => {
  const location = useLocation();
  let questionsNum = location.state?.questionsNum;

  return (
    <div className="result flexCenterColumn">
      <div className="flexCenterColumn gap-3  ">
        <h1>مبروك لقد اتممت الاختبار بنجاح </h1>
        <div className="flexCenter">
          <h1>علامتك هي : {data && data.mark}</h1>
          <img src={cupIcon} alt="" />
        </div>
      </div>
      <div className="line"></div>
      <div className="flexCenter w-100 justify-content-between ">
        <p>
          عدد الاجابات الصحيحة :
          {data?.questions && questionsNum - data.questions?.length}
        </p>
        <p>عدد الاجابات الخاطئة :{data?.questions && data.questions?.length}</p>
      </div>
      <Button
        className="result-button"
        variant="secondary"
        onClick={() => showCheckAnswers(true)}
      >
        التحقق من الاجابات
      </Button>
    </div>
  );
};

export default Result;
