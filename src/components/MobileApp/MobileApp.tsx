import "./MobileApp.scss";
import mobileImage from "../../assets/images/MobileApp/mobile.png";
import stores from "../../assets/images/MobileApp/stores.png";

const MobileApp = () => {
  return (
    <div className="mobile-app flexCenter">
      <div className="mobile-background flexCenter">
        <img src={mobileImage} className="mobile-image" alt="" loading="lazy" />
        <div className="download-from-stores flexCenter">
          <p>يمكنك تنزيل التطبيق و استخدامه اينما كنت</p>
          <p>متوفر على انظمة الاندرويد و الايفون</p>
          <img src={stores} alt="" loading="lazy" />
        </div>
      </div>
    </div>
  );
};

export default MobileApp;
