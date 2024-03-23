import "./QuizQuestions.scss";
import React from "react";
import { Button, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { qestionsTextsArray } from "./َQuestionsTextsArray";
import emptyCircle from "../../assets/images/QuizResult/nonSelected.svg";
import fillCircle from "../../assets/images/QuizResult/selected.svg";
import successIcon from "../../assets/images/QuizResult/answerSuccessIcon.svg";
import starEmptyIcon from "../../assets/images/QuizResult/starEmpty.png";
import starHoverIcon from "../../assets/images/QuizResult/starHover.png";
import starFillIcon from "../../assets/images/QuizResult/starFill.svg";
import bookIcon from "../../assets/images/QuizResult/book.svg";
import { endPoint } from "../../api/endPoints";
import useGet from "../../api/useGet";
import Cookies from "js-cookie";
import { MessageAlert, Retry } from "..";

const QuizQuestions = () => {
  const navigate = useNavigate();
  const squaresArray = Array(3).fill("");
  const [questionsArray, setQuestionsArray]: any = React.useState([]);
  const [showCheckAnswer, setShowCheckAnswer] = React.useState(false);
  const [currenQuestionIndex, setCurrenQuestionIndex]: any = React.useState();
  const collegeUUID = Cookies.get("collegeUUID");
  const specialityUUID = Cookies.get("specialityUUID");
  const subjectUUID = Cookies.get("subjectUUID");
  const examUUID = Cookies.get("examUUID");
  const isSpecialityUUID = Boolean(Cookies.get("isSpecialityUUID"));
  const isSubjectUUID = Boolean(Cookies.get("isSubjectUUID"));
  const isExamUUID = Boolean(Cookies.get("isExamUUID"));
  const [showHoverStar, setShowHoverStar] = React.useState(false);
  const [showMessage, setShowMessage] = React.useState(false);
  const [starsIndexArray, setStarsIndexArray]: any = React.useState([-1]);
  const [lastIndex, setLastIndex] = React.useState<number | any>(1);
  const [checkChoicesArray, setCheckChoicesArray]: any = React.useState([]);

  /* Quiz type based on boolean value that comes from cookies */
  const handleQuizType = () => {
    if (isSubjectUUID) {
      return endPoint?.quizBySubject;
    } else if (isSpecialityUUID && !isExamUUID) {
      return endPoint?.quizByBook;
    } else if (isSpecialityUUID && isExamUUID) {
      return endPoint?.quizByExam;
    }
  };

  const [data, getData, loading, , , success, error]: any = useGet(
    handleQuizType(),
    {
      isCollege_UUID: true,
      isSpeciality_UUID: isSpecialityUUID,
      isExam_UUID: isExamUUID,
      isSubject_UUID: isSubjectUUID,
      ///////
      college_UUID: collegeUUID,
      speciality_UUID: specialityUUID,
      subject_UUID: subjectUUID,
      exam_UUID: examUUID,
    }
  );

  /* If questions more than three show 3 questions from start and if letter show one question from start */
  React.useEffect(() => {
    if (data.length > 3) {
      setLastIndex(3);
    }
  }, [data]);

  /* Handle show check the answer is correct aor wrong */
  const handleCheckAnswer = (index: number) => {
    if (index !== currenQuestionIndex) {
      setShowCheckAnswer(true);
    } else {
      setShowCheckAnswer(!showCheckAnswer);
    }
    setCurrenQuestionIndex(index);
  };

  /* add choose option to a new array */
  React.useEffect(() => {
    if (data) {
      const newArray = [...data];
      for (let i = 0; i < newArray.length; i++) {
        for (let j = 0; j < newArray[i].answers.length; j++) {
          newArray[i].answers[j] = { ...newArray[i].answers[j], choose: 0 };
        }
      }
      setQuestionsArray(newArray);
    }
  }, [data]);

  /* Handle Select Answer */
  const handleSelectAnswer = (index: number, indexAnswer: number) => {
    /* This for loop in only for empty all choose values */
    for (let i = 0; i < questionsArray[index].answers.length; i++) {
      setQuestionsArray((prevArray: any) => {
        const newArray = [...prevArray];
        newArray[index].answers[i] = {
          ...newArray[index].answers[i],
          choose: 0,
        };
        return newArray;
      });
    }

    /* set new choose value */
    setQuestionsArray((prevArray: any) => {
      const newArray = [...prevArray];
      newArray[index].answers[indexAnswer] = {
        ...newArray[index].answers[indexAnswer],
        choose: 1,
      };
      return newArray;
    });

    /* add value to checkChoices Array to force use not leave until he fill the choices */
    if (!checkChoicesArray.includes(index)) {
      setCheckChoicesArray((prevArray: any) => {
        const newArray = [...prevArray];
        newArray.push(index);
        return newArray;
      });
    }
  };

  /* Handle show star icon */
  const starIcon = (index: number) => {
    if (!starsIndexArray.includes(index)) {
      if (!showHoverStar) {
        return starEmptyIcon;
      } else {
        return starHoverIcon;
      }
    } else {
      return starFillIcon;
    }
  };

  /* Handle enter hover on star icon */
  const handleStarIconEnterHover = (index: number) => {
    !starsIndexArray.includes(index) && setShowHoverStar(true);
  };

  /* Handle leave hover on star icon */
  const handleStarIconLeaveHover = (index: number) => {
    !starsIndexArray.includes(index) && setShowHoverStar(false);
  };

  /* Handle select favorite */
  const handleSelectFavorite = (index: number, favoriteValue: any) => {
    /* fill star icon and empty it if star filled */
    setStarsIndexArray((prevArray: any) => {
      const newArray = [...prevArray];
      if (starsIndexArray.includes(index)) {
        newArray.splice(newArray.indexOf(index), 1);
        setShowHoverStar(false);
      } else {
        newArray.push(index);
        setShowHoverStar(false);
      }
      return newArray;
    });
    setQuestionsArray((prevArray: any) => {
      const newArray = [...prevArray];
      newArray[index] = {
        ...newArray[index],
        favorite: favoriteValue == 0 ? 1 : 0,
      };
      return newArray;
    });
  };

  /* Show next question | If the last element of the Correct Questions Array is shown, this function will not work */
  const handleNextQuestions = (index: number) => {
    if (index === lastIndex - 1 && lastIndex < data.length) {
      setLastIndex((prev: any) => prev + 1);
    }
    window.scrollTo(0, window.scrollY + 500);
  };

  /* Handle Finish Exam */
  const handleFinishExam = () => {
    if (checkChoicesArray.length == lastIndex) {
      navigate("/quiz-result", {
        state: {
          dataValue: JSON.stringify({
            data: questionsArray.slice(0, lastIndex),
          }),
          questionsNum: lastIndex,
        },
      });
    } else {
      setShowMessage(true);
      setTimeout(() => {
        setShowMessage(false);
      }, 4000);
    }
  };

  return (
    <div className="quiz-questions flexCenterColumn">
      {showMessage && (
        <MessageAlert message="لإنهاء الاختبار يجب عليك الاجابة على جميع الاسئلة المتوفرة أمامك" />
      )}{" "}
      {questionsArray &&
        questionsArray?.slice(0, lastIndex).map((item: any, index: number) => {
          return (
            <div className="quiz-questions-item" key={index}>
              <p>{qestionsTextsArray[index]}</p>
              <p>{item.question_text}</p>

              <div className="answers flexCenterColumn">
                {item.answers.map((answer: any, indexAnswer: number) => {
                  return (
                    <div className="answer flexStart" key={indexAnswer}>
                      <div className="flexCenter">
                        {answer.choose === 0 ? (
                          <img
                            src={emptyCircle}
                            alt=""
                            onClick={() =>
                              handleSelectAnswer(index, indexAnswer)
                            }
                          />
                        ) : (
                          <img src={fillCircle} alt="" />
                        )}
                      </div>
                      <div className="flexCenter">
                        <p>{answer.answer_text}</p>
                      </div>

                      {showCheckAnswer && index == currenQuestionIndex && (
                        <div>
                          {answer.choose == 1 && answer.status == 1 && (
                            <h5 className="right-answer">اجابة صحيحة</h5>
                          )}
                          {answer.choose == 1 && answer.status == 0 && (
                            <h5 className="wrong-answer">اجابة خاطئة</h5>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              <div className="quiz-footer flexBetween">
                <div className="flexCenter gap-4 ">
                  <img
                    src={successIcon}
                    alt=""
                    onClick={() => handleCheckAnswer(index)}
                  />
                  <img
                    src={starIcon(index)}
                    alt=""
                    onMouseEnter={() => handleStarIconEnterHover(index)}
                    onMouseLeave={() => handleStarIconLeaveHover(index)}
                    onClick={() => handleSelectFavorite(index, item.favorite)}
                  />
                  <img src={bookIcon} alt="" />
                </div>
                <Button
                  className="quiz-footer-button"
                  onClick={() => handleNextQuestions(index)}
                >
                  التالي
                </Button>
              </div>
            </div>
          );
        })}
      {loading && (
        <div className="overflow-y-hidden">
          <Spinner />
        </div>
      )}
      {/*    Hide squares if questions array is fully visible */}
      {success && lastIndex != data.length && questionsArray.length > 0 && (
        <div className="w-100 flexCenterColumn">
          {squaresArray.map((_: any, index: number) => {
            return <div className="square" key={index}></div>;
          })}
          <Button
            className="quiz-questions-button"
            variant="secondary"
            onClick={handleFinishExam}
          >
            أنه الاختبار الان
          </Button>
        </div>
      )}
      {success && questionsArray.length === 0 && (
        <h3 className="mb-5 lh-base">لايوجد أسئلة </h3>
      )}
      {error && <Retry getData={getData} />}
    </div>
  );
};

export default QuizQuestions;
