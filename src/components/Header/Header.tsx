import "./Header.scss";
import { Button } from "react-bootstrap";
import logo from "../../assets/images/Header/logo darebni.png";
import profileIcon from "../../assets/images/Header/profile.svg";
import logoutIcon from "../../assets/images/Header/logout.svg";
import { Link, NavLink, useNavigate } from "react-router-dom";
import React, { useRef } from "react";
import { Transition } from "react-transition-group";
import Cookies from "js-cookie";
import { endPoint } from "../../api/endPoints";
import apiNational from "../../api/apiNational";
import { Loading, MessageAlert, ProfileEdit } from "..";

const Header = () => {
  const token = Cookies.get("token");
  const collegeUUID = Cookies.get("collegeUUID");
  const specialityUUID = Cookies.get("specialityUUID");
  const navigate = useNavigate();
  const ref = useRef();
  const [loading, setLoading]: any = React.useState(false);
  const [showEditSuccessMessage, setShowEditSuccessMessage] =
    React.useState(false);
  const [showProfileEdit, setShowProfileEdit] = React.useState(false);
  const [showProfileList, setShowProfileList] = React.useState(false);

  /* Remove data from cookies when logout and navigate to login page*/
  const removeCookiesAndNavigate = () => {
    setLoading(false);
    Cookies.remove("token");
    Cookies.remove("code");
    Cookies.remove("collegeUUID");
    Cookies.remove("specialityUUID");
    navigate("/login");
  };

  /* Handle Logout */
  const handleLogout = () => {
    setLoading(true);
    apiNational
      .get(endPoint.logout + "?college_uuid=" + collegeUUID)
      .then(() => {
        removeCookiesAndNavigate();
      })
      .catch(() => {
        removeCookiesAndNavigate();
      });
  };

  /* Hide success edit message */
  React.useEffect(() => {
    if (showEditSuccessMessage) {
      setTimeout(() => {
        setShowEditSuccessMessage(false);
      }, 4000);
    }
  }, [showEditSuccessMessage]);

  return (
    <div className="header flexCenter row ">
      {loading && <Loading />}
      {showEditSuccessMessage && (
        <div className="edit-profile-success-message">
          <MessageAlert message="تم التعديل بنجاح" type="success" />
        </div>
      )}

      {/* Darrebni logo */}
      <div className="logo col-3 d-flex">
        <img src={logo} alt="" />
      </div>

      {/* Links */}
      <div className="links col-6 flexCenter">
        <NavLink
          to="/"
          className={`link-template ${
            location.pathname === "/" &&
            location.hash !== "#specialists" &&
            "link-template-active"
          }`}
        >
          <p>الرئيسية</p>
        </NavLink>
        {!specialityUUID && !location.pathname.includes("about") && (
          <a
            href="/#specialists"
            className={`link-template ${
              location.hash.includes("#specialists") && "link-template-active"
            }`}
          >
            <p>الإختصاصات</p>
          </a>
        )}
        <NavLink
          to="/about"
          className={`link-template ${
            location.pathname.includes("about") &&
            !location.pathname.includes("specialists") &&
            "link-template-active"
          }`}
        >
          <p>من نحن</p>
        </NavLink>
      </div>

      {/* Login Button and Profile porperties */}
      <div className="header-login col-3 d-flex ">
        {token ? (
          <div
            className="header-profile flexCenter"
            onClick={() => setShowProfileList(!showProfileList)}
          >
            <div className="icon-field">
              <img src={profileIcon} alt="" />
            </div>
            <h6 className={`${showProfileList && "fw-bold"}`}>الملف الشخصي</h6>

            <Transition in={showProfileList} timeout={500} nodeRef={ref}>
              {(state) => (
                <div
                  className="transistion-profile"
                  style={{ opacity: state === "entered" ? 1 : 0 }}
                >
                  {showProfileList && (
                    <div className="handle-profile flexCenterColumn">
                      <div
                        className="handle-profile-item flexStart"
                        onClick={() => setShowProfileEdit(true)}
                      >
                        <div className="icon-field">
                          <img src={profileIcon} />{" "}
                        </div>
                        <p className="mt-3">تعديل الملف الشخصي</p>
                      </div>

                      <Link
                        to={"#"}
                        className="handle-profile-item flexCenter"
                        onClick={handleLogout}
                      >
                        <div className="icon-field mt-2">
                          <img src={logoutIcon} />
                        </div>
                        <p className="mt-3">تسجيل الخروج</p>
                      </Link>
                    </div>
                  )}
                </div>
              )}
            </Transition>
          </div>
        ) : (
          <Link to={"/login"}>
            <Button className="header-login-button" variant="light">
              تسجيل الدخول
            </Button>
          </Link>
        )}
      </div>

      {showProfileEdit && (
        <ProfileEdit
          setShowProfileEdit={() => setShowProfileEdit(false)}
          setShowEditSuccessMessage={setShowEditSuccessMessage}
        />
      )}
    </div>
  );
};

export default Header;
