import { FC } from "react";

import { default as ReactSelect, components, DropdownIndicatorProps, Props, StylesConfig, Theme } from "react-select";

const FONT = "var(--es-font)";

// A macOS pop-up button on the HUD. The menu uses the HUD material with an accent highlight
// that follows the pointer and a checkmark on the current value, like an NSMenu.
const customStyles: StylesConfig = {
  control: (base, state) => ({
    ...base,
    minHeight: 24,
    height: 24,
    border: "none",
    borderRadius: 7,
    background: state.menuIsOpen ? "var(--es-fill-active)" : "var(--es-fill)",
    boxShadow: "none",
    cursor: "default",
    transition: "background-color 120ms",
    "&:hover": {
      background: state.menuIsOpen ? "var(--es-fill-active)" : "var(--es-fill-hover)",
    },
  }),
  valueContainer: (base) => ({ ...base, height: 24, padding: "0 2px 0 9px" }),
  singleValue: (base) => ({ ...base, margin: 0, color: "var(--es-primary)", fontSize: 13 }),
  input: (base) => ({ ...base, margin: 0, padding: 0, color: "var(--es-primary)", fontSize: 13 }),
  placeholder: (base) => ({ ...base, color: "var(--es-secondary)", fontSize: 13 }),
  indicatorsContainer: (base) => ({ ...base, height: 24 }),
  indicatorSeparator: () => ({ display: "none" }),
  dropdownIndicator: (base) => ({
    ...base,
    padding: "0 8px 0 2px",
    color: "var(--es-secondary)",
    "&:hover": { color: "var(--es-primary)" },
  }),
  menuPortal: (base) => ({ ...base, zIndex: 10000, fontFamily: FONT, fontSize: 13 }),
  menu: (base) => ({
    ...base,
    zIndex: 10000,
    marginTop: 4,
    marginBottom: 4,
    overflow: "hidden",
    border: "0.5px solid var(--es-hud-border)",
    borderRadius: 10,
    background: "var(--es-hud-strong)",
    backdropFilter: "var(--es-hud-blur)",
    WebkitBackdropFilter: "var(--es-hud-blur)",
    boxShadow: "var(--es-glass-edge), 0 12px 32px rgba(0, 0, 0, 0.45)",
    fontFamily: FONT,
    fontSize: 13,
    WebkitFontSmoothing: "antialiased",
  }),
  menuList: (base) => ({
    ...base,
    padding: 5,
    scrollbarWidth: "thin",
    scrollbarColor: "rgba(255, 255, 255, 0.25) transparent",
  }),
  option: (base, state) => ({
    ...base,
    position: "relative",
    padding: "4px 10px 4px 24px",
    borderRadius: 6,
    background: state.isFocused ? "var(--es-accent)" : "transparent",
    color: state.isFocused ? "#fff" : "var(--es-primary)",
    lineHeight: "18px",
    cursor: "default",
    "&:active": { background: "var(--es-accent)" },
    "&::before": state.isSelected ? { content: '"✓"', position: "absolute", left: 9, fontSize: 12 } : {},
  }),
  noOptionsMessage: (base) => ({ ...base, color: "var(--es-secondary)" }),
};

const theme = (theme: Theme): Theme => ({
  ...theme,
  colors: {
    ...theme.colors,
    primary: "#0a84ff",
    primary25: "#0a84ff",
    primary50: "#0a84ff",
  },
});

// The pop-up button's up/down chevrons.
const DropdownIndicator: FC<DropdownIndicatorProps> = (props) => (
  <components.DropdownIndicator {...props}>
    <svg width="7" height="11" viewBox="0 0 7 11" aria-hidden="true">
      <path
        d="M1 4 3.5 1.5 6 4M1 7l2.5 2.5L6 7"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  </components.DropdownIndicator>
);

// Long lists (languages) stay type-to-search; short ones behave like a plain pop-up button.
const SEARCHABLE_MIN_OPTIONS = 10;

export const Select: FC<Props> = (props) => {
  return (
    <div className="es-select">
      <ReactSelect
        isSearchable={(props.options?.length ?? 0) > SEARCHABLE_MIN_OPTIONS}
        {...props}
        styles={customStyles}
        theme={theme}
        components={{ DropdownIndicator, ...props.components }}
        menuPortalTarget={document.body}
        menuPosition="fixed"
        menuPlacement="auto"
      />
    </div>
  );
};
