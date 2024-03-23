import { Table } from "antd";
import { endPoint } from "../../../api/endPoints";
import useGet from "../../../api/useGet";
import "./AdminUsers.scss";
import React from "react";
import { Button, Spinner } from "react-bootstrap";
import usePost from "../../../api/usePost";
import { AdminHeader } from "../../../components/Dashboard";
import { Loading, MessageAlert } from "../../../components";

const AdminUsers = () => {
  const [data, , loading]: any = useGet(endPoint.showUsers);
  const [userID, setUserID] = React.useState("");
  const [
    code,
    handleGenereate,
    postLoading,
    ,
    errorMessage,
    successStatus,
  ]: any = usePost({ user_id: userID }, endPoint.generateCode);
  const columns: any = [
    {
      title: "الرقم التعريفي ",
      dataIndex: "user_id",
      key: "user_id",
    },
    {
      title: "الاسم",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "رقم الجوال",
      dataIndex: "phone",
      key: "phone",
    },
  ];

  /* Remove input when success */
  React.useEffect(() => {
    if (successStatus) {
      setUserID("");
    }
  }, [successStatus]);
  return (
    <div>
      <AdminHeader />
      {postLoading && <Loading />}
      {errorMessage && <MessageAlert message={errorMessage} type="error" />}
      <div className="admin-users flexCenterColumn">
        <h2>جميع المستخدمين</h2>
        <div className="generate-code">
          <h5>إنشاء رمز دخول للمستخدم : </h5>
          <input
            type="text"
            value={userID}
            placeholder="الرقم التعريفي"
            onChange={(e: any) => setUserID(e.target.value)}
          />
          <br />
          <Button variant="secondary" onClick={handleGenereate}>
            إنشاء
          </Button>
          {code?.code && <p>Code generated is : {code?.code}</p>}
        </div>
        <div className="table-container">
          {data && !loading ? (
            <Table dataSource={data} columns={columns} />
          ) : (
            <div className="dashboard-spinner">
              <Spinner />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminUsers;
