import { describe, expect, it } from 'vitest'
import { config, mount } from '@vue/test-utils'
import { createVuetify } from 'vuetify'

import {
  computed, defineComponent,
  h, inject,
} from 'vue'

import {
  createGitartUiTextPlugin,
  uiTextInjectionKey,
  useUiText,
} from './index'

describe('GitartUiTextPlugin', () => {
  const gitartUiTextPlugin = createGitartUiTextPlugin({
    locale: 'en',
    defaults: {
      en: {
        interface: {
          inner: {
            title: 'The Title',
            noResult: 'No result for {search}',
          },
        },
      },
      fr: {
        interface: {
          inner: {
            title: 'Le Title',
            noResult: 'Pas de résultat pour {search}',
          },
        },
      },
    },
  })

  config.global.plugins = [
    createVuetify(),
    gitartUiTextPlugin,
  ]

  it('test injection', async() => {
    mount(defineComponent(() => {
      const uiText = inject(uiTextInjectionKey)!

      const title = computed(() => uiText.getText('interface.inner.title'))
      expect(title.value).toBe('The Title')

      uiText.setLocale('fr')
      expect(title.value).toBe('Le Title')
      uiText.setLocale('en')

      return () => h('div')
    }))
  })

  it('test composable', async() => {
    // with base path
    mount(defineComponent(() => {
      const uiText = useUiText()
      const title = uiText.getText('interface.inner.title')
      expect(title).toBe('The Title')
      return () => h('div')
    }))

    // without base path
    mount(defineComponent(() => {
      const uiText = useUiText('interface')
      const title = uiText.getText('inner.title')

      expect(title).toBe('The Title')
      return () => h('div')
    }))
  })

  it('test global', async() => {
    const title = gitartUiTextPlugin.global.getText('interface.inner.title')
    expect(title).toBe('The Title')
  })

  // test passing data
  it('test passing data', async() => {
    mount(defineComponent(() => {
      const uiText = useUiText()
      const title = uiText.getText('interface.inner.noResult', { search: 'test' })
      expect(title).toBe('No result for test')

      return () => h('div')
    }))
  })
})
