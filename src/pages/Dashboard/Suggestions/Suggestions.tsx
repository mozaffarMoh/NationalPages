import { Table } from "antd";
import { endPoint } from "../../../api/endPoints";
import "./Suggestions.scss";
import useGet from "../../../api/useGet";
import { RiDeleteBin5Line } from "react-icons/ri";
import { Spinner } from "react-bootstrap";
import React from "react";
import { AdminHeader } from "../../../components/Dashboard";
import { Loading, MessageAlert } from "../../../components";

const Suggestions = () => {
  const [data, getData, loading]: any = useGet(endPoint.suggestions);
  const [startDelete, setStartDelete] = React.useState(false);
  const [deleteID, setDeleteID] = React.useState("");

  const [
    ,
    handleDelete,
    loadingDelete,
    success,
    errorMessage,
    successStatus,
  ]: any = useGet(endPoint.deleteSuggestions + deleteID);

  /* set delete id and make start delete to true*/
  const startDeleteProcess = (id: any) => {
    setDeleteID(id);
    setStartDelete(true);
  };

  /* Start delete based on startDelete value */
  React.useEffect(() => {
    if (startDelete) {
      handleDelete();
      setStartDelete(false);
    }
  }, [startDelete]);

  /* refresh data when success */
  React.useEffect(() => {
    if (successStatus) {
      getData();
    }
  }, [successStatus]);

  const columns = [
    {
      title: "الرقم التعريفي",
      dataIndex: "suggestion_id",
      key: "suggestion_id",
    },
    {
      title: "النص",
      dataIndex: "text",
      key: "text",
    },
    {
      title: "اسم المستخدم",
      dataIndex: "user",
      key: "user",
    },
    {
      title: "حذف الاقتراح",
      dataIndex: "suggestion_id",
      key: "suggestion_id",
      render: (id: any) => (
        <RiDeleteBin5Line
          color="blue"
          size={30}
          onClick={() => startDeleteProcess(id)}
          cursor={"pointer"}
        />
      ),
    },
  ];

  return (
    <div>
      <AdminHeader />
      {loadingDelete && <Loading />}
      {success && <MessageAlert message="تم الحذف بنجاح" type="success" />}
      {errorMessage && <MessageAlert message={errorMessage} type="error" />}
      <div className="suggestions-ads flexCenterColumn">
        <h2>الإقتراحات</h2>
        <div className="table-container">
          {data && !loading ? (
            <Table dataSource={data} columns={columns} />
          ) : (
            <div className="dashboard-spinner">
              <Spinner />
            </div>
          )}{" "}
        </div>
      </div>
    </div>
  );
};

export default Suggestions;
