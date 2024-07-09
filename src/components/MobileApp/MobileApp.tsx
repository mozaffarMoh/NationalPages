import "./MobileApp.scss";
import mobileImage from "../../assets/images/MobileApp/mobile.png";
import appleStore from "../../assets/images/MobileApp/appleStore.png";
import googleStore from "../../assets/images/MobileApp/googleStore.png";

const MobileApp = () => {
  return (
    <div className="mobile-app flexCenter">
      <div className="mobile-background flexCenter">
        <img src={mobileImage} className="mobile-image" alt="" loading="lazy" />
        <div className="download-from-stores flexCenter">
          <p>يمكنك تنزيل التطبيق و استخدامه اينما كنت</p>
          <p>متوفر على انظمة الاندرويد و الايفون</p>
          <div className="flexCenter">
            <a href="https://www.google.com" target="_blank">
              <img
                src={googleStore}
                alt=""
                loading="lazy"
                className="googleStore"
              />
            </a>
            <a href="https://www.apple.com" target="_blank">
              <img
                src={appleStore}
                alt=""
                loading="lazy"
                className="appleStore"
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileApp;
