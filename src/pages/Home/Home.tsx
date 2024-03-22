import "./Home.scss";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import StartNow from "../../components/StartNow/StartNow";
import Ads from "../../components/Ads/Ads";
import Specialists from "../../components/Specialists/Specialists";
import MobileApp from "../../components/MobileApp/MobileApp";

const Home = () => {
  return (
    <div className="d-flex flex-column">
      <Header />
      <div className="home flexCenter">
        {/* First Section */}
        <div className="first-section flexCenter">
          <div className="home-start-now flexCenter">
            <StartNow />
          </div>
          <div className="home-ads flexCenter">
            <Ads />
          </div>
        </div>

        {/* Specialists Section */}
        <Specialists />

        {/* MobileApp Section */}
        <MobileApp />
      </div>
      <Footer />
    </div>
  );
};

export default Home;
