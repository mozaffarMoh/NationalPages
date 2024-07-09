import React, { useRef } from "react";
import "./Specialists.scss";
import useGet from "../../api/useGet";
import { endPoint } from "../../api/endPoints";
import Cookies from "js-cookie";
import LoginRequired from "../LoginRequired/LoginRequired";
import { Spinner } from "react-bootstrap";
import { ChooseSpecialistOnStart } from "..";

const Specialists = () => {
  const collegeRef: any = useRef(null);
  const othersRef: any = useRef(null);
  const [colleges, setColleges] = React.useState([]);
  const [count, setCount] = React.useState(0);
  const [showChooseSpecialists, setShowChooseSpecialists] =
    React.useState(false);
  const [showLoginRequired, setShowLoginRequired] = React.useState(false);
  const [hintYourCollege, setHintYourCollege] = React.useState(false);
  const collegeUUID = Cookies.get("collegeUUID");
  const token = Cookies.get("token");
  const [data, , loading]: any = useGet(endPoint.colleges, {
    isCollege_UUID: true,
    college_UUID: collegeUUID,
  });

  React.useEffect(() => {
    setColleges(data);
    setCount(8);
  }, [data]);

  const handleShowMore = () => {
    if (count < data.length) {
      setCount((prev) => prev + 8);
    }
  };
  /* Handle select on specialist */
  const handleSelect = (currentUUID: any) => {
    if (token) {
      if (collegeUUID == currentUUID) {
        setShowChooseSpecialists(true);
      } else {
        setHintYourCollege(true);
        const rect = collegeRef.current.getBoundingClientRect();
        if (!(rect.top >= 0 && rect.bottom <= window.innerHeight)) {
          collegeRef.current.scrollIntoView({ behavior: "smooth" });
          setTimeout(() => {
            window.scrollTo(0, window.scrollY - 100);
          }, 700);
        }
      }
    } else {
      setShowLoginRequired(true);
    }
  };

  /* disable hint */
  React.useEffect(() => {
    if (hintYourCollege) {
      setTimeout(() => {
        setHintYourCollege(false);
      }, 1000);
    }
  }, [hintYourCollege]);

  return (
    <div className="specialists flexBetweenColumn" id="specialists">
      <div className="p-5 overflow-y-hidden ">
        <h2>الإختصاصات</h2>
      </div>
      <div className="specialist-items flexCenter">
        {colleges.slice(0, count).map((item: any, index: number) => {
          return (
            <div
              className={`specialist-item flexCenter`}
              key={index}
              onClick={() => handleSelect(item.college_uuid)}
            >
              <div
                ref={collegeUUID == item.college_uuid ? collegeRef : othersRef}
                className={`specialist-item-inside  ${
                  hintYourCollege &&
                  collegeUUID == item.college_uuid &&
                  "hint-your-college"
                }`}
              >
                <img src={item.image} />
                <p
                  className={`${
                    item.college_uuid == collegeUUID && "current-college "
                  }`}
                >
                  {item.name}
                </p>
              </div>
            </div>
          );
        })}
        {loading && (
          <div className="overflow-y-hidden ">
            <Spinner />
          </div>
        )}
      </div>
      {data && data.length > 8 && count < data.length && (
        <h5 onClick={handleShowMore} className="show-more">
          رؤية المزيد
        </h5>
      )}
      {showChooseSpecialists && (
        <ChooseSpecialistOnStart
          setShowChooseSpecialists={setShowChooseSpecialists}
        />
      )}
      {showLoginRequired && (
        <LoginRequired setShowLoginRequired={setShowLoginRequired} />
      )}
    </div>
  );
};

export default Specialists;
