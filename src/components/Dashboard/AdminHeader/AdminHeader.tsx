import "./AdminHeader.scss";
import React from "react";
import { RiMenu5Line } from "react-icons/ri";
import { NavLink, useNavigate } from "react-router-dom";
import { LinksArray } from "./LinksArray";
import apiNational from "../../../api/apiNational";
import { endPoint } from "../../../api/endPoints";
import Cookies from "js-cookie";
import { Loading } from "../..";

const AdminHeader = () => {
  const [showHeaderText, setShowHeaderText] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const navigate = useNavigate();

  /* Change Active Link */
  const handleChangeActive: any = (active: any) => {
    if (active.isActive) {
      return "active-selected";
    } else {
      return "not-active";
    }
  };

  /* Logout */
  const handleLogout = () => {
    setLoading(true);
    apiNational
      .get(endPoint.adminLogout)
      .then(() => {
        setLoading(false);
        navigate("/dashboard/login");
        Cookies.remove("token");
      })
      .catch(() => {
        setLoading(false);
        navigate("/dashboard/login");
        Cookies.remove("token");
      });
  };

  return (
    <div className="admin-header flexBetween">
      {loading && <Loading />}
      <button
        className="menu-button flexCenter"
        onClick={() => setShowHeaderText(!showHeaderText)}
      >
        <RiMenu5Line size={30} />
      </button>
      <div
        className={` header-text flexCenter ${
          showHeaderText && "show-header-text"
        } `}
      >
        {LinksArray.map((item, index) => {
          return (
            <NavLink
              key={index}
              to={item.path}
              className={(active: any) => handleChangeActive(active)}
            >
              {item.name}
            </NavLink>
          );
        })}
      </div>
      <div className="flexCenter">
        <NavLink
          to={"/dashboard/create-account"}
          className={(active: any) => handleChangeActive(active)}
        >
          إنشاء حساب مسؤول
        </NavLink>
        <button className="logout-button" onClick={handleLogout}>
          تسجيل الخروج
        </button>
      </div>
    </div>
  );
};

export default AdminHeader;
