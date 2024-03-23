import { Button, Spinner } from "react-bootstrap";
import "./ChooseSpecialistOnStart.scss";
import { useNavigate } from "react-router-dom";
import useGet from "../../api/useGet";
import { endPoint } from "../../api/endPoints";
import React from "react";
import Cookies from "js-cookie";
import { MessageAlert, Retry } from "..";

const ChooseSpecialistOnStart = ({ setShowChooseSpecialists }: any) => {
  const navigate = useNavigate();
  const collegeUUID = Cookies.get("collegeUUID");
  const examDegreeArray = [
    { title: "ماستر", value: "master" },
    { title: "تخرج", value: "graduation" },
  ];
  const [data, getData, loading, , , , error]: any = useGet(
    endPoint.collegeSpeciality,
    {
      isCollege_UUID: true,
      college_UUID: collegeUUID,
    }
  );

  const [degree, setDegree] = React.useState("");
  const [specialityUUID, setSpecialityUUID] = React.useState("");
  const [specialityName, setSpecialityName] = React.useState("");
  const [showMissingData, setShowMissingData] = React.useState(false);

  const handleSelectSpeciality = (uuid: any, name: any) => {
    setSpecialityName(name);
    setSpecialityUUID(uuid);
  };

  /* handle navigation */
  const handleNavigate = () => {
    if (degree && specialityUUID) {
      Cookies.set("degree", degree);
      Cookies.set("specialityUUID", specialityUUID);
      navigate("/subject-selection");
    } else {
      setShowMissingData(true);
      setTimeout(() => {
        setShowMissingData(false);
      }, 4000);
    }
  };

  return (
    <div className="choose-specialist-on-start flexCenterColumn">
      <h1>الرجاء تحديد الإختصاص و نوع الفحص الوطني</h1>

      <div className="choose-specialist-on-start-section flexCenterColumnItemsStart w-100">
        <p>الاختصاص</p>

        <div className="choose-specialist-on-start-items spec-items flexStart">
          {data &&
            data.map((item: any, index: number) => {
              return (
                <div
                  key={index}
                  className={`choose-specialist-on-start-item flexCenter ${
                    specialityName === item.name && "active-item"
                  }`}
                  onClick={() => handleSelectSpeciality(item.uuid, item.name)}
                >
                  <p>{item.name}</p>
                </div>
              );
            })}
          {loading && (
            <div className="w-100 h-100 overflow-y-hidden p-5 ">
              <Spinner />
            </div>
          )}
          {error && <Retry getData={getData} />}
          {showMissingData && (
            <MessageAlert message="يجب تحديد الاختصاص ونوع الامتحان" />
          )}
        </div>
      </div>

      <div className="choose-specialist-on-start-section flexCenterColumnItemsStart w-100">
        <p>نوع الامتحان</p>
        <div className="choose-specialist-on-start-items flexStart">
          {examDegreeArray.map((item, index) => {
            return (
              <div
                key={index}
                className={`choose-specialist-on-start-item flexCenter ${
                  degree === item.value && "active-item"
                }`}
                onClick={() => setDegree(item.value)}
              >
                <p>{item.title}</p>
              </div>
            );
          })}
        </div>
      </div>

      <div className="w-100 flexCenterColumn choose-specialist-on-start-navigations">
        <Button variant="secondary" onClick={handleNavigate}>
          التالي
        </Button>{" "}
        <span onClick={() => setShowChooseSpecialists(false)}>العودة</span>
      </div>
    </div>
  );
};

export default ChooseSpecialistOnStart;
