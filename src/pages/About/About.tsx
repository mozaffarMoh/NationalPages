import { Footer, Header } from "../../components";
import "./About.scss";

const About = () => {
  return (
    <>
      <Header />
      <div className="about flexCenterColumn">
        <h1>شركة دربني</h1>
        <p>
          نحن شركة دربني للبرمجيات نحن شركة دربني للبرمجيات نحن شركة دربني
          للبرمجيات نحن شركة دربني للبرمجيات نحن شركة دربني للبرمجيات نحن شركة
          دربني للبرمجيات نحن شركة دربني للبرمجيات نحن شركة دربني للبرمجيات نحن
          شركة دربني للبرمجيات نحن شركة دربني للبرمجيات نحن شركة دربني للبرمجيات
          نحن شركة دربني للبرمجيات نحن شركة دربني للبرمجيات نحن شركة دربني
          للبرمجيات نحن شركة دربني للبرمجيات نحن شركة دربني للبرمجيات نحن شركة
          دربني للبرمجيات نحن شركة دربني للبرمجيات نحن شركة دربني للبرمجيات نحن
          شركة دربني للبرمجيات نحن شركة دربني للبرمجيات نحن شركة دربني للبرمجيات
          نحن شركة دربني للبرمجيات نحن شركة دربني للبرمجيات نحن شركة دربني
          للبرمجيات نحن شركة دربني للبرمجيات نحن شركة دربني للبرمجيات نحن شركة
          دربني للبرمجيات
        </p>

        <div className="flexCenter">
          <a
            href="mailto:info@darrebni.net"
            target="_blank"
            className="button"
            rel="noopener noreferrer"
          >
            <div className="contact-item">
              <img
                src={
                  "https://platform.darrebni.net/static/media/email.5fb2e129fd4069784df899454bc4b473.svg"
                }
                alt="email"
                className="email-icon"
              />
              <div className="title">البريد الإلكتروني</div>
              <div className="info">info@darrebni.net</div>
            </div>
          </a>
          <a href="tel:00447859544893" className="button">
            <div className="contact-item">
              <img
                src={
                  "https://platform.darrebni.net/static/media/phone.851370c76778ada2a9075cecc73c852a.svg"
                }
                className="phone-icon"
                alt="phone"
              />
              <div className="title">اتصل بنا</div>
              <div className="info">00447859544893</div>
            </div>
          </a>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default About;
