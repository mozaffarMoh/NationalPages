import "./DawratSelection.scss";
import Header from "../../components/Header/Header";
import BackTo from "../../components/BackTo/BackTo";
import AllDawrat from "../../components/AllDawrat/AllDawrat";

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
