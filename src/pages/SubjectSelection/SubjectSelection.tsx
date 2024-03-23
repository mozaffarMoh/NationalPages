import "./SubjectSelection.scss";
import React from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import {
  Ads,
  ClassificationButtons,
  ClassificationList,
  Footer,
  Header,
} from "../../components";

const SubjectSelection = () => {
  const navigate = useNavigate();
  const token = Cookies.get("token");

  React.useEffect(() => {
    if (!token) {
      navigate("/");
    }
  }, []);
  return (
    <div className="subject-selection">
      <Header />
      <div className="subject-selection-ads flexCenter">
        <Ads />
      </div>
      <ClassificationButtons />
      <ClassificationList />
      <Footer />
    </div>
  );
};

export default SubjectSelection;
