import { FC } from "react";

// Marks a translation made for the line the word is in (ChatGPT, Ollama, Bergamot), not for the word anywhere: a quiet
// gray pill like the dictionary links, so it reads as a marker without drawing the eye.
export const InLineBadge: FC = () => (
  <span className="es-badge" title="Translated as it's used in this line">
    In this line
  </span>
);
