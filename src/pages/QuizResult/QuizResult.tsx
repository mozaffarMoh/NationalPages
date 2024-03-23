import "./QuizResult.scss";
import React from "react";
import usePost from "../../api/usePost";
import { endPoint } from "../../api/endPoints";
import { useLocation, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import {
  BackTo,
  CorrectQuestions,
  Footer,
  Header,
  Result,
} from "../../components";

const QuizResult = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const token = Cookies.get("token");
  const [showCheckAnswers, setShowCheckAnswers] = React.useState(false);
  const collegeUUID = Cookies.get("collegeUUID");
  const [data, handleCheckAnswers, loading, success]: any = usePost(
    location.state?.dataValue,
    endPoint.calculate,
    {
      isCollege_UUID: true,
      college_UUID: collegeUUID,
    }
  );

  React.useEffect(() => {
    handleCheckAnswers();
  }, [showCheckAnswers]);

  React.useEffect(() => {
    if (!token) {
      navigate("/");
    }
  }, []);

  return (
    <div className="quiz-result flexCenterColumn">
      <Header />
      <BackTo />
      <Result showCheckAnswers={setShowCheckAnswers} data={data} />
      {showCheckAnswers && (
        <CorrectQuestions data={data} loading={loading} success={success} />
      )}
      <Footer />
    </div>
  );
};

export default QuizResult;
