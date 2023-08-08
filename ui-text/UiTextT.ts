
import {
  computed,
  defineComponent,
} from 'vue'

import { useUiText } from './composables'

export const UiTextT = defineComponent({
  name: 'UiTextT',
  props: {
    keypath: {
      type: String,
      required: true,
    },
  },

  setup(props, { slots }) {
    const uiText = useUiText()

    type SlotFn = Function

    type FragmentItem = string | SlotFn

    const baseText = computed(() => uiText.getText(props.keypath))

    const fragments = computed<FragmentItem[]>(() => {
      const items: FragmentItem[] = [
        baseText.value,
      ]

      Object.keys(slots).forEach((key) => {
        const part = `{${key}}`

        items.forEach((textItem, textIndex) => {
          if (typeof textItem !== 'string') { return }

          const matchIndex = textItem.indexOf(part)
          if (matchIndex !== -1) {
            items.splice(textIndex, 1,
              textItem.slice(0, matchIndex),
              slots[key] as Function,
              textItem.slice(matchIndex + part.length),
            )
          }
        })
      })

      return items
    })

    return () => {
      return fragments.value.map((textItem) => {
        if (typeof textItem === 'string') {
          return textItem
        }

        return textItem()
      })
    }
  },
})
