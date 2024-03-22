import React from "react";
import AdminHeader from "../../../components/Dashboard/AdminHeader/AdminHeader";
import "./AdminExams.scss";
import { endPoint } from "../../../api/endPoints";
import { Table } from "antd";
import useGet from "../../../api/useGet";
import { Button, Spinner } from "react-bootstrap";
import { IoAddCircleSharp, IoBookOutline } from "react-icons/io5";
import AddQuestion from "../../../components/Dashboard/AddQuestion/AddQuestion";
import Loading from "../../../components/Loading/Loading";
import MessageAlert from "../../../components/MessageAlert/MessageAlert";
import usePost from "../../../api/usePost";
import AllQuestions from "../../../components/Dashboard/AllQuestions/AllQuestions";

const AdminExams = () => {
  const [data, , loading]: any = useGet(endPoint.adminColleges);
  const [name, setName] = React.useState("");
  const [collegeID, setCollegeID] = React.useState("");
  const [specialityID, setSpecialityID] = React.useState("");
  const [examID, setExamID] = React.useState("");
  const [examType, setExamType] = React.useState("exam");
  const [examDegree, setExamDegree] = React.useState("graduation");
  const [showAddQuestion, setShowAddQuestion] = React.useState(false);
  const [showAllQuestions, setShowAllQuestions] = React.useState(false);

  /* Get Specialists */
  const [
    specialistsData,
    getSpecialistsData,
    specialistsLoading,
    ,
    ,
    specialistsSuccess,
    specialistsError,
  ]: any = useGet(endPoint.adminSpecialists + collegeID);

  /* Get Exams */
  const [examsData, getExamsData, examsLoading, , , , examsError]: any = useGet(
    endPoint.adminExams + collegeID
  );

  /* Add Exam */
  const [
    ,
    handleAddExam,
    loadingAdd,
    successAdd,
    errorMessageAdd,
    successStatusAdd,
  ]: any = usePost(
    {
      name: name,
      ...(specialityID && { specialty_id: specialityID }),
      type: examType,
      degree: examDegree,
    },
    endPoint.addExam
  );

  /* fill CollegeId when data fetched */
  React.useEffect(() => {
    if (!collegeID) {
      setCollegeID(data[0]?.college_id);
    }
  }, [data]);

  /* Get Exams and Specialists if not fetched also get it when collegeID change */
  React.useEffect(() => {
    if (specialistsError || collegeID) {
      getSpecialistsData();
    }
    if (examsError || collegeID) {
      getExamsData();
    }
  }, [specialistsError, examsError, collegeID]);

  /* Handle add question */
  const handleAddQuestion = (id: any) => {
    setShowAddQuestion(true);
    setExamID(id);
  };

  /* Handle add question */
  const handleAllQuestions = (id: any) => {
    setShowAllQuestions(true);
    setExamID(id);
  };

  /* Choose college */
  const handleChooseCollege = (e: any) => {
    setCollegeID(e.target.value);
    getExamsData();
  };

  /* Choose Specialist */
  const handleChooseSpecialist = (e: any) => {
    setSpecialityID(e.target.value);
  };

  /* Remove values when success and add if specialities successs add first value to speciality ID */
  React.useEffect(() => {
    if (successStatusAdd) {
      setName("");
      getExamsData();
    }
    if (specialistsSuccess) {
      setSpecialityID(specialistsData[0]?.specialty_id);
    }
  }, [successStatusAdd, specialistsSuccess]);

  const columns: any = [
    {
      title: "الرقم التعريفي",
      dataIndex: "exam_id",
      key: "exam_id",
    },
    {
      title: "الاسم",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "الاختصاص",
      dataIndex: "specialty",
      key: "specialty",
    },
    {
      title: "الدرجة",
      dataIndex: "degree",
      key: "degree",
    },
    {
      title: "النوع",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "أسئلة الامتحان",
      dataIndex: "exam_id",
      key: "exam_id",
      render: (id: any) => {
        return (
          <div
            className="flexCenter w-50"
            onClick={() => handleAllQuestions(id)}
          >
            <IoBookOutline size={30} cursor={"pointer"} />
          </div>
        );
      },
    },
    {
      title: "إضافة سؤال",
      dataIndex: "exam_id",
      key: "exam_id",
      render: (id: any) => {
        return (
          <div
            className="flexCenter w-50"
            onClick={() => handleAddQuestion(id)}
          >
            <IoAddCircleSharp size={30} cursor={"pointer"} />
          </div>
        );
      },
    },
  ];

  return (
    <div>
      <AdminHeader />
      {loadingAdd && <Loading />}
      {successAdd && (
        <MessageAlert message="تم إضافة الامتحان بنجاح" type="success" />
      )}
      {errorMessageAdd && (
        <MessageAlert message={errorMessageAdd} type="error" />
      )}
      <div className="admin-exams flexCenterColumn">
        <h2>الإمتحانات</h2>
        {!showAddQuestion && !showAllQuestions && (
          <div className="w-100 flexCenterColumn">
            <div className="flexCenter w-100">
              <div className="flexCenterColumn w-50">
                <h5 className="mb-2">الكلية : &nbsp;</h5>
                <h5 className="mt-3">الاختصاص : &nbsp;</h5>
              </div>
              <div className="flexCenterColumnItemsStart w-100  ">
                <div className="w-100 flexStart">
                  <select
                    className="select-college"
                    onChange={handleChooseCollege}
                  >
                    {data &&
                      data.map((item: any) => {
                        return (
                          <option value={item.college_id}>{item.name}</option>
                        );
                      })}
                  </select>
                  {loading && (
                    <div className="flexCenter overflow-hidden">
                      <Spinner className="select-spinner" />
                    </div>
                  )}
                </div>
                <div className="w-100 flexStart">
                  <select
                    className="select-college"
                    onChange={handleChooseSpecialist}
                  >
                    {specialistsData &&
                      specialistsData.map((item: any) => {
                        return (
                          <option value={item.specialty_id}>{item.name}</option>
                        );
                      })}
                  </select>
                  {specialistsLoading && (
                    <div className="flexCenter overflow-hidden">
                      <Spinner className="select-spinner" />
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="table-container">
              {examsData && !examsLoading ? (
                <Table dataSource={examsData} columns={columns} />
              ) : (
                <div className="dashboard-spinner">
                  <Spinner />
                </div>
              )}
            </div>

            <div className="add-exam flexCenterColumn">
              <h4>إضافة امتحان : </h4>
              <p>
                حدد اسم الكلية والاختصاص من القائمة في الأعلى و حدد النوع
                والدرجة ثم أضف اسم الامتحان
              </p>
              <div className="flexCenter w-100">
                <div className="flexCenterColumn w-50">
                  <h5 className="mb-2">النوع : &nbsp;</h5>
                  <h5 className="mt-3">الدرجة : &nbsp;</h5>
                </div>
                <div className="flexCenterColumnItemsStart w-100  ">
                  <select
                    className="select-to-add-exam"
                    onChange={(e) => setExamType(e.target.value)}
                  >
                    <option value={"exam"}>exam</option>
                    <option value={"book"}>book</option>
                  </select>
                  <select
                    className="select-to-add-exam"
                    onChange={(e) => setExamDegree(e.target.value)}
                  >
                    <option value={"graduation"}>تخرج</option>
                    <option value={"master"}>ماستر</option>
                  </select>
                </div>
              </div>
              <input
                type="text"
                value={name}
                placeholder="اسم الامتحان"
                onChange={(e: any) => setName(e.target.value)}
              />
              <br />
              <Button variant="secondary" onClick={handleAddExam}>
                إضافة
              </Button>
            </div>
          </div>
        )}
        {showAddQuestion && (
          <AddQuestion
            setShowAddQuestion={setShowAddQuestion}
            examID={examID}
            collegeID={collegeID}
          />
        )}
        {showAllQuestions && (
          <AllQuestions
            setShowAllQuestions={setShowAllQuestions}
            examID={examID}
          />
        )}
      </div>
    </div>
  );
};

export default AdminExams;
