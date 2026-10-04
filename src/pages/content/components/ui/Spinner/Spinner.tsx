import { FC } from "react";

// macOS-style spinner: eight spokes, stepping round.
export const Spinner: FC = () => {
  return (
    <span className="es-spinner" aria-hidden="true">
      {Array.from({ length: 8 }, (_, i) => (
        <span key={i} />
      ))}
    </span>
  );
};
