
import type { InjectionKey } from 'vue'

export type IUITextInjectionKey = InjectionKey<{
  getText: (path: string, data?: Record<string, any>) => string
  setLocale: (newLocale: string) => void
}>

export const uiTextInjectionKey: IUITextInjectionKey = Symbol('uiText')
