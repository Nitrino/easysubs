import { type RefObject, useEffect, useCallback } from "react";

export const useClickOutside = (ref: RefObject<HTMLDivElement>, callback: () => void) => {
  const handleClick = useCallback(
    (e: MouseEvent) => {
      const target = e.target as HTMLElement;

      if (ref.current && !ref.current.contains(target)) {
        // Check if the click is on a react-select element
        const isReactSelectElement = target.closest('[id*="react-select"]') !== null;

        const isEsModalElement = target.closest('[class="es-modal-overlay"]') !== null;

        if (!isReactSelectElement && !isEsModalElement) {
          callback();
        }
      }
    },
    [ref, callback],
  );

  useEffect(() => {
    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [handleClick]);
};
