import "./UsernameInput.scss";
import usernameIcon from "../../../assets/images/Login/username.svg";

const UsernameInput = ({
  name,
  setName,
  register,
  handleEnterKey,
}: any) => {
  return (
    <div className="username-input-component">
      <p>اسم المستخدم</p>
      <input
        type="text"
        value={name}
        placeholder="اسم المستخدم"
        {...register("username", {
          required: "اسم المستخدم مطلوب",
          pattern: {
            value: /^[A-Za-z\s]+$/,
            message: "يجب ألا يحتوي الاسم على رموز وأرقام",
          },
        })}
        onChange={(e) => setName(e.target.value)}
        onKeyDown={handleEnterKey}
      />
      <img src={usernameIcon} alt="" />
    </div>
  );
};

export default UsernameInput;
