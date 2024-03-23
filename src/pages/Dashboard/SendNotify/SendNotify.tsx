import React from "react";
import "./SendNotify.scss";
import { endPoint } from "../../../api/endPoints";
import useGet from "../../../api/useGet";
import { Spinner } from "react-bootstrap";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import usePost from "../../../api/usePost";
import { AdminHeader } from "../../../components/Dashboard";
import { Loading, MessageAlert } from "../../../components";

const SendNotify = () => {
  const navigate = useNavigate();
  const [data, , loading]: any = useGet(endPoint.colleges);
  const [title, setTitle] = React.useState("");
  const [body, setBody] = React.useState("");
  const [collegeUUID, setCollegeUUID] = React.useState("all");
  const token = Cookies.get("token");
  /* Send notify */
  const [
    ,
    handelSendNotify,
    postLoading,
    success,
    errorMessage,
    successStatus,
  ]: any = usePost(
    {
      title: title,
      body: body,
      college_uuid: collegeUUID,
    },
    endPoint.sendNotify
  );

  /* Check token */
  React.useEffect(() => {
    if (!token) {
      navigate("/dashboard/login");
    }
  }, []);

  /* Choose college */
  const handleChooseCollege = (e: any) => {
    setCollegeUUID(e.target.value);
  };

  /* Remove values when success */
  React.useEffect(() => {
    if (successStatus) {
      setTitle("");
      setBody("");
    }
  }, [successStatus]);

  return (
    <div>
      <AdminHeader />
      {postLoading && <Loading />}
      {success && <MessageAlert message="تم الارسال بنجاح" type="success" />}
      {errorMessage && <MessageAlert message={errorMessage} type="error" />}
      <div className="send-notify flexCenterColumn">
        <h2>إرسال إشعار</h2>

        <div className="w-100 flexCenter">
          <select
            defaultValue={"all"}
            className="select-college"
            onChange={handleChooseCollege}
          >
            <option value={"all"}>جميع الكليات</option>
            {data &&
              data.map((item: any) => {
                return <option value={item.college_uuid}>{item.name}</option>;
              })}
          </select>
          {loading && (
            <div className="flexCenter overflow-hidden">
              <Spinner className="select-spinner" />
            </div>
          )}
        </div>
        <input
          placeholder="العنوان"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="الوصف"
          value={body}
          onChange={(e) => setBody(e.target.value)}
        ></textarea>
        <button onClick={handelSendNotify}>إرسال</button>
      </div>
    </div>
  );
};

export default SendNotify;
