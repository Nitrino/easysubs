import { FC } from "react";

import { default as ReactSelect, Props } from "react-select";

const customStyles = {
  control: (baseStyles, _state) => ({
    ...baseStyles,
    background: "#51535D",
    color: "white",
    border: "none",
    minHeight: "24px",
    height: "24px",
  }),
  menuPortal: (provided) => ({ ...provided, zIndex: 10000, fontSize: "14px" }),
  menu: (provided) => ({ ...provided, zIndex: 10000 }),
  valueContainer: (provided, _state) => ({
    ...provided,
    height: "24px",
    padding: "0 4px",
    color: "white",
  }),
  indicatorsContainer: (provided, _state) => ({
    ...provided,
    height: "24px",
  }),
  singleValue: (baseStyles) => ({ ...baseStyles, color: "white" }),
  option: (base) => ({
    ...base,
    color: "black",
  }),
};

const theme = (theme) => ({
  ...theme,
  colors: {
    ...theme.colors,
    neutral30: "white", //control/borderColor(focused)
    neutral80: "white", //input color
    primary: "#1296ba", //option bg color selected
    primary50: "white", // option bg color active(enavled or available)
  },
});

export const Select: FC<Props> = (props) => {
  return (
    <div style={{ width: "100%", minWidth: "140px" }}>
      <ReactSelect
        {...props}
        styles={customStyles}
        theme={theme}
        menuPortalTarget={document.body}
        menuPosition="fixed"
      />
    </div>
  );
};
