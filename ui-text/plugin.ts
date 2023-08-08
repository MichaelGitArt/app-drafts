
import type { App } from 'vue'

import { ref } from 'vue'

import { uiTextInjectionKey } from './constants'

export interface IOptions {
  locale: string

  /**
   * Default for the components from the library
   * { en: { table: { RDataTable: { title: 'Table' } } }
   */
  defaults: Record<string, any>
  custom?: Record<string, any>
}

/**
 * Returns the value of the object by path (interface.table.RDataTable, RImprovedAutocomplete, etc.)
 * @param obj usual object
 * @param path path to the field (table.RDataTable, RImprovedAutocomplete, etc.)
 */
const getByPath = (obj: Record<string, any>, path: string): any => {
  return path.split('.').reduce((res, part) => res?.[part], obj)
}

export const createGitartUiTextPlugin = (options: IOptions) => {
  const locale = ref(options.locale)

  /**
   *
   * @param path path to text (table.RDataTable, RImprovedAutocomplete, etc.)
   * @param field field of text (title, search, etc.)
   * @param data
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const getText = (path: string, data?: Record<string, any>): string => {
    const defaults = getByPath(options.defaults?.[locale.value], path)
    const custom = getByPath(options.custom?.[locale.value], path)

    if (!defaults && !custom) {
      console.error(
        `@gitart/share: Key ${path} not found (ui-text plugin) \n`,
        'Read the documentation.',
      )

      return path
    }

    const text = (custom || defaults) as string | object

    if (typeof text !== 'string') {
      console.error(
        `@gitart/share: Key ${path} is not a string (ui-text plugin) \n`,
        'Read the documentation.',
      )
      return path
    }

    if (data) {
      return Object.keys(data || {}).reduce((acc, key) => acc.replace(`{${key}}`, data[key]), text)
    }

    return text
  }

  const setLocale = (newLocale: string) => {
    locale.value = newLocale
  }

  const global = {
    setLocale,
    getText,
  }

  return {
    install(app: App) {
      app.provide(uiTextInjectionKey, {
        getText,
        setLocale,
      })
    },
    global,
  }
}
