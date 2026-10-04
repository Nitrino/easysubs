import { FC } from "react";

export interface ToggleProps {
  isEnabled: boolean;
  onChange: (value: boolean) => void;
}

export const Toggle: FC<ToggleProps> = ({ isEnabled, onChange }) => {
  return (
    <label className="es-switch">
      <input className="es-switch__input" type="checkbox" checked={isEnabled} onChange={() => onChange(!isEnabled)} />
      <span className="es-switch__track">
        <span className="es-switch__knob" />
      </span>
    </label>
  );
};
