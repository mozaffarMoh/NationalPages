import React from "react";
import "./AdminLogin.scss";
import apiNational from "../../../api/apiNational";
import { endPoint } from "../../../api/endPoints";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useForm } from "react-hook-form";
import Loading from "../../../components/Loading/Loading";

const AdminLogin = () => {
  const router = useNavigate();
  const [email, setEmail] = React.useState();
  const [password, setPassword]: any = React.useState();
  const [loading, setLoading]: any = React.useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  }: any = useForm();

  const handleLogin = () => {
    setLoading(true);
    apiNational
      .post(endPoint.adminLogin, {
        email: email,
        password: password,
      })
      .then((res) => {
        setLoading(false);
        router("/dashboard/users");
        Cookies.set("token", res.data.data.token);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  return (
    <div className="admin-login flexCenterColumn">
      {loading && <Loading />}
      <h4>تسجيل الدخول للمسؤول</h4>
      <form className="flexCenterColumn" onSubmit={handleSubmit(handleLogin)}>
        <input
          type="text"
          placeholder="الإيميل"
          {...register("email", {
            required: "اسم المستخدم مطلوب",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "يجب أن يكون الحقل عنوان بريد إلكتروني صالح ",
            },
          })}
          onChange={(e: any) => setEmail(e.target.value)}
        />
        {errors.email && (
          <div className="error-message">{errors.email.message}</div>
        )}
        <input
          type="password"
          placeholder="كلمة السر"
          {...register("password", {
            required: "كلمة السر مطلوبة",
            minLength: {
              value: 6,
              message: "يجب أن تحتوي كلمة السر على الأقل 6 أحرف",
            },
            maxLength: {
              value: 64,
              message: "يجب أن تحتوي كلمة السر على 64 حرف كحدأعظمي  ",
            },
          })}
          onChange={(e: any) => setPassword(e.target.value)}
        />
        {errors.password && (
          <div className="error-message">{errors.password.message}</div>
        )}
        <button type="submit" onSubmit={handleLogin}>
          تسجيل الدخول
        </button>
      </form>
    </div>
  );
};

export default AdminLogin;
