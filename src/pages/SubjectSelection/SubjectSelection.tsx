import "./SubjectSelection.scss";
import Ads from "../../components/Ads/Ads";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import ClassificationButtons from "../../components/ClassificationButtons/ClassificationButtons";
import ClassificationList from "../../components/ClassificationList/ClassificationList";

const SubjectSelection = () => {
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
