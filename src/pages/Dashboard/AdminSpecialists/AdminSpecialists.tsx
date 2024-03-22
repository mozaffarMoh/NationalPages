import React from "react";
import AdminHeader from "../../../components/Dashboard/AdminHeader/AdminHeader";
import "./AdminSpecialists.scss";
import { endPoint } from "../../../api/endPoints";
import { Table } from "antd";
import useGet from "../../../api/useGet";
import { Button, Spinner } from "react-bootstrap";
import { FaRegEdit } from "react-icons/fa";
import { BsCheckSquare, BsXCircle } from "react-icons/bs";
import Loading from "../../../components/Loading/Loading";
import usePost from "../../../api/usePost";
import MessageAlert from "../../../components/MessageAlert/MessageAlert";

const AdminSpecialists = () => {
  const [data, , loading]: any = useGet(endPoint.adminColleges);
  const [collegeID, setCollegeID] = React.useState("");
  const [
    specialistsData,
    getSpecialistsData,
    specialistsLoading,
    ,
    ,
    ,
    specialistsError,
  ]: any = useGet(endPoint.adminSpecialists + collegeID);
  const [name, setName] = React.useState("");
  const [sepcialityID, setSepcialityID] = React.useState("");
  const [nameEdited, setNameEdited] = React.useState("");
  const [startEdit, setStartEdit] = React.useState(false);
  /* fill CollegeId when data fetched */
  React.useEffect(() => {
    if (!collegeID) {
      setCollegeID(data[0]?.college_id);
    }
  }, [data]);

  /* Choose college */
  const handleChooseCollege = (e: any) => {
    setCollegeID(e.target.value);
    getSpecialistsData();
  };

  /* Get Specialists if not fetched */
  React.useEffect(() => {
    getSpecialistsData();
  }, [specialistsError]);

  /* Add Speciality */
  const [
    ,
    handleAddSpeciality,
    loadingAdd,
    successAdd,
    errorMessageAdd,
    successStatusAdd,
  ]: any = usePost(
    { name: name, college_id: collegeID },
    endPoint.addSpecialist
  );

  /* Edit Speciality */
  const [
    ,
    handleEditSpeciality,
    loadingEdit,
    successEdit,
    errorMessageEdit,
    successStatusEdit,
  ]: any = usePost(
    {
      specialty_id: sepcialityID,
      name: nameEdited,
      college_id: collegeID,
    },
    endPoint.editSpecialist
  );

  /* Remove values when success */
  React.useEffect(() => {
    if (successStatusAdd) {
      setName("");
      getSpecialistsData();
    }
    if (successStatusEdit) {
      setStartEdit(false);
      getSpecialistsData();
    }
  }, [successStatusAdd, successStatusEdit]);

  /* start start Edit */
  const handlePressOnEdit = (id: any) => {
    setStartEdit(true);
    setSepcialityID(id);
  };

  const columns: any = [
    {
      title: "الرقم التعريفي",
      dataIndex: "specialty_id",
      key: "specialty_id",
    },
    {
      title: "الاسم",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "الكلية",
      dataIndex: "college",
      key: "college",
    },
    {
      title: "التعديل",
      dataIndex: "specialty_id",
      key: "specialty_id",
      render: (id: any) => (
        <div>
          {startEdit && id === sepcialityID ? (
            <div className="edit-field">
              <input
                type="text"
                placeholder="الاسم الجديد"
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
                onClick={handleEditSpeciality}
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
          message={`تم ${successAdd ? "إضافة" : "تعديل"} الاختصاص بنجاح`}
          type="success"
        />
      )}{" "}
      {(errorMessageAdd || errorMessageEdit) && (
        <MessageAlert
          message={errorMessageAdd ? errorMessageAdd : errorMessageEdit}
          type="error"
        />
      )}
      <div className="admin-specialists flexCenterColumn">
        <h2>الإختصاصات</h2>
        <div className="flexCenter w-100 ">
          <h5> الكلية : &nbsp;</h5>
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
        <div className="table-container">
          {specialistsData && !specialistsLoading ? (
            <Table dataSource={specialistsData} columns={columns} />
          ) : (
            <div className="dashboard-spinner">
              <Spinner />
            </div>
          )}
        </div>

        <div className="add-speciality">
          <h4>إضافة اختصاص : </h4>
          <p>حدد اسم الكلية من القائمة في الأعلى ثم أضف اسم الاختصاص</p>
          <input
            type="text"
            value={name}
            placeholder="اسم الاختصاص"
            onChange={(e: any) => setName(e.target.value)}
          />
          <br />
          <Button variant="secondary" onClick={handleAddSpeciality}>
            إضافة
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AdminSpecialists;
