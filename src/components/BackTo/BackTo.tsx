import "./BackTo.scss";
import backToIcon from "../../assets/images/Dawrat/backTo.svg";
import { useNavigate } from "react-router-dom";

const BackTo = () => {
  const navigate = useNavigate();
  const handleBackTo = () => {
    navigate("/subject-selection");
  };
  return (
    <div className="back-to">
      <div className="back-to-item" onClick={handleBackTo}>
        <img src={backToIcon} alt="" />
      </div>
      <div className="back-to-item">
        <p>العودة</p>
      </div>
    </div>
  );
};

export default BackTo;
