import React, { useState } from "react";

const SearchableDropdown: React.FC<{
  inputProps: any;
  label: string;
  placeholder: string;
  searchResults: any;
  setVal: any;
  setSkillId: any;
}> = ({
  inputProps,
  label,
  placeholder,
  searchResults,
  setVal,
  setSkillId,
}) => {
  const [focus, setFocus] = useState(false);
  return (
    <div className="searchable-input-wrap relative my-4 w-full">
      {focus && (
        <label
          className={`text-md absolute -top-4 left-4 flex rounded-full bg-violet-500 px-2 text-white`}
          htmlFor={label}
        >
          {label}
        </label>
      )}
      <input
        {...inputProps}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        className={`w-full rounded-xl border border-violet-500 bg-violet-100 p-4 text-xl outline-none focus:border-2`}
        type={"text"}
        name={label}
        placeholder={placeholder}
      />
      {searchResults && (
        <div className="search-results top-100 absolute inset-x-0 rounded-xl bg-white">
          {searchResults?.map((skill: any, index: number) => (
            <button
              key={index}
              onClick={() => {
                setVal("skill", skill.name);
                setSkillId(skill.id);
              }}
              className="skill-item p-4 text-xl font-medium"
            >
              {skill.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchableDropdown;
