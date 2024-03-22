import { BsArrowClockwise } from "react-icons/bs";

const Retry = ({ getData }: any) => {
  return (
    <div className="w-100 flexCenterColumn mt-3">
      <BsArrowClockwise onClick={getData} cursor={"pointer"} size={35} />
      <h6 className="mt-1">أعد المحاولة</h6>
    </div>
  );
};

export default Retry;
