import "./PasswordInput.scss";
import passwordIcon from "../../../assets/images/Login/password.svg";

const PasswordInput = ({ code, setCode, register }: any) => {
  return (
    <div className="password-input-component">
      <p>رمز الدخول</p>
      <input
        type="password"
        value={code}
        placeholder="رمز الدخول"
        {...register("password", {
          required: "رمز الدخول مطلوب",
          minLength: {
            value: 6,
            message: "يجب أن يحتوي رمز الدخول على 6 أرقام ",
          },
          maxLength: {
            value: 6,
            message: "يجب أن يحتوي رمز الدخول على 6 أرقام ",
          },
        })}
        onChange={(e) => setCode(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && e.preventDefault()}
      />
      <img src={passwordIcon} alt="" />
    </div>
  );
};

export default PasswordInput;
