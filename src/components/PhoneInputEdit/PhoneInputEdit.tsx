import "./PhoneInputEdit.scss";
import phoneIcon from "../../assets/images/Login/phone.svg";
import editIcon from "../../assets/images/ProfileEdit/edit.svg";

const PhoneInputEdit = ({ phone, setPhone, register }: any) => {
  return (
    <div className="phone-input-edit mt-4">
      <p>رقم الموبايل</p>
      <input
        type="text"
        placeholder="رقم الموبايل"
        value={phone}
        {...register("phone", {
          required: !phone && "رقم الهاتف مطلوب",

          pattern: {
            value: /^09\d{8}$/,
            message: "يجب أن يتكون رقم الهاتف من 10 أرقام وأن تبدا ب 09 ",
          },
        })}
        onChange={(e) => setPhone(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && e.preventDefault()}
      />
      <img src={phoneIcon} className="phone-icon" alt="" />
      <img src={editIcon} className="edit-icon" alt="" />
    </div>
  );
};

export default PhoneInputEdit;
