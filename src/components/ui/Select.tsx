import { Component } from 'solid-js'
import { createButton } from '@solid-aria/button'
import { ForItems } from '@solid-aria/collection'
import { FocusScope } from '@solid-aria/focus'
import { ListState } from '@solid-aria/list'
import { AriaListBoxOptionProps, AriaListBoxProps, createListBox, createListBoxOption } from '@solid-aria/listbox'
import { AriaOverlayProps, createOverlay, DismissButton } from '@solid-aria/overlays'
import { AriaSelectProps, createSelect, HiddenSelect } from '@solid-aria/select'
import { ParentProps, Show } from 'solid-js'

function Popover(props: ParentProps<AriaOverlayProps>) {
  let ref: HTMLDivElement | undefined

  // Handle events that should cause the popup to close,
  // e.g. blur, clicking outside, or pressing the escape key.
  const { overlayProps } = createOverlay(
    {
      isOpen: props.isOpen,
      onClose: props.onClose,
      shouldCloseOnBlur: true,
      isDismissable: true,
    },
    () => ref,
  )

  // Add a hidden <DismissButton> component at the end of the popover
  // to allow screen reader users to dismiss the popup easily.
  return (
    <FocusScope restoreFocus>
      <div
        {...overlayProps}
        ref={ref}
        style={{
          position: 'absolute',
          width: '100%',
          border: '1px solid gray',
          background: 'lightgray',
          'margin-top': '4px',
        }}
      >
        {props.children}
        <DismissButton onDismiss={props.onClose} />
      </div>
    </FocusScope>
  )
}

const ListBox: Component<AriaListBoxProps & { state: ListState }> = (props) => {
  let ref: HTMLUListElement | undefined

  const { ListBoxProvider, listBoxProps } = createListBox(props, () => ref, props.state)

  return (
    <ListBoxProvider>
      <ul
        {...listBoxProps}
        ref={ref}
        style={{
          margin: 0,
          padding: 0,
          'list-style': 'none',
          'max-height': '150px',
          overflow: 'auto',
        }}
      >
        <ForItems in={props.state.collection()}>
          {(item) => <Option key={item().key}>{item().children}</Option>}
        </ForItems>
      </ul>
    </ListBoxProvider>
  )
}

export const Option: Component<ParentProps<AriaListBoxOptionProps>> = (props) => {
  let ref: HTMLLIElement | undefined

  const { optionProps, isSelected, isFocused } = createListBoxOption(props, () => ref)

  return (
    <li
      {...optionProps}
      ref={ref}
      style={{
        background: isSelected() ? 'blueviolet' : isFocused() ? 'gray' : 'white',
        color: isSelected() ? 'white' : 'black',
        padding: '2px 5px',
        outline: 'none',
        cursor: 'pointer',
      }}
    >
      {props.children}
    </li>
  )
}

export const Select: Component<AriaSelectProps> = (props) => {
  let ref: HTMLButtonElement | undefined

  // Get props for child elements from useSelect
  const { labelProps, triggerProps, valueProps, menuProps, state } = createSelect(props, () => ref)

  // Get props for the button based on the trigger props from useSelect
  const { buttonProps } = createButton(triggerProps, () => ref)

  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <div {...labelProps} style={{ 'margin-bottom': '4px' }}>
        {props.label}
      </div>
      <HiddenSelect state={state} triggerRef={ref} label={props.label} name={props.name} />
      <button
        {...buttonProps}
        ref={ref}
        style={{ height: '30px', 'font-size': '14px', color: '#252836', border: 'none', 'border-radius': '4px' }}
      >
        <span {...valueProps}>{state.selectedItem()?.children ?? 'Select an option'}</span>
        <span aria-hidden="true" style={{ 'padding-left': '5px' }}>
          ▼
        </span>
      </button>
      <Show when={state.isOpen()}>
        <Popover isOpen={state.isOpen()} onClose={state.close}>
          <ListBox {...menuProps} state={state} />
        </Popover>
      </Show>
    </div>
  )
}
