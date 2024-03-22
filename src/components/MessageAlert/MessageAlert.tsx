import "./MessageAlert.scss";
import { Alert } from "antd";

const MessageAlert = ({ message, type }: any) => {
  const checkMessage = () => {
    if (message == "The college uuid field is required.") {
      return "يجب تحديد الكلية لإتمام التسجيل";
    } else {
      return message;
    }
  };
  return (
    <Alert
      className={`message-alert ${
        type == "error" ? "error-color" : "success-color"
      }`}
      message={checkMessage()}
      type={type}
      showIcon
    />
  );
};

export default MessageAlert;
