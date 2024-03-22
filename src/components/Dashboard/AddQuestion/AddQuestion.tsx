import React from "react";
import "./AddQuestion.scss";
import { endPoint } from "../../../api/endPoints";
import { BsArrowLeftCircle } from "react-icons/bs";
import { answersInputsArray } from "./answersArray";
import Loading from "../../Loading/Loading";
import { Spinner } from "react-bootstrap";
import useGet from "../../../api/useGet";
import usePost from "../../../api/usePost";
import MessageAlert from "../../MessageAlert/MessageAlert";

const AddQuestion = ({ setShowAddQuestion, examID, collegeID }: any) => {
  const [questionText, setQuestionText] = React.useState("");
  const [questionNumber, setQuestionNumber] = React.useState("");
  const [subjectID, setSubjectID] = React.useState<number>();
  const [answersArray, setAnswersArray]: any = React.useState(
    Array(5).fill({ answer_text: "", status: false })
  );

  /* Get Subject */
  const [data, , loading]: any = useGet(endPoint.adminSubjects + collegeID);

  /* Set first value as initial value for sujectID */
  React.useEffect(() => {
    if (data && data.length > 0) {
      setSubjectID(data[0].subject_id);
    }
  }, [data]);

  /* Handle Add Question */
  const [
    ,
    handleAddQuestion,
    loadingAdd,
    successAdd,
    errorMessageAdd,
    successStatusAdd,
  ]: any = usePost(
    {
      exam_id: examID,
      subject_id: Number(subjectID),
      question_text: questionText,
      question_number: Number(questionNumber),
      answers: answersArray,
    },
    endPoint.addQuestion
  );

  /* Remove values when success */
  React.useEffect(() => {
    if (successStatusAdd) {
      setQuestionNumber("");
      setQuestionText("");
      setAnswersArray(Array(5).fill({ answer_text: "", status: false }));
    }
  }, [successStatusAdd]);

  /* Handle add answers to answersArray */
  const handleAddAnswer = (e: any, index: number) => {
    const { name } = e.target;
    const currentValue = e.target.value;
    setAnswersArray((prevArray: any) => {
      const newArray = [...prevArray];
      if (name == "answerText") {
        newArray[index] = { ...newArray[index], answer_text: currentValue };
      } else if (name == "answerStatus") {
        newArray[index] = { ...newArray[index], status: Boolean(currentValue) };
      }
      return newArray;
    });
  };

  return (
    <div className="add-question flexCenterColumn">
      {loadingAdd && <Loading />}
      {successAdd && (
        <MessageAlert message="تم إضافة السؤال بنجاح" type="success" />
      )}
      {errorMessageAdd && (
        <MessageAlert message={errorMessageAdd} type="error" />
      )}
      <button onClick={() => setShowAddQuestion(false)} className="back-button">
        {" "}
        الرجوع <BsArrowLeftCircle size={30} />{" "}
      </button>
      <h4>إضافة سؤال</h4>

      {/* Select subject */}
      <div className="choose-subject flexCenter">
        <h6>اختر المادة : &nbsp;</h6>
        <div className="flexCenter w-50">
          <select
            className="select-college"
            onChange={(e: any) => setSubjectID(e.target.value)}
          >
            {data &&
              data.map((item: any) => {
                return <option value={item.subject_id}>{item.name}</option>;
              })}
          </select>
          {loading && (
            <div className="flexCenter overflow-hidden">
              <Spinner className="select-spinner" />
            </div>
          )}
        </div>
      </div>

      {/* Choose by inputs */}
      <div className="flexCenterColumn w-100 ">
        <input
          type="number"
          value={questionNumber}
          placeholder="رقم السؤال"
          className="input-number"
          onChange={(e: any) => setQuestionNumber(e.target.value)}
        />
        <textarea
          value={questionText}
          placeholder="نص السؤال"
          onChange={(e: any) => setQuestionText(e.target.value)}
          className="question-text"
        ></textarea>
        {answersInputsArray.map((item: any, index) => {
          return (
            <div key={index} className="w-75 flexCenterColumn">
              <textarea
                name="answerText"
                placeholder={item.placeholder}
                value={answersArray[index]?.answer_text}
                onChange={(e) => handleAddAnswer(e, index)}
              ></textarea>
              <select
                name="answerStatus"
                className="select-answer-status"
                onChange={(e) => handleAddAnswer(e, index)}
                value={answersArray[index]?.status}
              >
                <option value={""}>اجابة خاطئة</option>
                <option value={"true"}>اجابة صحيحة</option>
              </select>
            </div>
          );
        })}

        <button onClick={handleAddQuestion}>إضافة</button>
      </div>
    </div>
  );
};

export default AddQuestion;
