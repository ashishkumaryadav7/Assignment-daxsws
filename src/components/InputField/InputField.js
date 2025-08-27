import ErrorMessage from "../ErrorMessage/ErrorMessage";
import "./InputField.scss";
import EyeClose from "../Icons/EyeClose";
import EyeOpen from "../Icons/EyeOpen"
import { useState } from "react";

const InputField = ({ label, type, name, value, onChange, error }) => {
  const [visible, setVisible] = useState(false)
  return (
    <div className="input-field-wrapper">
      <div className="input-block">
        <input
          className="input-field"
          name={name}
          type={type === "password" && visible ? "text" : type}
          value={value}
          onChange={onChange}
          placeholder=" "
        />
        <label className="input-label">{label}</label>
        {type == "password" && <div className="icon">
          {!visible ? <span onClick={() => setVisible(ps => !ps)}><EyeOpen /></span> :
            <span onClick={() => setVisible(ps => !ps)}> <EyeClose /></span>}
        </div>}
      </div>
      <div className="msg-block">
        {error && <ErrorMessage message={error} />}
      </div>

    </div>
  );
};

export default InputField;
