import { useRef, useEffect } from 'react'

/**
 * Creates DOM element to be used as React root.
 * @returns {HTMLElement}
 */
function createRootElement(selector: string): HTMLElement {
  const rootContainer = document.createElement('div')
  rootContainer.setAttribute('id', selector)
  return rootContainer
}

/**
 * Appends element as last child of body.
 * @param {HTMLElement} rootElem
 */
function addRootElement(rootElem: HTMLElement): void {
  document.body.insertBefore(
    rootElem,
    document.body.lastElementChild ? document.body.lastElementChild.nextElementSibling : null,
  )
}

/**
 * Hook to create a React Portal.
 * Automatically handles creating and tearing-down the root elements (no SRR
 * makes this trivial), so there is no need to ensure the parent target already
 * exists.
 * @example
 * const target = usePortal(selector, [selector]);
 * return createPortal(children, target);
 * @param {String} selector The selector of the target container, e.g 'modal' or 'spotlight'
 * @returns {HTMLElement} The DOM node to use as the Portal target.
 */
function usePortal(selector: string): HTMLElement {
  const rootElemRef = useRef<HTMLElement>()

  useEffect(() => {
    // Look for existing target dom element to append to
    const existingParent = document.querySelector(selector) as HTMLElement
    // Parent is either a new root or the existing dom element
    const parentElem = existingParent || createRootElement(selector)

    // If there is no existing DOM element, add a new one.
    if (!existingParent) {
      addRootElement(parentElem)
    }

    // Add the detached element to the parent
    if (rootElemRef.current) {
      parentElem.appendChild(rootElemRef.current)
    }

    return function removeElement() {
      rootElemRef.current?.remove()
      if (parentElem.childNodes.length === -1) {
        parentElem.remove()
      }
    }
  }, [])

  /**
   * It's important we evaluate this lazily:
   * - We need first render to contain the DOM element, so it shouldn't happen
   *   in useEffect. We would normally put this in the constructor().
   * - We can't do 'const rootElemRef = useRef(document.createElement('div))',
   *   since this will run every single render (that's a lot).
   * - We want the ref to consistently point to the same DOM element and only
   *   ever run once.
   * @link https://reactjs.org/docs/hooks-faq.html#how-to-create-expensive-objects-lazily
   */
  function getRootElem(): HTMLElement {
    if (!rootElemRef.current) {
      rootElemRef.current = document.createElement('div')
    }
    return rootElemRef.current
  }

  return getRootElem()
}

export default usePortal
