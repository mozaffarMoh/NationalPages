import "./ClassificationList.scss";
import useGet from "../../api/useGet";
import { endPoint } from "../../api/endPoints";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { Spinner } from "react-bootstrap";
import { Retry } from "..";

const ClassificationList = () => {
  const navigate = useNavigate();
  const collegeUUID = Cookies.get("collegeUUID");
  const specialityUUID = Cookies.get("specialityUUID");

  const [data, getData, loading, , , success, error]: any = useGet(
    endPoint.collegeSubject,
    {
      isCollege_UUID: true,
      isSpeciality_UUID: true,
      college_UUID: collegeUUID,
      speciality_UUID: specialityUUID,
    }
  );

  const handleChooseSubject = (uuid: any) => {
    Cookies.set("isSpecialityUUID", "");
    Cookies.set("isExamUUID", "");
    Cookies.set("isSubjectUUID", "true");
    Cookies.set("subjectUUID", uuid);
    navigate("/quiz-page");
  };

  return (
    <div className="classificationList flexCenterColumn">
      <h1>التصنيفات</h1>
      <div className="classificationList-items flexCenter">
        {data &&
          data.map((item: any, index: number) => {
            return (
              <div
                key={index}
                className="classificationList-item flexCenter"
                onClick={() => handleChooseSubject(item.uuid)}
              >
                <p>{item.name}</p>
              </div>
            );
          })}
        {loading && (
          <div className="overflow-y-hidden">
            <Spinner />
          </div>
        )}
        {success && data.length === 0 && (
          <div>
            <h1>لايوجد مواد</h1>
          </div>
        )}
        {error && <Retry getData={getData} />}
      </div>
    </div>
  );
};

export default ClassificationList;
