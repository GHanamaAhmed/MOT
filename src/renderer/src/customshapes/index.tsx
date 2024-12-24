import {
  DefaultKeyboardShortcutsDialog,
  DefaultKeyboardShortcutsDialogContent,
  DefaultToolbar,
  DefaultToolbarContent,
  TLComponents,
  TLUiOverrides,
  TldrawUiMenuItem,
  useIsToolSelected,
  useTools
} from 'tldraw'

export const uiOverrides: TLUiOverrides = {
  tools(editor, tools) {
    // Create a tool item in the ui's context.
    tools.card = {
      id: 'card',
      icon: 'color',
      label: 'Card',
      kbd: 'c',
      onSelect: () => {
        editor.setCurrentTool('card')
      }
    }
    tools.dashedRect = {
      id: 'dashedRect',
      icon: 'color',
      label: 'Dashed Rectangle',
      kbd: 'dr',
      onSelect: () => {
        editor.setCurrentTool('dashedRect')
      }
    }
    return tools
  }
}

export const components: TLComponents = {
  Toolbar: (props) => {
    const tools = useTools()
    const isCardSelected = useIsToolSelected(tools['card'])
    const isDashedRectSelected = useIsToolSelected(tools['dashedRect'])

    return (
      <DefaultToolbar {...props}>
        <TldrawUiMenuItem {...tools['card']} isSelected={isCardSelected} />
        <TldrawUiMenuItem {...tools['dashedRect']} isSelected={isDashedRectSelected} />
        <DefaultToolbarContent />
      </DefaultToolbar>
    )
  },
  KeyboardShortcutsDialog: (props) => {
    const tools = useTools()
    return (
      <DefaultKeyboardShortcutsDialog {...props}>
        <TldrawUiMenuItem {...tools['card']} />
        <DefaultKeyboardShortcutsDialogContent />
      </DefaultKeyboardShortcutsDialog>
    )
  }
}
