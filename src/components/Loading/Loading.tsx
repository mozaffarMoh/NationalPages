import { Spinner } from "react-bootstrap";
import "./Loading.scss";

const Loading = () => {
  return (
    <div className="loading-container flexCenter">
      <Spinner animation="border" className="spinner-animation" />
    </div>
  );
};

export default Loading;
