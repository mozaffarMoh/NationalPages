import "./Register.scss";
import registerImage from "../../assets/images/Login/sign-up.svg";
import UsernameInput from "../../components/login-singup/UsernameInput/UsernameInput";
import PhoneInput from "../../components/login-singup/PhoneInput/PhoneInput";
import RegisterButton from "../../components/login-singup/RegisterButton/RegisterButton";
import ChooseCollege from "../../components/login-singup/ChooseCollege/ChooseCollege";
import React from "react";
import { endPoint } from "../../api/endPoints";
import Loading from "../../components/Loading/Loading";
import MessageAlert from "../../components/MessageAlert/MessageAlert";
import usePost from "../../api/usePost";
import { useForm } from "react-hook-form";

const Register = () => {
  const [name, setName] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [collegeUUID, setCollegeUUID] = React.useState("");
  const [, handleRegister, loading, success, errorMessage] = usePost(
    {
      name: name,
      phone: phone,
      college_uuid: collegeUUID,
    },
    endPoint.register
  );
  const {
    register,
    handleSubmit,
    formState: { errors },
  }: any = useForm();

  /* Empty the fields when success */
  React.useEffect(() => {
    setName("");
    setPhone("");
    setCollegeUUID("");
  }, [success]);

  return (
    <div className="register flexCenter row">
      {loading && <Loading />}

      <div className="register-form-background col-6 flexCenter">
        {success && (
          <MessageAlert message="تم إنشاء الحساب بنجاح " type="success" />
        )}
        {errorMessage && <MessageAlert message={errorMessage} type="error" />}
        <form className="register-form" onSubmit={handleSubmit(handleRegister)}>
          <div className="title flexCenter">
            <p>إنشاء حساب</p>
          </div>
          <UsernameInput name={name} setName={setName} register={register} />
          {errors.username && (
            <div className="error-message p-2">{errors.username.message}</div>
          )}
          <PhoneInput phone={phone} setPhone={setPhone} register={register} />
          {errors.phone && (
            <div className="error-message p-2">{errors.phone.message}</div>
          )}
          <ChooseCollege
            collegeUUID={collegeUUID}
            setCollegeUUID={setCollegeUUID}
          />
          <RegisterButton />
        </form>
      </div>
      <div className="register-image col-6 flexCenter">
        <img src={registerImage} alt="" />
      </div>
    </div>
  );
};

export default Register;
