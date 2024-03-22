import "./Footer.scss";
import facebookLogo from "../../assets/images/Footer/ic_facebook.svg";
import instaLogo from "../../assets/images/Footer/ic_instagram.svg";
import logo from "../../assets/images/Header/logo darebni.png";

const Footer = () => {
  return (
    <div className="footer row flexCenter">
      <div className="text-field col-8 flexCenterColumnItemsStart">
        <div className="links flexCenter">
          <p>سياسة الخصوصية</p>
          <p>الشروط و الاستخدام</p>
        </div>
        <div className="icons flexBetween">
          <p>جميع الحقوق محفوظة 2023 </p>
          <img src={facebookLogo} alt="" />
          <img src={instaLogo} alt="" />
        </div>
      </div>
      <div className="logo col-4 flexCenter">
        <img src={logo} alt="" />
      </div>
    </div>
  );
};

export default Footer;
