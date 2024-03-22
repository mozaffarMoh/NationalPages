import "./QuizPage.scss";
import React from "react";
import Header from "../../components/Header/Header";
import BackTo from "../../components/BackTo/BackTo";
import Instructions from "../../components/Instructions/Instructions";
import QuizQuestions from "../../components/QuizQuestions/QuizQuestions";
import DawratDetails from "../../components/DawratDetails/DawratDetails";
import Footer from "../../components/Footer/Footer";
import { useLocation } from "react-router-dom";

const QuizPage = () => {
  const [showQuestions, setShowQuestions] = React.useState(false);
  const location = useLocation();

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
