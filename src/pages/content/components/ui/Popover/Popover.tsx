import { CSSProperties, FC, PropsWithChildren } from "react";
import cn from "classnames";

type TPopoverProps = {
  variant: "word" | "line";
  style?: CSSProperties;
};

// HUD popover above its positioned parent: body and arrow are siblings so each keeps its own
// backdrop blur. Clicks stay inside, so they don't reach the subtitle under it.
export const Popover: FC<PropsWithChildren<TPopoverProps>> = ({ variant, style, children }) => {
  return (
    <div className={cn("es-popover", `es-popover--${variant}`)} style={style} onClick={(e) => e.stopPropagation()}>
      <div className="es-popover__body">
        <div className="es-content">{children}</div>
      </div>
      <div className="es-popover__arrow" />
    </div>
  );
};
