import { inject } from 'vue'

import { uiTextInjectionKey } from './constants'

/**
 *
 * @param path path to the text (table.RDataTable, RImprovedAutocomplete, etc.)
 */
export const useUiText = (path?: string) => {
  const $uiText = inject(uiTextInjectionKey)

  if (!$uiText) {
    throw new Error('uiText plugin is not provided')
  }

  return {
    getText: (field: string, data?: any) => {
      if (path) {
        return $uiText.getText(`${path}.${field}`, data)
      }

      return $uiText.getText(field, data)
    },
  }
}
