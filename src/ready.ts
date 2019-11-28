/* tslint:disable */
interface Listener {
  selector: string;
  fn: Function;
}

interface ElementObject {
  ready: boolean
}
let listeners: Listener[] = []
let observer

function check() {
  // Check the DOM for elements matching a stored selector
  for (var i = 0, len: Number = listeners.length, listener: Listener, elements: ElementObject[]; i < len; i++) {
    listener = listeners[i];
    // Query for elements matching the specified selector
    elements = window.document.querySelectorAll(listener.selector) as unknown as ElementObject[];
    for (var j = 0, jLen = elements.length, element; j < jLen; j++) {
      element = elements[j];
      // Make sure the callback isn't invoked with the 
      // same element more than once
      if (!element.ready) {
        element.ready = true;
        // Invoke the callback with the element
        listener.fn.call(element, element);
      }
    }
  }
}

export function ready(selector: string, fn: Function) {
  // Store the selector and callback to be monitored
  listeners.push({
    selector: selector,
    fn: fn
  });

  observer = new MutationObserver(check);
  observer.observe(window.document.documentElement, {
    childList: true,
    subtree: true
  });

  // Check if the element is currently in the DOM
  check();
}
