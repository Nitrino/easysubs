import React from 'react';
import { createPortal } from 'react-dom';
import usePortal from './usePortal';

/**
 * @example
 * <Portal>
 *   <p>Thinking with portals</p>
 * </Portal>
 */
const Portal = ({ id, children }: any) => {
  const target = usePortal(id);
  return createPortal(
    children,
    target,
  );
};

export default Portal;
