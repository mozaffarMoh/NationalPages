import "./AllQuestions.scss";
import { BsArrowLeftCircle } from "react-icons/bs";
import useGet from "../../../api/useGet";
import { endPoint } from "../../../api/endPoints";
import { Spinner } from "react-bootstrap";
import React from "react";
import { AnswersArrayText } from "./AnswersArrayText";
import usePost from "../../../api/usePost";
import { Loading, MessageAlert } from "../..";

const AllQuestions = ({ setShowAllQuestions, examID }: any) => {
  const [data, getData, loading] = useGet(endPoint.allQuestions + examID);
  const [currentIndex, setCurrentIndex] = React.useState(-1);
  const [startEdit, setStartEdit] = React.useState(false);
  const [questionText, setQuestionText] = React.useState("");
  const [questionNumber, setQuestionNumber] = React.useState(0);
  const [lastIndex, setLastIndex] = React.useState(10);
  const [body, setBody] = React.useState(null);
  const [answersArray, setAnswersArray]: any = React.useState([]);
  const [
    ,
    handleEditPost,
    editLoading,
    success,
    errorMessage,
    successStatus,
  ]: any = usePost(body, endPoint.editQuestion);

  /* Handle start edit */
  const handleStartEdit = (index: any) => {
    setCurrentIndex(index);
    setStartEdit(true);
    setQuestionText(data[index]?.question_text);
    setQuestionNumber(data[index]?.question_number);
    setAnswersArray(data[index].answers);
  };

  /* handle cancel edit */
  const handleCancelEdit = () => {
    setCurrentIndex(-1);
    setQuestionText("");
    setQuestionNumber(0);
    setStartEdit(false);
    setAnswersArray([]);
  };

  /* Show more questions */
  const handleShowMore = () => {
    const diff = data.length - lastIndex;
    if (data && data.length !== lastIndex) {
      if (data.length >= lastIndex + 10) {
        setLastIndex((prev) => prev + 10);
      } else {
        setLastIndex((prev) => prev + diff);
      }
    }
  };

  /* handle change status */
  const handleChangeStatus = (e: any, answerIndex: number) => {
    const statusValue = e.target.value;
    setAnswersArray((prevArray: any) => {
      const newArray = [...prevArray];
      newArray[answerIndex] = {
        ...newArray[answerIndex],
        status: Boolean(statusValue),
      };
      return newArray;
    });
  };

  /* handle change answer text */
  const handleChangeAnswerText = (e: any, answerIndex: number) => {
    const answerTextValue = e.target.value;
    setAnswersArray((prevArray: any) => {
      const newArray = [...prevArray];
      newArray[answerIndex] = {
        ...newArray[answerIndex],
        answer_text: answerTextValue,
      };
      return newArray;
    });
  };

  /* Handle finish Edit */
  const handleFinishEdit = (question: any) => {
    setBody({
      ...question,
      question_number: questionNumber,
      question_text: questionText,
      answers: answersArray,
    });
  };

  /* Send data when body value fill */
  React.useEffect(() => {
    if (body !== null) {
      handleEditPost();
    }
  }, [body]);

  /* remove data when success */
  React.useEffect(() => {
    if (successStatus) {
      setBody(null);
      setAnswersArray([]);
      setQuestionText("");
      setQuestionNumber(0);
      setCurrentIndex(-1);
      getData();
    }
  }, [successStatus]);

  /* change qustion number to zero if he access to a value letter than zero */
  React.useEffect(() => {
    if (questionNumber < 0) {
      setQuestionNumber(0);
    }
  }, [questionNumber]);

  return (
    <div className="all-questions flexCenterColumn">
      {editLoading && <Loading />}
      {errorMessage && <MessageAlert message={errorMessage} type="error" />}
      {success && <MessageAlert message={"تم التعديل بنجاح"} type="success" />}
      {loading && success && <Loading />}
      {loading && !success && (
        <div className="overflow-y-hidden ">
          <Spinner />
        </div>
      )}
      <button
        onClick={() => setShowAllQuestions(false)}
        className="back-button"
      >
        {" "}
        الرجوع <BsArrowLeftCircle size={30} />{" "}
      </button>
      <h4>أسئلة الامتحان</h4>
      <div className="questions flexCenterColumn">
        {data &&
          data.slice(0, lastIndex).map((item: any, index: number) => {
            return (
              <div key={index} className="question">
                {" "}
                <div className="flexCenterColumnItemsStart">
                  <p>رقم السؤال : &nbsp;</p>
                  <input
                    type="number"
                    readOnly={
                      startEdit && currentIndex === index ? false : true
                    }
                    value={
                      currentIndex === index
                        ? questionNumber
                        : item.question_number
                    }
                    onChange={(e: any) => setQuestionNumber(e.target.value)}
                    className={`input-question-number flexCenter ${
                      startEdit && currentIndex === index && "start-edit"
                    }`}
                  />
                </div>
                <div className="flexCenterColumnItemsStart">
                  <p>نص السؤال : &nbsp;</p>
                  <textarea
                    readOnly={
                      startEdit && currentIndex === index ? false : true
                    }
                    value={
                      currentIndex === index ? questionText : item.question_text
                    }
                    onChange={(e: any) => setQuestionText(e.target.value)}
                    className={`${
                      startEdit && currentIndex === index && "start-edit"
                    }`}
                  ></textarea>
                </div>
                <div className="answers">
                  {item.answers.map((answer: any, answerIndex: number) => {
                    return (
                      <div
                        className="flexCenterColumnItemsStart mt-3"
                        key={answerIndex}
                      >
                        <div className="flexCenter">
                          <p> {AnswersArrayText[answerIndex]} : &nbsp;</p>
                          {startEdit && currentIndex === index ? (
                            <select
                              onChange={(e: any) =>
                                handleChangeStatus(e, answerIndex)
                              }
                            >
                              <option value={answer.status ? "true" : ""}>
                                {" "}
                                {answer.status
                                  ? "اجابة صحيحة"
                                  : "اجابة خاطئة"}{" "}
                              </option>
                              <option value={answer.status ? "" : "true"}>
                                {" "}
                                {answer.status ? "اجابة خاطئة " : "اجابة صحيحة"}
                              </option>
                            </select>
                          ) : answer.status ? (
                            <p className="text-info">اجابة صحيحة</p>
                          ) : (
                            <p className="text-danger">اجابة خاطئة</p>
                          )}
                        </div>
                        <input
                          readOnly={
                            startEdit && currentIndex === index ? false : true
                          }
                          value={
                            answersArray.length != 0 && currentIndex === index
                              ? answersArray[answerIndex]?.answer_text
                              : answer.answer_text
                          }
                          onChange={(e: any) =>
                            handleChangeAnswerText(e, answerIndex)
                          }
                          className={`${
                            startEdit && currentIndex === index && "start-edit"
                          }`}
                        />
                      </div>
                    );
                  })}
                </div>
                {startEdit && currentIndex === index ? (
                  <div className="w-75 flexCenter">
                    <button onClick={handleCancelEdit}>إلغاء</button>
                    <button
                      onClick={() => handleFinishEdit(item)}
                      className="mx-5"
                    >
                      موافق
                    </button>
                  </div>
                ) : (
                  <button onClick={() => handleStartEdit(index)}>
                    تعديل السؤال
                  </button>
                )}
              </div>
            );
          })}

        {data.length > 0 && data.length !== lastIndex && (
          <button onClick={handleShowMore}>المزيد</button>
        )}
      </div>
    </div>
  );
};

export default AllQuestions;
