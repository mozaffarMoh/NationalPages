import React from "react";
import "./AdminSubjects.scss";
import { endPoint } from "../../../api/endPoints";
import { Table } from "antd";
import useGet from "../../../api/useGet";
import { Button, Spinner } from "react-bootstrap";
import { FaRegEdit } from "react-icons/fa";
import { BsCheckSquare, BsXCircle } from "react-icons/bs";
import { AdminHeader } from "../../../components/Dashboard";
import { Loading, MessageAlert } from "../../../components";
import usePost from "../../../api/usePost";

const AdminSubjects = () => {
  const [data, , loading]: any = useGet(endPoint.adminColleges);
  const [collegeID, setCollegeID] = React.useState("");
  const [name, setName] = React.useState("");
  const [subjectID, setSubjectID] = React.useState("");
  const [specialityID, setSpecialityID]: any = React.useState("");
  const [nameEdited, setNameEdited] = React.useState("");
  const [startEdit, setStartEdit] = React.useState(false);

  /* Get Specialists */
  const [
    specialistsData,
    getSpecialistsData,
    specialistsLoading,
    ,
    ,
    ,
    specialistsError,
  ]: any = useGet(endPoint.adminSpecialists + collegeID);

  /* Get Subjects */
  const [
    subjectsData,
    getSubjectsData,
    subjectsLoading,
    ,
    ,
    ,
    subjectsError,
  ]: any = useGet(endPoint.adminSubjects + collegeID);

  /* Add Subject */
  const [
    ,
    handleAddSubject,
    loadingAdd,
    successAdd,
    errorMessageAdd,
    successStatusAdd,
  ]: any = usePost(
    {
      name: name,
      college_id: collegeID,
      ...(specialityID && { specialty_id: specialityID }),
    },
    endPoint.addSubject
  );

  /* Edit Subject */
  const [
    ,
    handleEditSubject,
    loadingEdit,
    successEdit,
    errorMessageEdit,
    successStatusEdit,
  ]: any = usePost(
    {
      subject_id: subjectID,
      ...(specialityID && { specialty_id: specialityID }),
      name: nameEdited,
      college_id: collegeID,
    },
    endPoint.editSubject
  );

  /* fill CollegeId when data fetched */
  React.useEffect(() => {
    if (!collegeID) {
      setCollegeID(data[0]?.college_id);
    }
  }, [data]);

  /* Choose college */
  const handleChooseCollege = (e: any) => {
    setCollegeID(e.target.value);
    getSubjectsData();
  };

  /* Choose Specialist */
  const handleChooseSpecialist = (e: any) => {
    setSpecialityID(e.target.value);
  };

  /* Get Subjects and Specialists if not fetched */
  React.useEffect(() => {
    if (specialistsError) {
      getSpecialistsData();
    }
    if (subjectsError) {
      getSubjectsData();
    }
  }, [specialistsError, subjectsError]);

  /* Handle start edit */
  const handlePressOnEdit = (id: any) => {
    setStartEdit(true);
    setSubjectID(id);
  };

  /* Remove values when success */
  React.useEffect(() => {
    if (successStatusAdd) {
      setName("");
      getSubjectsData();
    }
    if (successStatusEdit) {
      setStartEdit(false);
      getSubjectsData();
    }
  }, [successStatusAdd, successStatusEdit]);

  const columns: any = [
    {
      title: "الرقم التعريفي",
      dataIndex: "subject_id",
      key: "subject_id",
    },
    {
      title: "الاسم",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "التعديل",
      dataIndex: "subject_id",
      key: "subject_id",
      render: (id: any) => (
        <div>
          {startEdit && id === subjectID ? (
            <div className="edit-field">
              <input
                type="text"
                placeholder="حدد الكلية والاختصاص ثم اكتب الاسم"
                onChange={(e) => setNameEdited(e.target.value)}
              />
              <BsXCircle
                size={22}
                className="edit-icons"
                onClick={() => setStartEdit(false)}
              />
              <BsCheckSquare
                size={20}
                className="edit-icons"
                onClick={handleEditSubject}
              />
            </div>
          ) : (
            <FaRegEdit
              size={25}
              cursor={"pointer"}
              onClick={() => handlePressOnEdit(id)}
            />
          )}
        </div>
      ),
    },
  ];

  return (
    <div>
      <AdminHeader />
      {(loadingAdd || loadingEdit) && <Loading />}
      {(successAdd || successEdit) && (
        <MessageAlert
          message={`تم ${successAdd ? "إضافة" : "التعديل على"} المادة بنجاح`}
          type="success"
        />
      )}{" "}
      {(errorMessageAdd || errorMessageEdit) && (
        <MessageAlert
          message={errorMessageAdd ? errorMessageAdd : errorMessageEdit}
          type="error"
        />
      )}
      <div className="admin-subjects flexCenterColumn">
        <h2>المواد</h2>

        <div className="flexCenter w-100">
          <div className="flexCenterColumn w-50">
            <h5 className="mb-2">الكلية : &nbsp;</h5>
            <h5 className="mt-3">الاختصاص : &nbsp;</h5>
          </div>
          <div className="flexCenterColumnItemsStart w-100  ">
            <div className="w-100 flexStart">
              <select className="select-college" onChange={handleChooseCollege}>
                {data &&
                  data.map((item: any) => {
                    return <option value={item.college_id}>{item.name}</option>;
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
                <option value={""}>جميع الاختصاصات</option>;
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
          {subjectsData && !subjectsLoading ? (
            <Table dataSource={subjectsData} columns={columns} />
          ) : (
            <div className="dashboard-spinner">
              <Spinner />
            </div>
          )}
        </div>

        <div className="add-subject">
          <h4>إضافة مادة : </h4>
          <p>
            حدد اسم الكلية واسم الاختصاص من القائمة في الأعلى ثم أضف اسم المادة
          </p>
          <input
            type="text"
            value={name}
            placeholder="اسم المادة"
            onChange={(e: any) => setName(e.target.value)}
          />
          <br />
          <Button variant="secondary" onClick={handleAddSubject}>
            إضافة
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AdminSubjects;
