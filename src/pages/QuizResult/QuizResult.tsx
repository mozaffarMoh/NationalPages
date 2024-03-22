import "./QuizResult.scss";
import React from "react";
import BackTo from "../../components/BackTo/BackTo";
import Header from "../../components/Header/Header";
import Result from "../../components/Result/Result";
import CorrectQuestions from "../../components/CorrectQuestions/CorrectQuestions";
import Footer from "../../components/Footer/Footer";
import usePost from "../../api/usePost";
import { endPoint } from "../../api/endPoints";
import { useLocation } from "react-router-dom";
import Cookies from "js-cookie";

const QuizResult = () => {
  const location = useLocation();
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
