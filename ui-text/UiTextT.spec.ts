import { describe, expect, it } from 'vitest'
import { config, mount } from '@vue/test-utils'
import { createVuetify } from 'vuetify'

import {
  defineComponent, h,
} from 'vue'

import { UiTextT } from './UiTextT'

import {
  createGitartUiTextPlugin,
} from './plugin'

describe('UiTextT Component', () => {
  const gitartUiTextPlugin = createGitartUiTextPlugin({
    locale: 'en',
    defaults: {
      en: {
        interface: {
          inner: {
            noResult: 'No result for {search} in {entity} table',
          },
        },
      },
      fr: {
        interface: {
          inner: {
            noResult: 'Pas de résultat pour {search} in {entity} table',
          },
        },
      },
    },
  })

  config.global.plugins = [
    createVuetify(),
    gitartUiTextPlugin,
  ]

  it('test rendering', async() => {
    const search = 'Search Text'
    const entity = 'Entity Name'

    const el = mount(defineComponent(() => {
      return () => {
        return [
          h(UiTextT, {
            keypath: 'interface.inner.noResult',
          }, {
            search: () => {
              return h('a', { href: '#' }, search)
            },
            entity: () => {
              return h('a', { href: '#' }, entity)
            },
          }),
        ]
      }
    }))

    const links = el.findAll('a')
    expect(links.length).toBe(2)

    const componentText = el.text()
    const text = gitartUiTextPlugin.global.getText('interface.inner.noResult', { search, entity })
    expect(componentText).toBe(text)
  })
})
