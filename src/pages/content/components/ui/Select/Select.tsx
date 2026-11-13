import { FC, MouseEvent, useEffect, useMemo, useRef } from "react";
import { usePortalTarget } from "@src/hooks/usePortalTarget";

import {
  default as ReactSelect,
  components,
  DropdownIndicatorProps,
  Props,
  SelectInstance,
  StylesConfig,
  Theme,
} from "react-select";

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
    opacity: state.isDisabled ? 0.45 : 1,
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
    background: state.isFocused && !state.isDisabled ? "var(--es-accent)" : "transparent",
    color: state.isDisabled ? "var(--es-secondary)" : state.isFocused ? "#fff" : "var(--es-primary)",
    lineHeight: "18px",
    cursor: "default",
    "&:active": { background: "var(--es-accent)" },
    "&::before": state.isSelected ? { content: '"✓"', position: "absolute", left: 9, fontSize: 12 } : {},
    // Tags (the second line's sources) turn white on the accent
    "& .es-tag": state.isFocused && !state.isDisabled ? { background: "rgba(255, 255, 255, 0.22)", color: "#fff" } : {},
  }),
  noOptionsMessage: (base) => ({ ...base, color: "var(--es-secondary)" }),
  // Grouped menus (the second line's languages): a quiet caption and a separator between groups
  group: (base) => ({
    ...base,
    padding: 0,
    "& + &": { marginTop: 4, paddingTop: 4, borderTop: "0.5px solid var(--es-separator)" },
  }),
  groupHeading: (base) => ({
    ...base,
    margin: 0,
    padding: "4px 10px 2px 24px",
    color: "var(--es-secondary)",
    fontSize: 11,
    fontWeight: 600,
    textTransform: "none",
  }),
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

// A mousedown on a menu option moves the focus out of the field, which closes the menu before the click picks the
// option; react-select prevents that in its own mousedown handler. Pages that stop mousedown on the way down (Coursera
// stops it for the whole document) keep it from there, so it's prevented here first: window's capture listeners run
// before any of the page's.
// EasySubs' menus only, by the class prefix every Select gives react-select, not the page's own react-selects
const CLASS_PREFIX = "es-select";
const keepFocusInMenu = (event: globalThis.MouseEvent) => {
  const target = event.target as Element | null;
  if (target?.closest?.(`.${CLASS_PREFIX}__menu`)) event.preventDefault();
};
let menuFocusKept = false;
const keepFocusInMenus = () => {
  if (menuFocusKept) return;
  menuFocusKept = true;
  window.addEventListener("mousedown", keepFocusInMenu, true);
};

type SelectProps = Props & {
  // A menu wider than the button, aligned to its right edge: for options with tags (the second line's languages)
  menuWidth?: number;
};

export const Select: FC<SelectProps> = ({ menuWidth, ...props }) => {
  const portalTarget = usePortalTarget();
  const styles = useMemo<StylesConfig>(
    () =>
      menuWidth
        ? {
            ...customStyles,
            menu: (base, state) => ({ ...customStyles.menu(base, state), width: menuWidth, left: "auto", right: 0 }),
          }
        : customStyles,
    [menuWidth],
  );

  // react-select opens on mousedown, which a page may stop on its way to the panel (on Coursera something stops it
  // above the player, while pointerdown and click get through): a click on the field that came without a mousedown
  // opens or closes the menu itself
  const selectRef = useRef<SelectInstance>(null);
  useEffect(keepFocusInMenus, []);
  const mouseDownSeenRef = useRef(false);
  // Whether the menu was open when the press began: without the mousedown the field loses the focus to the page,
  // which closes the menu before the click, and a click meant to close it would open it again
  const openAtPressRef = useRef(false);
  const handlePointerDown = () => {
    mouseDownSeenRef.current = false;
    openAtPressRef.current = Boolean(selectRef.current?.props.menuIsOpen);
  };
  const handleClick = (event: MouseEvent<HTMLDivElement>) => {
    const selectInstance = selectRef.current;
    // The menu is portaled out of the field, its clicks come here through React
    if (
      mouseDownSeenRef.current ||
      !selectInstance ||
      props.isDisabled ||
      !event.currentTarget.contains(event.target as Node)
    ) {
      return;
    }
    if (openAtPressRef.current) {
      if (selectInstance.props.menuIsOpen) selectInstance.onMenuClose();
    } else {
      selectInstance.focus();
      selectInstance.openMenu("first");
    }
  };

  return (
    <div
      className="es-select"
      onPointerDown={handlePointerDown}
      onMouseDownCapture={() => (mouseDownSeenRef.current = true)}
      onClick={handleClick}
    >
      <ReactSelect
        ref={selectRef}
        classNamePrefix={CLASS_PREFIX}
        isSearchable={(props.options?.length ?? 0) > SEARCHABLE_MIN_OPTIONS}
        {...props}
        styles={styles}
        theme={theme}
        components={{ DropdownIndicator, ...props.components }}
        menuPortalTarget={portalTarget}
        menuPosition="fixed"
        menuPlacement="auto"
      />
    </div>
  );
};
