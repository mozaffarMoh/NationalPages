import "./Footer.scss";
import facebookLogo from "../../assets/images/Footer/ic_facebook.svg";
import instaLogo from "../../assets/images/Footer/ic_instagram.svg";
import logo from "../../assets/images/Header/logo darebni.png";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="footer row flexCenter">
      <div className="text-field col-8 flexCenterColumnItemsStart">
        <div className="links flexCenter">
          <Link to={"/privacy-policy"}>
            <p>سياسة الخصوصية</p>
          </Link>
          <Link to={"/terms-and-conditions"}>
            <p>الشروط و الأحكام</p>
          </Link>
        </div>
        <div className="icons flexBetween">
          <p>جميع الحقوق محفوظة 2023 </p>
          <a href="https://www.facebook.com/darrebni.co" target="_blank">
            <img src={facebookLogo} alt="" />
          </a>
          <a href="https://www.instagram.com/darrebni.co" target="_blank">
            <img src={instaLogo} alt="" />{" "}
          </a>
          {/* https://www.linkedin.com/company/darrebni/ */}
        </div>
      </div>
      <div className="logo col-4 flexCenter">
        <img src={logo} alt="" />
      </div>
    </div>
  );
};

export default Footer;
