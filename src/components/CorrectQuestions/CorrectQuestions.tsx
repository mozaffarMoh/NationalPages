import "./CorrectQuestions.scss";
import React from "react";
import { Button, Spinner } from "react-bootstrap";
import { qestionsTextsArray } from "../QuizQuestions/َQuestionsTextsArray";
import emptyCircle from "../../assets/images/QuizResult/nonSelected.svg";
import successIcon from "../../assets/images/QuizResult/answerSuccessIcon.svg";
import successCircle from "../../assets/images/QuizResult/answerSuccess.svg";
import wrongIcon from "../../assets/images/QuizResult/answerWrongIcon.svg";
import wrongCircle from "../../assets/images/QuizResult/answerWrong.svg";
import starEmptyIcon from "../../assets/images/QuizResult/starEmpty.png";
import starFillIcon from "../../assets/images/QuizResult/starFill.svg";
import bookIcon from "../../assets/images/QuizResult/book.svg";

const CorrectQuestions = ({ data, loading }: any) => {
  const squaresArray = Array(3).fill("");
  const [lastIndex, setLastIndex] = React.useState<number | any>(1);

  /* Handle Circle Image */
  const handleCircleImage = (child: any) => {
    if (child.status === true) {
      return successCircle;
    }
    if (child.choose === 1) {
      if (child.status === false) {
        return wrongCircle;
      }
    } else {
      return emptyCircle;
    }
  };

  /* Show next question | If the last element of the Correct Questions Array is shown, this function will not work. */
  const handleNextQuestions = (index: number) => {
    if (data) {
      if (index === lastIndex - 1 && lastIndex !== data?.questions?.length) {
        setLastIndex((prev: number) => {
          const newValue = (prev += +1);
          return newValue;
        });
      }
      window.scrollTo(0, window.scrollY + 500);
    }
  };

  /* Handle Change Color */
  const handleChangeColor = (child: any) => {
    if (child.status === true) {
      return "success-answer";
    }

    if (child.choose === 1 && child.status === false) {
      return "wrong-answer";
    }
  };

  return (
    <div className="correct-questions flexCenterColumn">
      {loading && <Spinner />}

      {data &&
        data.questions?.slice(0, lastIndex).map((item: any, index: number) => {
          return (
            <div className="correct-questions-item" key={index}>
              <p>{qestionsTextsArray[index]} </p>
              <p>{item.question_text}</p>

              <div className="answers flexCenterColumn">
                {item.answers.map((child: any, index: number) => {
                  return (
                    <div
                      className={`answer flexBetween ${handleChangeColor(
                        child
                      )}`}
                      key={index}
                    >
                      <div className="flexCenter gap-2">
                        <img src={handleCircleImage(child)} alt="" />
                        <p>{child.answer_text}</p>
                      </div>
                      <div className="flexCenter">
                        {(child.choose == 1 && child.status == true) ||
                          (child.status == true && <img src={successIcon} />)}
                        {child.choose == 1 && child.status == false && (
                          <img src={wrongIcon} className="" />
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="correct-footer flexBetween">
                <div className="flexCenter gap-4 ">
                  <img src={successIcon} alt="" />

                  <img
                    src={item.favorite === 0 ? starEmptyIcon : starFillIcon}
                  />

                  <img src={bookIcon} alt="" />
                </div>
                <Button
                  className="correct-footer-button"
                  onClick={() => handleNextQuestions(index)}
                >
                  التالي
                </Button>
              </div>
            </div>
          );
        })}

      {/* Hide squares if questions array is fully visible */}
      {data &&
        data?.questions?.length > 0 &&
        lastIndex !== data?.questions?.length &&
        squaresArray.map((_, index) => {
          return <div className="square" key={index}></div>;
        })}
      {!loading && data.length === 0 && (
        <h1 className="mb-5">ليس لديك أسئلة خاطئة</h1>
      )}
    </div>
  );
};

export default CorrectQuestions;
