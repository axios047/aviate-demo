import React, { useState } from "react";

const InputField: React.FC<{
  type: string;
  label: string;
  placeholder: string;
  onChangeValue: () => {};
}> = ({ type, label, placeholder, onChangeValue }) => {
  const [focus, setFocus] = useState(false);
  return (
    <div className="input-wrap relative my-4 w-full">
      {focus && (
        <label
          className={`text-md absolute -top-4 left-4 flex rounded-full bg-violet-500 px-2 text-white`}
          htmlFor={label}
        >
          {label}
        </label>
      )}
      <input
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        className={`w-full rounded-xl border border-violet-500 bg-violet-100 p-4 text-xl outline-none focus:border-2`}
        type={type}
        name={label}
        placeholder={placeholder}
        onChange={(e) => onChangeValue(e.target.value)}
      />
    </div>
  );
};

export default InputField;
