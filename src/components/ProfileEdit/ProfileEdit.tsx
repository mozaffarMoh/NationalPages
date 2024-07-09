import "./ProfileEdit.scss";
import avatarIcon from "../../assets/images/ProfileEdit/avatar.svg";
import { Button, Spinner } from "react-bootstrap";
import { endPoint } from "../../api/endPoints";
import Cookies from "js-cookie";
import useGet from "../../api/useGet";
import React from "react";
import usePost from "../../api/usePost";
import { useForm } from "react-hook-form";
import {
  Loading,
  MessageAlert,
  PhoneInputEdit,
  Retry,
  UsernameInputEdit,
} from "..";

const ProfileEdit = ({
  setShowProfileEdit,
  setShowEditSuccessMessage,
}: any) => {
  const {
    register,
    handleSubmit,
    trigger,
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

  const [isStartEnterKey, setStartEnterKey] = React.useState(false);

  /* Focus and blur inputs to trigger validation errors */
  const focusAndBlur = () => {
    return Object.keys(errors).forEach((errorKey) => {
      const element = document.getElementsByName(errorKey)[0];
      if (element) {
        element.blur();
        element.focus();
      }
    });
  };

  /* check validation after enter key */
  const handleEnterKey = async (e: any) => {
    if (e.key === "Enter") {
      await trigger("username");
      await trigger("phone");
      focusAndBlur();
      setStartEnterKey(true);
    }
  };

  /* Start after enter key for first enter press */
  React.useEffect(() => {
    if (isStartEnterKey) {
      handleSubmit(editProfileFunc)();
      focusAndBlur();
    }
  }, [isStartEnterKey]);

  return (
    <div className="profile-edit flexCenter">
      {postLoading && <Loading />}
      {errorMessage && <MessageAlert message={errorMessage} type="error" />}

      <p>تعديل المعلومات الشخصية</p>

      <div className="profile-edit-avatar flexCenterColumn">
        <img src={avatarIcon} alt="" />
        <div className="brightness flexCenter">Upload</div>
      </div>
      <div className="profile-details">
        {data && <p>{data.name} </p>}

        {getDataError && <Retry getData={getData} />}
        {loading && <Spinner className="profile-data-spinner" />}
      </div>
      <form
        className="profile-edit-form flexCenterColumnItemStart"
        onSubmit={handleSubmit(editProfileFunc)}
      >
        <UsernameInputEdit
          name={name}
          setName={setName}
          register={register}
          handleEnterKey={handleEnterKey}
        />{" "}
        {errors.username && (
          <div className="error-message ">{errors.username.message}</div>
        )}
        <PhoneInputEdit
          phone={phone}
          setPhone={setPhone}
          register={register}
          handleEnterKey={handleEnterKey}
        />{" "}
        {errors.phone && (
          <div className="error-message ">{errors.phone.message}</div>
        )}
        <Button
          type="submit"
          className="save-changes-button"
          variant="secondary"
        >
          حفظ التغييرات
        </Button>
        <span onClick={() => setShowProfileEdit(false)}>خروج</span>
      </form>
    </div>
  );
};

export default ProfileEdit;
