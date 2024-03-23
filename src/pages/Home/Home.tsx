import {
  Ads,
  Footer,
  Header,
  MobileApp,
  Specialists,
  StartNow,
} from "../../components";
import "./Home.scss";

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
