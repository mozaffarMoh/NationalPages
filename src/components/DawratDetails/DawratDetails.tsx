import "./DawratDetails.scss";

const DawratDetails = ({ dawraName }: any) => {
  return (
    <div className="dawrat-details flexCenterColumnItemsStart">
      {dawraName && (
        <div className="dawrat-details-item flexCenter">
          <h1>{dawraName}</h1>
        </div>
      )}
      <div className="dawrat-details-item flexCenter">
        <p>50 سؤال</p>
        <p>علامة النجاح 100</p>
      </div>
    </div>
  );
};

export default DawratDetails;
