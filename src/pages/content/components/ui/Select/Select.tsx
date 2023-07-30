import { FC, HTMLProps } from "react";

interface SelectProps extends HTMLProps<HTMLSelectElement> {
  options: { value: string; label: string }[];
}

export const Select: FC<SelectProps> = ({ value, onChange, options, ...props }) => {
  return (
    <select className="es-select" value={value} onChange={onChange} {...props}>
      {options.map((language: { value: string; label: string }, index) => {
        return (
          <option value={language.value} key={index}>
            {language.label}
          </option>
        );
      })}
    </select>
  );
};
