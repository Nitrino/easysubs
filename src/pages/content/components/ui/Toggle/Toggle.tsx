import { FC } from "react";

export interface ToggleProps {
  isEnabled: boolean;
  onChange: (value: boolean) => void;
}

export const Toggle: FC<ToggleProps> = ({ isEnabled, onChange }) => {
  return (
    <label>
      <div className="es-toggle">
        <input
          className="toggle-state"
          type="checkbox"
          name="check"
          value="check"
          defaultChecked={isEnabled}
          onChange={() => onChange(!isEnabled)}
        />
        <div className="toggle-inner">
          <div className="indicator" />
        </div>
        <div className="active-bg" />
      </div>
    </label>
  );
};
