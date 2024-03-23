import "./Register.scss";
import registerImage from "../../assets/images/Login/sign-up.svg";
import React from "react";
import { endPoint } from "../../api/endPoints";
import usePost from "../../api/usePost";
import { useForm } from "react-hook-form";
import { Loading, MessageAlert } from "../../components";
import {
  RegisterButton,
  UsernameInput,
  PhoneInput,
  ChooseCollege,
} from "../../components/login-singup";

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
    <div className="register flexCenter">
      {loading && <Loading />}

      <div className="register-form-background flexCenter">
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
      <div className="register-image flexCenter">
        <img src={registerImage} alt="" />
      </div>
    </div>
  );
};

export default Register;
