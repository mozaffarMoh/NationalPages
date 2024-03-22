import "./AdminRegister.scss";
import { endPoint } from "../../../api/endPoints";
import React from "react";
import AdminHeader from "../../../components/Dashboard/AdminHeader/AdminHeader";
import { useForm } from "react-hook-form";
import Loading from "../../../components/Loading/Loading";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import usePost from "../../../api/usePost";
import MessageAlert from "../../../components/MessageAlert/MessageAlert";

const AdminRegister = () => {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword]: any = React.useState("");
  const navigate = useNavigate();
  const token = Cookies.get("token");
  const {
    register,
    handleSubmit,
    formState: { errors },
  }: any = useForm();

  /* Check token */
  React.useEffect(() => {
    if (!token) {
      navigate("/dashboard/login");
    }
  }, []);

  /* Handle register proccess */
  const [, handleRegister, loading, success, errorMessage, successStatus]: any =
    usePost(
      {
        name: name,
        email: email,
        password: password,
      },
      endPoint.adminRegister
    );

  /* Remove values when success */
  React.useEffect(() => {
    setEmail("");
    setName("");
    setPassword("");
  }, [successStatus]);

  return (
    <div className="admin-register flexCenterColumn">
      <AdminHeader />
      {loading && <Loading />}
      {errorMessage && <MessageAlert message={errorMessage} type="error" />}

      {success && (
        <MessageAlert message={"تم إنشاء الحساب بنجاح"} type="success" />
      )}
      <h4>إنشاء حساب مسؤول جديد</h4>
      <form
        className="flexCenterColumn"
        onSubmit={handleSubmit(handleRegister)}
      >
        <input
          type="text"
          placeholder="اسم المسؤول"
          value={name}
          {...register("username", {
            required: "اسم المستخدم مطلوب",
          })}
          onChange={(e: any) => setName(e.target.value)}
        />
        {errors.username && (
          <div className="error-message">{errors.username.message}</div>
        )}
        <input
          type="text"
          placeholder="الإيميل"
          value={email}
          {...register("email", {
            required: "الإيميل مطلوب",
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
          value={password}
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
        <button type="submit" onSubmit={handleRegister}>
          انشاء حساب
        </button>
      </form>
    </div>
  );
};

export default AdminRegister;
