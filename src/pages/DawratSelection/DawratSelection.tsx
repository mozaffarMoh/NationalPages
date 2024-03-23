import "./DawratSelection.scss";
import { AllDawrat, BackTo, Header } from "../../components";

const DawratSelection = () => {
  return (
    <div className="dawrat-selection">
      <Header />
      <BackTo />
      <AllDawrat />
    </div>
  );
};

export default DawratSelection;
