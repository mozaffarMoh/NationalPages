import "./QuizPage.scss";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import {
  BackTo,
  DawratDetails,
  Footer,
  Header,
  Instructions,
  QuizQuestions,
} from "../../components";

const QuizPage = () => {
  const [showQuestions, setShowQuestions] = React.useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const token = Cookies.get("token");

  React.useEffect(() => {
    if (!token) {
      navigate("/");
    }
  }, []);
  return (
    <div>
      <Header />
      <BackTo />
      <DawratDetails dawraName={location.state?.dawraName} />
      <Instructions showQuestions={() => setShowQuestions(true)} />
      {showQuestions && <QuizQuestions />}
      <Footer />
    </div>
  );
};

export default QuizPage;
