import "./ChooseCollege.scss";
import emptyCheckBox from "../../../assets/images/ChooseCollege/empty.svg";
import filledCheckBox from "../../../assets/images/ChooseCollege/fill.svg";
import { endPoint } from "../../../api/endPoints";
import useGet from "../../../api/useGet";
import { Spinner } from "react-bootstrap";

const ChooseCollege = ({ collegeUUID, setCollegeUUID }: any) => {
  const [data, , loading, errorMessage]: any = useGet(endPoint.colleges);

  /* Handle press on college */
  const handleCheckbox = (uuid: any) => {
    setCollegeUUID(uuid);
  };

  console.log(errorMessage);
  return (
    <div className="choose-college-from-register">
      <div className="h-25 ">
        <h6>اختر الكلية</h6>
      </div>
      <div className="college-items flexCenter">
        {data &&
          data.map((item: any, index: number) => {
            return (
              <div className="college-item flexCenter" key={index}>
                <img
                  src={
                    item.college_uuid === collegeUUID
                      ? filledCheckBox
                      : emptyCheckBox
                  }
                  onClick={() => handleCheckbox(item.college_uuid)}
                />
                <p>{item.name}</p>
              </div>
            );
          })}
        {loading && (
          <div className="w-100 flexCenter overflow-y-hidden ">
            <Spinner animation="border" color="blue" />
          </div>
        )}
      </div>
    </div>
  );
};

export default ChooseCollege;
