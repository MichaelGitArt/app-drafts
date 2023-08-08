import type { Plugin } from 'vue'

import type {
  IRDialog, IRDialogItem,
} from './types'

import { reactive, shallowReactive } from 'vue'

import { gitartDialogInjectionKey } from './constants'

const dialogs = shallowReactive<IRDialogItem[]>([])

/**
 * Plugin to install
 */
export const gitartDialogPlugin: Plugin = {
  install: (app, options) => {
    const defaultCloseDelay = options?.closeDelay ?? 500
    const defaultProps = options?.props ?? {}

    const $dialog: IRDialog = {
      dialogs,

      addDialog: (component, props, { onRemoveHook } = {}) => {
        dialogs.push({
          component,
          id: Date.now() + Math.random(),

          props: reactive({
            modelValue: true,
            ...defaultProps,
            ...props,
          }),

          onRemoveHook,
        })
      },

      removeDialog: (index, closeDelay) => {
        const dialog = dialogs[index]
        if (!dialog.props.modelValue) {
          return
        }

        dialog.props.modelValue = false

        if (dialog.onRemoveHook) {
          dialog.onRemoveHook()
        }

        setTimeout(() => {
          dialogs.splice(dialogs.indexOf(dialog), 1)
        }, closeDelay ?? defaultCloseDelay)
      },
    }

    app.provide(gitartDialogInjectionKey, $dialog)
    app.config.globalProperties.$dialog = $dialog
  },
}
