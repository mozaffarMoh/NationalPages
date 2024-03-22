import "./ProfileEdit.scss";
import avatarIcon from "../../assets/images/ProfileEdit/avatar.svg";
import { Button, Spinner } from "react-bootstrap";
import UsernameInputEdit from "../../components/UsernameInputEdit/UsernameInputEdit";
import PhoneInputEdit from "../../components/PhoneInputEdit/PhoneInputEdit";
import { endPoint } from "../../api/endPoints";
import Cookies from "js-cookie";
import useGet from "../../api/useGet";
import React from "react";
import MessageAlert from "../MessageAlert/MessageAlert";
import Loading from "../Loading/Loading";
import usePost from "../../api/usePost";
import Retry from "../Retry/Retry";
import { useForm } from "react-hook-form";

const ProfileEdit = ({
  setShowProfileEdit,
  setShowEditSuccessMessage,
}: any) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  }: any = useForm();
  const collegeUUID = Cookies.get("collegeUUID");

  const [data, getData, loading, , , , getDataError]: any = useGet(
    endPoint.showProfile,
    {
      isCollege_UUID: true,
      college_UUID: collegeUUID,
    }
  );

  const [name, setName] = React.useState("");
  const [phone, setPhone] = React.useState("");

  const [, editProfileFunc, postLoading, success, errorMessage]: any = usePost(
    {
      name: name,
      phone: phone,
    },
    endPoint.editProfile,
    {
      isCollege_UUID: true,
      college_UUID: collegeUUID,
    }
  );

  /* Close window when success editing */
  React.useEffect(() => {
    if (success) {
      setShowEditSuccessMessage(true);
      setShowProfileEdit(false);
    }
  }, [success]);

  /* Change name and phone when data recieved */
  React.useEffect(() => {
    setName(data?.name);
    setPhone(data?.phone);
  }, [data]);

  return (
    <div className="profile-edit flexCenter">
      {postLoading && <Loading />}
      {errorMessage && <MessageAlert message={errorMessage} type="error" />}
      <div className="profile-edit-title">
        <p>تعديل المعلومات الشخصية</p>
      </div>
      <div className="profile-edit-avatar">
        <img src={avatarIcon} alt="" />
        <div>
          {data && <p>{data.name} </p>}

          {loading && <Spinner className="profile-data-spinner" />}
          {getDataError && <Retry getData={getData} />}
        </div>
      </div>
      <form
        className="profile-edit-form flexCenterColumnItemStart"
        onSubmit={handleSubmit(editProfileFunc)}
      >
        <UsernameInputEdit name={name} setName={setName} register={register} />{" "}
        {errors.username && (
          <div className="error-message p-2">{errors.username.message}</div>
        )}
        <PhoneInputEdit phone={phone} setPhone={setPhone} register={register} />{" "}
        {errors.phone && (
          <div className="error-message p-2">{errors.phone.message}</div>
        )}
        <Button
          type="submit"
          className="save-changes-button"
          variant="secondary"
        >
          حفظ التغييرات
        </Button>
      </form>
      <span onClick={() => setShowProfileEdit(false)}>تراجع</span>
    </div>
  );
};

export default ProfileEdit;
